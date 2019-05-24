import React, { Component, PropTypes,Fragment } from 'react';
import {
    Button, Modal, Form, Row, Col, Select, Alert, AutoComplete
} from 'antd';
import {Link} from "react-router";
import SelectInputGroup from '../../common/selectInputGroup'
import Bind from 'lodash-decorators/bind';
import Debounce from 'lodash-decorators/debounce';
import MxjTable from '@/js/widget/table/table'
import MxjLocationCascaderForm from '@/js/components/modules/locationCascader/formCascader'
const { Option } = Select;
import ColumsText from '@modules/columsText'
import {getUserOrganizationList, getGoodsStatiionInfoList, getGoodsRoomInfoList} from '@api/order'
import {filterGoodsListData} from '../utils'
/**
 * 添加服务商品
 */
export default class AddGoodsItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter_visible: false,
            tableData: [],
            page: 1,
            per_page: 10,
            checkCellData: [],
            table_fetching: false,
            tableDataTotal: 0,
        }
        this.mxjTableView1 = React.createRef()
    }
    componentDidMount() {
        // this.getGoodsListAll()
    }
    /**
     * 获取商品所有列表数据
     */
    @Debounce(400)
    @Bind()
    async getGoodsListAll() {
        const { getFieldsValue } = this.props.form;
        const {dispatch, } = this.props
        const member_search = getFieldsValue(['add_googds_auto', 'add_googds_cities', 'add_googds_type']);
        if (!member_search.add_googds_type) {
            return
        }
        const search_params = {
            page: this.props.data.goods_list_redux.current_page,
            per_page: this.props.data.goods_list_redux.page_size,
            start_at: this.props.start_date,
            end_at: this.props.end_date,
        }
        // if (member_search.add_googds_open_type) {
        //     search_params.goods_status = member_search.add_googds_open_type
        // }
        if (member_search.add_googds_auto.autoValue) {
            const arrVale = member_search.add_googds_auto.autoValue.split(',')
            search_params.search_field = member_search.add_googds_auto.selectValue
            if (member_search.add_googds_auto.selectValue === 'name') {
                search_params.search = arrVale[0]
            } else if(member_search.add_googds_auto.selectValue === 'code'){
                search_params.search = arrVale[1]
            }
        }
        if (member_search.add_googds_cities.locations) {
            search_params.palce_code = member_search.add_googds_cities.locations
        }
        if (member_search.add_googds_cities.cities) {
            search_params.city_code = member_search.add_googds_cities.cities
        }
        this.setState({ table_fetching: true})
        /**
         * 注意： 每条数据都必须需要一个key，否则会报错，编辑的时候定位不到该条数据，所有数据都会发生改变
         * 数据不完整，需要找后端对接人沟通
         */
        let getGoodsFunc
        if (member_search.add_googds_type === 2) {
            // 房间
            getGoodsFunc = await getGoodsRoomInfoList(search_params)
        } else {
            // 工位
            getGoodsFunc = await getGoodsStatiionInfoList(search_params)
        }
        if (getGoodsFunc.code === 10000) {
            dispatch({
                type: 'modify_office_order_create',
                data: {
                    goods_list_redux: getGoodsFunc.data
                }
            })
        }
        this.setState({
            table_fetching: false
        })
    }

    /**
     * 删除一条数据
     * @param e
     */
    @Bind()
    deleteOnceList(e) {
        this.mxjTableView1.current.deleteSelectedRowKeys(e)
    }

    /**
     * 删除多条数据
     * @param e
     */
    @Bind()
    deleteMoreList(e) {
        this.mxjTableView1.current.deleteSelectedRowKeys(e)
    }
    @Bind()
    sureFilterOperation() {
        const {data, dispatch} = this.props
        const list = filterGoodsListData(data.goods_list_select)
        dispatch({
            type: 'modify_office_order_create',
            data: {
                goods_list_select_data: list
            }
        })
        // this.props.onChange(this.state.checkCellData)
        this.setState({
            filter_visible: false
        })
    }
    /**
     * 显示/隐藏model
     */
    @Bind()
    onclickFilter() {
        if (this.props.end_date && this.props.start_date) {
            this.setState({
                zIndex: 1000,
                filter_visible: true
            })
        } else {
            Modal.error({
                title: '错误操作',
                content: '请选择服务起止日期！',
            });
            return
        }

    }
    @Bind()
    onclickFilterCancle() {
        this.setState({
            filter_visible: false,
            table_fetching: false
        })
    }
    async getGoodsInfoList(type, query = {}) {
        if (type === 1) {
            return await getGoodsStatiionInfoList(query)
        } else if (type === 2) {
            return await getGoodsRoomInfoList(query)
        } else {
            return false
        }
    }
    /**
     * 搜索场地及商品列表
     */
    @Debounce(400)
    @Bind()
    async handleSearchAuto(e){
        const { getFieldValue } = this.props.form;
        const {dispatch} = this.props
        const add_googds_type = getFieldValue('add_googds_type');
        const member_search = getFieldValue('add_googds_auto');
        const search_parmas = {
            search_field: member_search.selectValue,
            search: e,
            start_at: this.props.start_date,
            end_at: this.props.end_date,
        }
        this.setState({ goods_fetching: true });
        const result = await this.getGoodsInfoList(add_googds_type, search_parmas)
        let list = []
        if (result.data.list) {
            list = result.data.list.map(value => {
                return {
                    value: [value.goods_name, value.code],
                    label: member_search.selectValue === 'name'? value.goods_name: value.code
                }
            })
        }
        dispatch({
            type: 'order_create_step_fetch',
            data: {
                paySettingsArr: list
            }
        })
        this.setState({ goods_fetching: false });

    }
    renderOption(item) {
        return (
            <AutoComplete.Option key={item.value} text={item.label}>
                {item.label}
            </AutoComplete.Option>
        );
    }
    renderFormList() {
        const { getFieldDecorator, getFieldsValue } = this.props.form;
        const {paySettingsArr} = this.props.orderCreateStateFetch
        const searchOptions = [{
            value: 'name',
            label: '商品名称'
        }, {
            value: 'code',
            label: '商品编号'
        }]
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row gutter={16}>
                    <Col span={6}>
                        {/*商品状态*/}
                        <Form.Item className='mxj-margin-bottom-16'>
                            {getFieldDecorator('add_googds_type', {
                                initialValue: 0
                            })(
                                <Select placeholder="请选择状态">
                                    <Option value={0}>请选择商品类型</Option>
                                    <Option value={1}>工位</Option>
                                    <Option value={2}>房间</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        {/*商品类型*/}
                        <Form.Item className='mxj-margin-bottom-16 mxj-auto-search-inline'>
                            {getFieldDecorator('add_googds_auto', {
                                initialValue: {
                                    selectValue: 'name',
                                    autoValue: '',
                                }
                            })(
                                <SelectInputGroup
                                    handleSearch={this.handleSearchAuto}
                                    options={searchOptions}
                                    dataSource={paySettingsArr.map(this.renderOption)}
                                />
                            )}
                        </Form.Item>
                    </Col>
                    {/*<Col span={6}>*/}
                        {/*/!*商品状态*!/*/}
                        {/*<Form.Item className='mxj-margin-bottom-24'>*/}
                            {/*{getFieldDecorator('add_googds_open_type', {*/}
                                {/*initialValue: 0*/}
                            {/*})(*/}
                                {/*<Select placeholder="请选择状态">*/}
                                    {/*<Option value={0}>全部状态</Option>*/}
                                    {/*<Option value={1}>待开放</Option>*/}
                                    {/*<Option value={2}>开放中</Option>*/}
                                {/*</Select>*/}
                            {/*)}*/}
                        {/*</Form.Item>*/}
                    {/*</Col>*/}
                    <Col span={12}>
                        {/*城市*/}
                        <Form.Item className='mxj-margin-bottom-16'>
                            {getFieldDecorator('add_googds_cities', {
                                initialValue: {}
                            })(
                                <MxjLocationCascaderForm selectType={['locations', 'cities']} />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        {/*场地*/}
                        <Form.Item className=''>
                            <Button type="primary" icon="search" onClick={() => {
                                const {data, dispatch} = this.props
                                const {goods_list_redux} = data
                                goods_list_redux.current_page = 1
                                dispatch({
                                    type: 'modify_office_order_create',
                                    data: {
                                        goods_list_redux
                                    }
                                })
                                this.getGoodsListAll()
                            }}>查询</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        )
    }
    /**
     * 表格数据生成
     * @returns {*}
     */
    changeCheckItemData(e) {
        const {dispatch} = this.props
        const {goods_list_select, goods_list_redux} = this.props.data
        const codeArr = goods_list_redux.list.map(value => value.code)
        let new_goods_list_select = goods_list_select.filter(value => {
            return codeArr.indexOf(value.code) < 0
        })
        new_goods_list_select = new_goods_list_select.concat(e)
        dispatch({
            type: 'modify_office_order_create',
            data: {
                goods_list_select: new_goods_list_select
            }
        })
    }
    /**
     * 表格页码改变
     * @param page
     * @param pageSize
     */
    @Bind()
    pageChange(page, pageSize) {
        const {dispatch, data} = this.props
        dispatch({
            type: 'modify_office_order_create',
            data: {
                goods_list_redux:{
                    current_page: page,
                    page_size: pageSize,
                    total: data.goods_list_redux.total,
                    list: data.goods_list_redux.list
                }
            }
        })
        this.getGoodsListAll()
    }
    @Bind()
    getCheckboxProps(record) {
        const {disableSelectRow} = this.props.data
        return {
            disabled: disableSelectRow.indexOf(record.code) > -1
        }
    }

    /**
     * 设置redux中选中row数据
     * @param e
     */
    @Bind()
    setReduxSelecteRowKeys(e){
        const {dispatch} = this.props
        dispatch({
            type: 'order_create_step_fetch',
            data: {
                addGoodsItemSelectRowKeys: e
            }
        })
    }
    /**
     * 设置表格选中数据
     */
    @Bind()
    setSelectedRowKeys(arr = []) {
        this.mxjTableView1.current.setSelectedRowKeys(arr)
    }
    createTableColums() {
        const that = this
        const {data} = this.props
        let columns = [
            {
                title: '商品编号', dataIndex: 'code', key: 'code', width: 150,
                render: (text, record) => {
                    return <Link to={`/goods/${record.type_code === 1 ? 'space': 'room'}/detail/${text}`} target='_blank'>{text}</Link>
                }
            },
            {
                title: '商品类型', dataIndex: 'category', key: 'category', width: 150
            },
            { title: '城市', dataIndex: 'city_name', key: 'city_name', width: 150 },
            { title: '场地', dataIndex: 'place_name', key: 'place_name', width: 150 },
            { title: '商品名称', dataIndex: 'goods_name', key: 'goods_name', width: 150,
                render: (text) => {
                    return <ColumsText text={text} />
                }
            },
            { title: '单价', dataIndex: 'sales_price', key: 'sales_price', width: 150,
                render: (text) => {
                    return (<span>¥{text}/月</span>)
                }
            },
            // { title: '状态', dataIndex: 'goods_status_str', key: 'goods_status_code', width: 150
            // },
        ];
        return (
            <MxjTable
                className={' mxj-table-page-common'}
                //固定列
                ref={this.mxjTableView1}
                scroll={{ x: 100* columns.length }}
                defaultSelectRowKeys={this.props.orderCreateStateFetch.addGoodsItemSelectRowKeys}
                pagination={{
                    showQuickJumper: true,
                    showSizeChanger: true,
                    total: data.goods_list_redux.total,
                    current: data.goods_list_redux.current_page,
                    pageSize: parseInt(data.goods_list_redux.per_page),
                    onShowSizeChange: this.pageChange,
                    onChange: this.pageChange
                }}
                loading={this.state.table_fetching}
                rowKey={(e) => e.code}
                onCheckboxSelect={(selectedRowKeys, selectedRows)=>{
                    that.changeCheckItemData(selectedRows)
                    that.setReduxSelecteRowKeys(selectedRowKeys)
                }}
                getCheckboxProps={this.getCheckboxProps}
                columns={columns}
                dataSource={data.goods_list_redux.list}
            />
        )
    }
    renderGoodsList() {
        return (
            <Modal title="选择服务商品"
                   className='mxj-model-blur'
                   width='60%'
                   forceRender={true}
                   visible={this.state.filter_visible}
                   onOk={this.sureFilterOperation}
                   onCancel={this.onclickFilterCancle}>
                {this.renderFormList()}
                {/*<Alert closable={true} message="如果您搜索的商品显示状态为该时段不可售，则证明该商品在您选择的时间内已被占用" type="error" />*/}
                {this.createTableColums()}
            </Modal>
        )
    }
    render() {
        return(
            <Fragment>
                <Button type="primary" icon="plus" className='mxj-margin-bottom-16' onClick={this.onclickFilter}>选择服务商品</Button>
                {this.renderGoodsList()}
            </Fragment>
        )
    }
}