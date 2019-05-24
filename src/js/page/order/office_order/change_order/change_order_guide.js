import {Component, Fragment} from "react";
import React from "react";
import CommonCard from '@/js/components/modules/commonCard/index'
import './index.scss'
import Bind from 'lodash-decorators/bind';
import utils from '@/js/asset/index'
import Title from "@modules/title/title";
import {
    Button
} from 'antd';
import {backTo} from '../order_create/utils'
import {getOrderOfficeSingleOperation} from '@api/order'
import MainRight2 from "@/js/components/layout/main_right2";
/**
 * 变更引导页
 */
export default class ChangeOrderGUide extends Component{
    constructor(props){
        super(props)
        this.state={
            operation: {}
        }
    }
    componentDidMount() {
        /**
         * 获取可操作按钮
         * @type {ChangeOrderGUide}
         */
        const that = this
        getOrderOfficeSingleOperation({
            order_codes: [this.props.params.code]
        }).then(res => {
            if(res.code === 10000){
                that.setState({
                    operation: res.data[this.props.params.code]
                })
                if (!that.state.operation['reduce'] && !that.state.operation['enlarge']) {
                    backTo()
                }
            }
        })
    }
    @Bind()
    backListPage(){
        utils.Router.switchRoute(`/order/office/${this.props.params.sourceType}/list`)
    }
    @Bind()
    remove() {
        if (this.state.operation.reduce) {
            utils.Router.switchRoute(`/order/office/${this.props.params.sourceType}/alteration/minus/${this.props.params.code}/basic`)
        }

    }
    @Bind()
    add() {
        if (this.state.operation.enlarge) {
            utils.Router.switchRoute(`/order/office/${this.props.params.sourceType}/alteration/add/${this.props.params.code}/basic`)
        }
    }
    @Bind()
    change() {

    }
    getReduce(type) {
        const reduce = this.state.operation.reduce || false
        const enlarge = this.state.operation.enlarge || false
        if (type === 'reduce'){
            if (!reduce){
                return 'mxj-guide-no-operation'
            }
        } else if (type === 'enlarge'){
            if (!enlarge){
                return 'mxj-guide-no-operation'
            }
        }
        return 'mxj-guide-yes-operation'
    }
    render() {
        const topMenu = [
            {
                text: '订单管理'
            },
            {
                text: '办公服务订单变更管理'
            }
        ]
        return (
            <Fragment>
                <div className='mxj-order-office-chang-guide'>
                    <Title title='办公服务订单管理'></Title>
                    <CommonCard header={false} className={this.getReduce('reduce')} showDivider={false} mainStyle={{padding: '28px 48px 26px'}}>
                        <div className='mxj-order-change-guide' onClick={this.remove}>
                            <div className='left'>
                                <img src={require('../../img/remove_order.png')} alt=""/>
                                <div style={{marginTop: 16}}>减少办公服务内容</div>
                            </div>
                            <div className='right'>
                                <div style={{color: '#656771'}}>满足以下场景时请选择该项</div>
                                <ul>
                                    <li>1. 用户方原因发起申请</li>
                                    <li>2. 用户方在原订单服务期内申请增加办公服务内容（包含增加工位、房间等周期性服务商品）</li>
                                    <li>3. 原有合同不终止，双方签订变更协议</li>
                                    <li>4. 减少办公服务内容对应押金及租金不做退还</li>
                                    <li>5. 至少保留一件原商品</li>
                                    <li>6. 申请通过后该变更为下一个账期生效</li>
                                </ul>
                            </div>
                        </div>
                    </CommonCard>
                    <CommonCard header={false} className={this.getReduce('enlarge')} showDivider={false} mainStyle={{padding: '28px 48px 26px', marginTop: 26}}>
                        <div className='mxj-order-change-guide' onClick={this.add}>
                            <div className='left'>
                                <img src={require('../../img/add_order.png')} alt=""/>
                                <div style={{marginTop: 16}}>增加办公服务内容</div>
                            </div>
                            <div className='right'>
                                <div style={{color: '#656771'}}>满足以下场景时请选择该项</div>
                                <ul>
                                    <li>1. 用户方原因发起申请</li>
                                    <li>2. 用户方在原订单服务期内申请增加办公服务内容（包含增加工位、房间等周期性服务商品）</li>
                                    <li>3. 原有合同不终止，双方签订变更协议</li>
                                    <li>4. 增加办公服务内容需要在原有基础上进行</li>
                                    <li>5. 申请通过后该变更为申请通过后立即生效或可选择生效时间</li>
                                </ul>
                            </div>
                        </div>
                    </CommonCard>
                    {/*<CommonCard header={false} className='mxj-guide-no-operation' showDivider={false} mainStyle={{padding: '28px 48px 26px', marginTop: 26,}}>*/}
                        {/*<div className='mxj-order-change-guide'>*/}
                            {/*<div className='left'>*/}
                                {/*<img src={require('../../img/change_order.png')} alt=""/>*/}
                                {/*<div style={{marginTop: 16}} className=''>变更办公服务内容</div>*/}
                            {/*</div>*/}
                            {/*<div className='right'>*/}
                                {/*<div style={{color: '#656771'}}>满足以下场景时请选择该项</div>*/}
                                {/*<ul className=''>*/}
                                    {/*<li>1. 用户方原因发起申请</li>*/}
                                    {/*<li>2. 用户方在原订单服务期内申请增加办公服务内容（包含增加工位、房间等周期性服务商品）</li>*/}
                                    {/*<li>3. 原有合同不终止，双方签订变更协议</li>*/}
                                    {/*<li>4. 变更后</li>*/}
                                    {/*<li>5. 申请通过后该变更为申请通过后立即生效或可选择生效时间</li>*/}
                                {/*</ul>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</CommonCard>*/}
                    <div className='mxj-flex-center mxj-margin-top-40'>
                        <Button onClick={this.backListPage}>返回</Button>
                    </div>
                </div>
            </Fragment>
        )
    }
}
