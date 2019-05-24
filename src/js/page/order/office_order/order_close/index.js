import React, { Component, PropTypes, Fragment } from 'react';
import { connect } from 'react-redux';
import {Card, Steps, Icon, Form, Spin, Modal} from 'antd'
import Title from '../../../../components/modules/title/title'
const Step = Steps.Step;
import ShadowBox from '@/js/components/modules/shadowBox/shadowBox'
import DetailBox from '@/js/components/modules/detailBox'
import { getOrderOfficeDetail, getDeductRefundOption, getOrderOfficeStartAt} from '@api/order'
import './index.scss'
import {setDefaultGoods} from '../order_create/utils'
import {check_operation} from '../common/operation'
import {getPageTypeChange} from '@/js/asset/common'
import utils from "../../../../asset";
import StepOne from '@svg/step_one.svg'
import StepTwo from '@svg/step_two.svg'
import StepThree from '@svg/step_three.svg'
@connect(({ orderDetailCloseState, orderCommonState }) => ({
    orderDetailCloseState,
    orderCommonState
}))
@Form.create()
class OrderCreate extends Component{
    constructor(){
        super();
        this.state = {
            steps: [{
                title: '核对回收押金单'
            },{
                title: '确认退款扣款相应财务信息'
            },{
                title: '确认终止信息'
            }],
            title: '',
            stepTiele: '',
            logoTile: ''
        }
    }
    componentWillUnmount(){
        const {dispatch} = this.props
        dispatch({
            type: 'clear_order_office_close',
        })
        dispatch({
            type: 'clear_order_office_create',
        })
        dispatch({
            type: 'clear_order_office_fetch',
        })
    }
    async componentDidMount() {
        const that = this
        let allValue = {}
        const {dispatch} = this.props
        const can_operation = await check_operation(that.props.params.id, getPageTypeChange(that.props.params.type))
        if (!can_operation) {
            Modal.error({
                title: '提示',
                content: '当前订单不能进行此项操作',
                onOk: () => {
                    utils.Router.switchRoute(
                        '/order/office/list/pre'
                    )
                }
            });
            return
        }
        // 提前终止
        if (that.props.params.type === 'terminate-auditing') {
            that.setState({
                title: '提前终止申请',
                stepTiele: '提前终止办公服务订单步骤',
                logoTile: '终止'
            })
            allValue = {
                step1_user_title: '确认提前终止用户',
                reason_title: '终止原因',
                change_user: {
                    type: 1,
                    title: '用户方'
                },
                sucess_content: '变更成功'
            }
        } else if (that.props.params.type === 'cleared') { // 我方清租
            that.setState({
                title: '我方清租申请',
                stepTiele: '我方清租办公服务订单步骤',
                logoTile: '清算'
            })
            allValue = {
                step1_user_title: '确认清租用户',
                reason_title: '清租原因',
                change_user: {
                    type: 1,
                    title: '我方'
                },
                sucess_content: '变更成功'
            }
        } else if (that.props.params.type === 'account-auditing') { //到期结算
            that.setState({
                title: '到期结算申请',
                stepTiele: '到期结算办公服务订单步骤',
                logoTile: '结算'
            })
            allValue = {
                step1_user_title: '确认到期结算用户',
                reason_title: '结算原因',
                sucess_content: '变更成功'
            }
        } else if (that.props.params.type === 'add') { // 增加订单
            that.setState({
                title: '增加办公服务内容申请',
                stepTiele: '增加办公服务内容申请',
                logoTile: '变更'
            })
            allValue = {
                step1_user_title: '确认下单用户',
                reason_title: '变更原因',
                change_user: {
                    type: 1,
                    title: '用户方'
                },
                sucess_content: '变更成功'
            }
            that.getOrderStartAt()
        } else if (that.props.params.type === 'minus') { //减少订单
            that.setState({
                title: '减少办公服务内容申请',
                stepTiele: '减少办公服务订单步骤',
                logoTile: '变更'
            })
            allValue = {
                step1_user_title: '确认下单用户',
                reason_title: '变更原因',
                change_user: {
                    type: 1,
                    title: '用户方'
                },
                sucess_content: '变更成功'
            }
            that.getOrderStartAt()
        }
        dispatch({
            type: 'order_office_close',
            data: allValue
        })
        // detail
        this.getOrderOfficeDetailFetch()
        // 获取退款和扣款的下拉选项
        this.getDeductOption()
    }
    getOrderStartAt(){
        const {dispatch, params} = this.props
        if (params.type === 'minus' || params.type === 'add'){
            getOrderOfficeStartAt({
                order_code: this.props.params.id,
                type: params.type
            }).then(res => {
                if (res.code = 10000) {
                    dispatch({
                        type: 'order_office_close',
                        data: {
                            time_change: res.data,
                        }
                    })
                }
            }).catch((e) => {
            })
        } else {
            // dispatch({
            //     type: 'order_office_close',
            //     data: {
            //         start_at: moment().add(1, 'days').format('YYYY-MM-DD'),
            //     }
            // })
        }
    }
    /**
     * getDeductRefundOption 获取退款和扣款的下拉选项
     */
    getDeductOption() {
        const {dispatch, params} = this.props
        const {type} = params

        getDeductRefundOption(type).then(res => {
            if (res.code = 10000) {
                dispatch({
                    type: 'order_office_close',
                    data: {
                        deduct_list: res.data,
                    }
                })
            }
        })
    }
    /**
     * 获取订单详情
     */
    getOrderOfficeDetailFetch() {
        const {dispatch, params} = this.props
        getOrderOfficeDetail(this.props.params.id).then(res => {
            if (res.code === 10000) {

                const addGoodsItemSelectRowKeys = []
                const disableSelectRow = []
                const goods = setDefaultGoods(res.data.goods, (value) => {
                    value.noDelete = 1
                    disableSelectRow.push(value.code)
                    addGoodsItemSelectRowKeys.push(value.code)
                })
                dispatch({
                    type: 'modify_office_order_create',
                    data: {
                        goods_list_select_data: goods,
                        goods_list_select: goods,
                        disableSelectRow
                    }
                })
                dispatch({
                    type: 'order_create_step_fetch',
                    data: {
                        addGoodsItemSelectRowKeys
                    }
                })
                dispatch({
                    type: 'order_office_close',
                    data: {
                        detail: res.data
                    }
                })
            }
        })
    }

    stepsList() {
        const {current} = this.props.orderDetailCloseState
        const stepArr = [{
            title: '核对回收押金单',
            icon: <Icon component={StepOne} width={24} height={24} className={'mxj-order-office-step-icon'} fill={current>= 0? '#fff': '#bfbfbf'}/>
        },{
            title: '确认退款扣款相应财务信息',
            icon: <Icon component={StepTwo} width={24} height={24} className={'mxj-order-office-step-icon'} fill={current>= 1? '#fff': '#bfbfbf'}/>

        },{
            title: `确认${this.state.logoTile}信息`,
            icon: <Icon component={StepThree} width={24} height={24} className={'mxj-order-office-step-icon'} fill={current>= 2? '#fff': '#bfbfbf'}/>
        }]
        return (
            stepArr.map( item => <Step key={item.title} icon={item.icon} title={item.title} description={item.description}/>)
        )
    }
    render(){
        const {orderDetailCloseState, orderCommonState} = this.props
        return (
            <Spin tip={orderCommonState.spinTip} spinning={orderCommonState.spinLoading} style={{width: '100%'}}>
                <div className='order-office-create'>
                    <Title title={this.state.title }></Title>
                    <ShadowBox style={{padding: '32px 45px 41px 32px'}}>
                        <DetailBox title={this.state.stepTiele} dividerStyle={{margin: '12px 0 32px'}}>
                            <Steps size="small" current={orderDetailCloseState.current} className={'mxj-order-office-step'}>
                                {this.stepsList()}
                            </Steps>
                        </DetailBox>
                    </ShadowBox>
                    <ShadowBox style={{padding: '32px 45px 41px 32px', marginTop: 31}}>
                        {this.props.children}
                    </ShadowBox>
                </div>
            </Spin>
        )
    }

}
export default OrderCreate

