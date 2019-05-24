import {Component, Fragment} from "react";
import React from "react";
import Bind from 'lodash-decorators/bind';
import {
    Modal, Row, Col, Divider, Form, Input
} from 'antd';
import DetailBox from '@/js/components/modules/detailBox'
import {changeNumberPriceDiff} from '@/js/asset/common'
const { TextArea } = Input;
/**
 * 填写申请原因
 */
export default class CheckSaleRuleView extends Component{
    constructor(props){
        super(props)
    }

    /**
     * 设置免租类型
     * @param e
     */
    setFreeType(e) {
        switch (e) {
            case '1':
                return '不免租';
            case '2':
                return '前置免租'
            case '3':
                return '后置免租'
            default:
                return ''
        }
    }

    /**
     * 押金
     * @param e
     */
    setPayment(e) {
        const arr = e.split('-')

        return (
            <Fragment>
                押 <span className='mxj-error-color'>{arr[0]}</span>付<span className='mxj-error-color'>{arr[1]}</span>&nbsp;&nbsp; 提前<span className='mxj-error-color'>{arr[2]}</span>天交租
            </Fragment>
        )
    }

    /**
     * 设置积分配置
     * @param a
     * @param b
     */
    setPresented(a, b) {
        if (a>= b) {
            return a
        }
        return (
            <span className='mxj-error-color'>{a}</span>
        )
    }
    /**
     * 确认
     */
    @Bind()
    sureFilterOperation() {
        const {dispatch} = this.props
        this.props.form.validateFieldsAndScroll(['alter_reason'],(err, values) => {
            if (!err) {
                dispatch({
                    type: 'modify_office_order_create',
                    data: values
                })
                setTimeout(() => {
                    this.props.sureFilterOperation()
                }, 100)
            }
        })


    }
    /**
     * 显示/隐藏model
     */
    @Bind()
    onclickFilter() {
        this.props.onclickFilter()
    }
    /**
     * 生成筛选model
     * @returns {*}
     */
    renderModel () {
        const {check_sale_rule} = this.props
        const { getFieldDecorator} = this.props.form;
        return (
            <Modal title="填写审核原因"
                   {...this.props.modal}
                    width={810}
                   className='mxj-model-blur mxj-model-check-rule'
                   visible={this.props.filter_visible}
                   onOk={this.sureFilterOperation}
                   onCancel={this.onclickFilter}>
                <div>
                    {
                        check_sale_rule.two_months_before_spring_festival ? (
                            <div>
                                <div className='mxj-check-sale-rule'>
                                    <DetailBox showDivider={false} logo={true} title='春节前两月到期'></DetailBox>
                                </div>
                                <div className='mxj-check-sale-content'>
                                    <div className='rule-left mxj-error-color'>
                                        {check_sale_rule.two_months_before_spring_festival.spring_date.split('/')[0]}年春节：{check_sale_rule.two_months_before_spring_festival.spring_date}
                                    </div>
                                    <Divider type="vertical" style={{margin: '0 31px 0 42px', height: 'auto'}} />
                                    <div className='rule-right'>
                                        {check_sale_rule.two_months_before_spring_festival.start_date} {check_sale_rule.two_months_before_spring_festival.end_date}
                                    </div>
                                </div>
                            </div>
                        ): null
                    }
                    {
                        check_sale_rule.free_rent ? (
                            <div>

                                <div className='mxj-check-sale-rule'>
                                    <DetailBox showDivider={false} logo={true} title='免租期'></DetailBox>
                                </div>
                                <div className='mxj-check-sale-content'>
                                    <div className='rule-left'>
                                        {check_sale_rule.free_rent.free_type}  <span className='mxj-error-color'> {check_sale_rule.free_rent.free_days} </span> 天
                                    </div>
                                </div>
                            </div>
                        ): null
                    }
                    {
                        check_sale_rule.deposit_pay_mode ? (
                            <div>
                                <div className='mxj-check-sale-rule'>
                                    <DetailBox showDivider={false} logo={true} title='押付方式'></DetailBox>
                                </div>
                                <div className='mxj-check-sale-content'>
                                    <div className='rule-left'>
                                        <Row>
                                            {check_sale_rule.deposit_pay_mode.deposit_payment_list.map((value, index) => (
                                                <Col span={12} key={index}>
                                                    押{value.deposit_month}付{value.pay_month}&nbsp;&nbsp; 提前{value.pre_pay_day}天交租
                                                </Col>
                                            ))}


                                        </Row>
                                    </div>
                                    <Divider type="vertical" style={{margin: '0 31px 0 42px',height: 'auto'}} />
                                    <div className='rule-right'>
                                        {this.setPayment(check_sale_rule.deposit_pay_mode.deposit_payment)}
                                    </div>
                                </div>
                            </div>
                        ): null
                    }
                    {
                        check_sale_rule.presented_goods ? (
                            <div>
                                <div className='mxj-check-sale-rule'>
                                    <DetailBox showDivider={false} logo={true} title='配送积分配额'></DetailBox>
                                </div>
                                <div className='mxj-check-sale-content'>
                                    <div className='rule-left'>
                                        <Row>
                                            <Col span={12}>
                                                {check_sale_rule.presented_goods.default_present_credits}积分/月
                                            </Col>
                                            <Col span={12}>
                                                {check_sale_rule.presented_goods.default_present_prints}打印纸张数/月
                                            </Col>
                                        </Row>
                                    </div>
                                    <Divider type="vertical" style={{margin: '0 31px 0 42px', height: 'auto'}} />
                                    <div className='rule-right'>
                                        <div style={{width: '100%'}}>
                                            <Row>
                                                <Col span={12}>
                                                    {this.setPresented(check_sale_rule.presented_goods.present_credits, check_sale_rule.presented_goods.default_present_credits)}积分/月
                                                </Col>
                                                <Col span={12}>
                                                    {this.setPresented(check_sale_rule.presented_goods.present_prints, check_sale_rule.presented_goods.default_present_prints)}打印纸张数/月
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ): null
                    }
                    {
                        check_sale_rule.rent_amount_discount ? (
                            <div>
                                <div className='mxj-check-sale-rule'>
                                    <DetailBox showDivider={false} logo={true} title='租金折扣'></DetailBox>
                                </div>
                                <div className='mxj-check-sale-content'>
                                    <div className='rule-left'>
                                        <Row>
                                            <Col span={16}>
                                                本单最低租金付款折扣&nbsp;&nbsp;&nbsp;{check_sale_rule.rent_amount_discount.min_rent_discount_rate}%
                                            </Col>
                                            <Col span={16}>
                                                本单最低有效租金&nbsp;&nbsp;&nbsp;{changeNumberPriceDiff(check_sale_rule.rent_amount_discount.min_effective_rent)}
                                            </Col>
                                            <Col span={8}>
                                                差值&nbsp;&nbsp;&nbsp; <span className='mxj-success-color'>{changeNumberPriceDiff(check_sale_rule.rent_amount_discount.min_effective_rent - check_sale_rule.rent_amount_discount.effective_rent)}</span>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Divider type="vertical" style={{margin: '0 31px 0 42px', height: 'auto'}} />
                                    <div className='rule-right'>
                                        <div style={{width: '100%'}}>
                                            <Row>
                                                <Col span={12}>租金折扣</Col>
                                                <Col span={12} className='mxj-error-color'>{check_sale_rule.rent_amount_discount.discount_rate}%</Col>
                                            </Row>
                                            <Row>
                                                <Col span={12}>当前有效租金</Col>
                                                <Col span={12} className='mxj-error-color'>{changeNumberPriceDiff(check_sale_rule.rent_amount_discount.effective_rent)}</Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ): null
                    }
                    {
                        check_sale_rule.rent_annual_raising ? (
                            <div>
                                <div className='mxj-check-sale-rule'>
                                    <DetailBox showDivider={false} logo={true} title='租金年涨幅'></DetailBox>
                                </div>
                                <div className='mxj-check-sale-content'>
                                    <div className='rule-left'>
                                        <Row>
                                            {
                                                'min_inc_rate' in check_sale_rule.rent_annual_raising && (
                                                    <Fragment>
                                                        <Col span={24}>
                                                            最低租金年涨幅&nbsp;&nbsp;&nbsp;{check_sale_rule.rent_annual_raising.min_inc_rate}%
                                                        </Col>
                                                        {/*<Col span={8}>*/}
                                                            {/*差值&nbsp;&nbsp;&nbsp; <span className='mxj-success-color'>{check_sale_rule.rent_annual_raising.inc_rate_diff }</span>*/}
                                                        {/*</Col>*/}
                                                    </Fragment>
                                                )
                                            }
                                            {
                                                'actual_quoted_price_raising_diff' in check_sale_rule.rent_annual_raising && (
                                                    <Fragment>
                                                        <Col span={24}>
                                                            最低报价基础上浮&nbsp;&nbsp;&nbsp;{check_sale_rule.rent_annual_raising.min_actual_quoted_price_raising}%
                                                        </Col>
                                                        {/*<Col span={8}>*/}
                                                            {/*差值&nbsp;&nbsp;&nbsp; <span className='mxj-success-color'>{check_sale_rule.rent_annual_raising.actual_quoted_price_raising_diff }</span>*/}
                                                        {/*</Col>*/}
                                                    </Fragment>
                                                )
                                            }
                                            {
                                                'valid_rent_amount_raising_diff' in check_sale_rule.rent_annual_raising && (
                                                    <Fragment>
                                                        <Col span={24}>
                                                            最低有效租金上浮&nbsp;&nbsp;&nbsp;{check_sale_rule.rent_annual_raising.min_valid_rent_amount_raising}%
                                                        </Col>
                                                        {/*<Col span={8}>*/}
                                                            {/*差值&nbsp;&nbsp;&nbsp; <span className='mxj-success-color'>{check_sale_rule.rent_annual_raising.valid_rent_amount_raising_diff}</span>*/}
                                                        {/*</Col>*/}
                                                    </Fragment>
                                                )
                                            }

                                        </Row>
                                    </div>
                                    <Divider type="vertical" style={{margin: '0 31px 0 42px', height: 'auto'}} />
                                    <div className='rule-right'>
                                        <div style={{width: '100%'}}>
                                            {
                                                'inc_rate' in check_sale_rule.rent_annual_raising&& (
                                                    <Fragment>
                                                        <Row>
                                                            <Col span={12}>年涨幅</Col>
                                                            <Col span={12} className='mxj-error-color'>{check_sale_rule.rent_annual_raising.inc_rate}%</Col>
                                                        </Row>
                                                    </Fragment>
                                                )
                                            }
                                            {
                                                'actual_quoted_price_raising' in check_sale_rule.rent_annual_raising && (
                                                    <Fragment>
                                                        <Row>
                                                            <Col span={12}>报价基础上浮</Col>
                                                            <Col span={12} className='mxj-error-color'>{check_sale_rule.rent_annual_raising.actual_quoted_price_raising}%</Col>
                                                        </Row>
                                                    </Fragment>
                                                )
                                            }
                                            {
                                                'valid_rent_amount_raising' in check_sale_rule.rent_annual_raising&& (
                                                    <Row>
                                                        <Col span={12}>有效租金上浮</Col>
                                                        <Col span={12} className='mxj-error-color'>{check_sale_rule.rent_annual_raising.valid_rent_amount_raising}%</Col>
                                                    </Row>
                                                )
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ): null
                    }
                    <Form className="ant-advanced-search-form">
                        <Form.Item  label="">
                            {getFieldDecorator('alter_reason', {
                                rules: [
                                    {
                                        required: true,
                                        validator: (rule, value, callback) => {
                                            if (!value) {
                                                callback('请输入原因')
                                                return
                                            }
                                            if (value.length>=300){
                                                callback('请输入小于300个字符')
                                                return
                                            }
                                            callback();
                                        },
                                    },
                                ],
                                initialValue: this.props.orderCreateState.alter_reason,
                            })(
                                <TextArea rows={4} placeholder='*请填写申请原因'/>
                            )}
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        )
    }
    render() {
        return (
            <Fragment>
                {this.renderModel()}
            </Fragment>
        )
    }
}