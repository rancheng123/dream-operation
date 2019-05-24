import React, { Component, PropTypes, Fragment } from 'react';
import { connect } from 'react-redux';
import Bind from 'lodash-decorators/bind';
import {Form, Input, Select,Radio, InputNumber, Row, Col,Button, message} from 'antd'
import DetailBox from '@/js/components/modules/detailBox/index'
import utils from '@/js/asset/index'
import {changeNumberPriceDiff} from '@/js/asset/common'
import Debounce from 'lodash-decorators/debounce';
import moment from 'moment'
import {getStartEndMonth, backTo, cancelOrder, startEndDays, startEndYears, setStepsCurrent} from '../utils'
import { getOrderOfficeCompute} from '@api/order'
const Option = Select.Option;
const RadioGroup = Radio.Group;
@Form.create()
class IntegralView extends Component{
    constructor(props){
        super(props)

    }
    @Bind()
    handleChange(val, index) {
        const { value, onChange } = this.props

        value[index] = val

        onChange(value)
    }

    render() {
        return (
            <Fragment>
                <Row gutter={16} style={this.props.style}>
                    <Col span={10}>
                        <Input
                            disabled
                            suffix={<span className='bfbfbf'>积分/月</span>}
                            value={this.props.value.integral}
                            placeholder=""
                            onChange={e => this.handleChange(e.target.value, 'integral')}
                        />
                    </Col>
                    <Col span={10}>
                        <Input
                            disabled
                            suffix={<span className='bfbfbf'>打印纸张数/月</span>}
                            value={this.props.value.printer_paper}
                            placeholder=""
                            onChange={e => this.handleChange(e.target.value, 'printer_paper')}
                        />
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

@connect(({ orderCreateState, orderCreateStateFetch }) => ({
    orderCreateState,
    orderCreateStateFetch
}))
@Form.create()
class OrderOfficeStep01 extends Component{
    constructor(){
        super();
        this.state = {
            fetching: false,
            user_data: [],
            intermediary_disabled: false,
            galleryful_disabled: false,
        }
    }
    componentDidMount() {
        // To disabled submit button at the beginning.
        // this.props.form.validateFields(); startEndYears
        const {orderCreateState} = this.props
        this.calculationChangeForResult()
        const common_disable = this.isRenewal()
        this.setState({
            intermediary_disabled: common_disable,
            galleryful_disabled: common_disable,
        })
    }
    componentWillUnmount() {
    }
    /**
     * 重置表单
     */
    @Bind()
    resetForm(){
        this.props.form.resetFields()
    }

    /**
     * 上一步
     */
    prevStep() {
        utils.Router.switchRoute(`/order/office/${this.props.params.sourceType}/info/create/step1${this.props.location.search}`)
    }
    /**
     * 下一步
     */
    @Bind()
    nextStep() {
        utils.Router.switchRoute(`/order/office/${this.props.params.sourceType}/info/create/step3${this.props.location.search}`)
    }
    //用户搜索
    fetchUser(value) {
        this.setState({ user_data: [], fetching: true });
        setTimeout(() => {
            this.setState({
                user_data: [{text: '这是搜索用户的名称', value: 1}],
                fetching: false
            })
        }, 100)
    }
    handleChange(e) {
    }
    /**
     * 根据是否通过中介方式，生成对应的押付方式
     *
     * 获取系统配置中的默认押付方式作为除了其他之外的选项

     * 当选择是否中介成交为是，或者选择了成交人数大于等于50人时，获取系统配置-办公服务订单配置『通过中介成交，或成交人数大于等于50人』的数据
     * 当选择是否中介成交为否，且成交人数小于50人时，获取『通过非中介成交，且成交人数小于50人』
     */
    patternRadiosreate() {
        const { getFieldValue } = this.props.form;
        const is_intermediary = getFieldValue('is_intermediary')
        const galleryful_scale = getFieldValue('galleryful_scale')
        const { orderCreateState, orderCreateStateFetch, dispatch } = this.props;
        const {orderOfficeSetting} = orderCreateStateFetch
        if (is_intermediary === 1 || galleryful_scale === 2) {
            // 通过中介成交
            if (!orderOfficeSetting.pattern_one) {
                return
            }
            // dispatch({
            //     type: 'order_create_step_fetch',
            //     data: {
            //         paySettingsArr: orderOfficeSetting.pattern_one
            //     }
            // })
            return (
                <Row>
                    {orderOfficeSetting.pattern_one.map(value => (<Col xs={24} sm={24} md={8} lg={6} key={value.id}>
                        <Radio value={value.id} key={value.id}>押{value.deposit_month}付{value.pay_month} 提前{value.pre_pay_day}日交租</Radio>
                    </Col>))}
                </Row>
            )
        } else {
            // 非中介成交
            if (!orderOfficeSetting.pattern_two) {
                return
            }
            // dispatch({
            //     type: 'order_create_step_fetch',
            //     data: {
            //         paySettingsArr: orderOfficeSetting.pattern_two
            //     }
            // })
            return (
                <Row>
                    {orderOfficeSetting.pattern_two.map(value => (<Col xs={24} sm={24} md={8} lg={6} key={value.id}>
                        <Radio value={value.id} key={value.id}>押{value.deposit_month}付{value.pay_month} 提前{value.pre_pay_day}日交租</Radio>
                    </Col>))}
                </Row>
            )
        }
    }

    /**
     * 获取免租之后起止日期
     */
    getStartEndWithFree(obj) {
        const { getFieldsValue } = this.props.form;
        const { orderCreateState } = this.props;
        const {start_date, end_date} = orderCreateState
        if (!start_date && !end_date) {
            return
        }
        const start = moment(start_date.valueOf())
        const end = moment(end_date.valueOf())
        const freeContent = getFieldsValue(['free_type', 'free_days'])
        if (obj.free_days) {
            freeContent.free_days = obj.free_days
        }
        if (obj.free_type) {
            freeContent.free_type = obj.free_type
        }
        if (!freeContent.free_type) {
            return [start, end]
        }
        if (!freeContent.free_days) {
            return [start, end]
        }
        if (freeContent.free_type === 1) {
            return [start, end]
        } else if (freeContent.free_type === 2) {
            return [start.add(freeContent.free_days, 'days'), end]
        } else if(freeContent.free_type === 3) {
            return [start, end.subtract(freeContent.free_days, 'days')]
        } else {
            return [start, end]
        }
    }

    /**
     * 获取免租之后月
     */
    getMinRateTime() {
        const time = this.getStartEndWithFree()
        return time ? getStartEndMonth(time[0], time[1]): 0
    }

    /**
     * 根据月份获取最低年租金涨幅
     * @param month
     */
    getMinRentAdd(month){
        const {orderCreateStateFetch} = this.props
        const {orderOfficeSetting} = orderCreateStateFetch
        const {year} = orderOfficeSetting
        let u = year[0]
        for (let i=0;i< year.length; i++) {
            const value = year[i]
            if (Number(value.rent_month) < month && Number(value.rent_month) > Number(u.rent_month)) {
                u = value
            }
        }
        return u
    }
    /**
     * 最低月租金涨幅
     */
    minRateAddMonth() {
        const {dispatch} = this.props
        const diff = this.getMinRateTime()
        let str = null
        if (diff) {
            str = this.getMinRentAdd(diff)
        }
        return (
            <Fragment>
                {str &&  Number(str.rate)*100 + '%'}
            </Fragment>
        )
    }

    /**
     * 选项改变的时候，获取API返回的计算结果，必须所有的数据都获取到
     * @param e
     * @param type
     */
    @Debounce(400)
    @Bind()
    calculationChangeForResult(e, type) {
        const {orderCreateState, dispatch} = this.props
        const { getFieldsValue } = this.props.form;
        const allValue = getFieldsValue()
        if (e && type) {
            allValue[type] = e
        }
        const body = {}
        if (allValue.free_type && allValue.is_intermediary && allValue.galleryful_scale && allValue.discount_rate && allValue.contract_book_code && orderCreateState.start_date &&orderCreateState.end_date &&orderCreateState.tax_rate &&orderCreateState.min_discount) {
            // 如果免租类型为不免租，且免租时间填写后计算，否则return
            // if ('inc_rate' in allValue){
            //     if (allValue.inc_rate >=0) {
            //         return
            //     }
            // }
            // 押付方式
            if (allValue.deposit_payment === 0) {
                body.deposit_is_other = 1
                if (allValue.deposit_payment_ya && allValue.deposit_payment_fu && allValue.deposit_payment_ri){
                    body.deposit_payment = `${allValue.deposit_payment_ya}-${allValue.deposit_payment_fu}-${allValue.deposit_payment_ri}`
                } else {
                    return
                }
            } else {
                body.deposit_is_other = 0
                if (!orderCreateState.deposit_payment_all.length){
                    return
                }
                body.deposit_payment = orderCreateState.deposit_payment_all.join('-')
            }


            // 免租类型
            body.free_type = allValue.free_type
            if (allValue.free_type !== 1){
                if (isNaN(allValue.free_days)) {
                    return;
                }
                if(!allValue.free_days){
                    return;
                }
            }
            body.free_days = allValue.free_days || 0  //|| orderCreateState.year_rent_rate.rate
            // 是否中介. 2=非中介;1=是中介
            body.is_intermediary = allValue.is_intermediary
            // 中介成交人数. 1=0~49;2=50+
            body.galleryful_scale = allValue.galleryful_scale
            // 年涨幅比率,单位%
            body.inc_rate = allValue.inc_rate || orderCreateState.year_rent_rate.rate
            // 本单实际付款折扣，单位%
            body.discount_rate = allValue.discount_rate
            // 签订合同类型.1-服务合同6%;2=服务租凭合同10%
            body.contract_book_code = allValue.contract_book_code

            // 服务开始时间f
            body.start_date = orderCreateState.start_date.format('YYYY-MM-DD')
            // 服务结束时间
            body.end_date = orderCreateState.end_date.format('YYYY-MM-DD')
            // 合同税率
            body.tax_rate = orderCreateState.tax_rate
            // 租金折扣原始比率
            body.rent_discount_rate = orderCreateState.min_discount
            body.goods = orderCreateState.goods_list_select_data
            getOrderOfficeCompute(body, {
                40004: () => {
                    return
                }
            }).then(res => {
                if (res.code === 10000) {
                    dispatch({
                        type: 'modify_office_order_create',
                        data: {
                            orderOfficeCompute: res.data
                        }
                    })
                }
            })
        }
    }
    /**
     * 设置免租日期
     * @param obj
     */
    @Bind()
    setFreeStartEndTime(obj) {
        const { getFieldsValue } = this.props.form;
        const { orderCreateState, dispatch } = this.props;
        const {start_date, end_date} = orderCreateState
        if (!start_date && !end_date) {
            return
        }
        const start = moment(start_date.valueOf())
        const end = moment(end_date.valueOf())
        const freeContent = getFieldsValue(['free_type', 'free_days'])
        if (obj.free_days) {
            freeContent.free_days = obj.free_days
        }
        if (obj.free_type) {
            freeContent.free_type = obj.free_type
        }
        if (freeContent.free_type && freeContent.free_days) {
            if (freeContent.free_type === 2) {
                dispatch({
                    type: 'modify_office_order_create',
                    data: {
                        free_start_data: start_date.format('YYYY年MM月DD日'),
                        // 订单免租结束日期
                        free_end_data: start.add(freeContent.free_days-1, 'days').format('YYYY年MM月DD日'),
                    }
                })
            } else if(freeContent.free_type === 3){
                dispatch({
                    type: 'modify_office_order_create',
                    data: {
                        free_start_data: end.subtract(freeContent.free_days-1, 'days').format('YYYY年MM月DD日'),
                        // 订单免租结束日期
                        free_end_data: end_date.format('YYYY年MM月DD日')
                    }
                })
            }
        }
    }
    /**
     * 免租设置发生改变 change
     */
    @Bind()
    setFreeTypeChange(e, type) {
        /**
         * 设置免租日期
         */
        const { dispatch, orderCreateStateFetch, orderCreateState  } = this.props;
        const {orderOfficeSetting} = orderCreateStateFetch
        const {year, basic} = orderOfficeSetting
        let obj = {}
        obj[type] = e
        this.setFreeStartEndTime(obj)
        // 获取实际订单日期
        const timeArr = this.getStartEndWithFree(obj)
        if (!timeArr) {return}
        // 统计总和
        // const month = getStartEndMonth(orderCreateState.start_date, orderCreateState.end_date)
        // const _u = getMaxRentAddUtil(month, year)
        // const _b = getMinRentAddUtil(month, basic)
        dispatch({
            type: 'modify_office_order_create',
            data: {
                actual_start_data: timeArr[0],
                actual_end_data: timeArr[1],
                // year_rent_rate: _u,
                // basic_rent_rate: _b,
            }
        })
        // 计算
        this.calculationChangeForResult(e, type)

    }
    /**
     * 押付方式发生改变回调
     */
    @Bind()
    setPayChange(e) {
        const {orderCreateStateFetch, dispatch} = this.props
        const {orderOfficeSetting} = orderCreateStateFetch
        const { getFieldValue } = this.props.form;
        const is_intermediary = getFieldValue('is_intermediary')
        const galleryful_scale = getFieldValue('galleryful_scale')
        let paySettingsArr
        if (is_intermediary === 1 || galleryful_scale === 2) {
            paySettingsArr = orderOfficeSetting.pattern_one
        } else {
            paySettingsArr = orderOfficeSetting.pattern_two
        }
        if (e.target.value === 0) {
            dispatch({
                type: 'modify_office_order_create',
                data: {
                    min_discount: 100,
                    discount_rate: 100
                }
            })
            return
        }
        paySettingsArr.map(value => {
            if (e.target.value === value.id) {
                dispatch({
                    type: 'modify_office_order_create',
                    data: {
                        min_discount: Number(value.min_discount),
                        discount_rate: Number(value.min_discount),
                        deposit_payment_all: [value.deposit_month, value.pay_month, value.pre_pay_day]
                    }
                })
            }
        })
        // 计算
        this.calculationChangeForResult(e.target.value, 'deposit_payment')
    }
    /**
     * 服务合同选择
     */
    @Bind()
    selectTax(e) {
        const { dispatch, orderCreateState} = this.props
        orderCreateState.contract_order.map(value => {
            if (value.code === e) {
                dispatch({
                    type: 'modify_office_order_create',
                    data: {
                        tax_rate: value.tax_rate
                    }
                })
            }
        })
        // 计算
        this.calculationChangeForResult(e, 'contract_book_code')
    }
    @Bind()
    handleSubmit(e) {
        e.preventDefault();
        const {dispatch, orderCreateState} = this.props
        this.props.form.validateFieldsAndScroll((err, values) => {
            e.preventDefault();
            if (!err) {
                if (!orderCreateState.orderOfficeCompute) {
                    message.error('请检查输入是否正确');
                    return
                }
                const params = {
                    // 合同类型
                    contract_book_code: values.contract_book_code,
                    //押付方式
                    deposit_payment: Number(values.deposit_payment),
                    //本单实际付款折扣
                    discount_rate: values.discount_rate,
                    // 是否通过中介
                    is_intermediary: values.is_intermediary,

                    //免租类型
                    free_type: values.free_type,
                    //成交人数
                    galleryful_scale: values.galleryful_scale,
                    //实际涨幅
                    inc_rate: values.inc_rate || orderCreateState.year_rent_rate.rate,
                }
                if (values.deposit_payment === 0) {
                    params.deposit_is_other = 1
                } else {
                    params.deposit_is_other = 0
                }
                if (values.free_type !== 0) {
                    params.free_days = values.free_days
                }
                if (values.integral) {
                    if (values.integral.integral) {
                        params.present_credits = values.integral.integral
                    }
                    if (values.integral.printer_paper) {
                        params.present_prints = values.integral.printer_paper
                    }
                }
                if (values.deposit_payment_fu) {
                    params.deposit_payment_fu = values.deposit_payment_fu
                }
                if (values.deposit_payment_ri) {
                    params.deposit_payment_ri = values.deposit_payment_ri
                }
                if (values.deposit_payment_ya) {
                    params.deposit_payment_ya = values.deposit_payment_ya
                }
                if (values.deposit_payment_fu && values.deposit_payment_ri && values.deposit_payment_ya && values.deposit_payment === 0) {
                    params.deposit_payment_all = [values.deposit_payment_ya, values.deposit_payment_fu, values.deposit_payment_ri]
                }
                dispatch({
                    type: 'modify_office_order_create',
                    data: params
                })
                dispatch({
                    type: 'modify_office_order_create',
                    data: {
                        current: setStepsCurrent(2, orderCreateState.current)
                    }
                })
                utils.Router.switchRoute(`/order/office/${this.props.params.sourceType}/info/${this.props.params.type}/${this.props.params.code}/step3${this.props.location.search}`)
            }
        });
    }
    /**
     * 判断是否是创建/续租
     */
    isRenewal() {
        return this.props.params.type === 'renewal'
    }
    /**
     * 设置免租期宽度
     */
    setFreeTypeSpan() {
        const { getFieldValue } = this.props.form;
        const free_type = getFieldValue('free_type')
        if (free_type === 1) {
            return {
                lg: 24,
                md: 24,
                sm: 24,
                xs: 24
            }
        } else {
            return {
                lg: 8,
                md: 24,
                sm: 24,
                xs: 24
            }
        }
    }
    /**
     * 设置免租期最大时长
     */
    @Bind()
    startEndDays() {
        const {orderCreateState} = this.props
        const {start_date,end_date} = orderCreateState
        const max_day = startEndDays(start_date, end_date)
        const max_default_day = 365
        if (!max_day){
            return max_default_day
        }
        if (max_day> max_default_day) {
            return max_default_day
        } else {
            return max_day
        }
    }
    render(){
        const { getFieldDecorator, getFieldsValue, getFieldValue, setFieldsValue } = this.props.form;
        const formItemLayout = {
            // labelCol: {
            //     xs: 24,
            // },
            // wrapperCol: {
            //     xs: 24,
            // },
        };
        const { orderCreateState, orderCreateStateFetch } = this.props;
        const {orderOfficeSetting} = orderCreateStateFetch
        return (
            <Fragment>
                {orderOfficeSetting && (
                    <Form className="mxj-order-common-form" onSubmit={this.handleSubmit}>
                        <DetailBox title='设置免租信息' dividerType={2} mainStyle={{marginBottom: 32}}>
                            <Row>
                                <Col {...this.setFreeTypeSpan()}>
                                    {/*免租设置*/}
                                    <Form.Item {...formItemLayout} label="免租设置" className='mxj-margin-bottom-16'>
                                        {getFieldDecorator('free_type', {
                                            rules: [
                                                { required: true, message: '请选择组织!'},
                                            ],
                                            initialValue: orderCreateState.free_type,
                                        })(
                                            <RadioGroup onChange={(e) => {
                                                this.setFreeTypeChange(e.target.value, 'free_type')
                                            }}>
                                                {
                                                    orderOfficeSetting.office_order_create.no_free_rent
                                                    && (<Radio value={1}>不免租</Radio>)
                                                }
                                                {
                                                    orderOfficeSetting.office_order_create.after_free_rent
                                                    && (<Radio value={3}>后置免租</Radio>)
                                                }
                                                {
                                                    orderOfficeSetting.office_order_create.before_free_rent
                                                    && (<Radio value={2}>前置免租</Radio>)
                                                }


                                            </RadioGroup>
                                        )}
                                    </Form.Item>
                                </Col>
                                {
                                    getFieldValue('free_type') !== 1 && (
                                        <Fragment>
                                            <Col lg={8} md={24} sm={24}  xs={24}>
                                                {/*免租时长*/}
                                                <Form.Item {...formItemLayout} label="免租时长" className='mxj-margin-bottom-16'>
                                                    {getFieldDecorator('free_days', {
                                                        rules: [
                                                            { required: true,
                                                                validator: (rule, value, callback) => {
                                                                    if (!value){
                                                                        callback('请输入免租时长')
                                                                        return
                                                                    }
                                                                    if (value<=0){
                                                                        callback('免租时长不能小于0')
                                                                        return
                                                                    }
                                                                    if (value>=366){
                                                                        callback('免租时长不能大于一年')
                                                                        return
                                                                    }
                                                                    callback()
                                                                }},
                                                        ],
                                                        initialValue: orderCreateState.free_days,
                                                    })(
                                                        <InputNumber onChange={(e) => {
                                                            this.setFreeTypeChange(e, 'free_days')
                                                        }} min={1} max={this.startEndDays()}/>
                                                    )}
                                                </Form.Item>
                                            </Col>

                                            <Col lg={8} md={24} sm={24}  xs={24}>
                                                {/*免租周期*/}
                                                <Form.Item {...formItemLayout} label="免租周期" className='mxj-margin-bottom-16'>
                                                    <span>{orderCreateState.free_start_data}-{orderCreateState.free_end_data}</span>
                                                </Form.Item>
                                            </Col>
                                        </Fragment>
                                    )
                                }

                            </Row>
                        </DetailBox>
                        {/*这期不做*/}
                        {/*<DetailBox title='办公服务押金' dividerStyle={{margin: '11px 0 24px'}} mainStyle={{marginBottom: 16}}>*/}
                        {/*</DetailBox>*/}
                        <DetailBox title='选择其他服务内容' dividerType={2} mainStyle={{marginBottom: 32}}>
                            {/*是否通过中介成交*/}
                            <Form.Item label="是否通过中介成交" style={{width: '100%'}}>
                                {getFieldDecorator('is_intermediary', {
                                    rules: [
                                        { required: true, message: '请选择是否通过中介成交!' },
                                    ],
                                    initialValue: orderCreateState.is_intermediary
                                })(
                                    <RadioGroup disabled={this.state.intermediary_disabled} onChange={e => {
                                        // 计算
                                        if (e.target.value === 1) {
                                            setFieldsValue({
                                                galleryful_scale: 2
                                            })
                                        } else {
                                            setFieldsValue({
                                                galleryful_scale: 1
                                            })
                                        }
                                        setFieldsValue({
                                            deposit_payment: null
                                        })
                                        this.calculationChangeForResult(e.target.value, 'is_intermediary')
                                    }}>
                                        <Radio value={1}>是</Radio>
                                        <Radio value={2}>否</Radio>
                                    </RadioGroup>
                                )}
                            </Form.Item>
                            {/*成交人数*/}
                            <Form.Item label="成交人数">
                                {getFieldDecorator('galleryful_scale', {
                                    rules: [
                                        { required: true, message: '请选择成交人数!' },
                                    ],
                                    initialValue: orderCreateState.galleryful_scale
                                })(
                                    <RadioGroup disabled={true}  onChange={e => {
                                        // 计算
                                        this.calculationChangeForResult(e.target.value, 'galleryful_scale')
                                    }}>
                                        <Radio value={2}>大于等于50人</Radio>
                                        <Radio value={1}>小于50人</Radio>
                                    </RadioGroup>
                                )}
                            </Form.Item>
                            {/*押付方式*/}
                            <Form.Item label="押付方式">
                                {getFieldDecorator('deposit_payment', {
                                    rules: [
                                        { required: true, message: '请选择押付方式!' },
                                    ],
                                    initialValue: orderCreateState.deposit_payment
                                })(
                                    <RadioGroup onChange={this.setPayChange} style={{width: '100%'}}>
                                        {/*根据中介成交方式改变押付方式*/}
                                        {this.patternRadiosreate()}
                                        <Row>
                                            <Col span={24} className='mxj-other-pay'>
                                                <Radio style={{lineHeight: '40px'}} value={0}>其他</Radio>
                                                {
                                                    getFieldValue('deposit_payment') === 0 && (
                                                        <span className='pinkWarn'>如果选择其他方式需要进行审核</span>
                                                    )
                                                }

                                            </Col>
                                        </Row>
                                    </RadioGroup>
                                )}
                            </Form.Item>
                            {getFieldValue('deposit_payment') === 0 ? (
                                <div className='mxj-other-pay'>
                                    <Form.Item label="其他押付方式" required><span style={{margin: '0 10px'}}>押</span></Form.Item>
                                    <div>
                                        <Form.Item style={{marginBottom: 0}}>
                                            {getFieldDecorator('deposit_payment_ya', {
                                                rules: [
                                                    {required: true, message: '请选择押付!'},
                                                ],
                                                initialValue: orderCreateState.deposit_payment_ya
                                            })(
                                                <Select style={{width: 100}} onChange={e => {
                                                    // 计算
                                                    this.calculationChangeForResult(e, 'deposit_payment_ya')
                                                }}>
                                                    <Option value={1}>1</Option>
                                                    <Option value={2}>2</Option>
                                                    <Option value={3}>3</Option>
                                                    <Option value={4}>4</Option>
                                                    <Option value={5}>5</Option>
                                                    <Option value={6}>6</Option>
                                                    <Option value={7}>7</Option>
                                                    <Option value={8}>8</Option>
                                                    <Option value={9}>9</Option>
                                                    <Option value={10}>10</Option>
                                                    <Option value={11}>11</Option>
                                                    <Option value={12}>12</Option>
                                                </Select>
                                            )
                                            }
                                        </Form.Item>
                                    </div>
                                    <span style={{margin: '0 10px', lineHeight: '40px'}}>付</span>
                                    <span>
                                    <Form.Item style={{marginBottom: 0}}>
                                        {getFieldDecorator('deposit_payment_fu', {
                                            rules: [
                                                {required: true, message: '请选择押付!'},
                                            ],
                                            initialValue: orderCreateState.deposit_payment_fu
                                        })(
                                            <Select style={{width: 100}} onChange={e => {
                                                // 计算
                                                this.calculationChangeForResult(e, 'deposit_payment_fu')
                                            }}>
                                                <Option value={1}>1</Option>
                                                <Option value={2}>2</Option>
                                                <Option value={3}>3</Option>
                                                <Option value={4}>4</Option>
                                                <Option value={5}>5</Option>
                                                <Option value={6}>6</Option>
                                                <Option value={7}>7</Option>
                                                <Option value={8}>8</Option>
                                                <Option value={9}>9</Option>
                                                <Option value={10}>10</Option>
                                                <Option value={11}>11</Option>
                                                <Option value={12}>12</Option>
                                            </Select>
                                        )
                                        }
                                    </Form.Item>

                                </span>
                                    <span style={{margin: '0 10px', lineHeight: '40px'}}>提前</span>
                                    <span>
                                    <Form.Item style={{marginBottom: 0}}>
                                        {getFieldDecorator('deposit_payment_ri', {
                                            rules: [
                                                {required: true, message: '请输入提前多少日交租!'},
                                            ],
                                            initialValue: orderCreateState.deposit_payment_ri
                                        })(
                                            <InputNumber onChange={e => {
                                                // 计算
                                                this.calculationChangeForResult(e, 'deposit_payment_ri')
                                            }}/>
                                        )
                                        }
                                    </Form.Item>
                                </span>
                                    <span style={{margin: '0 10px', lineHeight: '40px'}}>日交租</span>
                                </div>
                            ): null}
                            {
                                startEndYears(orderCreateState.start_date, orderCreateState.end_date)>=1 && (
                                    <Row>
                                        <Col lg={8} xs={24} md={24}>
                                            <Form.Item label="最低租金年涨幅">
                                                <span className={''}>{orderCreateState.year_rent_rate ? (Number(orderCreateState.year_rent_rate.rate) + '%'): 0}</span>
                                            </Form.Item>
                                        </Col>
                                        <Col lg={8} xs={24} md={24}>
                                            <Form.Item label="实际涨幅">
                                                {getFieldDecorator('inc_rate', {
                                                    rules: [
                                                        { required: true, message: '请输入实际涨幅!' },
                                                    ],
                                                    initialValue: orderCreateState.year_rent_rate ? Number(orderCreateState.year_rent_rate.rate) : 0
                                                })(
                                                    <InputNumber min={0} max={100} formatter={value => `${value}%`}
                                                                 parser={value => value.replace('%', '')}
                                                                 onChange={e => {
                                                                     // 计算
                                                                     this.calculationChangeForResult(e, 'inc_rate')
                                                                 }}
                                                    />

                                                )}
                                            </Form.Item>
                                        </Col>
                                        {
                                            (orderCreateState.orderOfficeCompute && orderCreateState.orderOfficeCompute.price_increase_date)&&(
                                                <Col lg={8} xs={24} md={24}>
                                                    <Form.Item label="涨价日期">
                                                        <span className={''}>{orderCreateState.orderOfficeCompute && orderCreateState.orderOfficeCompute.price_increase_date}</span>
                                                    </Form.Item>
                                                </Col>
                                            )
                                        }
                                    </Row>
                                )
                            }

                            <Form.Item label="实现报价基础上浮比例" style={{width: '100%'}}>
                                <span className={''}>{orderCreateState.basic_rent_rate? (Number(orderCreateState.basic_rent_rate.rate) + '%'): 0}</span>
                                {/*<span className={'pinkWarn'}>根据服务期时长，如果上浮比例低于6%，需要发起审核</span>*/}
                            </Form.Item>
                            <Form.Item label="配送积分配额">
                                {getFieldDecorator('integral', {
                                    initialValue: {
                                        integral: orderCreateState.present_credits,
                                        printer_paper: orderCreateState.present_prints,

                                    }
                                })(
                                    <IntegralView style={{width: 396}}></IntegralView>

                                )}
                                {/*<span className={'pinkWarn'}>如果您修改了默认积分配额数，需要进行审</span>*/}
                            </Form.Item>
                            <Row gutter={16}>
                                <Col lg={8} xs={24} md={24}>
                                    <Form.Item label="最低租金付款折扣">
                                        <span className={''}>{orderCreateState.min_discount && orderCreateState.min_discount} %</span>
                                    </Form.Item>
                                </Col>
                                <Col lg={16} xs={24} md={24}>
                                    <Form.Item label='本单实际付款折扣'>
                                        {getFieldDecorator('discount_rate', {
                                            rules: [
                                                { required: true, message: '请输入本单实际付款折扣!' },
                                            ],
                                            initialValue: orderCreateState.discount_rate
                                        })(
                                            <InputNumber onChange={e => {
                                                // 计算
                                                this.calculationChangeForResult(e, 'discount_rate')
                                            }} style={{width: 120}}  min={0} max={100} formatter={value => `${value}%`}/>

                                        )}
                                        {/*<span className={'pinkWarn'}>如果您填写的折扣低于最高租金付款折扣，需要进行审核</span>*/}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col lg={8} xs={24} md={24}>
                                    <Form.Item label="选择签订合同">
                                        {getFieldDecorator('contract_book_code', {
                                            rules: [
                                                { required: true, message: '请选择签订合同类型' },
                                            ],
                                            initialValue: orderCreateState.contract_book_code
                                        })(
                                            <Select placeholder="请选择合同类型" onChange={this.selectTax} style={{width: '60%'}}>
                                                {orderCreateState.contract_order.map(value => <Option value={value.code} key={value.code}>{value.name}</Option>)}
                                            </Select>

                                        )}
                                    </Form.Item>
                                </Col>
                                <Col lg={16} xs={24} md={24}>
                                    <Form.Item label='税率' required>
                                        <span>{orderCreateState.tax_rate}%</span>
                                    </Form.Item>
                                </Col>
                            </Row>
                            {
                                orderCreateState.orderOfficeCompute ? (
                                    <Row gutter={16}>
                                        <Col lg={8} xs={24} md={24}>
                                            <Form.Item label='办公服务押金' required>
                                                <span>{changeNumberPriceDiff(orderCreateState.orderOfficeCompute.office_deposit_amount) || 0} 元</span>
                                            </Form.Item>
                                        </Col>
                                        <Col lg={8} xs={24} md={24}>
                                            <Form.Item label='押金总额' required>
                                                <span>{changeNumberPriceDiff(orderCreateState.orderOfficeCompute.deposit_all_price) || 0} 元</span>
                                            </Form.Item>
                                        </Col>
                                        <Col lg={8} xs={24} md={24}>
                                            <Form.Item label='有效租金' required>
                                                <span>{changeNumberPriceDiff(orderCreateState.orderOfficeCompute.effective_rent) || 0} 元</span>
                                            </Form.Item>
                                        </Col>
                                        <Col lg={8} xs={24} md={24}>
                                            <Form.Item label='税金差额' required>
                                                <span>{changeNumberPriceDiff(orderCreateState.orderOfficeCompute.tax_diff_price) || 0} 元</span>
                                            </Form.Item>
                                        </Col>
                                        <Col lg={8} xs={24} md={24}>
                                            <Form.Item label='最终商品成交总价格' required>
                                                <span>{changeNumberPriceDiff(orderCreateState.orderOfficeCompute.changed_all_price) || 0} 元</span>
                                            </Form.Item>
                                        </Col>
                                        <Col lg={8} xs={24} md={24}>
                                            <Form.Item label='订单最终成交价格' required>
                                                <span>{changeNumberPriceDiff(orderCreateState.orderOfficeCompute.charge_all_price) ||0} 元</span>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                ): null
                            }
                            <Form.Item>
                                <div className='mxj-flex-center mxj-margin-top-40'>
                                    <Button className='mxj-margin-right-16' onClick={cancelOrder}>取消</Button>
                                    <Button className='mxj-f7f7f7-bg mxj-margin-right-16' onClick={this.resetForm}>重置</Button>
                                    <Button className='mxj-margin-right-16' type="primary" onClick={backTo} ghost>上一步</Button>
                                    <Button className='mxj-margin-right-16' type="primary" htmlType="submit">下一步</Button>
                                </div>
                            </Form.Item>
                        </DetailBox>
                    </Form>
                )}

            </Fragment>

        )
    }

}
export default OrderOfficeStep01
