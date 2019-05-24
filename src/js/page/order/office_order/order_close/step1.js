import {Form, Skeleton, Input, Radio, Icon, Row, Col, Button, message} from 'antd';
import {Link} from "react-router";
import React, {Component, Fragment} from "react";
import { connect } from 'react-redux';
import DescriptionList from '@/js/components/modules/descriptionList'
import {cancelOrder, memberTypeText, timeDiff} from "../order_create/utils";
import {statusText, statusColorClassName, changeNumberPriceDiff} from '@/js/asset/common'
import DetailBox from '@/js/components/modules/detailBox'
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { checkDeposiCode} from '@api/order'
import utils from '@/js/asset/index'
const { Description } = DescriptionList
const RadioGroup = Radio.Group;
const { TextArea } = Input;
@connect(({ orderDetailCloseState }) => ({
    orderDetailCloseState
}))
@Form.create()
export default class OrderOfficeCloseStep extends Component{
    constructor(){
        super();
    }
    componentDidMount() {
        const that = this
    }

    /**
     * 校验押金单
     * @param e
     */
    @Bind()
    @Debounce(200)
    checkDeposit(e) {

        const {dispatch, orderDetailCloseState} = this.props
        const {create_value} = orderDetailCloseState
        if (!orderDetailCloseState.is_check_deposit) {
            dispatch({
                type: 'order_office_close',
                data: {
                    is_check_deposit: true
                }
            })
        }
        checkDeposiCode({
            order_code: orderDetailCloseState.detail.order_code,
            sign: e.target.value,
        }, {
            40004: () => {
                create_value.deposit_recept_id = null
                dispatch({
                    type: 'order_office_close',
                    data: {
                        check_deposit: false,
                        deposit_data: {},
                        create_value
                    }
                })
            }
        }).then(res => {
            if(res.code === 10000){
                create_value.deposit_recept_id = res.data.id
                dispatch({
                    type: 'order_office_close',
                    data: {
                        check_deposit: true,
                        deposit_data: res.data,
                        create_value
                    }
                })
            }

        }).catch(e => {
            dispatch({
                type: 'order_office_close',
                data: {
                    check_deposit: true
                }
            })
        })
    }

    /**
     *  押金单校验码校验结果
     */
    renderDeposiResult(orderDetailCloseState) {
        if (orderDetailCloseState.is_check_deposit) {
            if (orderDetailCloseState.check_deposit) {
                if (orderDetailCloseState.deposit_data.id){
                    return (
                        <Fragment>
                            <Icon className='mxj-success-color' type="check-circle" theme="filled" /><span style={{margin: '0 32px 0 4px'}} className='mxj-success-color'>校验成功</span> <Link href={`/financial/deposit/form/details/${orderDetailCloseState.deposit_data.id}`} target='_blank'>查看押金单</Link>
                        </Fragment>
                    )
                } else {
                    return (
                        <Fragment>
                            <Icon className='mxj-error-color' type="close-circle" theme="filled" /><span style={{margin: '0 32px 0 4px'}} className='mxj-error-color'>校验失败</span>
                        </Fragment>

                    )
                }

            } else {
                return (
                    <Fragment>
                        <Icon className='mxj-error-color' type="close-circle" theme="filled" /><span style={{margin: '0 32px 0 4px'}} className='mxj-error-color'>校验失败</span>
                    </Fragment>

                )
            }
        }
        return null
    }
    /**
     * 重置表单
     */
    @Bind()
    resetForm(){
        this.props.form.resetFields()
        const {orderDetailCloseState, dispatch} = this.props
        const {create_value} = orderDetailCloseState
        create_value.recycle_deposit_verify = null
        dispatch({
            type: 'order_office_close',
            data: {
                create_value,
                is_check_deposit: false,
                // 是否校验成功
                check_deposit: false,
                deposit_data: {}
            }
        })
    }

    /**
     * 表单提交
     * @param e
     */
    @Bind()
    handleSubmit(e) {
        e.preventDefault();
        const {dispatch, orderDetailCloseState, params} = this.props
        const that = this
        const {create_value, check_deposit, deposit_data} = orderDetailCloseState
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if(values.recycle_deposit_type === 1){
                    if (!deposit_data.id){
                        message.error('押金单校验失败，请输入正确押金单');
                        return
                    }
                }
                dispatch({
                    type: 'order_office_close',
                    data: {
                        create_value: Object.assign(create_value, values),
                        success_step_1: true,
                        current: 1
                    }
                })
                utils.Router.switchRoute(`/order/office/${this.props.params.sourceType}/alteration/${params.type}/${params.id}/step2`)
            }
        })
    }
    @Bind()
    recycleDepositFn(e) {
        const {dispatch, orderDetailCloseState} = this.props
        const {create_value} = orderDetailCloseState
        create_value.recycle_deposit_verify = null
        dispatch({
            type: 'order_office_close',
            data: {
                create_value: create_value,
                is_check_deposit: false,
                check_deposit: false,
                deposit_detail: null
            }
        })
    }
    render(){
        const {orderDetailCloseState, params} = this.props
        const {getFieldDecorator, getFieldValue} = this.props.form
        const {detail, create_value} = orderDetailCloseState
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const doposit_layout_input = {
            xs: { span: 24 },
            sm: { span: 14 },
        }
        const doposit_layout_icon = {
            xs: { span: 24 },
            sm: { span: 10 },
        }
        return (
            <div className={'mxj-order-close-step1'}>
                <DetailBox showDivider={true} mainStyle={{marginBottom: 37}} logo={true} dividerStyle={{margin: '11px 0 32px'}} title={orderDetailCloseState.step1_user_title}>
                    <Skeleton active loading={!detail}>
                        {detail && (
                            <DescriptionList col={3} size="small" title="" style={{ marginBottom: 0 }}>
                                <Description term={<span><span className='mxj-star'>*</span>组织类型</span>}>{memberTypeText(detail.member_type)}</Description>
                                <Description term={<span><span className='mxj-star'>*</span>用户名称</span>}><Link to={`/organize/owner/detail/${detail.member_id}`} target='_blank'>{detail.member_name}</Link></Description>
                                <Description term={<span><span className='mxj-star'>*</span>订单编号</span>}><Link to={`/order/office/detail/${detail.order_code}`}  target='_blank'>{detail.order_code}</Link></Description>
                                {
                                    params.type !== 'account-auditing' && (
                                        <Description term="变更方">{orderDetailCloseState.change_user.title}</Description>
                                    )
                                }

                                <Description term={<span><span className='mxj-star'>*</span>原订单服务期</span>}><span className='mxj-error-color'>{detail.start_date}至{detail.end_date}  {detail.diff_service_date}</span></Description>
                                <Description term={<span><span className='mxj-star'>*</span>原订单成交总价</span>}>¥{changeNumberPriceDiff(detail.charge_all_price)}</Description>
                                <Description term={<span><span className='mxj-star'>*</span>订单当前状态</span>}><span className={statusColorClassName(detail.status)}>{statusText(detail.status)}</span></Description>
                            </DescriptionList>
                        )}
                    </Skeleton>
                </DetailBox>
                <DetailBox showDivider={true} mainStyle={{marginBottom: 37}} logo={true} dividerStyle={{margin: '11px 0 32px'}} title={'变更原因'}>
                    <Form className="mxj-order-common-form" onSubmit={this.handleSubmit}>
                        <Form.Item
                            label="结算日期"
                            required
                        >
                            <span className='mxj-error-color'>{detail && detail.end_date}</span>
                        </Form.Item>
                        <Form.Item
                            label={orderDetailCloseState.reason_title}
                            required
                        >
                            {getFieldDecorator('alter_reason', {
                                rules: [
                                    { required: true, message: '请输入变更原因!' },
                                ],
                                initialValue: create_value.alter_reason,
                            })(
                                <TextArea placeholder={'请输入变更原因'} rows={4}/>
                            )}
                        </Form.Item>
                    </Form>
                </DetailBox>
                <DetailBox showDivider={true} mainStyle={{marginBottom: 37}} logo={true} dividerStyle={{margin: '11px 0 32px'}} title={'核验押金单'}>
                    <Form className="mxj-order-common-form" onSubmit={this.handleSubmit}>
                        <Form.Item
                            label="押金单处理"
                        >
                            {getFieldDecorator('recycle_deposit_type', {
                                rules: [
                                    { required: true, message: '请选择类型!' },
                                ],
                                initialValue: create_value.recycle_deposit_type,
                            })(
                                <RadioGroup onChange={this.recycleDepositFn}>
                                    <Radio value={1}>已拿到纸质押金单，校验</Radio>
                                    <Radio value={2}>押金单遗失</Radio>
                                </RadioGroup>
                            )}

                        </Form.Item>
                        {
                            (() => {
                                const recycle_deposit_type = getFieldValue('recycle_deposit_type')
                                if (recycle_deposit_type === 1) {
                                    return (<Form.Item
                                        label='填写押金单校验码'
                                    >
                                        {getFieldDecorator('recycle_deposit_verify', {
                                            rules: [
                                                { required: true, message: '请输入押金单校验码!' },
                                            ],
                                            initialValue: create_value.recycle_deposit_verify,
                                        })(
                                            <Row gutter={32}>
                                                <Col {...doposit_layout_input}> <Input defaultValue={create_value.recycle_deposit_verify} onChange={(e) => {
                                                    e.persist()
                                                    this.checkDeposit(e)
                                                }} placeholder={'请输入押金单编码'}/> </Col>

                                                <Col {...doposit_layout_icon}>
                                                    {this.renderDeposiResult(orderDetailCloseState)}
                                                </Col>
                                            </Row>
                                        )}
                                    </Form.Item>)
                                }
                                return null
                            })()
                        }
                        <Form.Item>
                            <div className='mxj-flex-center mxj-margin-top-40'>
                                <Button className='mxj-margin-right-16' onClick={() => {
                                    cancelOrder
                                }}>取消</Button>
                                <Button className='mxj-f7f7f7-bg mxj-margin-right-16' onClick={this.resetForm}>重置</Button>
                                <Button className='mxj-margin-right-16' type="primary" htmlType="submit">下一步</Button>
                            </div>
                        </Form.Item>
                    </Form>
                </DetailBox>
            </div>

        )
    }
}

