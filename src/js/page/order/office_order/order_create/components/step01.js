import React, { Component, PropTypes,Fragment } from 'react';
import { connect } from 'react-redux';
import Bind from 'lodash-decorators/bind';
import SelectInputGroup from '../../common/selectInputGroup'
import EditableTable from './canEditTableView'
import Debounce from 'lodash-decorators/debounce';
import moment from 'moment'
import AddGoodsItem from './addGoodsItem'
import {getUserOrganizationList, getGoodsInfoList} from '@api/order'
import {arrayCnt, changeNumberPriceDiff} from '@/js/asset/common'
import DescriptionList from '@/js/components/modules/descriptionList'
const { Description } = DescriptionList
import {
    Form,
    Input,
    Button,
    Select,
    Spin,
    Col,
    message,
    Modal,
    AutoComplete,
    Divider,
    Skeleton,
    Icon,
    DatePicker,
    Row} from 'antd'
import DetailBox from '@/js/components/modules/detailBox/index'
import utils from '@/js/asset/index'
import {getStartEndMonth, getMinRentAddUtil,getMaxRentAddUtil, getDateText, getLocationNumber, getGoodsNumber, cancelOrder, setStepsCurrent, memberTypeText, timeDiff, startEndDays, setDefaultGoods} from '../utils'
const Option = Select.Option;
const confirm = Modal.confirm;

@connect(({ orderCreateState, orderCreateStateFetch }) => ({
    data: orderCreateState,
    orderCreateStateFetch,
}))
@Form.create()
class OrderOfficeStep01 extends Component{
    constructor(props){
        super(props);
        this.state = {
            //组织搜索
            fetching: false,
            //商品搜索
            goods_fetching: false,
            table_fetching: false,
            endOpen: false,
            page: 1,
            per_page: 10,
            editingKey: '',
            goodsData: [],
            dataSource: [],
        }
        this.addGoodsItemRef = React.createRef()
        this.canEditorTableView = React.createRef()
    }

    /**
     * 批量删除
     * @returns {Promise<any | void>}
     */
    @Debounce(400)
    @Bind()
    deleteGoodsListMore() {
        const that = this
        confirm({
            title: '是否删除全部选中的商品?',
            onOk() {
                return new Promise((resolve, reject) => {
                    const selectRowKeys = that.canEditorTableView.current.getSelectedRowKeys()
                    const {data, dispatch} = that.props
                    const {goods_list_select_data, goods_list_select} = data
                    for(let i = 0; i< goods_list_select_data.length; i++) {
                        const value = goods_list_select_data[i]
                        if (selectRowKeys.indexOf(value.key) > -1) {
                            goods_list_select_data.splice(i, 1)
                            i--;
                        }
                    }
                    // goods_list_select_data.map((value, index) => {
                    //
                    // })
                    dispatch({
                        type: 'modify_office_order_create',
                        data: {
                            goods_list_select_data,
                            goods_list_select: goods_list_select_data
                        }
                    })
                    // 向选择商品展示区更改数据
                    that.canEditorTableView.current.deleteMoreList(selectRowKeys)
                    // 向筛选区更改选中数据
                    that.addGoodsItemRef.current.deleteMoreList(selectRowKeys)
                    resolve()
                }).catch((e) => console.log(e));
            },
            onCancel() {},
        });
    }

    /**
     * 清除选择
     */
    @Bind()
    clearAllSelectOperation(){
        this.canEditorTableView.current.deleteMoreList([])
    }
    /**
     * 重置表单
     */
    @Bind()
    resetForm(){
        const {dispatch, params, data} = this.props
        this.props.form.resetFields()
        // 重置商品显示区数据
        // 分为创建 续租
        if (params.type === 'create'){
            dispatch({
                type: 'modify_office_order_create',
                data: {
                    selectTableCheckData: [],
                    selectTableCheckNumber: 0,
                    selectedRowKeys: [],
                    goods_list_select: [],
                    // 创建页商品数据
                    goods_list_select_data: [],
                }
            })
            dispatch({
                type: 'order_create_step_fetch',
                data: {
                    addGoodsItemSelectRowKeys: [],
                }
            })
            this.addGoodsItemRef.current.setSelectedRowKeys()
        } else {
            const addGoodsItemSelectRowKeys = []
            const goods = setDefaultGoods(data.renewalValue.goods, (value) => {
                addGoodsItemSelectRowKeys.push(value.code)
            })
            dispatch({
                type: 'modify_office_order_create',
                data: {
                    selectTableCheckData: [],
                    selectTableCheckNumber: 0,
                    selectedRowKeys: [],
                    goods_list_select: goods,
                    // 创建页商品数据
                    goods_list_select_data: goods,
                }
            })
            dispatch({
                type: 'order_create_step_fetch',
                data: {
                    addGoodsItemSelectRowKeys: addGoodsItemSelectRowKeys,
                }
            })
            this.addGoodsItemRef.current.setSelectedRowKeys(addGoodsItemSelectRowKeys)
        }

    }
    /**
     * 下一步
     */
    @Bind()
    nextStep(e) {
        this.props.form.validateFieldsAndScroll((err, values) => {
            e.preventDefault();
            if (!err) {
            }
        });
    }

    /**
     * 搜索组织名称
     * @param value
     */
    @Debounce(400)
    @Bind()
    fetchUser(value) {
        const {dispatch} = this.props

        const {getFieldValue} = this.props.form
        // 获取组织类型 后续接口需要使用到这里
        const get_parmas = {
            name: value
        }
        const member_type = getFieldValue('member_type')
        if (member_type) {
            get_parmas.type_id = member_type
        }
        this.setState({ fetching: true });
        getUserOrganizationList(get_parmas).then(res => {
            if (res.code === 10000) {
                dispatch({
                    type: 'modify_office_order_create',
                    data: {
                        member_user_data: res.data.data
                    }
                })
                this.setState({
                    fetching: false
                })
            }
        })
    }
    @Bind()
    handleChange(e) {
        const {getFieldValue, setFieldsValue} = this.props.form
        const member_type = getFieldValue('member_type')
        const this_value = e.split(',')
        const {dispatch, data} = this.props
        // if (parseInt(this_value[1]) !== member_type) {
        //     setFieldsValue({
        //         'member_type': parseInt(this_value[1])
        //     })
        // }
        const {member_user_data} = data
        member_user_data.map(value => {
            if (value.id === parseInt(this_value[0])){
                dispatch({
                    type: 'modify_office_order_create',
                    data: {
                        invoice_title: value.name,
                        taxpayer_number: value.taxpayer_registration_number,
                        bill_email: value.owner_email,
                    }
                })
            }
        })

    }

    /**
     * 设置开始时间结束时间间隔
     */
    @Bind()
    setStartEndGaps(){
        const {orderCreateStateFetch} = this.props
        const {orderOfficeSetting} = orderCreateStateFetch
        let minMonth = 1
        if (orderOfficeSetting && orderOfficeSetting.office_order_create) {
            minMonth = orderOfficeSetting.office_order_create.min_rent_month || 1
        }
        return minMonth
    }
    /**
     * 订单开始日不可使用日期
     *
     */
    @Bind()
    disabledStartDate(startValue) {
        if ( startValue < moment().startOf('day')) {
            return true
        }
        const { getFieldValue } = this.props.form;
        const endValue = getFieldValue('end_date');
        if (!startValue || !endValue) {
            return false;
        }

        return startValue.valueOf() > moment(endValue).subtract(this.setStartEndGaps(), 'months').valueOf();
    }
    /**
     *
     * 订单结束日不可使用日期
     */
    @Bind()
    disabledEndDate(endValue) {
        // if ( endValue < moment().endOf('day')) {
        //     return true
        // }
        if (endValue < moment().add(this.setStartEndGaps(), 'months').startOf('day')){
            return true
        }
        const { getFieldValue } = this.props.form;
        const startValue = getFieldValue('start_date');
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= moment(startValue).add(this.setStartEndGaps(), 'months').valueOf();
    }
    @Bind()
    handleStartOpenChange(open) {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }
    @Bind()
    handleEndOpenChange(open){
        this.setState({ endOpen: open });
    }
    /**
     *
     * 验证参数，下一步
     */
    @Bind()
    handleSubmit(e) {
        e.preventDefault();
        const {dispatch, data, orderCreateStateFetch} = this.props
        const {goods_list_select_data} = data
        const {orderOfficeSetting} = orderCreateStateFetch
        const {year, basic, renewal} = orderOfficeSetting
        const that = this
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // 最低租金年涨幅 start
                const _month = getStartEndMonth(values.start_date, values.end_date)
                const _u = getMaxRentAddUtil(_month, year)
                // 实现报价基础上浮比例
                const _b = getMinRentAddUtil(_month, basic)

                // 最低租金年涨幅 end
                if(that.props.params.type === 'create') {
                    dispatch({
                        type: 'modify_office_order_create',
                        data: {
                            member_type: values.member_type,
                            member_id: values.member_id,
                            start_date: values.start_date,
                            end_date: values.end_date,
                            actual_start_data: values.start_date,
                            actual_end_data: values.end_date,
                            year_rent_rate: _u,
                            basic_rent_rate: _b,
                        }
                    })
                } else if (that.props.params.type === 'renewal') {
                    const _renewal = getMinRentAddUtil(_month, renewal)
                    dispatch({
                        type: 'modify_office_order_create',
                        data: {
                            start_date: values.start_date,
                            end_date: values.end_date,
                            actual_start_data: values.start_date,
                            actual_end_data: values.end_date,
                            year_rent_rate: _u,
                            basic_rent_rate: _b,
                            renewal_rent_rate: _renewal
                        }
                    })
                }


                if (!goods_list_select_data.length) {
                    message.error('请选择商品');
                    return
                }
                dispatch({
                    type: 'modify_office_order_create',
                    data: {
                        current: setStepsCurrent(1, data.current)
                    }
                })
                utils.Router.switchRoute(`/order/office/${that.props.params.sourceType}/info/${that.props.params.type}/${that.props.params.code}/step2${this.props.location.search}`)

            }
        });
    }
    resetFieldsAll(e) {
        e.preventDefault();
        this.props.form.resetFields()
    }

    /**
     * 接收可编辑表单数据
     * @param e
     */
    @Bind()
    changeEditTableData(e){
        const {dispatch} = this.props
        dispatch({
            type: 'modify_office_order_create',
            data: {
                goods_list_select_data: e
            }
        })
    }


    /**
     * 搜索场地及商品列表
     */
    @Debounce(400)
    @Bind()
    handleSearchAuto(e){
        const {data} = this.props
        const {goods_list_select_data} = data
        const { getFieldValue } = this.props.form;
        const search_data = getFieldValue('member_search');
        const dataSource = this.filterGoodsList({ autoValue: search_data.autoValue, selectValue: search_data.selectValue})
        this.setState({
            dataSource
        })
    }

    /**
     * 获取商品所有列表数据
     */
    @Debounce(400)
    @Bind()
    getGoodsListAll() {
        const {data, dispatch} = this.props
        const { getFieldsValue } = this.props.form;
        const search_data = getFieldsValue(['member_search']); // order_city 添加城市筛选
        const search_prams = {}
        let filed_arr = []
        // if (search_data.order_city.cities) {
        //     search_prams.city_code = [search_data.order_city.cities]
        // }
        if (search_data.member_search.autoValue) {
            if (search_data.member_search.selectValue === '1') {
            //     商品编号
                search_prams.code = [search_data.member_search.autoValue]
            } else {
                search_prams.goods_name = [search_data.member_search.autoValue]
            }
        }
        this.canEditorTableView.current.setFilteredValue(search_prams)

        // const goods_list_select_data = this.filterGoodsList({cities: search_data.order_city.cities, autoValue: search_data.member_search.autoValue, selectValue: search_data.member_search.selectValue})
        // dispatch({
        //     type: 'modify_office_order_create',
        //     data: {
        //         goods_list_select_data
        //     }
        // })
    }

    /**
     *
     * @param obj {autoValue: '', cities: ''}
     */
    filterGoodsList(obj) {
        const {data} = this.props
        const {goods_list_select, goods_list_select_data} = data
        const {autoValue, cities, selectValue} = obj
        if (!autoValue && !cities) {
            return goods_list_select_data
        }
        return goods_list_select_data.filter(value => {
            let is_has = false
            if (autoValue) {
                if (selectValue === '1') {
                    is_has = (value.code.indexOf(autoValue) >= 0)
                } else {
                    is_has = (value.goods_name.indexOf(autoValue) >= 0)
                }

            }
            if (cities) {
                is_has = (cities === value.city)
            }
            return is_has
        })
    }

    /**
     * 可编辑表格 删除一条数据
     */
    @Bind()
    deleteOnceList(e) {
        this.addGoodsItemRef.current.deleteOnceList(e)
    }
    /**
     *
     * 渲染可编辑表单
     */
    renderTableData() {
        const {data} = this.props
        return (
            <EditableTable deleteOnceList={this.deleteOnceList} ref={this.canEditorTableView} selectedNum={data.selectTableCheckNumber} loading={this.state.table_fetching} {...this.props} tableData={data.goods_list_select_data}  onChange={this.changeEditTableData}></EditableTable>
        )
    }
    @Bind()
    setGoodsTableData(e) {
        this.setState({
            goodsData: e
        })
    }
    renderOptionName(item) {
        return (
            <AutoComplete.Option key={item.code} text={item.goods_name}>
                {item.goods_name}
            </AutoComplete.Option>
        );
    }
    renderOptionCode(item) {
        return (
            <AutoComplete.Option key={item.code} text={item.code}>
                {item.code}
            </AutoComplete.Option>
        );
    }
    renderDataSourceMap (dataSource) {
        const {getFieldValue} = this.props.form
        const type = getFieldValue('member_search')
        if (type.selectValue === '1') {
            return dataSource.map(this.renderOptionCode)
        } else {
            return dataSource.map(this.renderOptionName)
        }

    }
    /**
    * 获取计价服务期
    * */
    @Bind()
    getDateText(){
        const {getFieldsValue} = this.props.form
        const timeDate = getFieldsValue(['start_date', 'end_date'])
        const {start_date, end_date} = timeDate
        return getDateText(start_date, end_date)
    }
    @Bind()
    startEndDays() {
        const {getFieldsValue} = this.props.form
        const timeDate = getFieldsValue(['start_date', 'end_date'])
        const {start_date, end_date} = timeDate
        return startEndDays(start_date, end_date)
    }
    /**
     * 获取场地数量
     */
    getLocationNumber() {
        const {data} = this.props
        const {goods_list_select_data} = data
        return getLocationNumber(goods_list_select_data)

    }
    /**
     * 汇总商品数量及其对应商品类型数量
     */
    getGoodsNumber() {
        const {data} = this.props
        const {goods_list_select_data} = data
        // 统计商品类型
        return getGoodsNumber(goods_list_select_data)
    }

    getGoodsPriceTotal(type) {
        const {data} = this.props
        const {goods_list_select_data} = data
        let num = 0
        goods_list_select_data.map((value, index) => {
            num += Number(value[type])
        })
        return changeNumberPriceDiff(num)
    }

    /**
     * 组织类型改变，清空组织名称
     */
    clearOgName(e) {
        const {setFieldsValue} = this.props.form
        setFieldsValue({
            member_id: null
        })
    }
    /**
     * 渲染选择下单用户（创建订单，创建续租订单）
     *
     */
    renderMemberView( gutter, col_2_layout, data, getFieldDecorator){
        const {type} = this.props.params
        const {getFieldValue} = this.props.form
        const col_22_layout = {
            // span: 12
            xs: 24,
            sm: 24,
            md: 12
        }
        const formItemLayout = {
            labelCol: {
                md: 24,
                sm: 24,
                xs: 24,
                lg: 7
            },
            wrapperCol: {
                md: 24,
                sm: 24,
                xs: 24,
                lg: 10
            },
        };
        if (type === 'create'){
            // 创建订单
            return (
                <Form onSubmit={this.handleSubmit} className="mxj-order-common-form">
                    <Row type='flex' gutter={gutter}>
                        <Col {...col_2_layout}>
                            {/*组织用户选择*/}
                            <Form.Item label="组织类型" className='mxj-margin-bottom-16'>
                                {getFieldDecorator('member_type', {
                                    rules: [
                                        { required: true, message: '请选择组织类型!'},
                                    ],
                                    initialValue: data.member_type,
                                })(
                                    <Select placeholder="请选择用户类型" style={{width: '60%'}} onChange={(e) => {
                                        this.clearOgName(e)
                                    }}>
                                        <Option value={0}>请选择用户类型</Option>
                                        <Option value={1}>企业</Option>
                                        <Option value={2}>非企业</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col {...col_2_layout}>
                            {/*搜索用户名*/}
                            <Form.Item label="组织名称" className='mxj-margin-bottom-16'>
                                {getFieldDecorator('member_id', {
                                    rules: [
                                        { required: true, message: '请输入组织名称' },
                                    ],
                                    initialValue: data.member_id,
                                })(
                                    <Select
                                        disabled={getFieldValue('member_type')===0}
                                        showSearch
                                        style={{width: '60%'}}
                                        suffixIcon={<Icon
                                            type="search"
                                            style={{color: '#CCCCCC '}}
                                        />}
                                        placeholder="Select users"
                                        notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
                                        filterOption={false}
                                        onSearch={this.fetchUser}
                                        onChange={this.handleChange}
                                    >
                                        {data.member_user_data.map(d => <Option key={d.id} value={d.id+ ','+ d.type_id}>{d.name}</Option>)}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            )
        } else if(type === 'renewal') {
            // 创建续租订单
            return (
                <Skeleton active loading={!data.renewalValue}>
                    {data.renewalValue ? (
                        <DescriptionList col={3} size="small" title="" style={{ marginBottom: 0 }}>
                            <Description term={<span><span className='mxj-star'>*</span>组织类型</span>}>{memberTypeText(data.member_type)}</Description>
                            <Description term={<span><span className='mxj-star'>*</span>组织名称</span>}>{data.renewalValue.member_name}</Description>
                            <Description term={<span><span className='mxj-star'>*</span>原订单编码</span>}><a href={`/order/office/detail/${data.renewalValue.order_code}`}>{data.renewalValue.order_code}</a></Description>
                            <Description term={<span><span className='mxj-star'>*</span>原订单服务期</span>}><span className={'mxj-error-color'}>{data.renewalValue.start_at}至{data.renewalValue.end_at} {data.renewalValue.diff_service_date}</span></Description>
                            <Description term={<span><span className='mxj-star'>*</span>原订单成交总价</span>}>{changeNumberPriceDiff(data.renewalValue.charge_all_price)}元</Description>
                            <Description term={<span><span className='mxj-star'>*</span>距离订单截止日剩余</span>}>{timeDiff(data.renewalValue.end_date)}天</Description>
                        </DescriptionList>
                    ): null}

                </Skeleton>

            )
        }
    }
    /**
     * 判断页面类型
     */
    isRenewal() {
        return this.props.params.type === 'renewal'
    }

    setAddGoodsOpera(){
        const {params, data} = this.props
        const {getFieldValue } = this.props.form;
        if (params.type === 'renewal') {
            if (data.renewalValue) {
                return (
                    <Col xs={24} sm={24} lg={4}>
                        <Form.Item>
                            <AddGoodsItem start_date={getFieldValue('start_date') ? getFieldValue('start_date').format('YYYY-MM-DD'): null} end_date={getFieldValue('end_date')? getFieldValue('end_date').format('YYYY-MM-DD'): null} ref={this.addGoodsItemRef} onChange={this.setGoodsTableData} {...this.props} />
                        </Form.Item>
                    </Col>
                )
            }
            return null
        } else {
            return (
                <Col xs={24} sm={24} lg={4}>
                    <Form.Item>
                        {/*需要打开*/}
                        <AddGoodsItem start_date={getFieldValue('start_date') ? getFieldValue('start_date').format('YYYY-MM-DD'): null} end_date={getFieldValue('end_date')? getFieldValue('end_date').format('YYYY-MM-DD'): null} ref={this.addGoodsItemRef} onChange={this.setGoodsTableData} {...this.props} />
                    </Form.Item>
                </Col>
            )
        }

    }

    render(){
        const { getFieldDecorator, getFieldsValue, getFieldValue } = this.props.form;
        const {dataSource} = this.state
        const formItemLayout = {
            labelCol: {
                md: 24,
                sm: 24,
                xs: 24,
                lg: 7
            },
            wrapperCol: {
                md: 24,
                sm: 24,
                xs: 24,
                lg: 17
            },
        };
        const formItemLayoutBottom = {
            // labelCol: {
            //     span: 8
            // },
            // wrapperCol: {
            //     span: 16,
            // },
        }
        const gridLayout = {
            xs: 24,
            sm: 24,
            md: 12
        }
        const { data } = this.props;
        const col_2_layout = {
            // span: 12
            xs: 24,
            sm: 24,
            md: 12
        }
        const gutter = 16*3
        const searchOptions = [{
            value: '1',
            label: '商品编号'
        }, {
            value: '2',
            label: '商品名称'
        }]
        const autoCom= {
            allowClear: true
        }
        const bottomLayout = {
            labelCol: {
                xs: 24,
                sm: 6
            },
            wrapperCol: {
                xs: 24,
                sm: 18
            },
        }

        return (

            <div className={'mxj-order-office-info-step01'}>

                <DetailBox title='选择下单用户' dividerType={2}>
                    {this.renderMemberView(gutter, col_2_layout, data, getFieldDecorator)}
                </DetailBox>
                <DetailBox title='选择订单服务期' dividerType={2} mainStyle={{marginTop: 32}}>
                    <Form onSubmit={this.handleSubmit} className="mxj-order-common-form">
                    <Row gutter={gutter}>
                        <Col {...col_2_layout}>
                            {/*组织用户选择*/}
                            <Form.Item label="订单开始日">
                                {getFieldDecorator('start_date', {
                                    rules: [
                                        { required: true, message: '请选择订单开始日!' },
                                    ],
                                    initialValue: data.start_date,
                                })(
                                    <DatePicker
                                        disabled={this.isRenewal()}
                                        disabledDate={this.disabledStartDate}
                                        format="YYYY-MM-DD"
                                        placeholder="请选择日期和时间"
                                        onOpenChange={this.handleStartOpenChange}
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col {...col_2_layout}>
                            {/*搜索用户名*/}
                            <Form.Item label="订单截止日">
                                {getFieldDecorator('end_date', {
                                    rules: [
                                        { required: true, message: '请选择订单截止日' },
                                    ],
                                    initialValue: data.end_date,
                                })(
                                    <DatePicker
                                        disabledDate={this.disabledEndDate}
                                        open={this.state.endOpen}
                                        onOpenChange={this.handleEndOpenChange}
                                        format="YYYY-MM-DD"
                                        placeholder="请选择日期和时间"
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    </Form>
                </DetailBox>
                <DetailBox title='选择场地及商品' dividerType={2} mainStyle={{marginTop: 32}}>
                    <Form onSubmit={this.handleSubmit} layout='inline'>
                        <Row gutter={32}>
                            <Col sm={24} xs={24} lg={20} className='mxj-form-location' style={{display: 'flex'}}>
                                {/*组织用户选择*/}
                                <Form.Item className='mxj-auto-search-inline' style={{width: '100%'}}>
                                    {getFieldDecorator('member_search', {
                                        initialValue: {
                                            selectValue: '1',
                                            autoValue: '',
                                        }
                                    })(
                                        <SelectInputGroup
                                            autoCom
                                            style={{width: '100%', maxWidth: 350, marginRight: 16}}
                                            placeholder={'请选择商品编号或商品名称'}
                                            handleSearch={this.handleSearchAuto}
                                            options={searchOptions}
                                            className='mxj-margin-bottom-16'
                                            dataSource={this.renderDataSourceMap(dataSource)}
                                        />
                                    )}
                                    <Button type="primary" className='mxj-margin-bottom-16' onClick={this.getGoodsListAll} style={{marginRight: 16}}>
                                        查询
                                    </Button>
                                    <Button className='mxj-margin-bottom-16'  onClick={() => {
                                        this.props.form.resetFields(['member_search'])
                                        this.getGoodsListAll()
                                    }}>
                                        重置
                                    </Button>
                                </Form.Item>

                            </Col>
                            {/*<Col xl={10} lg={14} xs={24} sm={24} md={24} >*/}
                                {/*/!*组织用户选择*!/*/}
                                {/*<Form.Item label="订单城市" className=''>*/}
                                    {/*{getFieldDecorator('order_city', {*/}
                                        {/*initialValue: {},*/}
                                    {/*})(*/}
                                        {/*<MxjLocationCascaderForm style={{width: 180, height: 32}} selectType={['cities']} />*/}
                                    {/*)}*/}
                                {/*</Form.Item>*/}

                                {/*<Form.Item className=''>*/}
                                    {/*<Button type="primary" onClick={this.getGoodsListAll}>*/}
                                        {/*查询*/}
                                    {/*</Button>*/}
                                {/*</Form.Item>*/}
                            {/*</Col>*/}
                            {this.setAddGoodsOpera()}
                            {/*<Col xs={24} sm={24} lg={4}>*/}
                                {/*<Form.Item>*/}
                                    {/*<AddGoodsItem start_date={getFieldValue('start_date') ? getFieldValue('start_date').format('YYYY-MM-DD'): null} end_date={getFieldValue('end_date')? getFieldValue('end_date').format('YYYY-MM-DD'): null} ref='addGoodsItemRef' onChange={this.setGoodsTableData} {...this.props} />*/}
                                {/*</Form.Item>*/}
                            {/*</Col>*/}
                        </Row>
                    </Form>
                    <Row>
                        <Col>
                            <Button style={{marginRight: 16}} onClick={this.deleteGoodsListMore} className='mxj-margin-bottom-16'>批量删除</Button>
                            {/*<Button style={{marginLeft: 9}}>批量改价</Button>*/}
                            <Button className='mxj-margin-bottom-16' onClick={this.clearAllSelectOperation}>清除选择</Button>
                        </Col>
                    </Row>
                    {this.renderTableData()}
                    <Divider style={{margin: '24px 0 31px'}}/>
                    <DescriptionList col={2} size="small" title="" style={{ marginBottom: 0 }}>
                        <Description term={<span><span className='mxj-star'>*</span>计价服务期</span>}>{this.getDateText()}&nbsp;&nbsp;<span className='mxj-error-color'>({'共计：'+ this.startEndDays() + '天'})</span></Description>
                        <Description term={<span><span className='mxj-star'>*</span>涉及场地数量</span>}>{this.getLocationNumber()}</Description>
                        <Description term={<span><span className='mxj-star'>*</span>涉及商品数量</span>}>{this.getGoodsNumber()}</Description>
                        <Description term={<span><span className='mxj-star'>*</span>已选商品原总价汇总</span>}>{this.getGoodsPriceTotal('pre_price')}元/月</Description>
                        <Description term={<span><span className='mxj-star'>*</span>已选商品修改单价后总价汇总</span>}>{this.getGoodsPriceTotal('changed_price')}元/月</Description>
                    </DescriptionList>
                    <Form onSubmit={this.handleSubmit}>
                        {/*<Form.Item {...bottomLayout} label="计价服务期" required>*/}
                            {/*{this.getDateText()}*/}
                        {/*</Form.Item>*/}
                        {/*<Form.Item label="涉及场地数量" required {...bottomLayout}>*/}
                            {/*<span>{this.getLocationNumber()}个</span>*/}
                        {/*</Form.Item>*/}
                        {/*<Form.Item label="涉及商品数量" required {...bottomLayout}>*/}
                            {/*{this.getGoodsNumber()}*/}
                        {/*</Form.Item>*/}
                        {/*<Form.Item label="已选商品原总价汇总" required {...bottomLayout}>*/}
                            {/*<span>{this.getGoodsPriceTotal('sales_price')}元/月</span>*/}
                        {/*</Form.Item>*/}
                        {/*<Form.Item label="已选商品修改单价后总价汇总" required {...bottomLayout}>*/}
                            {/*<span>{this.getGoodsPriceTotal('changed_price')}元/月</span>*/}
                        {/*</Form.Item>*/}
                        {/*<Row className='mxj-order-bottom-form'>*/}
                            {/*/!*<Col {...gridLayout}>*!/*/}
                                {/*/!*<Form.Item label="已选商品原单价汇总" required>*!/*/}
                                    {/*/!*<span>9300元/月</span>*!/*/}
                                {/*/!*</Form.Item>*!/*/}
                            {/*/!*</Col>*!/*/}
                            {/*<Col {...gridLayout}>*/}
                                {/**/}
                            {/*</Col>*/}
                            {/*/!*<Col {...gridLayout}>*!/*/}
                                {/*/!*<Form.Item label="已选商品修改后单价汇总" required>*!/*/}
                                    {/*/!*<span>1111111元/月</span>*!/*/}
                                {/*/!*</Form.Item>*!/*/}
                            {/*/!*</Col>*!/*/}
                            {/*<Col {...gridLayout}>*/}
                                {/**/}
                            {/*</Col>*/}
                        {/*</Row>*/}
                        <Form.Item>
                            <div className='mxj-flex-center mxj-margin-top-40'>
                                <Button className='mxj-margin-right-16' onClick={cancelOrder}>取消</Button>
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
export default OrderOfficeStep01

