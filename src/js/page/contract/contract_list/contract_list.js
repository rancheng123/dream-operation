import React, { Component, Fragment, PropTypes } from 'react'
import { connect } from 'react-redux'
import utils from '../../../asset'

// api接口
import { 
    getContractList
} from '../../../api/contract/contract'

import {
    Icon, 
    Select, 
    Button,
    Input,
    Form,
    Card,
    Menu,
    Dropdown,
    Badge
} from 'antd'

// 页头 组件
import Title from '../../../components/modules/title/title'
// 搜索框布局 组件
import SearchConditons from '@modules/searchConditions'
// 城市楼盘场地 连动组件
import MxjLocationCascaderForm from '@/js/components/modules/locationCascader/formCascader'
// 引入table组件 统一模式
import MxjTable from '@widget/table_v2/table'
// 引入文字省略组件
import ColumsText from '@modules/columsText'

const FormItem = Form.Item
const { Item } = Menu
const { Option } = Select

// 引入样式
import './contract_list.scss'

@Form.create()

class Contract_list extends Component{
    constructor(){
        super()

        this.state = {
            selectedRows: {},
            formValues: {},
            listData: {},
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

    componentWillUnmount () {
        this.setState = () => {
            return
        }
    }

    requestTableListDataFun (data) {
        this.updateState('loadingStatus', true)
        // 请求接口获取数据方法
        getContractList(data).then((res) => {
            let newArray = []

            if (res != undefined && res.code == 10000) {
                // 接口返回正确数据
                res.data.list.map((item, i) => {
                    item['key'] = i
                    return item
                })
            } else {
                // 伪造数据
                res.data.list = newArray
            }

            this.updateState('listData', res.data)
            this.updateState('loadingStatus', false)
        })
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

            delete fieldsValue.address_data

            // 将数据放到state中
            this.updateState('formValues', fieldsValue)
            // 调用接口 并更改 state 数据
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
     * 搜索框
     */
    renderAdvancedForm () {
        const {
            form: {getFieldDecorator}
        } = this.props

        // select + search 搜索框
        const prefixSelector = getFieldDecorator('search_field', {
            rules: [{}],
            initialValue: "code"
        })(
            <Select placeholder="搜索方式" style={{ width: '100px' }}>
                <Option value="code">账单编号</Option>
                <Option value="source_code">订单编号</Option>
                <Option value="sign_part">用户名称</Option>
            </Select>   
        )

        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <SearchConditons
                    data={[
                        {
                            lg: 8,
                            sm: 16,
                            component: (
                                <FormItem style={{ width: '100%' }}>
                                    {getFieldDecorator('search')(
                                        <Input addonBefore={prefixSelector} placeholder="请输入账单编号/订单编号/用户名称" style={{ width: '100%' }}/>
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
                                    {getFieldDecorator('type')(
                                        <Select allowClear={true} placeholder="协议类型" style={{ width: '100%' }}>
                                            <Option value="1">办公服务订单协议</Option>
                                            <Option value="2">办公租赁订单协议</Option>
                                            <Option value="3">办公服务订单变更协议</Option>
                                            <Option value="4">提前解除订单服务协议</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            )
                        },
                        {
                            lg: 4,
                            sm: 8,
                            component: (
                                <FormItem style={{ width: '100%' }}>
                                    {getFieldDecorator('status')(
                                        <Select allowClear={true} placeholder="协议状态" style={{ width: '100%' }}>
                                            <Option value="1">待签署</Option>
                                            <Option value="2">已生成</Option>
                                            <Option value="3">待上传</Option>
                                            <Option value="4">已复核</Option>
                                            <Option value="5">已生效</Option>
                                            <Option value="6">已撤销</Option>
                                            <Option value="7">已到期</Option>
                                            <Option value="8">已作废</Option>
                                        </Select>
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
                                        <Select allowClear={true} placeholder="来源类型" style={{ width: '100%' }}>
                                            <Option value="1">办公服务订单</Option>
                                            <Option value="2">办公服务订单提前终止</Option>
                                            <Option value="3">办公服务订单变更</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            )
                        },
                        {
                            lg: 4,
                            sm: 8,
                            component: (
                                <span className="submit_buttons"  style={{ width: '100%', margin: '4px' }}>
                                    <Button type="primary" htmlType="submit">查询</Button>

                                    <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                                </span>
                            )
                        }
                    ]}
                >
                </SearchConditons>
            </Form>
        )
    }

    columns = [
        {
            title: '合同&协议编号',
            dataIndex: 'code',
            width: 140,
            render: (text, record) => {
                return (
                    <a href="javascript:;"
                        style={{ textDecoration: 'underline' }}
                        onClick={ () => {utils.Router.switchRoute(`/contract/detail/${record.code}`)} }
                    >{text}</a>
                )
            }
        },
        {
            title: '来源编号',
            dataIndex: 'source_code',
            render: (text, record) => {
                return (
                    <a href="javascript:;"
                        style={{ textDecoration: 'underline' }}
                        onClick={ () => {utils.Router.switchRoute(`/order/office/detail/${record.source_code}`)} }
                    >{text}</a>
                )
            }
        },
        {
            title: '合同&协议状态',
            dataIndex: 'status_str',
            render: (text, record) => {
                if (record.status_str == '已生效' || record.status_str == '已生成') {
                    return (
                        <Fragment>
                            <Badge status="success" text={record.status_str}/>
                        </Fragment>
                    )
                } else if (record.status_str == '待上传') {
                    return (
                        <Fragment>
                            <Badge status="error" text={record.status_str}/>
                        </Fragment>
                    )
                } else {
                    return (
                        <Fragment>
                            <Badge status="warning" text={record.status_str}/>
                        </Fragment>
                    )
                }
            }
        },
        {
            title: '组织名称',
            dataIndex: 'sign_part',
            render: (text) => {
                return (
                    <Fragment>
                        <ColumsText text={text} length={15} />
                    </Fragment>
                )
            }
        },
        {
            title: '协议名称',
            dataIndex: 'template_name',
            render: (text) => {
                return (
                    <Fragment>
                        <ColumsText text={text} length={10} />
                    </Fragment>
                )
            }
        },
        {
            title: '协议类型',
            dataIndex: 'type_str',
            render: (text) => {
                return (
                    <Fragment>
                        <ColumsText text={text} length={10} />
                    </Fragment>
                )
            }
        },
        {
            title: '城市',
            dataIndex: 'city_name'
        },

        {
            title: '场地',
            dataIndex: 'location_name'
        },
        {
            title: '合同&协议来源',
            dataIndex: 'source_type_str',
            render: (text) => {
                return (
                    <Fragment>
                        <ColumsText text={text} length={7} />
                    </Fragment>
                )
            }
        },
        {
            title: '打印次数',
            dataIndex: 'print_count',
        },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 150,
            render: (buildItem) => {
                return (
                    <div>
                        {/* 查看详情 所有状态显示 */}
                        <span style={{marginRight:'15px'}}>
                            <a onClick={ () => {utils.Router.switchRoute(`/contract/detail/${buildItem.code}`)} }>
                                <Icon type="eye" style={{color: '#0179FF' }} />
                            </a>
                        </span>

                        {/* 上传 待上传状态显示 */}
                        <span style={{marginRight:'15px'}}>
                            {
                                buildItem.status_str != '待上传' ? 
                                    <a disabled={true} style={{ pointerEvents: "none" }}>
                                        <Icon type="upload" />
                                    </a>
                                    :
                                    <a onClick={ () => {utils.Router.switchRoute(`/contract/detail/${buildItem.code}`)} }>
                                        <Icon type="upload" style={{color: '#F8B156'}} />
                                    </a>
                            }
                        </span>

                        {/* 非已生成状态 显示操作 */}
                        <span style={{marginRight:'15px'}}>
                            {
                                buildItem.status_str == '已生成' ? 
                                    <a onClick={ () => {utils.Router.switchRoute(`/contract/detail/${buildItem.code}`)} }>
                                        <Icon type="printer" style={{color: '#44D7B6'}} />
                                    </a>
                                    :
                                    <a disabled={true} style={{ pointerEvents: "none" }}>
                                        <Icon type="printer" />
                                    </a>
                            }
                        </span>           
                    </div>
                )
            },
        },
    ]

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
                scroll={{ x: 2000 }}
                dataSource={listData}
                loading={loadingStatus}
                onPaginationChange={paginationChange}
            >
            </MxjTable>
        )
    }

    render () {
        const { selectedRows } = this.state

        const menu = (
            <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
                <Item key="remove">删除</Item>
                <Item key="approval">批量审批</Item>
            </Menu>
        )

        return (
            <div className="contract_list_box">
                <Title title={'合同&协议列表'} />

                <div className="contract_content_box">
                    <Card bordered={false}>
                        <div className="table_list_form">{this.renderAdvancedForm()}</div>    
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

export default connect(function(state) {
    return {
        common: state.common,
        contract_list: state.contract_list
    };
})(Contract_list);

