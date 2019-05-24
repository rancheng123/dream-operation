import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {Form, Input, Select, Checkbox, Button, Row, Col} from 'antd'
import Bind from 'lodash-decorators/bind';
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
import { backTo, cancelOrder, setStepsCurrent} from '../utils'
import DetailBox from '@/js/components/modules/detailBox/index'
import utils from '@/js/asset/index'

@connect(({ orderCreateState, orderCreateStateFetch }) => ({
    orderCreateState,
    orderCreateStateFetch
}))
@Form.create()
class OrderOfficeStep01 extends Component{
    constructor(){
        super();
        this.state = {
            dataSource: []
        }
    }
    componentDidMount() {
        // To disabled submit button at the beginning.
        // this.props.form.validateFields();
    }
    @Bind()
    handleChange(value) {
        this.setState({
            dataSource: !value || value.indexOf('@') >= 0 ? [] : [
                `${value}@gmail.com`,
                `${value}@163.com`,
                `${value}@qq.com`,
            ],
        });
    }
    /**
     * 发票类型改变
     * */
    @Bind()
    invoiceTypeChange(e) {
        this.getInvoiceFragment()
    }
    /**
     * 重置表单
     */
    @Bind()
    resetForm(){
        this.props.form.resetFields()
    }
    /**
     * 下一步
     */
    @Bind()
    nextStep() {
        utils.Router.switchRoute(`/order/office/${this.props.params.sourceType}/info/create/step4${this.props.location.search}`)
    }
    getInvoiceFragment() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { orderCreateState } = this.props;
        let invoice_type = getFieldValue('invoice_type')
        if (invoice_type !== 0) {
            if (invoice_type === 1) {
                return (
                    <Fragment>
                        {/* 发票抬头*/}
                        <Form.Item label="发票抬头" required={true}>
                            <span>{orderCreateState.invoice_title}</span>
                        </Form.Item>
                        {/* 纳税人识别号*/}
                        <Form.Item label="纳税人识别号" required={true}>
                            <span>{orderCreateState.taxpayer_number}</span>
                        </Form.Item>
                    </Fragment>
                )
            } else {
                return (
                    <Fragment>
                        {/* 发票抬头*/}
                        <Form.Item label="发票抬头" required={true}>
                            <span>{orderCreateState.invoice_title}</span>
                        </Form.Item>
                        {/* 纳税人识别号*/}
                        <Form.Item label="纳税人识别号" required={true}>
                            <span>{orderCreateState.taxpayer_number}</span>
                        </Form.Item>
                        <Row gutter={48}>
                            <Col xs={24} sm={24} md={12} lg={12}>
                                {/* 发票地址*/}
                                <Form.Item label="发票地址">
                                    {getFieldDecorator('invoice_address', {
                                        rules: [
                                            { required: true, message: '请输入发票地址!' },
                                        ],
                                        initialValue: orderCreateState.invoice_address,
                                    })(
                                        <Input id='invoice_address'/>
                                    )}

                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12}>
                                {/* 发票电话*/}
                                <Form.Item label="发票电话">
                                    {getFieldDecorator('invoice_tel', {
                                        rules: [
                                            { required: true, message: '请输入发票电话!',
                                            },
                                        ],
                                        initialValue: orderCreateState.invoice_tel,
                                    })(
                                        <Input id='invoice_tel'/>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12}>
                                {/* 发票开户行*/}
                                <Form.Item label="发票开户行">
                                    {getFieldDecorator('invoice_bank', {
                                        rules: [
                                            { required: true, message: '请输入发票开户行!' },
                                        ],
                                        initialValue: orderCreateState.invoice_bank,
                                    })(
                                        <Input id='invoice_bank'/>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12}>
                                {/* 发票账号*/}
                                <Form.Item label="发票账号">
                                    {getFieldDecorator('invoice_account', {
                                        rules: [
                                            { required: true, message: '请输入发票账号!' },
                                        ],
                                        initialValue: orderCreateState.invoice_account,
                                    })(
                                        <Input id='invoice_account'/>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Fragment>
                )
            }
        }
    }
    @Bind()
    handleSubmit(e){
        e.preventDefault();
        const {dispatch, orderCreateState} = this.props
        const that = this
        this.props.form.validateFieldsAndScroll((err, values) => {
            e.preventDefault();
            if (!err) {
                dispatch({
                    type: 'modify_office_order_create',
                    data: values
                })
                dispatch({
                    type: 'modify_office_order_create',
                    data: {
                        current: setStepsCurrent(3, orderCreateState.current)
                    }
                })
                utils.Router.switchRoute(`/order/office/${this.props.params.sourceType}/info/${that.props.params.type}/${that.props.params.code}/step4${this.props.location.search}`)
            }
        });
    }
    renderEmail(orderCreateState) {
        const { getFieldValue, getFieldDecorator } = this.props.form;
        const type = getFieldValue('notice_type')
        if (type.includes(2)) {
            return (
                <Form.Item label="账单接收邮箱">
                    <span>{orderCreateState.bill_email}</span>
                </Form.Item>
            )
        } else {
            return null
        }
    }
    render(){
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { orderCreateState, orderCreateStateFetch } = this.props;
        const {orderOfficeSetting} = orderCreateStateFetch
        const payment_options = [
            { label: '微信', value: 1 },
            { label: '支付宝', value: 2 },
            { label: '线下汇款', value: 3 },
        ];
        const noticeOption = [
            {label: '微信推送', value:1, disabled: true},
            {label: '电子邮件', value:2},
        ]
        return (
            <Fragment>
                {orderOfficeSetting && (
                    <DetailBox title='选择其他配置内容' dividerType={2} mainStyle={{marginBottom: 32}}>
                        <Form className="mxj-order-common-form" onSubmit={this.handleSubmit}>
                            {/*账单通知方式*/}
                            <Form.Item label="账单通知方式">
                                {getFieldDecorator('notice_type', {
                                    initialValue: orderCreateState.notice_type,
                                })(
                                    <CheckboxGroup options={noticeOption}></CheckboxGroup>
                                )}
                            </Form.Item>
                            {
                                this.renderEmail(orderCreateState)
                            }

                            {/* 支持支付方式*/}
                            <Form.Item label="支持支付方式">
                                {getFieldDecorator('pay_type', {
                                    rules: [
                                        { required: true, message: '请选择组织!',
                                        },
                                    ],
                                    initialValue: orderCreateState.pay_type,
                                })(
                                    <CheckboxGroup disabled options={payment_options}/>
                                )}
                            </Form.Item>
                            {/* 发票类型*/}
                            <Form.Item label="发票类型">
                                {getFieldDecorator('invoice_type', {
                                    rules: [
                                        { required: true, message: '请选择组织!' },
                                    ],
                                    initialValue: orderCreateState.invoice_type,
                                })(
                                    <Select placeholder="Please select a country" style={{width: '200px'}} onChange={this.invoiceTypeChange}>
                                        <Option value={1}>普通发票</Option>
                                        {
                                            orderOfficeSetting.office_order_create.receipt_type_special && (<Option value={2}>专用发票</Option>)
                                        }
                                        {
                                            orderOfficeSetting.office_order_create.receipt_type_common&& (<Option value={0}>不需要发票</Option>)
                                        }


                                    </Select>
                                )}
                            </Form.Item>
                            {this.getInvoiceFragment()}
                            <Form.Item>
                                <div className='mxj-flex-center mxj-margin-top-40'>
                                    <Button className='mxj-margin-right-16' onClick={cancelOrder}>取消</Button>
                                    <Button className='mxj-f7f7f7-bg mxj-margin-right-16' onClick={this.resetForm}>重置</Button>
                                    <Button className='mxj-margin-right-16' type="primary" onClick={backTo}>上一步</Button>
                                    <Button className='mxj-margin-right-16' type="primary" htmlType="submit">下一步</Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </DetailBox>
                )}
            </Fragment>

        )
    }

}
export default OrderOfficeStep01

