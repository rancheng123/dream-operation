import React, { Component, PropTypes, Fragment } from 'react';
import {Link} from "react-router";

import './order_list.scss'
import Bind from 'lodash-decorators/bind';
import { connect } from 'react-redux';
import CommonCard from '@/js/components/modules/commonCard/index'
import MxjTable from '@/js/widget/table/table'
import SelectInputGroup from '../common/selectInputGroup'
import Debounce from 'lodash-decorators/debounce';
import SelectDataPicker from '../common/selectDataPicker'
import {statusText, changeNumberPriceDiff} from '@/js/asset/common'
import utils from '@/js/asset'
import FilterTableByOperation from '@/js/components/modules/filterTableByOperation'
import ColumsText from '@modules/columsText'
import MxjLocationCascaderForm from '@/js/components/modules/locationCascader/formCascader'
import SearchConditons from '@modules/searchConditions'
import {getOrderOfficeList, getUserOrganizationList, changeOrderStatus, getOrderOfficeAlteredList} from '@api/order'
import {
    Row,
    Form,
    Select,
    Icon,
    Button,
    Popover,
    AutoComplete,
    message,
    Tooltip,
    Spin
} from 'antd';
import Title from "@modules/title/title";
import {backTo, showMessageClean} from "../order_create/utils";
const FormItem = Form.Item;
const { Option } = Select;
// 表格列表项

// 筛选项
const filter_options = [
    { label: '订单号', value: 'order_code', disabled: true },
    { label: '订单状态', value: 'status', disabled: true },
    { label: '用户名称', value: 'member_name', disabled: true },
    { label: '用户类型', value: 'member_type', disabled: true },
    { label: '城市', value: 'city_names', disabled: true },
    { label: '场地', value: 'building_names', disabled: true },
    { label: '订单开始日', value: 'start_at', disabled: false },
    { label: '订单截止日', value: 'end_at', disabled: false },
    { label: '下单时间', value: 'created_at', disabled: false },
    // { label: '订单商品价', value: '10' },
    // { label: '平均日启动次数', value: '11' },
    { label: '订单原价', value: 'origin_all_price', disabled: false },
    { label: '成交价', value: 'charge_all_price', disabled: false },
    { label: '押金', value: 'deposit_all_price', disabled: false },
]
const timeOptions = [
    {
        value: 1,
        label: '下单时间'
    }, {
        value: 2,
        label: '订单开始日'
    },{
        value: 3,
        label: '订单截止日'
    }
]
// 时间选项
const searchOptions = [{
    value: 1,
    label: '订单编号'
}, {
    value: 2,
    label: '用户名称'
}]
@connect(({ orderListState, orderCommonState }) => ({
    orderListState,
    orderCommonState
}))
@Form.create()
export default class OrderList extends Component{
    constructor(props){
        super(props);

        this.state = {
            expandForm: true,
            formValues: {},
            params_type: null,
        }
    }
    componentWillUnmount(){
        const {dispatch} = this.props
        dispatch({
            type: 'clear_order_office_list',
        })
    }
    async componentDidMount() {
        const {dispatch} = this.props
        console.log(this.props)
        this.setState({
            params_type: this.props.params.type
        })
        if (this.props.params.type === 'altered' || this.props.params.type === 'pre') {
            this.getOrderListData()
            // let order_filter_colum = this.state.table_colums.map(value => value.key)
            //
            // dispatch({
            //     type: 'order_office_list',
            //     data: {
            //         order_filter_colum
            //     }
            // })
        } else{
            // 跳转404页面
        }
    }

    getStatusCodeName(status) {
        return this.props.orderCommonState.status_init_data[status]
    }
    componentDidUpdate(){
        if (this.props.params.type !== this.state.params_type){
            const {setFieldsValue} = this.props.form
            const {dispatch} = this.props
            setFieldsValue({
                name: {
                    selectValue: 1,
                    autoValue: ''
                },
                location: {},
                member_type: '',
                status: '',
                time_picker: {
                    selectValue: 1,
                    start_date: null,
                    end_date: null,
                }
            })
            this.setState({
                params_type: this.props.params.type
            })
            dispatch({
                type: 'order_office_list',
                data: {
                    otherList: {
                        current_page: 1,
                        per_page: 10,
                        total: 0,
                        total_page: 1
                    }
                },
                callback: () => {
                    this.getOrderListData()
                }
            })

        }
    }

    /**
     * 获取列表数据
     */
    @Bind()
    getOrderListData() {
        const {
             getFieldsValue
        } = this.props.form;
        const {dispatch, orderListState, params} = this.props
        const {otherList} = orderListState
        /**
         * 获取所有的查询条件
         */
        const search_data = getFieldsValue()
        const search_data_item = {
            page: otherList.current_page,
            page_size: otherList.per_page,
            order_direction: 'DESC'
        }
        dispatch({
            type: 'order_office_list',
            data: {
                loading: true
            }
        })
        if (search_data.status) {
            search_data_item.status = search_data.status
        }
        if (search_data.member_type) {
            search_data_item.member_type = search_data.member_type
        }
        if (search_data.name) {
            if (search_data.name.autoValue) {
                if (search_data.name.selectValue === 1) {
                    search_data_item.order_code = search_data.name.autoValue
                } else if (search_data.name.selectValue === 2){
                    const this_name_arr = search_data.name.autoValue.split(',')
                    if (this_name_arr.length>1){
                        search_data_item.member_id = Number(this_name_arr[0])
                    }

                }
            }
        }
        if (search_data.time_picker.selectValue === 1) {
            if (search_data.time_picker.start_date) {
                search_data_item.created_head_date = search_data.time_picker.start_date.format('YYYY-MM-DD')
            }
            if (search_data.time_picker.end_date) {
                search_data_item.created_tail_date = search_data.time_picker.end_date.format('YYYY-MM-DD')
            }
        } else if (search_data.time_picker.selectValue === 2) {
            if (search_data.time_picker.start_date) {
                search_data_item.start_head_date = search_data.time_picker.start_date.format('YYYY-MM-DD')
            }
            if (search_data.time_picker.end_date) {
                search_data_item.start_tail_date = search_data.time_picker.end_date.format('YYYY-MM-DD')
            }
        }else if (search_data.time_picker.selectValue === 3) {
            if (search_data.time_picker.start_date) {
                search_data_item.end_head_date = search_data.time_picker.start_date.format('YYYY-MM-DD')
            }
            if (search_data.time_picker.end_date) {
                search_data_item.end_tail_date = search_data.time_picker.end_date.format('YYYY-MM-DD')
            }
        }
        if (search_data.location.cities){
            search_data_item.city_codes = search_data.location.cities
        }
        if (search_data.location.buildings){
            search_data_item.building_codes = search_data.location.buildings
        }
        if (search_data.location.locations){
            search_data_item.location_codes = search_data.location.locations
        }
        // if (search_data.time_picker.start_date){
        //     search_data_item.start_date = search_data.time_picker.start_date.format('YYYY-MM-DD')
        // }
        // if (search_data.time_picker.end_date){
        //     search_data_item.end_date = search_data.time_picker.end_date.format('YYYY-MM-DD')
        // }
        if (params.type === 'altered'){
            getOrderOfficeAlteredList(search_data_item).then(res => {
                if (res.code === 10000) {
                    dispatch({
                        type: 'order_office_list',
                        data: {
                            orderList: res.data.data,
                            otherList: res.data,
                            loading: false
                        }
                    })
                } else {
                    dispatch({
                        type: 'order_office_list',
                        data: {
                            loading: false
                        }
                    })
                    // showMessageClean('error', res.message)

                }
            })
        } else if (params.type === 'pre') {
            getOrderOfficeList(search_data_item, {
                40004: (e) => {
                    dispatch({
                        type: 'order_office_list',
                        data: {
                            loading: false
                        }
                    })
                }
            }).then(res => {
                if (res.code === 10000) {
                    dispatch({
                        type: 'order_office_list',
                        data: {
                            orderList: res.data.data,
                            otherList: res.data,
                            loading: false
                        }
                    })
                } else {
                    dispatch({
                        type: 'order_office_list',
                        data: {
                            loading: false
                        }
                    })
                    // showMessageClean('error', res.message)
                }
            })
        }

    }
    /**
     * 筛选项折叠还是展开
     */
    toggleForm = () => {
        const { expandForm } = this.state;
        this.setState({
            expandForm: !expandForm,
        });
    };

    /**
     * 搜索
     * @param e
     */
    @Bind()
    handleSearch(e) {
        const {dispatch, orderListState} = this.props
        const { otherList} = orderListState
        otherList.current_page = 1
        e.preventDefault();
        // 当前页码改变成1
        dispatch({
            type: 'order_office_list',
            data: {
                otherList
            }
        })
        setTimeout(() => {
            this.getOrderListData()
        }, 50)

    }

    /**
     * 如果搜索类型为用户，设置用户类型为该对应类型
     * @param e
     */
    @Bind()
    searchSelectInputGroup(e){
        const {setFieldsValue} = this.props.form
        if (e.selectValue === 2 && e.autoValue) {
            const arr =e.autoValue.split(',')
            if (arr.length>1){
                const user_type = Number(e.autoValue.split(',')[1])
                setFieldsValue({
                    member_type: user_type
                })
            }
        }
    }
    @Bind()
    @Debounce(400)
    handleSearchAuto(value){
        const {dispatch} = this.props
        const {getFieldValue} = this.props.form
        const searchType = getFieldValue('name')
        const {selectValue} = searchType
        let searchFetch
        if (selectValue === 1){
            // 订单编号
            getOrderOfficeList({
                order_code: value.trim()
            }, {
                40004: (e) => {
                    return
                }
            }).then(res => {

                if (res.code === 10000) {
                    const resultArr = res.data.data.map(value1 => {
                        return {
                            value: value1.order_code,
                            label: value1.order_code
                        }
                    })
                    dispatch({
                        type: 'order_office_list',
                        data: {
                            userOrganizationList: resultArr
                        }
                    })
                }
            })
        } else {
            // 用户名称
            getUserOrganizationList({name: value.trim()}).then(res => {
                if (res.code === 10000) {
                    const resultArr = res.data.data.map(value1 => {
                        return {
                            value: [value1.id, value1.type_id],
                            label: value1.name
                        }
                    })
                    dispatch({
                        type: 'order_office_list',
                        data: {
                            userOrganizationList: resultArr
                        }
                    })
                }
            })
        }
        // getUserOrganizationList()
    }
    renderOption(item) {
        return (
            <AutoComplete.Option key={item.value} text={item.label}>
                {item.label}
            </AutoComplete.Option>
        );
    }
    /**
     * 渲染完整筛选表单
     */
    renderAdvancedForm() {
        const {
            form: { getFieldDecorator, getFieldsValue },
            orderListState,
            orderCommonState
        } = this.props;
        const formItemLayout = {
            // wrapperCol: {
            //     xs: { span: 24 },
            //     sm: { span: 24 },
            //     md: { span: 24 },
            // }
        };
        const {userOrganizationList} = orderListState


        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <SearchConditons
                    data={[
                        {
                            lg: 8,
                            sm: 24,
                            component: (
                                <FormItem {...formItemLayout} className='mxj-auto-search-inline'>
                                    {getFieldDecorator('name', {
                                        initialValue: {
                                            selectValue: 1,
                                            autoValue: '',

                                        }
                                    })(
                                        <SelectInputGroup
                                            handleSearch={this.handleSearchAuto}
                                            options={searchOptions}
                                            onChange={this.searchSelectInputGroup}
                                            dataSource={userOrganizationList.map(this.renderOption)}
                                        />
                                    )}
                                </FormItem>
                            )
                        },
                        {
                            lg: 8,
                            sm: 24,
                            component: (
                                // 城市
                                <FormItem {...formItemLayout}>
                                    {getFieldDecorator('location', {
                                        initialValue: {}
                                    })(
                                        <MxjLocationCascaderForm selectType={['locations', 'cities', 'buildings']} />
                                    )}
                                </FormItem>
                            )
                        },
                        {
                            lg: 4,
                            sm: 24,
                            component: (
                                // 城市
                                <FormItem {...formItemLayout}>
                                    {getFieldDecorator('member_type', {
                                    })(
                                        <Select allowClear placeholder='全部用户类型'>
                                            <Option value={''}>全部用户类型</Option>
                                            <Option value={3}>个人</Option>
                                            <Option value={1}>企业</Option>
                                            <Option value={2}>非企业</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            )
                        },
                        {
                            lg: 4,
                            sm: 24,
                            component: (
                                // 城市
                                <FormItem {...formItemLayout}>
                                    {getFieldDecorator('status', {
                                    })(
                                        <Select allowClear placeholder='订单状态'>
                                            <Option value={''}>全部状态</Option>
                                            {orderCommonState.status_init_data.map(value => (<Option key={value.value} value={value.value}>{value.text}</Option>))}
                                        </Select>
                                    )}
                                </FormItem>
                            )
                        },
                        {
                            lg: 8,
                            md: 24,
                            sm: 24,
                            component: (
                                <FormItem {...formItemLayout}>
                                    {getFieldDecorator('time_picker', {
                                        initialValue: {
                                            selectValue: 1,
                                            start_date: null,
                                            end_date: null,

                                        }
                                    })(
                                        <SelectDataPicker options={timeOptions}></SelectDataPicker>
                                    )}
                                </FormItem>
                            )
                        },{
                            lg: 8,
                            sm: 24,
                            component: (
                                <FormItem {...formItemLayout}>
                                    <Button type="primary" htmlType="submit">
                                        查询
                                    </Button>
                                    <FilterTableByOperation
                                        style={{ marginLeft: 8 }}
                                        filter_options={filter_options}
                                        makeSuerOperation={this.makeSuerOperation}
                                        defaultValue={this.props.orderListState.order_filter_colum}
                                    />
                                </FormItem>
                            )
                        },
                    ]}
                />


            </Form>
        );
    }
    @Bind()
    makeSuerOperation(value) {
        const {dispatch} = this.props
        dispatch({
            type: 'order_office_list',
            data: {
                order_filter_colum: value
            }
        })
    }


    /**
     * 每页显示条数改变
     * @param page
     * @param pageSize
     */
    @Bind()
    showSizeChange(page, pageSize) {
        const {dispatch, orderListState} = this.props
        const {otherList} = orderListState
        otherList.per_page = pageSize
        dispatch({
            type: 'order_office_list',
            data: {
                otherList
            }
        })
        this.getOrderListData()
    }

    /**
     * 表格页码改变
     * @param page
     * @param pageSize
     */
    @Bind()
    pageChange(page, pageSize) {
        const {dispatch, orderListState} = this.props
        const {otherList} = orderListState
        otherList.current_page = page
        dispatch({
            type: 'order_office_list',
            data: {
                otherList
            }
        })
        this.getOrderListData()
    }

    /**
     * 显示总和
     * @param total
     */
    @Bind()
    showTotal(total, range) {
        const {orderListState} = this.props
        const {current_page,per_page, total_page} = orderListState.otherList
        return (<p style={{marginRight: 20}} className={'mxj-table-total-text'}>共{total}条记录 第 <span style={{color: '#0179FF '}}>{current_page}</span>/{total_page} 页</p>)
    }

    /**
     * 新建订单
     */
    @Bind()
    createNewOrderOffice() {
        // /order/office/info/:type/:code/step1
        utils.Router.switchRoute(
            `/order/office/${this.props.params.type}/info/create/normal/step1`
        )
    }

    /**
     *
     */
    seeDetail(record) {
        utils.Router.switchRoute(
            `/order/office/${this.props.params.type}/detail/${record.order_code}`
        )
    }
    @Bind()
    changeOrderStatusOpera(status, code, index){
        const {dispatch, orderListState} = this.props
        const {orderList} = orderListState
        let spin_title = ''
        let info_message= ''
        if (status === 'canceled') {
            spin_title = '取消订单中'
            info_message = '订单取消成功'
        } else {
            spin_title = '关闭订单中'
            info_message='订单关闭成功'
        }
        dispatch({
            type: 'modify_office_order_common',
            data: {
                spinLoading: true,
                spinTip: spin_title
            }
        })
        changeOrderStatus(status, {order_code: code}, {
            40004: (res) => {
                dispatch({
                    type: 'modify_office_order_common',
                    data: {
                        spinLoading: false,
                    }
                })
                showMessageClean('error', res.message)
            }
        }).then(res => {
            if (res.code ===10000) {
                if (res.data.order_code === orderList[index].order_code) {
                    orderList[index].status = res.data.status
                    if (res.data.operate_status_permissions){
                        orderList[index].operate_status_permissions = res.data.operate_status_permissions
                    }
                }

                showMessageClean('success', info_message)
            } else {
                // showMessageClean('error', res.message)
            }
            dispatch({
                type: 'modify_office_order_common',
                data: {
                    orderList
                }
            })
            dispatch({
                type: 'modify_office_order_common',
                data: {
                    spinLoading: false,
                }
            })
        }).catch(e => {
            dispatch({
                type: 'modify_office_order_common',
                data: {
                    spinLoading: false,
                }
            })
        })
    }
    @Bind()
    setContentPopover(record, index) {
        const {operate_status_permissions} = record
        return (
            <div className='mxj-operation-btn-box'>
                {
                    operate_status_permissions.cancel && ( <div onClick={() => {this.changeOrderStatusOpera('canceled', record.order_code, index)}}>取消订单</div>)
                }
                {
                    operate_status_permissions.close && ( <div onClick={() => {this.changeOrderStatusOpera('closed', record.order_code, index)}}>逾期关闭</div>)
                }
                {
                    (operate_status_permissions.enlarge || operate_status_permissions.reduce) &&
                    ( <div onClick={() => {
                        utils.Router.switchRoute(
                            `/order/office/${this.props.params.type}/change/guide/${record.order_code}`
                        )
                    }}>申请变更</div>)
                }
                {
                    operate_status_permissions.account && ( <div onClick={() => {
                        utils.Router.switchRoute(
                            `/order/office/${this.props.params.type}/alteration/account-auditing/${record.order_code}/step1`
                        )
                    }}>到期结算</div>)
                }
                {
                    operate_status_permissions.terminate && ( <div onClick={() => {
                        utils.Router.switchRoute(
                            `/order/office/${this.props.params.type}/alteration/terminate-auditing/${record.order_code}/step1`
                        )
                    }}>提前终止</div>)
                }
                {
                    operate_status_permissions.clear && ( <div onClick={() => {
                        utils.Router.switchRoute(
                            `/order/office/${this.props.params.type}/alteration/cleared/${record.order_code}/step1`
                        )
                    }}>我方清租</div>)
                }
                {
                    operate_status_permissions.renewal && ( <div onClick={() => {
                        utils.Router.switchRoute(
                            `/order/office/${this.props.params.type}/info/operation/renewal/${record.order_code}/step1`
                        )
                    }}>创建续租</div>)
                }
            </div>
        )
    }
    getCanOperationBtn (data) {
        for (let i in data) {
            if (data[i]) {
                return true
            }
        }
        return false
    }
    /**
     * 表格数据生成
     * @returns {*}
     */
    createTableColums() {
        const that = this
        const table_colums = [
            {
                title: '订单编号', dataIndex: 'order_code', key: 'order_code',
                render: text => <Link to={`/order/office/${this.props.params.type}/detail/${text}`}>{text}</Link>
            },
            {
                title: '订单状态', dataIndex: 'status', key: 'status',
                filters: this.props.orderCommonState.status_init_data,
                onFilter: (value, record) => record.status === value,
                render: (text, record) => {
                    if ([1,3, 8, 12, 16, 14, 10, 2].indexOf(text)>-1) {
                        return (<div type="success" className='mxj-tag-inco'> <div className='mxj-circle-success'></div><div>{statusText(text)}</div></div>)
                    }
                    if ([6, 15, 7, 9, 11, 13, 17].indexOf(text)>-1) {
                        return (<div type='warn' className='mxj-tag-inco'> <div  className='mxj-circle-warn'></div><div>{statusText(text)}</div></div>)
                    }
                    if ([4, 5].indexOf(text)>-1) {
                        return (<div type='error' className='mxj-tag-inco'> <div className='mxj-circle-error'></div><div>{statusText(text)}</div></div>)
                    }
                }
            },
            { title: '用户名称', dataIndex: 'member_name', key: 'member_name',
                render: (text) => {
                    return <ColumsText text={text} />
                }
            },
            { title: '用户类型', dataIndex: 'member_type', key: 'member_type', render: text => {
                    if (text === 1) {
                        return '企业'
                    } else if (text === 2) {
                        return '非企业'
                    } else {
                        return ' 个人'
                    }
                }},
            { title: '城市', dataIndex: 'city_names', key: 'city_names', render: (text) => {
                    return <ColumsText text={text} />
                }},
            { title: '楼盘', dataIndex: 'building_names', key: 'building_names', render: (text) => {
                    return <ColumsText text={text} />
                }},
            { title: '订单开始日', dataIndex: 'start_at', key: 'start_at'},
            { title: '订单截止日', dataIndex: 'end_at', key: 'end_at'},
            { title: '下单时间', dataIndex: 'created_at', key: 'created_at'},
            { title: '订单原价', dataIndex: 'origin_all_price', key: 'origin_all_price',
                render: text => `¥${changeNumberPriceDiff(text)}`
            },
            { title: '成交价', dataIndex: 'charge_all_price', key: 'charge_all_price',
                render: text => `¥${changeNumberPriceDiff(text)}`
            },
            { title: '押金', dataIndex: 'deposit_all_price', key: 'deposit_all_price',
                render: text => `¥${changeNumberPriceDiff(text)}`
            },
            // { title: '订单商品价', dataIndex: '3', key: '3' },
            // { title: '平均日启动次数', dataIndex: '4', key: '4' },
        ]
        const {orderListState, params} = this.props
        const {orderList, otherList, loading} = orderListState
        const {table_loading} = this.state
        const {order_filter_colum} = orderListState
        let new_columes = table_colums.filter((items) => {
            return order_filter_colum.indexOf(items.key) > -1
        })
        new_columes.push({
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (text, record, index) => {
                return (
                    <div className='mxj-order-list-operation'>
                        <Tooltip title="查看详情">
                            <span onClick={() => {
                                this.seeDetail(record)
                            }}>
                                <Icon type="eye" style={{color: '#0179FF' }}/>
                            </span>
                        </Tooltip>
                        {
                            params.type === 'pre' && (
                                <Fragment>
                                    {
                                        this.getCanOperationBtn(record.operate_status_permissions) ? (
                                            <Popover autoAdjustOverflow overlayClassName={'mxj-order-list-popover'} placement="leftTop"   content={that.setContentPopover(record, index)}>
                                                <Icon type="ellipsis" style={{color: '#000000', cursor : 'pointer', marginLeft:'32px'}} />
                                            </Popover>
                                        ) :  (
                                            <Tooltip title="没有更多操作">
                                                <Icon type="ellipsis" style={{color: '#e9e9e9', cursor : 'pointer', marginLeft:'32px'}} />
                                            </Tooltip>
                                        )
                                    }
                                </Fragment>

                            )
                        }

                    </div>
                )
            },
        })

        return (
            <MxjTable
                className={'mxj-table-page-common'}
                //固定列
                scroll={{ x: 150* new_columes.length }}

                pagination={{
                    showQuickJumper: true,
                    showSizeChanger: true,
                    hideOnSinglePage: false,
                    current: otherList.current_page,
                    total: otherList.total,
                    showTotal: that.showTotal,
                    pageSize: parseInt(otherList.per_page),
                    onShowSizeChange: that.showSizeChange,
                    onChange: that.pageChange
                }}
                loading={loading}
                border={true}
                rowKey={row => row.id}
                columns={new_columes}
                dataSource={orderList}

            />
        )
    }
    render(){
        const {params, orderCommonState} = this.props
        return (
            <Spin tip={orderCommonState.spinTip} spinning={orderCommonState.spinLoading} style={{width: '100%'}}>
                <Title title={params.type === 'pre'? '办公服务订单管理': '办公服务订单变更管理'}></Title>
                <CommonCard dividerStyle={{margin: '0  0 16px 0'}} header={<div className='tableListForm'>{this.renderAdvancedForm()}</div>}>
                    {
                        params.type === 'pre' && (
                            <Row style={{marginBottom: 16}}>
                                <Button type="primary" icon='plus' style={{marginRight: 16}} onClick={this.createNewOrderOffice}>新建订单</Button>
                                {/*<Button type="default">批量删除</Button>*/}
                            </Row>
                        )
                    }
                    {this.createTableColums()}
                </CommonCard>
            </Spin>
        )
    }

}

