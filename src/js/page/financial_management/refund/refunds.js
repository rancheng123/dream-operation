import React, { Component, PureComponent, PropTypes, Fragment } from 'react';
import { connect } from 'react-redux'
import utils from '../../../asset'
// 引入 金币 单位转换 组件
import {intToFloat} from '../../../asset/intToFloat'

// api接口
import { 
    getRefundList
} from '../../../api/financial/refund'
// 获取搜索种类api接口
import {
    getTypeList
} from '../../../api/financial/main'

import {
    Card,
    Form,
    Icon,
    Button,
    Dropdown,
    Menu,
    Tooltip,
} from 'antd'

// 引入header title组件
import Title from '@/js/components/modules/title/title'
// 引入table组件 统一模式
import MxjTable from '@widget/table_v2/table'
// 引入搜索框布局组件
import SearchConditons from '@modules/searchConditions'
// 城市楼盘场地 连动组件
import MxjLocationCascaderForm from '@/js/components/modules/locationCascader/formCascader'
// 引入 搜索框 带提示字段的组件
import SearchBox from '@/js/components/modules/searchBox'
// 引入 select 组件 数据从后端读取的
import SelectBox from '@/js/components/modules/selectBox'
// 引入文字省略组件
import ColumsText from '@modules/columsText'

// 引入style样式
import './refunds.scss'

const FormItem = Form.Item
const { Item } = Menu

@connect(({ incomeFormData }) => ({
    data: incomeFormData,
}))

@Form.create()

class refund extends Component {
    constructor (props) {
        super(props)

        this.state = {
            selectedRows: {},
            formValues: {},
            listData: {},
            loadingStatus: false,
            typeList: {},
        }
    }

    updateState = (stateName, stateData) => {
        this.setState({
            [stateName]: stateData
        })
    }

    componentDidMount () { 
        let data = {
            page: '1',
            per_page: '10',
        }

        this.requestTableListDataFun(data)

        const typeData = {
            types: [ 'source_type', 'refund_status' ]
        }
        this.requestTypeList(typeData)
    }
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }

    requestTableListDataFun (data) {
        this.updateState('loadingStatus', true)

        // 请求接口获取数据方法
        getRefundList(data).then((res) => {
            // 将接口请求回来的数据放到reducers中
            if (res.code === 10000) {
                // 当接口成功回调有数据时
                res.data.data.map((item, i) => {
                    item['key'] = i
                    return item
                })
            } else {
                // mock 假数据
            }

            // 将数据存储到state中
            this.updateState('loadingStatus', false)
            this.updateState('listData', res.data)
        })
    }

    requestTypeList (data) {
        getTypeList(data).then((res) => {
            this.updateState('typeList', res.data)
        })
    }

    /**
     * table表目录结构
     */
    columns = [
        {
            title: '申请编号',
            dataIndex: 'refund_code',
            width: 200,
            render: (text, record) => {
                return (
                    <a href="javascript:;"
                        style={{ textDecoration: 'underline' }}
                        onClick={ () => {utils.Router.switchRoute(`/financial/refund/details/${record.id}`)} }
                    >{text}</a>
                )
            }
        },
        {
            title: '订单编号',
            dataIndex: 'order_code',
            render: (text, record) => {
                return (
                    <a href="javascript:;"
                        style={{ textDecoration: 'underline' }}
                        onClick={ () => {utils.Router.switchRoute(`/order/office/pre/detail/${record.order_code}`)} }
                    >{text}</a>
                )
            }
        },
        {
            title: '退款状态',
            dataIndex: 'refund_status',
            render: (text, record) => {
                if (record.refund_status != 1) {
                    return (
                        <div className="refund_status_box">
                            <div className="refund_status_point point_green" ></div>
                            <div>{record.refund_status_name}</div>
                        </div>
                    )
                } else {
                    return (
                        <div className="refund_status_box">
                            <div className="refund_status_point point_red"></div>
                            <div>{record.refund_status_name}</div>
                        </div>
                    )
                }
            }
        },
        {
            title: '申请人',
            dataIndex: 'member_id_name'
        },
        {
            title: '申请退款金额',
            dataIndex: 'refund_amount',
            render: val => `￥ ${ intToFloat(val) }`
        },
        {
            title: '城市',
            dataIndex: 'city_name',
            render: (text) => {
                // 数组转字符串
                let contentText = ''
                if (text != undefined && text.length > 0) contentText = text.join(',')
                return (
                    <Fragment>
                        <ColumsText text={contentText} length={5} />
                    </Fragment>
                )
            }
        },
        {
            title: '场地名称',
            dataIndex: 'location_name',
            render: (text) => {
                // 数组转字符串
                let contentText = ''
                if (text != undefined && text.length > 0) contentText = text.join(',')
                return (
                    <Fragment>
                        <ColumsText text={contentText} length={5} />
                    </Fragment>
                )
            }
        },
        {
            title: '退款原因',
            dataIndex: 'source_type_name',
            render: (text) => {
                return (
                    <Fragment>
                        <ColumsText text={text} length={8} />
                    </Fragment>
                )
            }
        },
        {
            title: '处理人',
            dataIndex: 'operated_by_name'
        },
        {
            title: '操作',
            render: (text, record) => {
                if (record.refund_status_name == '已退款') {
                    return (
                        <Fragment>
                            <div className="more_button_box">
                                <span style={{marginRight:'15px'}}>
                                    <a onClick={ () => this.handleViewDetails(record) }>
                                        <Tooltip placement="top" title={'查看详情'}>
                                            <Icon type="eye" />
                                        </Tooltip>
                                    </a>
                                </span>

                                <span style={{marginRight:'15px'}}>
                                    <a disabled={true} style={{ pointerEvents: "none" }}>
                                        <Tooltip placement="top" title={'打款'}>
                                            <Icon type="folder-open" />
                                        </Tooltip>
                                    </a>
                                </span>
                            </div>
                        </Fragment>
                    )
                } else {
                    return (
                        <Fragment>
                            <div className="more_button_box">
                                <span style={{marginRight:'15px'}}>
                                    <a onClick={ () => this.handleViewDetails(record) }>
                                        <Tooltip placement="top" title={'查看详情'}>
                                            <Icon type="eye" />
                                        </Tooltip>
                                    </a>
                                </span>
    
                                {/* 处理申请 */}
                                <span style={{marginRight:'15px'}}>
                                    <a onClick={ () => this.handleViewManage(record) }>
                                        <Tooltip placement="top" title={'打款'}>
                                            <Icon style={{ color: '#36DCB6' }} type="folder-open" />
                                        </Tooltip>
                                    </a>
                                </span>
                            </div>
                        </Fragment>
                    )
                }
            },
            width: 80,
            fixed: 'right'
        }
    ]

    /**
     * 查看详情方法
     */
    handleViewDetails = (record) => {
        // 传递订单编号到子页面
        utils.Router.switchRoute(`/financial/refund/details/${record.id}`)
    }
    /**
     * 申请发票
     */
    handleViewManage = (record) => {
        // 传递订单编号到子页面
        utils.Router.switchRoute(`/financial/refund/apply/${record.id}`)
    }

    /**
     * 提交搜索表单方法
     */
    handleSearch = (e) => {
        e.preventDefault()
        const { form } = this.props
        // 表单数据校验
        form.validateFields((err, fieldsValue) => {
            if (err) return
            // 加入页码数据
            fieldsValue['page'] = 1
            fieldsValue['per_page'] = 10

            // 重构入参数据
            if (JSON.stringify(fieldsValue.address_data) != '{}') {
                fieldsValue['city_code'] = fieldsValue.address_data.cities
                fieldsValue['building_code'] = fieldsValue.address_data.buildings
                fieldsValue['location_code'] = fieldsValue.address_data.locations
            }
            
            if ( fieldsValue.search_content.selectValue == '1' ) {
                fieldsValue['refund_code'] = fieldsValue.search_content.inputValue
            } else if (fieldsValue.search_content.selectValue == '2') {
                fieldsValue['member_id'] = fieldsValue.search_content.inputValue
            }
            
            delete fieldsValue.search_content
            delete fieldsValue.address_data
            
            // 调用接口 并更改 state 数据
            this.updateState('formValues', fieldsValue)
            // 重新请求数据
            this.requestTableListDataFun(fieldsValue)
        })
    }

    /**
     * 重置搜索表单数据方法
     */
    handleFormReset = () => {
        const { form } = this.props
        form.resetFields()
        this.setState({
            formValues: {}
        })
    }

    /**
     * 获取选择的rows
     */
    handleSelectRows = rows => {
        this.setState({
            selectedRows: rows
        })
    }

    /**
     * 展开版本
     */
    renderAdvancedForm (typeList) {
        const {
            form: {getFieldDecorator}
        } = this.props

        // 搜索框组件入参
        let selectTitle = '搜索方式'
        let selectData = [
            {
                key: '1',
                value: '申请编号'
            },
            // {
            //     key: '2',
            //     value: '申请人'
            // }
        ]
        let showInputVal = '3'
        let inputTitle = '请输入申请编号/申请人'
        let requestUrl = '/user/org-search'

        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <SearchConditons
                    data={[
                        {
                            lg: 8,
                            sm: 16,
                            component: (
                                <FormItem style={{ width: '100%' }}>
                                    {getFieldDecorator('search_content', {
                                        initialValue: {
                                            selectValue: '1',
                                            inputValue: '',
                                        }
                                    })(
                                        <SearchBox
                                            selectTitle={selectTitle}
                                            selectData={selectData}
                                            inputTitle={inputTitle}
                                            showInputVal={showInputVal}
                                            requestUrl={requestUrl}
                                        />
                                    )}
                                </FormItem>
                            )
                        },
                        {
                            lg: 12,
                            sm: 24,
                            component: (
                                <FormItem style={{ width: '100%' }}>
                                    {getFieldDecorator('address_data', {
                                        initialValue: {}
                                    })(
                                        <MxjLocationCascaderForm selectType={['locations', 'cities', 'buildings']} />
                                    )}
                                </FormItem>
                            )
                        },
                        {
                            lg: 4,
                            sm: 8,
                            component: (
                                <FormItem style={{ width: '100%' }}>
                                    {getFieldDecorator('source_type')(
                                        <SelectBox 
                                            selectTitle='全部退款原因'
                                            data={{types: [ 'source_type' ]}}
                                            dataList={typeList.source_type}
                                        />
                                    )}
                                </FormItem>
                            )
                        },
                        {
                            lg: 4,
                            sm: 8,
                            component: (
                                <FormItem style={{ width: '100%' }}>
                                    {getFieldDecorator('refund_status')(
                                        <SelectBox 
                                            selectTitle='全部退款状态'
                                            data={{types: [ 'refund_status' ]}}
                                            dataList={typeList.refund_status}
                                        />
                                    )}
                                </FormItem>
                            )
                        },
                        {
                            lg: 4,
                            sm: 8,
                            component: (
                                <div className="submit_buttons"  style={{ width: '100%', margin: '4px' }}>
                                    <Button type="primary" htmlType="submit">查询</Button>

                                    <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                                </div>
                            )
                        }
                    ]}
                >
                </SearchConditons>
            </Form>
        )
    }

    /**
     * tableList表 render
     */
    renderTableList () {
        const { listData = { data: [] }, loadingStatus, formValues } = this.state

        const paginationChange = (pagination) => {
            console.log(pagination)

            let params = {
                ...formValues,
            }

            params['page'] = pagination.page
            params['per_page'] = pagination.per_page
            // 调用请求数据接口
            this.requestTableListDataFun(params)
        }

        return (
            <MxjTable
                className={'mxj-table-page-common'}
                columns={this.columns}
                scroll={{ x: 1400 }}
                dataSource={listData}
                loading={loadingStatus}
                onPaginationChange={paginationChange}
            >
            </MxjTable>
        )
    }
    
    render () {
        const { selectedRows, typeList } = this.state

        const menu = (
            <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
                <Item key="remove">删除</Item>
                <Item key="approval">批量审批</Item>
            </Menu>
        )

        return (
            <div className="refunds_box">
                <Title title="退款申请管理"></Title>

                <div className="refunds_content_box">
                    <Card bordered={false} className={'search_card'}>
                        <div className="table_list_form">
                            { JSON.stringify(typeList) != '{}' ? this.renderAdvancedForm(typeList) : null }
                        </div>    
                    </Card>

                    <div className="table_list_operator">
                        <div className="table_separate_line"></div>
                            {
                                selectedRows.length > 0 && (
                                    <div className="operator_buttons">
                                        <span>
                                            <Button>批量操作</Button>
                                            <Dropdown overlay={menu}>
                                                <Button>
                                                    更多操作 <Icon type="down"></Icon>
                                                </Button>
                                            </Dropdown>
                                        </span>
                                    </div>
                                )
                            }
                    </div>

                    <Card bordered={false}>
                        { this.renderTableList() }
                    </Card>
                </div>
            </div>
        )
    }
}


export default connect(function (state) {
    return {
        common: state.common,
        home: state.home,
        // refundss_list: state.refundss_list
    };
})(refund)