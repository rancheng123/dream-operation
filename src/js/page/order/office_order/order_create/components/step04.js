import React, { Component } from 'react';
import { connect } from 'react-redux';
import Bind from 'lodash-decorators/bind';
import {Form, Input, Row, Col, Button, Divider, message} from 'antd'
import SuccessModel from '@/js/components/modules/statusModel/success'
import DetailBox from '@/js/components/modules/detailBox/index'
import './index4.scss'
import {changeNumberPriceDiff} from '@/js/asset/common'
import { backTo, cancelOrder} from '../utils'
import { getOrderOfficeCheckSaleRule, getOrderOfficeCreate, getOrderOfficeRenewal} from '@api/order'
import { getDateText, getLocationNumber, getGoodsNumber, getCitiesNumber} from '../utils'
import CheckSaleRuleView from './checkSaleRuleView'
import utils from '@/js/asset/index'
import Debounce from 'lodash-decorators/debounce';
import {GoodsTablePriceShow} from '../../common/goodsTable'
const { TextArea } = Input;
import {initState} from '../reducers'
import {settingsRedu} from './step01_reducers'
@connect(({ orderCreateState, orderCreateStateFetch }) => ({
    orderCreateState,
    orderCreateStateFetch
}))
@Form.create()
class OrderOfficeStep01 extends Component{
    constructor(props){
        super(props);
        this.state = {
            showSuccess: false
        }
    }
    /**
     * 重置表单
     */
    @Bind()
    resetForm(){
        this.props.form.resetFields()
    }

    /**
     * 关闭成功提示   open
     */
    @Debounce(400)
    @Bind()
    showSuccessView() {
        const {dispatch} = this.props
        this.setState({
            showSuccess: false
        })
        utils.Router.switchRoute(`/order/office/${this.props.params.sourceType}/list`)
        dispatch({
            type: 'modify_office_order_create',
            data: initState
        })
        dispatch({
            type: 'order_create_step_fetch',
            data: settingsRedu
        })


    }
    /**
     * 提交
     */
    @Bind()
    handleSubmit(e) {
        e.preventDefault();
        const that = this
        const {dispatch, orderCreateState, orderCreateStateFetch} = this.props
        const {getFieldValue} = this.props.form
        const memo = getFieldValue('memo')
        dispatch({
            type: 'modify_office_order_create',
            data: {
                loading: true,
                tip: '订单校验中...'
            }
        })
        dispatch({
            type: 'modify_office_order_create',
            data: {
                memo
            }
        })
        //销售规则检测
        const body = {}
        if (that.props.params.type === 'renewal') {
            body.min_valid_rent_amount_raising = orderCreateState.renewal_rent_rate.rate
            body.valid_rent_amount_raising = orderCreateState.renewal_rent_rate.rate
            body.old_effective_rent =orderCreateState.renewal_rent_rate.old_effective_rent || 0
        }
        // 免租天数
        body.free_days = orderCreateState.free_days || 0
        // 免租类型. 1=不免租;2=前置;3=后置
        body.free_type = orderCreateState.free_type
        //服务开始时间
        body.start_date = orderCreateState.start_date.format('YYYY-MM-DD')
        //服务结束时间
        body.end_date = orderCreateState.end_date.format('YYYY-MM-DD')
        // 押金方式是否其他,1=是;0=不是
        body.deposit_is_other = orderCreateState.deposit_is_other
        // 配送积分
        body.present_credits = orderCreateState.present_credits
        // 默认配送积分
        body.default_present_credits = orderCreateState.default_present_credits
        // 配送打印次数
        body.present_prints = orderCreateState.present_prints
        // 默认配送打印次数
        body.default_present_prints = orderCreateState.default_present_prints
        // 最低租金付款折扣，单位
        body.min_rent_discount_rate = orderCreateState.min_discount
        // 实际付款折扣
        body.discount_rate = orderCreateState.discount_rate
        // 租金年涨幅
        body.inc_rate = orderCreateState.inc_rate
        body.actual_quoted_price_raising = Number(orderCreateState.basic_rent_rate.rate)
        // 最低租金年涨幅比率,单位%
        body.min_inc_rate = Number(orderCreateState.year_rent_rate.rate)
        // body.enable_audit = orderCreateStateFetch.orderOfficeSetting.office_order_create.enable_audit
        // body.enable_audit_type = orderCreateStateFetch.orderOfficeSetting.office_order_create.enable_audit_type
        // 有效租金
        body.effective_rent = orderCreateState.orderOfficeCompute.effective_rent

        // 押金支付方式信息. 押几付几提前几日交租.eg:1-3-15 代表押1付3提前15日交租
        if (that.props.params.type === 'create') {
            body.enable_audit =orderCreateStateFetch.orderOfficeSetting.office_order_create.enable_audit
            body.enable_audit_type =orderCreateStateFetch.orderOfficeSetting.office_order_create.enable_audit_type
        }else {
            body.enable_audit =orderCreateStateFetch.orderOfficeSetting.office_order_renewal.enable_audit
            body.enable_audit_type =orderCreateStateFetch.orderOfficeSetting.office_order_renewal.enable_audit_type
        }
        body.deposit_payment = orderCreateState.deposit_payment_all.join('-')
        // utils.Router.switchRoute('/order/office/create/step1')
        if (orderCreateState.is_intermediary === 1 || orderCreateState.galleryful_scale === 2) {
            body.deposit_payment_list = orderCreateStateFetch.orderOfficeSetting.pattern_one
        } else {
            body.deposit_payment_list = orderCreateStateFetch.orderOfficeSetting.pattern_two
        }
        getOrderOfficeCheckSaleRule(body).then(res => {
            if (res.code === 10000) {
                dispatch({
                    type: 'modify_office_order_create',
                    data: {
                        loading: false,
                        tip: ''
                    }
                })
                dispatch({
                    type: 'modify_office_order_create',
                    data: {
                        check_sale_rule: res.data
                    }
                })
                let show_check_view = 0
                for(let i in res.data) {
                    show_check_view++
                }
                if (show_check_view) {
                    // 审核
                    dispatch({
                        type: 'modify_office_order_create',
                        data: {
                            check_sale_rule_model_show: true,
                            audit_pass: 2
                        }
                    })
                } else {
                    // 提交
                    // 审核
                    dispatch({
                        type: 'modify_office_order_create',
                        data: {
                            check_sale_rule_model_show: false,
                            audit_pass: 1
                        }
                    })
                    that.sureFilterOperation()
                }
            }else {
                // message.error(res.message);

            }
        }).catch(e => {

        })
    }

    /**
     * 弹窗确认按钮
     */
    @Debounce(400)
    @Bind()
    sureFilterOperation() {
        const that = this
        const {dispatch, orderCreateState, orderCreateStateFetch} = this.props
        dispatch({
            type: 'modify_office_order_create',
            data: {
                check_sale_rule_model_show: false,
                loading: true,
                tip: '订单保存中...'
            }
        })
        const body = {

            contract_book_code: orderCreateState.contract_book_code,
            tax_rate: orderCreateState.tax_rate,
            free_type: orderCreateState.free_type,
            free_days: orderCreateState.free_days || 0,
            start_date: orderCreateState.start_date.format('YYYY-MM-DD'),
            end_date: orderCreateState.end_date.format('YYYY-MM-DD'),
            deposit_is_other: orderCreateState.deposit_is_other,
            deposit_payment: orderCreateState.deposit_payment_all.join('-'),
            present_credits: orderCreateState.present_credits,
            present_prints: orderCreateState.present_prints,
            default_present_prints: orderCreateState.default_present_prints,
            effective_rent: orderCreateState.orderOfficeCompute.effective_rent,
            min_inc_rate: orderCreateState.orderOfficeCompute.inc_rate,
            actual_quoted_price_raising: Number(orderCreateState.basic_rent_rate.rate),


            discount_rate: orderCreateState.discount_rate,
            min_rent_discount_rate: orderCreateState.min_discount,
            inc_rate: orderCreateState.inc_rate,
            is_intermediary: orderCreateState.is_intermediary,
            galleryful_scale: orderCreateState.galleryful_scale,
            memo: orderCreateState.memo,
            goods: orderCreateState.goods_list_select_data,
            audit_pass: orderCreateState.audit_pass,
            operator_id: 1,
            pay_invoice: {
                notice_type: orderCreateState.notice_type,
                bill_email: orderCreateState.bill_email,
                pay_type: orderCreateState.pay_type,
                invoice_type: orderCreateState.invoice_type,
                invoice_title: orderCreateState.invoice_title,
                taxpayer_number: orderCreateState.taxpayer_number,
                invoice_tel: orderCreateState.invoice_tel,
                invoice_address: orderCreateState.invoice_address,
                invoice_bank: orderCreateState.invoice_bank,
                invoice_account: orderCreateState.invoice_account,

            }
        }
        if (orderCreateState.audit_pass === 2) {
            body.alter_reason = orderCreateState.alter_reason
        }
        if (orderCreateState.is_intermediary === 1 || orderCreateState.galleryful_scale === 2) {
            body.deposit_payment_list = orderCreateStateFetch.orderOfficeSetting.pattern_one
        } else {
            body.deposit_payment_list = orderCreateStateFetch.orderOfficeSetting.pattern_two
        }
        if (that.props.params.type === 'create') {
            body.member_type = orderCreateState.member_type,
            body.member_id =parseInt(orderCreateState.member_id.split(',')[0])
            body.enable_audit =orderCreateStateFetch.orderOfficeSetting.office_order_create.enable_audit
            body.enable_audit_type =orderCreateStateFetch.orderOfficeSetting.office_order_create.enable_audit_type
            getOrderOfficeCreate(body).then(res => {

                if (res.code === 10000) {
                    if (res.data.order_code) {
                        that.setState({
                            showSuccess: true
                        })
                    }
                } else {
                    // message.error(res.message);
                }
                dispatch({
                    type: 'modify_office_order_create',
                    data: {
                        loading: false,
                        tip: ''
                    }
                })
            }).catch(e => {
                dispatch({
                    type: 'modify_office_order_create',
                    data: {
                        loading: false,
                        tip: ''
                    }
                })
            })
        } else if (that.props.params.type === 'renewal') {
            body.source_code = orderCreateState.renewalValue.order_code
            body.min_valid_rent_amount_raising = orderCreateState.renewal_rent_rate.rate
            body.valid_rent_amount_raising = orderCreateState.renewal_rent_rate.rate
            body.enable_audit =orderCreateStateFetch.orderOfficeSetting.office_order_renewal.enable_audit
            body.enable_audit_type =orderCreateStateFetch.orderOfficeSetting.office_order_renewal.enable_audit_type
            getOrderOfficeRenewal(body).then(res => {

                if (res.code === 10000) {
                    if (res.data.order_code) {
                        that.setState({
                            showSuccess: true
                        })
                    }
                } else {
                    // message.error(res.message);
                }
                dispatch({
                    type: 'modify_office_order_create',
                    data: {
                        loading: false,
                        tip: ''
                    }
                })
            }).catch(e => {
                dispatch({
                    type: 'modify_office_order_create',
                    data: {
                        loading: false,
                        tip: ''
                    }
                })
            })
        }

    }
    /**
     * 关闭审核弹窗
     */
    @Bind()
    onclickFilter() {
        const {dispatch} = this.props

        dispatch({
            type: 'modify_office_order_create',
            data: {
                check_sale_rule_model_show: false
            }
        })
    }
    render(){
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { orderCreateState } = this.props;
        // 账单详细内容目录
        const columns = [
            {
                title: '费用类型',
                dataIndex: 'money_type_val',
                key: 'money_type_val',
                width: '20%'
            },
            {
                title: '费用内容',
                dataIndex: 'place_item_type',
                key: 'place_item_type',
                width: '20%',
                render: text => {
                    if (text === 1) {
                        return ('固定工位办公服务费')
                    }else if(text === 2) {
                        return ('房间办公服务费')
                    }
                }
            },
            {
                title: '成交数量',
                dataIndex: 'number',
                width: '20%',
                key: 'number',
            },
            {
                title: '服务期',
                dataIndex: 'diff_service_date',
                width: '20%',
                key: 'diff_service_date',
                render: () => orderCreateState.orderOfficeCompute.diff_service_date
            },
            {
                title: '成交金额',
                dataIndex: 'amount',
                key: 'amount',
                width: '20%',
                render: text => `¥${text}`
            }
        ]
        const columns1 = [
            {
                title: '费用类型',
                dataIndex: 'type',
                width: '20%',
                key: 'type',
                render: text => {
                    if (text === 1) {
                        return ('押金品')
                    }else if(text === 2) {
                        return ('业务押金')
                    }
                }
            },
            {
                title: '费用内容',
                width: '20%',
                dataIndex: 'money_content_val',
                key: 'money_content_val',

            },
            {
                title: '押付数量',
                width: '20%',
                dataIndex: 'number',
                key: 'number',
            },
            {
                title: '押付单价',
                width: '20%',
                dataIndex: 'price',
                key: 'price',
                render: text => `-`
            },
            {
                title: '押付金额',
                width: '20%',
                dataIndex: 'amount',
                key: 'amount',
                render: text => `¥${text}`
            }
        ]
        const columns2 = [
            {
                title: '费用类型',
                dataIndex: 'type',
                key: 'type',
                width: '20%',
                render: text => {
                    return '其他'
                }
            },
            {
                title: '费用内容',
                width: '20%',
                dataIndex: 'content',
                key: 'content',

            },
            {
                title: '',
                dataIndex: 'number1',
                width: '20%',
                key: 'number1',
                render: text => ``
            },
            {
                title: '',
                dataIndex: 'price1',
                width: '20%',
                key: 'price1',
                render: text => ``
            },
            {
                title: '押付金额',
                width: '20%',
                dataIndex: 'price',
                key: 'price',
                render: text => `¥${text}`
            }
        ]
        let goods = [], deposit = [], other = []
        if (orderCreateState.orderOfficeCompute) {
            goods = orderCreateState.orderOfficeCompute.goods || []
            deposit = orderCreateState.orderOfficeCompute.deposit || []
            other = orderCreateState.orderOfficeCompute.other || []
        }
        const formItemLayout = {
            wrapperCol: {
                md: 24,
                lg: 24
            },
        };
        return (
            <div className='step04'>
                <DetailBox title='确认订单内容' dividerType={2} mainStyle={{marginBottom: 32}}>
                    <Form className="" layout='inline' onSubmit={this.handleSubmit}>
                        {/*计价服务期*/}
                        <Row>
                            <Col span={24}>
                                <Form.Item label="计价服务期" required>
                                    {getDateText(orderCreateState.start_date, orderCreateState.end_date)} <span className='mxj-error-color'>(共计：{orderCreateState.orderOfficeCompute && orderCreateState.orderOfficeCompute.diff_service_date})</span>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                {/*涉及场地数量*/}
                                <Form.Item label="涉及城市数量" required>
                                    {getCitiesNumber(orderCreateState.goods_list_select_data)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                {/*涉及场地数量*/}
                                <Form.Item label="涉及场地数量" required>
                                    {getLocationNumber(orderCreateState.goods_list_select_data)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                {/*涉及商品数量*/}
                                <Form.Item label="涉及商品数量" required>
                                    {getGoodsNumber(orderCreateState.goods_list_select_data)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{marginTop: 30}}>
                            {/*<Table columns={columns} dataSource={goods} pagination={false}/>*/}
                            {/*<Table columns={columns1} dataSource={deposit} pagination={false}/>*/}
                            {/*<Table columns={columns2} dataSource={other} pagination={false}/>*/}
                            <GoodsTablePriceShow tableValue={goods} type={'goods'} time={orderCreateState.orderOfficeCompute && orderCreateState.orderOfficeCompute.diff_service_date}></GoodsTablePriceShow>
                            <GoodsTablePriceShow tableValue={deposit} type={'deposit'}></GoodsTablePriceShow>
                            <GoodsTablePriceShow tableValue={other} type={'other'}></GoodsTablePriceShow>
                            <div className='mxj-float-right mxj-error-color' style={{paddingRight: 76, height: 50, lineHeight: '50px'}}>
                                <span>订单共计：
                                    <span className=''>¥{
                                        orderCreateState.orderOfficeCompute && changeNumberPriceDiff(orderCreateState.orderOfficeCompute.charge_all_price)
                                    }</span>
                                </span>
                            </div>
                        </Row>
                        <Divider style={{margin: '0px 0 45px'}}/>
                        <Row>
                            <Col span={14} offset={5}>
                                <Form.Item className='mxj-margin-bottom-24 mxj-remarks-item' style={{width: '100%'}}>
                                    {getFieldDecorator('memo', {
                                        rules: [
                                            {
                                                validator: (rule, value, callback) => {
                                                    if (value.length>=300){
                                                        callback('请输入小于300个字符')
                                                        return
                                                    }
                                                    callback();
                                                },
                                            },
                                        ],
                                        initialValue: orderCreateState.memo,
                                    })(
                                        <TextArea rows={8}/>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <Form layout="horizontal" {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item>
                            <Row>
                                <Col>
                                    <div className='mxj-flex-center mxj-margin-top-40'>
                                        <Button className='mxj-margin-right-16' onClick={cancelOrder}>取消</Button>
                                        <Button className='mxj-f7f7f7-bg mxj-margin-right-16' onClick={this.resetForm.bind(this)}>重置</Button>
                                        <Button className='mxj-margin-right-16' type="primary" onClick={backTo}>上一步</Button>
                                        <Button className='mxj-margin-right-16' type="primary" htmlType="submit">提交</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </DetailBox>
                {
                    orderCreateState.check_sale_rule && (
                        <CheckSaleRuleView {...this.props} onclickFilter={this.onclickFilter} sureFilterOperation={this.sureFilterOperation} filter_visible={orderCreateState.check_sale_rule_model_show} check_sale_rule={orderCreateState.check_sale_rule}></CheckSaleRuleView>
                    )
                }
                <SuccessModel onclickFilter={this.showSuccessView} filter_visible={this.state.showSuccess} title={'订单提交成功'}></SuccessModel>
            </div>
        )
    }

}
export default OrderOfficeStep01

