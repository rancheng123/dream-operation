import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import utils from '../../../asset'
// 引入 金币 单位转换 组件
import {
    intToFloat,
    toFloat
} from '../../../asset/intToFloat'
// 引入精度运算假发
import { SubMethod } from '../../../asset/calculation'

// api接口
import { 
    getInvoicesDetails,
    setInvoicing
} from '../../../api/financial/invoice'

import {
    Card,
    Button,
    Row,
    Col,
    Steps,
    Modal,
    Form,
    Input,
    Skeleton
} from 'antd'

const { Step } = Steps
const FormItem = Form.Item

// 引入header title组件
import Title from '@/js/components/modules/title/title'
// 引入CarBox组件
import CardBox from '@/js/components/modules/cardBox/cardBox'
// 引入tableDetails组件
import TableDetails from '@/js/components/modules/tableDetails/index'
// 引入属性title组件
import Attribute from '@/js/components/modules/attribute/index'
// 引入tableBox组件
import TableBox from '@/js/components/modules/tableBox/index'
// 引入descriptionList组件
import DescriptionList from '@/js/components/modules/descriptionList'
const { Description } = DescriptionList

// 引入样式
import './invoice_manage.scss'

@Form.create()

class invoice_manage extends Component {
    constructor (props) {
        super(props)

        this.state = {
            data: {},
            code: '',
            selectedRowKeys: [],
            invoiceChildrenList: {},
            amounts: '',    // !只初始化一次的值
            totalAmount: '',    // * 总额
            remainingAmount: '',    // * 剩余金额
            selectedRows: [],
            loadingStatus: false,
        }
    }

    updateState = (stateName, stateData) => {
        this.setState({
            [stateName]: stateData
        })
    }

    // *组件实例化完成后
    componentDidMount () {
        // 页面渲染完成，调用接口获取数据
        const { params } = this.props

        if (params.code) {
            let data = params.code.toString()
            // 保存 code 到 state 中
            this.updateState('code', params.code)
            this.updateState('loadingStatus', true)

            // 获取账单-明细数据
            getInvoicesDetails(data).then((res) => {
                if (res != undefined && res.code == 10000) {
                } else {
                    // mock数据
                }
                // 将数据保存到 state 中
                this.updateState('data', res.data)
                this.updateState('invoiceChildrenList', res.data.merge_invoice)
                this.updateState('amounts', parseInt(res.data.remaining_amount) / 100)
                this.updateState('totalAmount', parseInt(res.data.remaining_amount) / 100)
                this.updateState('remainingAmount', parseInt(res.data.remaining_amount) / 100)
                this.updateState('loadingStatus', false)
            })     
        }
    }
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }

    /**
     * 返回发票申请列表页
     */
    goBackEvent = () => {
        // utils.Router.switchRoute('/financial/invoice/list')
        utils.Router.backRoute()
    }

    /**
     * table list select 触发方法
     */
    onSelectChange = (selectedRowKeys, selectedRows) => {
        let { amounts } = this.state

        this.setState({ selectedRowKeys })
        this.setState({ selectedRows })
        selectedRows.forEach(element => {
            amounts += parseInt(element.limit_amount) / 100
        })
        
        // 更新总额
        this.updateState('totalAmount', amounts)
        this.updateState('remainingAmount', amounts)
    }

    /**
     * 表单提交方法
     */
    confirm = (e) => {
        e.preventDefault()
        const { form } = this.props
        const { data = {}, selectedRows = [] } = this.state
 
        // 表单数据校验
        form.validateFields((err, fieldsValue) => {
            if (err) return

            let apply_code_array = [data.apply_code]

            selectedRows.map((item, i) => {
                apply_code_array.push(item.apply_code)
            })
            fieldsValue['apply_code'] = apply_code_array
            fieldsValue['apply_amount'] = fieldsValue.apply_amount * 100
            // 调用接口 并更改 state 数据
            this.setInvoicingRequest(fieldsValue)
        })
    }

    setInvoicingRequest (data) {
        setInvoicing(data).then((res) => {
            if (res.code == 10000) {
                Modal.info({
                    title: '提示',
                    content: (
                        <div>
                            <p>成功</p>
                        </div>
                    ),
                    onOk() {
                        // 关闭表单
                        utils.Router.switchRoute('/financial/invoice/list')
                    },
                })
            }
        })
    }

    // 账单详细信息目录
    columns = [
        {
            title: '账单编号',
            dataIndex: 'invoice_code',
        },
        {
            title: '账单金额',
            dataIndex: 'invoice_amount',
            render: val => `￥ ${ intToFloat(val) }`
        }
    ]

    columns2 = [
        {
            title: '账单编号',
            dataIndex: 'order_code',
        },
        {
            title: '账单金额',
            dataIndex: 'limit_amount',
            render: val => `￥ ${ intToFloat(val) }`
        }
    ]
    
    render () {
        const { data, invoiceChildrenList, amounts, totalAmount, remainingAmount, selectedRowKeys, loadingStatus } = this.state
        const { invoice_log = [] } = data

        const {
            form: {getFieldDecorator}
        } = this.props

        let list = invoice_log

        list.map((item, i) => {
            item['key'] = i
            return item
        })

        let childrenList = [...invoiceChildrenList]
        childrenList.map((item, i) => {
            item['key'] = i
            return item
        })

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        }

        // 自定义表单校验
        let validatorMinValue = (rule, value, callback) => {
            const { totalAmount } = this.state

            if (value != undefined) {
                let num = SubMethod(totalAmount, value)
                // console.log(num)
                if (num <= 0) num = 0
                if (!isNaN(num)) this.updateState('remainingAmount', num)

                if (value < amounts) {
                    callback('最低开票金额￥' + toFloat(amounts))
                } else if (value > totalAmount) {
                    callback('最高开票金额￥' + toFloat(amounts))
                }
            }

            callback()
        }
        
        let remaining = '待开票金额: ￥' + toFloat(remainingAmount)

        return (
            <div className="invoice_manage_box">
                <Title title="发票处理详情"></Title>

                <div className="invoice_manage_content">
                    <Card bordered={false} style={{ padding: '0px 14px' }}>
                        <Skeleton loading={loadingStatus} active paragraph={{ rows: 0 }}>
                            <Row gutter={ 16 }>
                                <Col xxl={8} lg={10} sm={16} className="invoice_col">
                                    <div className="col1_title_box">
                                        <div className="title_rectangle"></div>
                                        <div className="title_name">
                                            申请编号: <span className="title_data">{data == undefined ?  null : data.apply_code}</span>
                                        </div>
                                    </div>
                                </Col>

                                <Attribute title="申请时间" xxl={8} lg={10} sm={16}>{data.created_at}</Attribute>
                                <Attribute title="申请人" xxl={8} lg={10} sm={16}>{data.submit_by_name}</Attribute>
                            </Row>
                        </Skeleton>
                    </Card>
                </div>

                <div className="invoice_manage_content" style={{ marginTop: '32px' }}>
                    <CardBox title="申请信息">
                        <TableDetails
                            rowKey="key"
                            pagination={false}
                            scroll={{ x: 1000 }}
                            dataSource={list}
                            columns={this.columns}
                            loading={loadingStatus}
                        >
                            <Skeleton loading={loadingStatus} active paragraph={{ rows: 0 }}>
                                <DescriptionList size="large" title="" style={{ margin: '24px 0px' }}>
                                    <Description term="组织名称">{data == undefined ?  null : data.member_id_name}</Description>
                                    <Description term="组织类型">{data == undefined ?  null : data.member_type_name}</Description>
                                    <Description term="开票金额">
                                        <span style={{ color: '#FF5555' }}>￥{data == undefined ?  null : intToFloat(data.limit_amount) }</span>
                                    </Description>
                                </DescriptionList>
                            </Skeleton>
                        </TableDetails>

                        <div style={{ padding: '24px 0px 0px 0px' }}>
                            <Skeleton loading={loadingStatus} active paragraph={{ rows: 1 }}>
                                <DescriptionList size="large" title="" style={{ marginBottom: 0 }}>
                                    <Description term="发票类型">{data == undefined ?  null : data.invoice_type_name}</Description>
                                    <Description term="抬头类型">{data == undefined ?  null : data.invoice_title_type_name}</Description>
                                    <Description term="出具类型">{data == undefined ?  null : data.invoice_mode_name}</Description>
                                    <Description term="开票总额">
                                        <span style={{ color: '#FF5555' }}>￥{data == undefined ?  null : toFloat(totalAmount) }</span>
                                    </Description>
                                    <Description term="发票抬头">{data == undefined ?  null : data.invoice_title}</Description>
                                    <Description term="纳税人识别号">{data == undefined ?  null : data.taxpayer_number}</Description>
                                </DescriptionList>
                            </Skeleton>
                        </div>

                        <div className="select_row_box">
                            <div className="children_table">可合并开票账单</div>

                            <TableDetails
                                rowKey="key"
                                pagination={false}
                                scroll={{ x: 1000 }}
                                dataSource={childrenList}
                                columns={this.columns2}
                                rowSelection={rowSelection}
                                loading={loadingStatus}
                            ></TableDetails>
                        </div>
                    </CardBox>

                    <CardBox title="开票信息">
                        <div style={{ padding: '24px 0px' }}>
                            <Skeleton loading={loadingStatus} active paragraph={{ rows: 2 }}>
                                <Form onSubmit={this.confirm} layout="inline">
                                    <Row gutter={ 24 }>
                                        <Col xl={24} lg={24} sm={24} xs={24}>
                                            {/* labelCol={{ xl: 3, lg: 3, sm: 6 }} wrapperCol={{ xl: 21, lg: 18, sm: 15 }}  */}
                                            <FormItem label="开票内容" style={{ width: '100%' }}>
                                                <span>租金</span>
                                            </FormItem>
                                        </Col>

                                        <Col xl={12} lg={12} sm={24} xs={24}>
                                            <FormItem extra={remaining} label="开票金额" style={{ width: '100%' }}>
                                                {getFieldDecorator('apply_amount', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: '请输入开票金额',
                                                        },
                                                        {
                                                            pattern: /^(\d+)((?:\.\d+)?)$/,
                                                            message: '请输入合法金额数字',
                                                        },
                                                        {
                                                            validator: validatorMinValue
                                                        }
                                                    ]
                                                })(
                                                    <Input placeholder="请输入开票金额" style={{ width: '100%' }} />
                                                )}
                                            </FormItem>
                                        </Col>

                                        <Col xl={12} lg={12} sm={24} xs={24}>
                                            <FormItem label="发票编号" style={{ width: '100%' }}>
                                                {getFieldDecorator('invoice_code', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: '请输入发票编号',
                                                        },
                                                        {
                                                            pattern: /^(\d+)((?:\.\d+)?)$/,
                                                            message: '请输入正确的发票编号',
                                                        }
                                                    ]
                                                })(
                                                    <Input placeholder="请输入发票编号" style={{ width: '100%', }} />
                                                )}
                                            </FormItem>
                                        </Col>

                                        <Col lg={24} md={24} sm={24}>
                                            <div className="button_box">
                                                <Button className="confirm_btn" type="primary" htmlType="submit">确认开具</Button>
                                                <Button onClick={() => this.goBackEvent()}>返回</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </Skeleton>
                        </div>
                    </CardBox>
                </div>
            </div>
        )
    }
}

export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    };
})(invoice_manage)