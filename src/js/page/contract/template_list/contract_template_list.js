import React, { Component, Fragment, PropTypes } from 'react'
import { connect } from 'react-redux'
import utils from '../../../asset'

// api接口
import { 
    getTemplateList
} from '../../../api/contract/contract'

import {
    Icon, 
    Select, 
    Button,
    // Input,
    Form,
    Card,
    Menu,
    Dropdown,
    // Badge
} from 'antd'

// 页头 组件
import Title from '../../../components/modules/title/title'
// tableBox 组件
import TableBox from '../../../components/modules/tableBox'
// 引入table组件 统一模式
import MxjTable from '@widget/table_v2/table'
// 引入文字省略组件
import ColumsText from '@modules/columsText'

const { Item } = Menu

// 引入样式
import './contract_template_list.scss'

class Template_list extends Component {
    constructor (props) {
        super(props)

        this.state = {
            listData: {},
            selectedRows: {},
            loadingStatus: false,
        }
    }

    updateState = (stateName, stateData) => {
        this.setState({
            [stateName]: stateData,
        })
    }

    componentDidMount () {
        // 初始化数据
        let data = {
            page: '1',
            per_page: '10',
        }

        this.requestTableListDataFun(data)
    }

    /**
     * 获取数据方法
     * @param {*} data 
     */
    requestTableListDataFun (data) {
        this.updateState('loadingStatus', true)
        // 请求接口获取数据方法
        getTemplateList(data).then((res) => {
            if (res != undefined && res.code == 10000) {
                console.log(res)
                // 接口返回正确数据
                res.data.list.map((item, i) => {
                    item['key'] = i
                    return item
                })
            } else {
            }

            this.updateState('loadingStatus', false)
            this.updateState('listData', res.data)
        })
    }

    /**
     * table 表目录
     */
    columns = [
        {
            title: '模板编号',
            dataIndex: 'code',
            width: 140,
            fixed: 'left',
            render: (text, record) => {
                return (
                    <a href="javascript:;"
                        style={{ textDecoration: 'underline' }}
                        onClick={ () => {utils.Router.switchRoute(`/template/detail/${record.code}`)} }
                    >{text}</a>
                )
            }
        },
        {
            title: '合同&协议模板类别',
            dataIndex: 'category',
            render: (text) => {
                return (
                    <Fragment>
                        <ColumsText text={text} length={9} />
                    </Fragment>
                )
            }
        },
        {
            title: '协议模板类型',
            dataIndex: 'type',
            render: (text) => {
                return (
                    <Fragment>
                        <ColumsText text={text} length={7} />
                    </Fragment>
                )
            }
        },
        {
            title: '模板名称',
            dataIndex: 'name',
            render: (text) => {
                return (
                    <Fragment>
                        <ColumsText text={text} length={7} />
                    </Fragment>
                )
            }
        },
        {
            title: '模板说明',
            dataIndex: 'desc',
            render: (text) => {
                return (
                    <Fragment>
                        <ColumsText text={text} length={15} />
                    </Fragment>
                )
            }
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
        },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 60,
            render: (buildItem) => {
                return (
                    <div>
                        {/* 查看详情 所有状态显示 */}
                        <span style={{marginRight:'15px'}}>
                            <a onClick={ () => {utils.Router.switchRoute(`/template/detail/${buildItem.code}`)} }>
                                <Icon type="eye" style={{color: '#0179FF' }} />
                            </a>
                        </span>       
                    </div>
                )
            },
        },
    ]

    /**
     * 获取选择的rows
     */
    handleSelectRows = rows => {
        console.log('select row')
        this.setState({
            selectedRows: rows
        })
    }

    /**
     * 根据页码等参数，请求数据更改view数据显示方法
     */
    handleStandardTableChange = (pagination, filters, sorter) => {
        const { formValues } = this.state

        const newFilters = Object.keys(filters).reduce((obj, key) => {
            const newObj = { ...obj }
            newObj[key] = getValue(newFilters[key])
            return newObj
        }, {})

        const params = {
            currentPage: pagination.current,
            pageSize: pagination.pageSize,
            ...formValues,
            ...newFilters
        }

        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`
        }

        let data = {
            page: params.currentPage,
            per_page: params.pageSize
        }
        // 调用请求数据接口
        this.requestTableListDataFun(data)
    }

    /**
     * tableList表 render
     */
    renderTableList () {
        const { listData = { data: [] }, loadingStatus, formValues } = this.state

        const paginationChange = (pagination) => {
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
                scroll={{ x: 1200 }}
                dataSource={listData}
                loading={loadingStatus}
                onPaginationChange={paginationChange}
            >
            </MxjTable>
        )
    }

    render () {
        let { listData = {}, selectedRows, loadingStatus } = this.state

        const menu = (
            <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
                <Item key="remove">删除</Item>
                <Item key="approval">批量审批</Item>
            </Menu>
        )

        return (
            <div className="template_list_box">
                <Title title={'合同&协议模板列表'} />

                <div className="template_content_box">
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

export default connect(function(state) {
    return {
        common: state.common,
        contract_list: state.contract_list
    }
})(Template_list)