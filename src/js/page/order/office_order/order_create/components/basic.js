import React, { Component, PropTypes,Fragment } from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router";
import Bind from 'lodash-decorators/bind';
import SelectInputGroup from '../../common/selectInputGroup'
import EditableTable from './canEditTableView'
import Debounce from 'lodash-decorators/debounce';
import moment from 'moment'
import AddGoodsItem from './addGoodsItem'
import {getUserOrganizationList} from '@api/order'
import { statusColorClassName, statusText, changeNumberPriceDiff} from '@/js/asset/common'
import DescriptionList from '@/js/components/modules/descriptionList'
import {computeOrder} from '../../order_close/compute'
const { Description } = DescriptionList
const { TextArea } = Input;
import {
    Form,
    Input,
    Button,
    Col,
    message,
    Modal,
    AutoComplete,
    Divider,
    Skeleton,
    Row} from 'antd'
import DetailBox from '@/js/components/modules/detailBox/index'
import utils from '@/js/asset/index'
import {
    getLocationNumber,
    getGoodsNumber,
    cancelOrder,
    memberTypeText,
    setDefaultGoods
} from '../utils'
const confirm = Modal.confirm;
import {GoodsTableOnlyShow} from '../../common/goodsTable'
@connect(({ orderCreateState, orderCreateStateFetch, orderDetailCloseState }) => ({
    data: orderCreateState,
    orderCreateStateFetch,
    orderDetailCloseState
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
        this.canEditorTableView = React.createRef()
        this.addGoodsItemRef = React.createRef()
    }


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
     * 重置表单
     */
    @Bind()
    resetForm(){
        const {dispatch, params, orderDetailCloseState} = this.props
        this.props.form.resetFields()
        const addGoodsItemSelectRowKeys = []
        const disableSelectRow = []
        const goods = setDefaultGoods(orderDetailCloseState.detail.goods, (value) => {
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
                addGoodsItemSelectRowKeys,
            }
        })
        this.addGoodsItemRef.current.setSelectedRowKeys(addGoodsItemSelectRowKeys)
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
        // utils.Router.switchRoute('/order/office/create/step2')
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
        if (parseInt(this_value[1]) !== member_type) {
            setFieldsValue({
                'member_type': parseInt(this_value[1])
            })
        }
        const {member_user_data} = data
        member_user_data.map(value => {
            if (value.id === parseInt(this_value[0])){
                dispatch({
                    type: 'modify_office_order_create',
                    data: {
                        invoice_title: value.name,
                        taxpayer_number: value.taxpayer_registration_number
                    }
                })
            }
        })

    }
    /**
     * 订单开始日不可使用日期
     *
     */
    @Bind()
    disabledStartDate(startValue) {
        const { getFieldValue } = this.props.form;
        const endValue = getFieldValue('end_date');
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > moment(endValue).subtract(1, 'months').valueOf();
    }
    /**
     *
     * 订单结束日不可使用日期
     */
    @Bind()
    disabledEndDate(endValue) {
        const { getFieldValue } = this.props.form;
        const startValue = getFieldValue('start_date');
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= moment(startValue).add(1, 'months').valueOf();
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
        const {dispatch, data, orderCreateStateFetch, orderDetailCloseState, params} = this.props
        const that = this
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                if(data.goods_list_select_data.length === data.disableSelectRow.length){
                    if (that.props.params.type === 'add') {
                        message.error('请添加扩租的商品！');
                    } else {
                        message.error('请删除减租的商品！');
                    }
                    return
                }
                let add_goods = []
                if (that.props.params.type === 'add') {
                    data.goods_list_select_data.map(value => {
                        if(data.disableSelectRow.indexOf(value.code) < 0) {
                            add_goods.push(value)
                        }
                    })
                } else if (that.props.params.type === 'minus') {
                    add_goods = data.goods_list_select_data
                }
                if (!add_goods.length){
                    message.error('商品不能为空！');
                    return
                }
                dispatch({
                    type: 'order_office_close',
                    data: {
                        create_value: Object.assign(orderDetailCloseState.create_value, values),
                        success_step_1: true,
                        current: 1
                    }
                })
                await computeOrder(orderDetailCloseState.detail,add_goods ,orderDetailCloseState.start_at, dispatch, orderDetailCloseState.time_change.start_date)
                if (that.props.params.type === 'add') {
                    utils.Router.switchRoute(`/order/office/${this.props.params.sourceType}/alteration/${that.props.params.type}/${that.props.params.id}/step3`)
                } else {
                    utils.Router.switchRoute(`/order/office/${this.props.params.sourceType}/alteration/${that.props.params.type}/${that.props.params.id}/step2`)
                }


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
    @Bind()
    resetPageValue() {
        this.props.form.resetFields()
        const {dispatch} = this.props

        const {disableSelectRow, goods_list_select_data} = this.props.data
        let reset_value = goods_list_select_data.filter(value => {
            return disableSelectRow.indexOf(value.code)> -1
        })
        dispatch({
            type: 'modify_office_order_create',
            data: {
                goods_list_select_data: reset_value,
                goods_list_select:reset_value,
            }
        })
        dispatch({
            type: 'order_create_step_fetch',
            data: {
                addGoodsItemSelectRowKeys: disableSelectRow
            }
        })
    }
    /**
     * 删除某一行数据
     */
    @Bind()
    deleteOnceValue(index) {
        const {dispatch, orderDetailCloseState} = this.props
        const {goods_list_select_data} = this.props.data
        const delete_value = goods_list_select_data.splice(index, 1)
        orderDetailCloseState.delete_goods.push(delete_value[0])
        dispatch({
            type: 'modify_office_order_create',
            data: {
                goods_list_select_data
            }
        })
        dispatch({
            type: 'order_office_close',
            data: {
                delete_goods: orderDetailCloseState.delete_goods
            }
        })

    }

    render(){
        const { getFieldDecorator, getFieldsValue, getFieldValue } = this.props.form;
        const {dataSource} = this.state
        const {orderDetailCloseState, params} = this.props
        const {detail, create_value} = orderDetailCloseState
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
                lg: 14
            },
        };
        const formItemLayout1 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
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
            md: 10
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

            <Fragment>
                {detail && (
                    <Fragment>
                        <DetailBox showDivider={true} mainStyle={{marginBottom: 32}} logo={true} title={'确认下单用户'}>
                            <Skeleton active loading={!detail}>
                                <DescriptionList col={3} size="small" title="" style={{ marginBottom: 0 }}>
                                    <Description term={<span><span className='mxj-star'>*</span>组织类型</span>}>{memberTypeText(detail.member_type)}</Description>
                                    <Description term={<span><span className='mxj-star'>*</span>用户名称</span>}><Link to={`/organize/owner/detail/${detail.member_id}`} target='_blank'>{detail.member_name}</Link></Description>
                                    <Description term={<span><span className='mxj-star'>*</span>订单编号</span>}><Link to={`/order/office/detail/${detail.order_code}`}  target='_blank'>{detail.order_code}</Link></Description>
                                    {
                                        params.type !== 'maturity' && (
                                            <Description term="变更方">{orderDetailCloseState.change_user.title}</Description>
                                        )
                                    }

                                    <Description term={<span><span className='mxj-star'>*</span>原订单服务期</span>}><span className='mxj-error-color'>{detail.start_date}至{detail.end_date}  {detail.diff_service_date}</span></Description>
                                    <Description term={<span><span className='mxj-star'>*</span>原订单成交总价</span>}>¥{changeNumberPriceDiff(detail.charge_all_price)}</Description>
                                    <Description term={<span><span className='mxj-star'>*</span>订单当前状态</span>}><span className={statusColorClassName(detail.status)}>{statusText(detail.status)}</span></Description>
                                </DescriptionList>
                            </Skeleton>
                        </DetailBox>
                        <DetailBox showDivider={true} mainStyle={{marginBottom: 37}} logo={true} dividerStyle={{margin: '11px 0 32px'}} title={'变更原因'}>
                            <Form className="mxj-order-common-form" onSubmit={this.handleSubmit}>
                                <Form.Item
                                    label="生效时间"
                                    required
                                >
                                    <span className='mxj-error-color'>{orderDetailCloseState.time_change.start_date}</span>
                                </Form.Item>
                                <Form.Item
                                    label={orderDetailCloseState.reason_title}
                                    required
                                >
                                    {getFieldDecorator('alter_reason', {
                                        rules: [
                                            {
                                                required: true,
                                                validator: (rule, value, callback) => {
                                                    if (!value){
                                                        callback('请输入变更原因')
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
                                        initialValue: create_value.alter_reason,
                                    })(
                                        <TextArea placeholder={'请输入变更原因'} rows={4}
                                                  />
                                    )}
                                </Form.Item>
                            </Form>
                        </DetailBox>
                        <DetailBox title='选择场地及商品' dividerStyle={{margin: '11px 0 24px'}} mainStyle={{marginBottom: 16}}>
                            {
                                params.type === 'add' && (
                                    <Fragment>
                                        <Form onSubmit={this.handleSubmit} layout='inline'>
                                            <Row gutter={32}>
                                                <Col sm={24} xs={24} lg={20} className='mxj-form-location' style={{display: 'flex'}}>
                                                    {/*组织用户选择*/}
                                                    <Form.Item className='mxj-auto-search-inline mxj-margin-bottom-16' style={{width: '100%'}}>
                                                        {getFieldDecorator('member_search', {
                                                            initialValue: {
                                                                selectValue: '1',
                                                                autoValue: '',
                                                            }
                                                        })(
                                                            <SelectInputGroup
                                                                autoCom
                                                                style={{width: '100%', maxWidth: 350}}
                                                                placeholder={'请选择商品编号或商品名称'}
                                                                handleSearch={this.handleSearchAuto}
                                                                options={searchOptions}
                                                                dataSource={this.renderDataSourceMap(dataSource)}
                                                            />
                                                        )}
                                                        <Button type="primary" onClick={this.getGoodsListAll} style={{marginLeft: 16}}>
                                                            查询
                                                        </Button>
                                                        <Button style={{marginLeft: 16}} onClick={() => {
                                                            this.props.form.resetFields(['member_search'])
                                                            this.getGoodsListAll()
                                                        }}>
                                                            重置
                                                        </Button>
                                                    </Form.Item>

                                                </Col>
                                                {
                                                    detail&& (
                                                        <Col xs={24} sm={24} lg={4}>
                                                            <Form.Item>
                                                                <AddGoodsItem start_date={detail.start_date} end_date={detail.end_date} ref={this.addGoodsItemRef} onChange={this.setGoodsTableData} {...this.props} />
                                                            </Form.Item>
                                                        </Col>
                                                    )
                                                }

                                            </Row>
                                        </Form>
                                        <Row style={{marginBottom: 16}}>
                                            <Col>
                                                <Button onClick={this.deleteGoodsListMore}>批量删除</Button>
                                                {/*<Button style={{marginLeft: 9}}>批量改价</Button>*/}
                                            </Col>
                                        </Row>
                                        {this.renderTableData()}
                                    </Fragment>
                                )
                            }
                            {
                                params.type === 'minus' && (
                                    <GoodsTableOnlyShow tableValue={data.goods_list_select_data} showOperation={true} deleteOnceList={this.deleteOnceValue}></GoodsTableOnlyShow>
                                )
                            }
                            <Divider style={{margin: '24px 0 31px'}}/>
                            <DescriptionList col={2} size="small" title="" style={{ marginBottom: 0 }}>
                                <Description term={<span><span className='mxj-star'>*</span>变更后服务期</span>}><span className='mxj-error-color'>{orderDetailCloseState.time_change.start_date}至{orderDetailCloseState.time_change.end_date}  {orderDetailCloseState.time_change.diff_service_date}</span></Description>
                                <Description term={<span><span className='mxj-star'>*</span>涉及场地数量</span>}>{this.getLocationNumber()}</Description>
                                <Description term={<span><span className='mxj-star'>*</span>增加后商品数量</span>}>{this.getGoodsNumber()}</Description>
                                <Description term={<span><span className='mxj-star'>*</span>已选商品原总价汇总</span>}>{this.getGoodsPriceTotal('pre_price')}元/月</Description>
                                <Description term={<span><span className='mxj-star'>*</span>已选商品修改单价后总价汇总</span>}>{this.getGoodsPriceTotal('changed_price')}元/月</Description>
                            </DescriptionList>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Item>
                                    <div className='mxj-flex-center mxj-margin-top-40'>
                                        <Button className='mxj-margin-right-16' onClick={cancelOrder}>取消</Button>
                                        <Button className='mxj-f7f7f7-bg mxj-margin-right-16' onClick={this.resetForm}>重置</Button>
                                        <Button className='mxj-margin-right-16' type="primary" htmlType="submit">下一步</Button>
                                    </div>
                                </Form.Item>
                            </Form>
                        </DetailBox>
                    </Fragment>
                )}
            </Fragment>
        )
    }
}
export default OrderOfficeStep01

