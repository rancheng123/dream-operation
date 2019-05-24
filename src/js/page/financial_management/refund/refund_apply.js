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
    getRefundDetails,
    setRefundApplyPay
} from '../../../api/financial/refund'

import {
    Button,
    Row,
    Col,
    Form,
    Input,
    Modal,
    Skeleton,
} from 'antd'

const FormItem = Form.Item

// 引入header title组件
import Title from '@/js/components/modules/title/title'
// 引入CarBox组件
import CardBox from '@/js/components/modules/cardBox/cardBox'
// 引入tableDetails组件
import TableDetails from '@/js/components/modules/tableDetails/index'
// 引入descriptionList组件
import DescriptionList from '@/js/components/modules/descriptionList'
const { Description } = DescriptionList

// 引入样式
import './refund_apply.scss'

@Form.create()

class refund_apply extends Component {
    constructor (props) {
        super(props)

        this.state = {
            data: {},
            code: '',
            selectedRowKeys: [],
            childrenList: {},
            amounts: '',    // !只初始化一次的值
            totalAmount: '',    // * 总额
            remainingAmount: '',    // * 剩余金额
            loadingStatus: false,
        }
    }

    updateState = (stateName, stateData) => {
        this.setState({
            [stateName]: stateData,
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
            getRefundDetails(data).then((res) => {
                if (res.code == 10000) {
                } else {
                    // mock数据
                }

                this.updateState('data', res.data)
                this.updateState('loadingStatus', false)
                this.updateState('childrenList', res.data.details)
                this.updateState('amounts', res.data.remaining_amount  / 100)
                this.updateState('totalAmount', res.data.remaining_amount / 100)
                this.updateState('remainingAmount', res.data.remaining_amount / 100)
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
        // utils.Router.switchRoute('/financial/refund/list')
        utils.Router.backRoute()
    }

    /**
     * table list select 触发方法
     */
    onSelectChange = (selectedRowKeys, selectedRows) => {
        let { amounts, totalAmount } = this.state

        this.setState({ selectedRowKeys })
        selectedRows.forEach(element => {
            amounts += parseInt(element.amount)
        })

        // 最后更新总额
        this.updateState('totalAmount', amounts)
        this.updateState('remainingAmount', amounts)
    }

    /**
     * 表单提交方法
     */
    confirm = (e) => {
        e.preventDefault()
        const { form, params } = this.props

        // 表单数据校验
        form.validateFields((err, fieldsValue) => {
            if (err) return

            fieldsValue['code'] = params.code
            fieldsValue.amount = fieldsValue.amount * 100

            // 调用接口 并更改 state 数据
            this.setInvoicingRequest(fieldsValue, params.code)
        })
    }

    setInvoicingRequest (data, id) {
        setRefundApplyPay(data, id).then((res) => {
            Modal.info({
                title: '提示',
                content: (
                    <div>
                        <p>成功</p>
                    </div>
                ),
                onOk () {
                    utils.Router.switchRoute('/financial/refund/list')
                },
            })
        })
    }

    // 账单详细信息目录
    columns = [
        {
            title: '退改编号',
            dataIndex: 'detail_code',
        },
        {
            title: '退改类型',
            dataIndex: 'detail_type_name',
        },
        {
            title: '退改内容',
            dataIndex: 'detail_content',
        },
        {
            title: '账单金额',
            dataIndex: 'detail_amount',
            render: val => `￥ ${ intToFloat(val) }`
        },
        {
            title: '退改状态',
            dataIndex: 'detail_status_name',
        }
    ]
    
    render () {
        const { data, childrenList, amounts, totalAmount, remainingAmount, selectedRowKeys, loadingStatus } = this.state
        const {
            form: {getFieldDecorator}
        } = this.props

        let newList = [...childrenList]
        newList.map((item, i) => {
            item['key'] = i
            return item
        })

        // 自定义表单校验
        let validatorMinValue = (rule, value, callback) => {
            const { totalAmount, amounts } = this.state

            if (value != undefined) {
                // 计算剩余开票金额
                let num = SubMethod(totalAmount, value)
    
                if (num <= 0) num = 0
                
                if (!isNaN(num)) this.updateState('remainingAmount', num)
    
                if (value > amounts) {
                    callback('最高开票金额￥' + toFloat(amounts) )
                } else if (value < 0.1) {
                    callback('最低开票金额￥' + 0.10)
                }
            }

            callback()
        }
        
        let remaining = '待开票金额: ￥' + toFloat(remainingAmount)

        return (
            <div className="refund_apply_box">
                <Title title="退款申请管理"></Title>

                <div className="refund_content_box">
                    <CardBox title="退款申请详情">
                        <TableDetails
                            rowKey="key"
                            pagination={false}
                            scroll={{ x: 1000 }}
                            dataSource={newList}
                            columns={this.columns}
                            loading={loadingStatus}
                        >
                            <Skeleton loading={loadingStatus} active paragraph={{ rows: 2 }}>
                                <DescriptionList size="large" title="" style={{ margin: '24px 0px' }}>
                                    <Description term="退款申请编号">{data == undefined ?  null : data.refund_code}</Description>
                                    <Description term="用户名称">{data == undefined ?  null : data.member_id_name}</Description>
                                    <Description term="城市">{data == undefined ?  null : data.city_name}</Description>
                                    <Description term="场地">{data == undefined ?  null : data.location_name}</Description>
                                    <Description term="退款申请来源">{data == undefined ?  null : data.source_type_name}</Description>
                                    <Description term="申请退款总额">
                                        <span style={{ color: '#FF5555' }}>￥{data == undefined ?  null : intToFloat(data.refund_amount)}</span>
                                    </Description>
                                    <Description term="订单编号">{data == undefined ?  null : data.order_code}</Description>
                                    <Description term="退款状态">{data == undefined ?  null : data.refund_status_name}</Description>
                                    <Description term="生成时间">{data == undefined ?  null : data.created_at}</Description>
                                </DescriptionList>
                            </Skeleton>
                        </TableDetails>
                    </CardBox>

                    <CardBox title="退款信息">
                        <div style={{ padding: '24px 0px' }}>
                            <Skeleton loading={loadingStatus} active paragraph={{ rows: 1 }}>
                                <Form onSubmit={this.confirm} layout="inline">
                                    <Row gutter={ 24 }>
                                        <Col xl={12} lg={12} sm={24} xs={24}>
                                            <FormItem extra={remaining} label="退款金额" style={{ width: '100%' }}>
                                                {getFieldDecorator('amount', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: '请输入退款金额',
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
                                                    <Input placeholder="请输入退款金额" style={{ width: '100%' }} />
                                                )}
                                            </FormItem>
                                        </Col>

                                        <Col xl={12} lg={12} sm={24} xs={24}>
                                            <FormItem label="银行流水账号" style={{ width: '100%' }}>
                                                {getFieldDecorator('pay_code', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: '请输入银行流水账号',
                                                        },
                                                        {
                                                            pattern: /^(\d+)((?:\.\d+)?)$/,
                                                            message: '请输入正确的银行流水账号',
                                                        }
                                                    ]
                                                })(
                                                    <Input placeholder="请输入银行流水账号" style={{ width: '100%', }} />
                                                )}
                                            </FormItem>
                                        </Col>

                                        <Col lg={24} md={24} sm={24}>
                                            <div className="button_box">
                                                <Button className="confirm_btn" type="primary" htmlType="submit">保存</Button>
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
})(refund_apply)