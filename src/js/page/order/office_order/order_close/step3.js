import {Form, Input, Row, Col, Button, message} from 'antd';
import React, {Component, Fragment} from "react";
import { connect } from 'react-redux';
import DescriptionList from '@/js/components/modules/descriptionList'
import { cancelOrder, getCitiesNumber, getLocationNumber, getGoodsNumber} from "../order_create/utils";
import { getGoodsNumberCommon, getGoodsNumberCommonArr, getGoodsNumberByNameArr, changeNumberPriceDiff} from '@/js/asset/common'
import DetailBox from '@/js/components/modules/detailBox'
import Bind from 'lodash-decorators/bind';
import MxjTable from '@/js/widget/table/table'
import SuccessModel from '@/js/components/modules/statusModel/success'
import utils from '@/js/asset/index'
import { postOrderOfficeCreateAuditing} from '@api/order'
import {GoodsTableOnlyShow, GoodsTablePriceShow} from '../common/goodsTable'
const { Description } = DescriptionList
const { TextArea } = Input;
@connect(({ orderDetailCloseState, orderCreateState }) => ({
    orderDetailCloseState,
    orderCreateState
}))
@Form.create()
export default class OrderOfficeCloseStep extends Component{
    constructor(){
        super();
        this.state = {
            showSuccess: false
        }
    }
    componentDidMount() {
        const {dispatch, params} = this.props
        const {current, success_step_1} = this.props.orderDetailCloseState
        if (current<2) {
            dispatch({
                type: 'order_office_close',
                data: {
                    current: 2
                }
            })
        }
        if (!success_step_1){
            dispatch({
                type: 'order_office_close',
                data: {
                    current: 0
                }
            })
            if (params.type ==='add' || params.type === 'minus') {
                utils.Router.switchRoute(`/order/office/${this.props.params.sourceType}/alteration/${params.type}/${params.id}/basic`)
            } else {
                utils.Router.switchRoute(`/order/office/${this.props.params.sourceType}/alteration/${params.type}/${params.id}/step1`)
            }
        }
    }
    renderTopView() {
        const {orderDetailCloseState, params, orderCreateState} = this.props
        const {getFieldDecorator} = this.props.form
        const {detail, create_value, compute_value} = orderDetailCloseState
        return (
            <DetailBox showDivider={true} mainStyle={{marginBottom: 37}} logo={true} dividerStyle={{margin: '11px 0 32px'}} title={'确认结算订单内容'}>
                {params.type === 'minus' || params.type === 'add' ? (
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={12}>
                            <DescriptionList col={1} size="small" title="" style={{ marginBottom: 0 }}>
                                <Description term={<span><span className='mxj-star'>*</span>原服务期</span>}><span className='mxj-error-color'>{detail.start_date}至{detail.end_date}</span></Description>
                                <Description term={<span><span className='mxj-star'>*</span>原订单城市数量</span>}>{detail.multi_info.city_codes.length}个</Description>
                                <Description term={<span><span className='mxj-star'>*</span>原订单场地数量 </span>}>{detail.multi_info.location_codes.length}个</Description>
                                <Description term={<span><span className='mxj-star'>*</span>原订单商品数量</span>}>{detail.goods.length}个（{getGoodsNumberCommon(detail.goods)}）</Description>
                                <Description term={<span><span className='mxj-star'>*</span>原订单成交金额</span>}>¥{changeNumberPriceDiff(detail.charge_all_price)}</Description>
                                {
                                    params.type === 'minus' && (
                                        <Description term={<span><span className='mxj-star'>*</span>原订单扣款金额</span>}>
                                            <span className='mxj-error-color'>¥{
                                                (() => {
                                                    let sum =0
                                                    create_value.deductions.map(value => {
                                                        sum+=value.price
                                                    })
                                                    return changeNumberPriceDiff(sum)
                                                })()
                                            }</span>
                                        </Description>
                                    )
                                }

                            </DescriptionList>
                        </Col>
                        <Col xs={24} sm={24} md={12}>
                            <DescriptionList col={1} size="small" title="" style={{ marginBottom: 0 }}>
                                <Description term={<span><span className='mxj-star'>*</span>变更后服务期</span>}><span className='mxj-error-color'>{orderDetailCloseState.time_change.start_date}至{orderDetailCloseState.time_change.end_date}</span></Description>
                                <Description term={<span><span className='mxj-star'>*</span>变更后城市数量</span>}>{getCitiesNumber(orderCreateState.goods_list_select_data)}个</Description>
                                <Description term={<span><span className='mxj-star'>*</span>变更后场地数量 </span>}>{getLocationNumber(orderCreateState.goods_list_select_data)}个</Description>
                                <Description term={<span><span className='mxj-star'>*</span>变更后商品数量</span>}>{orderCreateState.goods_list_select_data.length}个（{getGoodsNumber(orderCreateState.goods_list_select_data)}）</Description>
                                <Description term={<span><span className='mxj-star'>*</span>变更后成交金额</span>}>¥{params.type === 'minus'? changeNumberPriceDiff(compute_value.charge_all_price): compute_value && changeNumberPriceDiff(Number(detail.charge_all_price)+Number(compute_value.charge_all_price))}</Description>

                            </DescriptionList>
                        </Col>
                    </Row>
                    ): (
                    <DescriptionList col={3} size="small" title="" style={{ marginBottom: 0 }}>
                        <Description term={<span><span className='mxj-star'>*</span>原服务期</span>}><span className='mxj-error-color'>{detail.start_date}至{detail.end_date}</span></Description>
                        <Description term={<span><span className='mxj-star'>*</span>原订单城市数量</span>}>{detail.multi_info.city_codes.length}个</Description>
                        <Description term={<span><span className='mxj-star'>*</span>原订单场地数量 </span>}>{detail.multi_info.location_codes.length}个</Description>
                        <Description term={<span><span className='mxj-star'>*</span>原订单商品数量</span>}>{detail.goods.length}个（{getGoodsNumberCommon(detail.goods)}）</Description>
                        <Description term={<span><span className='mxj-star'>*</span>原订单成交金额</span>}>¥{changeNumberPriceDiff(detail.charge_all_price)}</Description>
                        <Description term={<span><span className='mxj-star'>*</span>原订单扣款金额</span>}>
                        <span className='mxj-error-color'>¥{
                            (() => {
                                let sum =0
                                create_value.deductions.map(value => {
                                    sum+=value.price
                                })
                                return changeNumberPriceDiff(sum)
                            })()
                        }</span>
                        </Description>
                        <Description term={<span><span className='mxj-star'>*</span>原订单退款款金额</span>}>
                        <span className='mxj-error-color'>¥{
                            (() => {
                                let sum =0
                                create_value.refunds.map(value => {
                                    sum+=value.price
                                })
                                return changeNumberPriceDiff(sum)
                            })()
                        }</span>
                        </Description>
                    </DescriptionList>
                )}

            </DetailBox>
        )
    }
    @Bind()
    commonLoading(res) {
        const {dispatch} = this.props
        const that = this
        dispatch({
            type: 'modify_office_order_common',
            data: {
                spinLoading: false
            }
        })
        if (res.code === 10000){
            //
            that.setState({
                showSuccess: true
            })
        } else {
            // message.error(res.message);
        }
    }
    @Bind()
    showSuccessView() {
        this.setState({
            showSuccess: false
        })
        cancelOrder()
    }
    /**
     * 提交
     * @param e
     */
    @Bind()
    handleSubmit(e){
        e.preventDefault();
        const {dispatch, orderDetailCloseState, orderCreateState, params} = this.props
        const that = this
        const {create_value, detail, delete_goods, compute_value} = orderDetailCloseState
        const {goods_list_select_data, disableSelectRow} = orderCreateState
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            let this_val = Object.assign(create_value, values)
            let fetchValue
            if (!err) {
                dispatch({
                    type: 'order_office_close',
                    data: {
                        create_value: this_val
                    }
                })
                this_val.order_code = orderDetailCloseState.detail.order_code
                // 提前终止
                if (that.props.params.type === 'terminate-auditing'){
                    dispatch({
                        type: 'modify_office_order_common',
                        data: {
                            spinLoading: true,
                            spinTip: '订单保存中...'
                        }
                    })
                    postOrderOfficeCreateAuditing('create-terminate-auditing', this_val).then(that.commonLoading)

                } else if (that.props.params.type === 'cleared'){ // 清租
                    dispatch({
                        type: 'modify_office_order_common',
                        data: {
                            spinLoading: true,
                            spinTip: '订单保存中...'
                        }
                    })
                    postOrderOfficeCreateAuditing('create-cleared', this_val).then(that.commonLoading)
                } else if (that.props.params.type === 'account-auditing'){ // 到期结算
                    dispatch({
                        type: 'modify_office_order_common',
                        data: {
                            spinLoading: true,
                            spinTip: '订单保存中...'
                        }
                    })
                    postOrderOfficeCreateAuditing('create-account-auditing', this_val).then(that.commonLoading)
                } else if (that.props.params.type === 'add'){

                    this_val.goods={
                        odd: detail.goods,
                        add: goods_list_select_data.filter(value => disableSelectRow.indexOf(value.code) < 0)
                    }
                    // 添加的商品
                    this_val.effective_date = orderDetailCloseState.time_change.start_date

                    let deduction_amount = 0
                    // 原订单扣款金额
                    create_value.deductions.map(value => {
                        deduction_amount+=value.price
                    })
                    const order_change_content = {
                        old_order: {
                            service_date: `${detail.start_date}至${detail.end_date}`,
                            city_number: detail.multi_info.city_codes.length,
                            location_number: detail.multi_info.location_codes.length,
                            goods_number: detail.goods.length,
                            charge_all_price: detail.charge_all_price,
                            good_items: getGoodsNumberCommonArr(detail.goods),
                            deduction_amount: deduction_amount
                        },
                        new_order: {
                            service_date: `${orderDetailCloseState.time_change.start_date}至${orderDetailCloseState.time_change.end_date}`,
                            city_number: getCitiesNumber(orderCreateState.goods_list_select_data),
                            location_number: getLocationNumber(orderCreateState.goods_list_select_data),
                            goods_number: orderCreateState.goods_list_select_data.length,
                            charge_all_price: detail.charge_all_price+Number(compute_value.charge_all_price),
                            good_items: getGoodsNumberByNameArr(orderCreateState.goods_list_select_data)
                        }
                    }
                    this_val.order_change_content = order_change_content
                    dispatch({
                        type: 'modify_office_order_common',
                        data: {
                            spinLoading: true,
                            spinTip: '订单保存中...'
                        }
                    })
                    postOrderOfficeCreateAuditing('add', this_val).then(that.commonLoading)
                } else if (that.props.params.type === 'minus'){
                    this_val.goods={
                        odd: orderCreateState.goods_list_select_data,
                        reduced: delete_goods
                    }// 原来的商品
                    // 删除的商品
                    this_val.effective_date = orderDetailCloseState.time_change.start_date
                    let deduction_amount = 0
                    // 原订单扣款金额
                    create_value.deductions.map(value => {
                        deduction_amount+=value.price
                    })
                    const order_change_content = {
                        old_order: {
                            service_date: `${detail.start_date}至${detail.end_date}`,
                            city_number: detail.multi_info.city_codes.length,
                            location_number: detail.multi_info.location_codes.length,
                            goods_number: detail.goods.length,
                            charge_all_price: detail.charge_all_price,
                            good_items: getGoodsNumberCommonArr(detail.goods)
                        },
                        new_order: {
                            service_date: `${orderDetailCloseState.time_change.start_date}至${orderDetailCloseState.time_change.end_date}`,
                            city_number: getCitiesNumber(orderCreateState.goods_list_select_data),
                            location_number: getLocationNumber(orderCreateState.goods_list_select_data),
                            goods_number: getGoodsNumberByNameArr(orderCreateState.goods_list_select_data),
                            charge_all_price: compute_value.charge_all_price,
                            good_items: getGoodsNumberByNameArr(orderCreateState.goods_list_select_data)
                        }
                    }
                    this_val.order_change_content = order_change_content
                    dispatch({
                        type: 'modify_office_order_common',
                        data: {
                            spinLoading: true,
                            spinTip: '订单保存中...'
                        }
                    })
                    postOrderOfficeCreateAuditing('minus', this_val).then(that.commonLoading)
                } else {

                }
            }

        })
    }
    @Bind()
    resetForm(){
        this.props.form.resetFields()
    }
    /**
     * 商品变更后展示表格（仅限增加商品商品时展示）
     */
    showGoodsChangeAddTable() {
        const {orderCreateState} = this.props
        const {goods_list_select_data} = orderCreateState
        return (
            <GoodsTableOnlyShow showPaination={false} tableValue={goods_list_select_data}></GoodsTableOnlyShow>
        )
    }
    render(){
        const {orderDetailCloseState, params} = this.props
        const {getFieldDecorator} = this.props.form
        const {detail, create_value, compute_value} = orderDetailCloseState
        const new_columes = [
            { title: '扣款类型', dataIndex: 'entry_name', key: 'entry_name', width: 150 },
            { title: '扣款内容', dataIndex: 'entry_type_name', key: 'entry_type_name', width: 150 },
            { title: '扣款总金额', dataIndex: 'price', key: 'price', width: 150,
                render: text => '¥'+changeNumberPriceDiff(text)
            },
            { title: '扣款单价', dataIndex: 'single_price', key: 'single_price', width: 150 },
            { title: '扣款数量', dataIndex: 'num', key: 'num', width: 150 },
            { title: '扣款备注', dataIndex: 'remark', key: 'remark', width: 150 }
        ]
        const new_columes1 = [
            { title: '退款类型', dataIndex: 'entry_name', key: 'entry_name', width: 150 },
            { title: '退款内容', dataIndex: 'entry_type_name', key: 'entry_type_name', width: 150 },
            { title: '退款总金额', dataIndex: 'price', key: 'price', width: 150,
                render: text => '¥'+changeNumberPriceDiff(text)
            },
            { title: '退款单价', dataIndex: 'single_price', key: 'single_price', width: 150 },
            { title: '退款数量', dataIndex: 'num', key: 'num', width: 150 },
            { title: '退款备注', dataIndex: 'remark', key: 'remark', width: 150 }
        ]
        const formItemLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 4 },
            },
        };
        let goods_compute = []
        let deposit_compute = []
        let other_compute = []
        if (compute_value){
            goods_compute = compute_value.goods
            deposit_compute = compute_value.deposit
            other_compute = compute_value.other
        }

        return (
            <div className={'mxj-order-close-step3'}>
                {
                    detail && this.renderTopView()
                }
                {
                    (params.type === 'add' || params.type === 'minus' )&& (
                        <DetailBox showDivider={true} mainStyle={{marginBottom: 37}} logo={true} dividerStyle={{margin: '11px 0 32px'}} title={'确认变更订单后商品内容'}>
                            { this.showGoodsChangeAddTable()}
                        </DetailBox>
                    )
                }
                {
                    params.type === 'add' && (
                        <DetailBox showDivider={true} mainStyle={{marginBottom: 37}} logo={true} dividerStyle={{margin: '11px 0 32px'}} title={'确认变更订单后金额内容'}>
                            <GoodsTablePriceShow style={{marginBottom: 16}} tableValue={goods_compute} type={'goods'} time={compute_value ?compute_value.diff_service_date : null}></GoodsTablePriceShow>
                            <GoodsTablePriceShow style={{marginBottom: 16}} tableValue={deposit_compute} type={'deposit'}></GoodsTablePriceShow>
                            <GoodsTablePriceShow tableValue={other_compute} type={'other'}></GoodsTablePriceShow>
                        </DetailBox>
                    )
                }

                {
                    params.type !== 'add' &&(
                        <Fragment>
                            <DetailBox showDivider={true} mainStyle={{marginBottom: 37}} logo={true} dividerStyle={{margin: '11px 0 32px'}} title={'确认变更订单扣款内容'}>
                                <MxjTable
                                    className={'mxj-table-page-common'}
                                    //固定列
                                    scroll={{ x: 150* new_columes.length }}
                                    showPaination={false}
                                    columns={new_columes}
                                    dataSource={create_value.deductions}
                                />
                                <div className='mxj-float-right mxj-error-color' style={{paddingRight: 76, height: 50, lineHeight: '50px'}}>
                                    <span>扣款小计：¥
                                        {
                                            (() => {
                                                let sum = 0
                                                create_value.deductions.map(value => {
                                                    sum+=value.price
                                                })
                                                return changeNumberPriceDiff(sum)
                                            })()
                                        }
                                    </span>
                                </div>
                            </DetailBox>
                            <DetailBox showDivider={true} mainStyle={{marginBottom: 37}} logo={true} dividerStyle={{margin: '11px 0 32px'}} title={'确认变更订单退款内容'}>
                                <MxjTable
                                    className={'mxj-table-page-common'}
                                    //固定列
                                    scroll={{ x: 150* new_columes1.length }}
                                    showPaination={false}
                                    columns={new_columes1}
                                    dataSource={create_value.refunds}

                                />
                                <div className='mxj-float-right mxj-error-color' style={{paddingRight: 76, height: 50, lineHeight: '50px'}}>
                                    <span>退款小计：¥
                                        {
                                            (() => {
                                                let sum = 0
                                                create_value.refunds.map(value => {
                                                    sum+=value.price
                                                })
                                                return changeNumberPriceDiff(sum)
                                            })()
                                        }
                                    </span>
                                </div>
                            </DetailBox>
                        </Fragment>
                    )
                }
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item  label="">
                        {getFieldDecorator('memo', {
                            rules: [
                                { required: true,
                                    validator: (rule, value, callback) => {

                                        if (value && value.length>=300){
                                            callback('请输入小于300个字符')
                                            return
                                        }
                                        callback();
                                    },
                                },
                            ],
                            initialValue: create_value.memo,
                        })(
                            <TextArea rows={4} placeholder='请输入备注信息'/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <div className='mxj-flex-center mxj-margin-top-40'>
                            <Button className='mxj-margin-right-16' onClick={() => {
                                cancelOrder()
                            }}>取消</Button>
                            <Button className='mxj-f7f7f7-bg mxj-margin-right-16' onClick={this.resetForm}>重置</Button>
                            <Button className='mxj-margin-right-16' type="primary" onClick={() => {
                                utils.Router.backRoute()
                            }} ghost>上一步</Button>
                            <Button className='mxj-margin-right-16' type="primary" htmlType="submit">提交</Button>
                        </div>
                    </Form.Item>
                </Form>
                <SuccessModel onclickFilter={this.showSuccessView} filter_visible={this.state.showSuccess} title={'提交成功'}></SuccessModel>
            </div>



        )
    }
}

