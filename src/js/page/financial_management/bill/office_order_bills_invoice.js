import React, { PureComponent, Component } from 'react'
import { connect } from 'react-redux'
import utils from '../../../asset'
// 引入 金币 单位转换 组件
import {intToFloat} from '../../../asset/intToFloat'

// api接口
import { 
    getInvoiceInfo,
    setInvoiceInfo
} from '../../../api/financial/invoice'
// 获取搜索种类api接口
import {
    getTypeList
} from '../../../api/financial/main'

import {
    Card,
    Button,
    Form,
    Row,
    Modal,
    Skeleton
} from 'antd'

// 引入header title组件
import Title from '@/js/components/modules/title/title'
// 引入CarBox组件
import CardBox from '@/js/components/modules/cardBox/cardBox'
// 引入descriptionList组件
import DescriptionList from '@/js/components/modules/descriptionList'
const { Description } = DescriptionList
// 引入属性组件
import Attribute from '@/js/components/modules/attribute'
// 引入 select 组件 数据从后端读取的
import SelectBox from '@/js/components/modules/selectBox'

const FormItem = Form.Item
// const Option = Select.Option

// 引入style样式
import './office_order_bills_invoice.scss'

@Form.create()

class office_order_bill_invoice extends Component {
    constructor (props) {
        super(props)
        
        this.state = {
            data: {},
            formValues: {
                invoice_content: '1',
                invoice_mode: '1'
            },
            loadingStatus: false,
            typeList: {},
        }
    }

    updateState = (stateName, stateData) => {
        this.setState({
            [stateName]: stateData
        })
    }

    /**
     * 组件渲染完成 调用接口加载数据
     */
    componentDidMount () {
        // 页面渲染完成，调用接口获取数据
        const { params } = this.props
        
        if (params.code) {
            this.updateState('loadingStatus', true)
            // 入参为账单编号
            let data = params.code.toString()
    
            getInvoiceInfo(data).then((res) => {
                if (res != undefined && res.code == 10000) {
                    // TODO: 接口返回成功处理
                } else {
                    // mock数据
                }

                // 将数据保存到 state 中
                this.updateState('data', res.data)
                this.updateState('loadingStatus', false)
            })
        }

        const typeData = {
            types: [ 'invoice_content_type', 'invoice_mode_type' ]
        }
        this.requestTypeList(typeData)
    }
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }

    requestTypeList (data) {
        getTypeList(data).then((res) => {
            this.updateState('typeList', res.data)
        })
    }

    /**
     * 用户点击提交按钮事件
     */
    onSubmitEvent = (e) => {
        // e.preventDefault()
        const { form, params } = this.props

        // 表单数据校验
        form.validateFields((err, fieldsValue) => {
            if (err) return

            const values = {
                ...fieldsValue
            }

            this.setState({
                formValues: values
            })
        })

        // 请求参数
        let data = this.state.formValues
        let params1 = params.code.toString()

        if (data) {
            setInvoiceInfo(params1, data).then((res) => {
                Modal.info({
                    title: '提示',
                    content: (
                        <div>
                            <p>成功</p>
                        </div>
                    ),
                    onOk() {
                        utils.Router.switchRoute('/financial/bill/order')
                    },
                })
            })
        }
    }

    /**
     * 用户点击取消按钮事件
     */
    onCancelEvent = () => {
        // utils.Router.switchRoute('/financial/bill/order')
        utils.Router.backRoute()
    }

    renderSelectForm (data, typeList) {
        const {
            form: {getFieldDecorator}
        } = this.props

        return (
            <div style={{ marginTop: '10px' }}>
                <Form onSubmit={this.onSubmitEvent} layout="inline">
                    <Row gutter={ 32 }>
                        <Attribute title="组织名称" md={24} ls={12} xl={8}>{data.member_id_name}</Attribute>
                        <Attribute title="组织类型" md={24} ls={12} xl={8}>{data.member_type_name}</Attribute>
                        <Attribute title="开票主体" md={24} ls={12} xl={8}>{data.invoice_body}</Attribute>
                        <Attribute md={24} ls={12} xl={8}>
                            <FormItem label="开票内容:">
                                {getFieldDecorator('invoice_content', {
                                    rules: [{ required: true }],
                                    initialValue: 1
                                })(
                                    <SelectBox 
                                        selectTitle='开票内容'
                                        data={{types: [ 'invoice_content_type' ]}}
                                        dataList={typeList.invoice_content_type}
                                    />
                                )}
                            </FormItem>
                        </Attribute>
                        <Attribute title="账单金额" md={24} ls={12} xl={8}>￥{ intToFloat(data.amount) }</Attribute>
                        {/* <Attribute title="可开票金额" md={24} ls={12} xl={8}>￥{data.limit_amount}</Attribute> */}
                        <Attribute title="申请开票金额" md={24} ls={12} xl={8}>￥{ intToFloat(data.limit_amount) }</Attribute>
                        <Attribute title="发票类型" md={24} ls={12} xl={8}>{data.invoice_type_name}</Attribute>
                        <Attribute md={24} ls={12} xl={8}>
                            <FormItem label="发票开票类型:">
                                {getFieldDecorator('invoice_mode', {
                                    rules: [{ required: true }],
                                    initialValue: 1
                                })(
                                    <SelectBox 
                                        selectTitle='发票开票类型'
                                        data={{types: [ 'invoice_mode_type' ]}}
                                        dataList={typeList.invoice_mode_type}
                                    />
                                )}
                            </FormItem>
                        </Attribute>
                    </Row>
                </Form>
            </div>
        )
    }

    render () {
        const { params = {} } = this.props
        const code = params.code

        let { data = {}, loadingStatus, typeList } = this.state

        return (
            <div className="bill_invoice_box">
                <Title title="申请开票"></Title>

                <div className="bill_invoice_content">
                    <CardBox title="选择开票信息">
                        <Skeleton loading={loadingStatus} active paragraph={{ rows: 5 }}>
                            { data != undefined && JSON.stringify(data) != '{}' && JSON.stringify(typeList) != '{}' ? this.renderSelectForm(data, typeList) : null}

                            <DescriptionList size="small" title="" style={{ marginTop: 30 }}>
                                <Description term="发票抬头">{data.invoice_title}</Description>
                                <Description term="纳税人识别号">{data.taxpayer_number}</Description>
                                <Description term="银行账号">{data.invoice_account}</Description>
                                <Description term="发票地址">{data.invoice_address}</Description>
                                <Description term="发票开户行">{data.invoice_bank}</Description>
                                <Description term="联系电话">{data.invoice_tel}</Description>
                            </DescriptionList>

                            <Card className="invoice_button_box" bordered={false} style={{ paddingBottom: '32px' }}>
                                <Button type="primary" className="button_1" onClick={() => this.onSubmitEvent()}>提交</Button>
                                <Button onClick={() => this.onCancelEvent()}>取消</Button>
                            </Card>
                        </Skeleton>
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
})(office_order_bill_invoice)