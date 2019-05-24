import React, { Component, Fragment } from 'react';
import MainRight2 from "../../../../components/layout/main_right2";
import { connect } from 'react-redux';
import { Steps, Icon, Form, Spin, Modal} from 'antd'
import Title from '../../../../components/modules/title/title'
const Step = Steps.Step;
import ShadowBox from '@/js/components/modules/shadowBox/shadowBox'
import DetailBox from '@/js/components/modules/detailBox'
import './index.scss'
import {getOrderOfficeSetting, getOrderOfficeContract, getOrderOfficeDetailForReview} from '@api/order'
import moment from 'moment'
import utils from '@/js/asset/index'
import {setDefaultGoods} from './utils'
import {check_operation} from "../common/operation";
import StepOne from '@svg/step_one.svg'
import StepTwo from '@svg/step_two.svg'
import StepThree from '@svg/step_three.svg'
import StepFour from '@svg/step_four.svg'
@connect(({ orderCreateState, orderCreateStateFetch }) => ({
    orderCreateState: orderCreateState,
    orderCreateStateFetch
}))
@Form.create()
class OrderCreate extends Component{
    constructor(){
        super();
        this.state = {
            title: '',
            stepTiele: ''
        }
    }
    componentWillUnmount(){
        const {dispatch} = this.props
        dispatch({
            type: 'clear_order_office_create',
        })
        dispatch({
            type: 'clear_order_office_fetch',
        })
        dispatch({
            type: 'clear_order_office_close',
        })
    }
    async componentDidMount() {
        const that = this
        const {orderCreateState, location, params} = that.props
        if (orderCreateState.current <= 0) {
            if (location.pathname.indexOf('step1') === -1) {
                utils.Router.switchRoute(`/order/office/info/${params.sourceType}/${params.type}/${params.code}/step1${this.props.location.search}`)
            }
        }
        await this.getOfficeContractSettings()
        if (this.props.params.type === 'renewal') {
            const can_operation = await check_operation(this.props.params.code, 'renewal')
            if (!can_operation) {
                Modal.error({
                    title: '提示',
                    content: '当前订单不能进行续租操作',
                    onOk: () => {
                        utils.Router.switchRoute(
                            '/order/office/pre/list'
                        )
                    }
                });
                return
            }
        }
        await this.getOfficeSetting(function () {
            if (that.props.params.type === 'create') {
                that.setState({
                    title: '新建办公服务订单',
                    stepTiele: '新建办公服务订单步骤'
                })
                if (that.props.params.code !== 'normal') {
                    // 404
                }
            } else if (that.props.params.type === 'renewal') {

                that.setState({
                    title: '创建续租',
                    stepTiele: '创建续租订单步骤'
                })

                if (that.props.params.code) {
                    // 获取订单详情
                    const {dispatch, orderCreateStateFetch} = that.props
                    getOrderOfficeDetailForReview(that.props.params.code).then(res => {
                        if (res.code === 10000) {
                            const resultValue = res.data
                            const addGoodsItemSelectRowKeys = []
                            const goods = setDefaultGoods(resultValue.goods, (value) => {
                                addGoodsItemSelectRowKeys.push(value.code)
                            })
                            const renewalValue = {
                                member_type: resultValue.member_type,
                                member_id: resultValue.member_id,
                                start_date: moment(resultValue.end_date).add(1, 'd'),
                                // end_date: moment(resultValue.end_date).add(30, 'day'),
                                goods_list_select_data: goods,
                                goods_list_select: goods,
                                is_intermediary: resultValue.is_intermediary,
                                present_credits: resultValue.present_credits,
                                galleryful_scale: resultValue.galleryful_scale,
                                min_discount: resultValue.rent_discount_rate,
                                discount_rate: resultValue.discount_rate,
                                present_prints: resultValue.present_prints,
                                deposit_is_other: resultValue.deposit_is_other,
                                tax_rate: resultValue.tax_rate,
                                contract_book_code: resultValue.contract_book_code,
                                notice_type: resultValue.pay_invoice.notice_type,
                                pay_type: resultValue.pay_invoice.pay_type,
                                bill_email: resultValue.pay_invoice.bill_email,
                                invoice_type: resultValue.pay_invoice.invoice_type,
                                invoice_title: resultValue.pay_invoice.invoice_title,
                                taxpayer_number: resultValue.pay_invoice.taxpayer_number,
                                invoice_address: resultValue.pay_invoice.invoice_address,
                                invoice_tel: resultValue.pay_invoice.invoice_tel,
                                invoice_bank: resultValue.pay_invoice.invoice_bank,
                                invoice_account: resultValue.pay_invoice.invoice_account,
                                renewalValue: {
                                    start_date: moment(resultValue.start_date),
                                    end_date: moment(resultValue.end_date),
                                    member_name: resultValue.member_name,
                                    order_code: resultValue.order_code,
                                    effective_rent: resultValue.effective_rent,
                                    //包含免租期的时间差
                                    diff_service_date: resultValue.diff_service_date,
                                    // 扣除免租期的时间差
                                    diff_inner_date: resultValue.diff_inner_date,
                                    // 成交总价
                                    charge_all_price: resultValue.charge_all_price,
                                    // 原始商品总价,单位分
                                    origin_all_price: resultValue.origin_all_price,
                                    // 修改后的总价
                                    changed_all_price: resultValue.changed_all_price,
                                    start_at: moment(resultValue.start_at).format('YYYY年MM月DD日'),
                                    end_at: moment(resultValue.end_at).format('YYYY年MM月DD日'),
                                    goods: resultValue.goods
                                }
                            }
                            const deposit_payment_arr = resultValue.deposit_payment.split('-')
                            if (resultValue.deposit_is_other) {
                                // 其他押付方式
                                renewalValue.deposit_payment = 0
                                renewalValue.deposit_payment_ya = Number(deposit_payment_arr[0])
                                renewalValue.deposit_payment_fu = Number(deposit_payment_arr[1])
                                renewalValue.deposit_payment_ri = Number(deposit_payment_arr[2])
                            } else {
                                let paySettingsArr
                                const {orderOfficeSetting} = orderCreateStateFetch
                                // 非其他押付方式
                                if (resultValue.is_intermediary === 1 || resultValue.galleryful_scale === 2) {
                                    paySettingsArr = orderOfficeSetting.pattern_one
                                } else {
                                    paySettingsArr = orderOfficeSetting.pattern_two
                                }

                                renewalValue.deposit_payment_all = deposit_payment_arr
                                paySettingsArr.map(value => {
                                    if (value.deposit_month === Number(deposit_payment_arr[0]) && value.pay_month === Number(deposit_payment_arr[1]) && value.pre_pay_day === Number(deposit_payment_arr[2])){
                                        renewalValue.deposit_payment = value.id
                                    }
                                })
                            }
                            dispatch({
                                type: 'order_create_step_fetch',
                                data: {
                                    addGoodsItemSelectRowKeys
                                },
                            })
                            setTimeout(() => {
                                dispatch({
                                    type: 'modify_office_order_create',
                                    data: renewalValue
                                })
                            }, 50)

                        }
                    })
                }
            }
        })


    }

    /**
     * 获取办公服务订单合同列表
     */
    getOfficeContractSettings() {
        const {dispatch} = this.props
        getOrderOfficeContract().then(res => {
            if (res.code === 10000) {
                dispatch({
                    type: 'modify_office_order_create',
                    data: {
                        contract_order: res.data,
                        contract_book_code: res.data[0].code,
                        tax_rate: res.data[0].tax_rate
                    }
                })
            }
        })
    }
    /**
     * 获取办公服务订单配置信息
     */
    getOfficeSetting(callback) {
        const that = this
        const {dispatch} = this.props
        getOrderOfficeSetting().then(res => {
            if (res.code === 10000) {
                dispatch({
                    type: 'order_create_step_fetch',
                    data: {
                        orderOfficeSetting: res.data
                    }
                })
                callback()
            }
        })
    }
    stepsList() {
        const {current} = this.props.orderCreateState
        const stepArr = [{
            title: '选择下单用户及商品信息',
            icon: <Icon component={StepOne} width={24} height={24} className={'mxj-order-office-step-icon'} fill={current>= 0? '#fff': '#bfbfbf'}/>
        },{
            title: '设置免租及押付方式&折扣',
            icon: <Icon component={StepTwo} width={24} height={24} className={'mxj-order-office-step-icon'} fill={current>= 1? '#fff': '#bfbfbf'}/>

        },{
            title: '选择其他内容',
            icon: <Icon component={StepThree} width={24} height={24} className={'mxj-order-office-step-icon'} fill={current>= 2? '#fff': '#bfbfbf'}/>
        },{
            title: '确认订单内容',
            icon: <Icon component={StepFour} width={24} height={24} className={'mxj-order-office-step-icon'} fill={current>= 3? '#fff': '#bfbfbf'}/>
        }]
        return (
            stepArr.map( item => <Step key={item.title} icon={item.icon} title={item.title} description={item.description}/>)
        )
    }
    render(){
        const {orderCreateState, location} = this.props
        const topMenu = [
            {
                text: '订单管理'
            },
            {
                text: '办公服务订单管理'
            },
            {
                text: this.state.title
            }
        ]
        console.log(location)
        return (
            <Fragment>
                <Spin tip={orderCreateState.tip} spinning={orderCreateState.loading}>
                    <div className='order-office-create'>
                        <Title title={this.state.title }></Title>
                        <ShadowBox style={{padding: '32px 45px 41px 32px'}}>
                            <DetailBox title={this.state.stepTiele} dividerStyle={{margin: '12px 0 32px'}}>
                                <Steps size="small" current={orderCreateState.current} className={'mxj-order-office-step'}>
                                    {this.stepsList()}
                                </Steps>
                            </DetailBox>
                        </ShadowBox>
                        <ShadowBox style={{padding: '32px 45px 41px 32px', marginTop: 31}}>
                            {this.props.children}
                        </ShadowBox>
                    </div>
                </Spin>
            </Fragment>

        )
    }

}
export default OrderCreate

