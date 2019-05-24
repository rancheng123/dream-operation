import React, { Component, PureComponent, PropTypes, Fragment } from 'react'
import { connect } from 'react-redux'
import utils from '../../../asset'
// 引入 金币 单位转换 组件
import {intToFloat} from '../../../asset/intToFloat'
import moment from 'moment'

// api接口
import { 
    getBillsList
} from '../../../api/financial/bill'
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
    Badge,
    Tooltip,
} from 'antd'

// 引入header title组件
import Title from '@/js/components/modules/title/title'
// 引入table组件 统一模式
import MxjTable from '@widget/table_v2/table'
// 引入更多button
import MoreButton from '@/js/components/modules/moreButton/index'
// 引入搜索框布局组件
import SearchConditons from '@modules/searchConditions'
// 引入 selectAndDataPicker 组件
import SelectAndDataPicker from './selectAndDataPicker.js'
// 城市楼盘场地 连动组件
import MxjLocationCascaderForm from '@/js/components/modules/locationCascader/formCascader'
// 引入 搜索框 带提示字段的组件
import SearchBox from '@/js/components/modules/searchBox'
// 引入 select 组件 数据从后端读取的
import SelectBox from '@/js/components/modules/selectBox'
// 引入文字省略组件
import ColumsText from '@modules/columsText'

// 引入style样式
import './office_order_bills.scss'

const FormItem = Form.Item
const { Item } = Menu

@connect(({ billsFormData }) => ({
    data: billsFormData,
}))

@Form.create()

class office_order_bills extends Component {
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

    // set state 方法
    updateState = (stateName, stateData) => {
        this.setState({
            [stateName]: stateData
        })
    }

    componentDidMount () {
        let data = {
            page: '1',
            per_page: '10'
        }
        this.requestTableListDataFun(data)

        const typeData = {
            types: [ 'bill_issue_status', 'bill_status', 'pay_type', 'invoice_type', 'invoice_status' ]
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
        getBillsList(data).then((res) => {
            if (res != undefined && res.code == 10000) {
                // 当接口成功回调有数据时
                res.data.data.map((item, i) => {
                    item['key'] = i
                    return item
                })
            } else {
                // 伪造数据
            }
            
            //! tableBox版本方法
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
     * 更多按钮 key value
     */
    moreButtonKeyEl = {
        '待支付': [
            {name: '申请开票', key: 'invoice', disabled: true},
            {name: '支付', key: 'payment'},
            {name: '对账', key: 'audit', disabled: true},
        ],
        '部分支付': [
            {name: '申请开票', key: 'invoice', disabled: true},
            {name: '支付', key: 'payment'},
            {name: '对账', key: 'audit', disabled: true},
        ],
        '已支付': [
            {name: '申请开票', key: 'invoice', disabled: true},
            {name: '支付', key: 'payment', disabled: true},
            {name: '对账', key: 'audit'},
        ],
        '对账完成': [
            {name: '申请开票', key: 'invoice'},
            {name: '支付', key: 'payment', disabled: true},
            {name: '对账', key: 'audit', disabled: true},
        ],
        '冻结中': [
            {name: '申请开票', key: 'invoice', disabled: true},
            {name: '支付', key: 'payment', disabled: true},
            {name: '对账', key: 'audit', disabled: true},
        ],
        '已关闭': [
            {name: '申请开票', key: 'invoice', disabled: true},
            {name: '支付', key: 'payment', disabled: true},
            {name: '对账', key: 'audit', disabled: true},
        ],
        '全部': [
            {name: '申请开票', key: 'invoice', disabled: true},
            {name: '支付', key: 'payment', disabled: true},
            {name: '对账', key: 'audit', disabled: true},
        ],
        '已作废': [
            {name: '申请开票', key: 'invoice', disabled: true},
            {name: '支付', key: 'payment', disabled: true},
            {name: '对账', key: 'audit', disabled: true},
        ],
        '已取消': [
            {name: '申请开票', key: 'invoice', disabled: true},
            {name: '支付', key: 'payment', disabled: true},
            {name: '对账', key: 'audit', disabled: true},
        ],
        '已退款': [
            {name: '申请开票', key: 'invoice', disabled: true},
            {name: '支付', key: 'payment', disabled: true},
            {name: '对账', key: 'audit', disabled: true},
        ],
        '已逾期': [
            {name: '申请开票', key: 'invoice', disabled: true},
            {name: '支付', key: 'payment', disabled: true},
            {name: '对账', key: 'audit', disabled: true},
        ],
    }
    
    /**
     * table表目录结构
     */
    columns = [
        {
            title: '账单编号',
            dataIndex: 'bill_code',
            width: 80,
            // fixed: 'left',
            render: (text, record) => {
                return (
                    <a href="javascript:;"
                        style={{ textDecoration: 'underline' }}
                        onClick={ () => {utils.Router.switchRoute(`/financial/bill/details/${record.id}/${record.bill_status}`)} }
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
            title: '账单类型',
            dataIndex: 'bill_type_name'
        },
        {
            title: '账单状态',
            dataIndex: 'bill_status_name',
            render: (text, record) => {
                if (record.bill_status_name == '待支付' || record.bill_status_name == '部分支付' || record.bill_status_name == '冻结中') {
                    return (
                        <Fragment>
                            <Badge status="error" text={record.bill_status_name}/>
                        </Fragment>
                    )
                } else {
                    return (
                        <Fragment>
                            <Badge status="success" text={record.bill_status_name}/>
                        </Fragment>
                    )
                }
            }
        },
        {
            title: '生成状态',
            dataIndex: 'bill_issue_status_name'
        },
        {
            title: '用户名称',
            dataIndex: 'member_id_name',
            render: (text) => {
                return (
                    <Fragment>
                        <ColumsText text={text} length={8} />
                    </Fragment>
                )
            }
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
            title: '场地',
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
            title: '期数',
            dataIndex: 'payment_term'
        },
        {
            title: '账单金额',
            dataIndex: 'bill_amount',
            // render: val => `￥ ${val}`
            render: val => `￥ ${intToFloat(val)}`
        },
        {
            title: '通知日',
            dataIndex: 'notice_at',
            render: text => `${moment(text).format('YYYY-MM-DD')}`
        },
        {
            title: '最晚支付日',
            dataIndex: 'pay_end_at',
            // warning_status
            render: (text, record) => {
                if (record.warning_status == 1) {
                    return (
                        <Fragment>
                            <Icon type="exclamation-circle" theme="filled" style={{ fontSize: '14px', color: '#FFC400' }} /> {moment(text).format('YYYY-MM-DD')}
                        </Fragment>
                    )
                } else if (record.warning_status == 2) {
                    return (
                        <Fragment>
                            <Icon type="clock-circle" theme="filled" style={{ fontSize: '14px', color: '#FF5555' }} /> {moment(text).format('YYYY-MM-DD')}
                        </Fragment>
                    )
                } else {
                    return (
                        <Fragment>
                            {moment(text).format('YYYY-MM-DD')}
                        </Fragment>
                    )
                }
            }
        },
        {
            title: '发票类型',
            dataIndex: 'invoice_type_name'
        },
        {
            title: '开票状态',
            dataIndex: 'invoice_status_name'
        },
        {
            title: '操作',
            width: 100,
            fixed: 'right',
            render: (text, record) => {
                return (
                    <Fragment>
                        <div className={'more_button_box'}>
                            <span style={{marginRight:'15px'}}>
                                <a onClick={ () => this.handleViewDetails(record) }>
                                    <Tooltip placement="top" title={'查看详情'}>
                                        <Icon type="eye" />
                                    </Tooltip>
                                </a>
                            </span>

                            <span>
                                <MoreButton 
                                    routerName={'financial/bill/'}
                                    menuNames={this.moreButtonKeyEl[record.bill_status_name]}
                                    data={record}
                                ></MoreButton>
                            </span>
                        </div>
                    </Fragment>
                )
            }
        }
    ]

    /**
     * 查看详情方法
     */
    handleViewDetails = (record) => {
        // 传递订单编号到子页面
        utils.Router.switchRoute(`/financial/bill/details/${record.id}/${record.bill_status}`)
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

            switch (fieldsValue.search_content.selectValue) {
                case '1':
                    fieldsValue['bill_code'] = fieldsValue.search_content.inputValue
                    break
                case '2':
                    fieldsValue['order_code'] = fieldsValue.search_content.inputValue
                    break
                case '3':
                    fieldsValue['member_id'] = fieldsValue.search_content.inputValue
                    break
                default:
                    fieldsValue['bill_code'] = fieldsValue.search_content.inputValue
                    break
            }

            if (fieldsValue.time_picker.from_date) fieldsValue['from_date'] = fieldsValue.time_picker.from_date.format('YYYY-MM-DD')
            if (fieldsValue.time_picker.to_date) fieldsValue['to_date'] = fieldsValue.time_picker.to_date.format('YYYY-MM-DD') 
            
            delete fieldsValue.search_content, fieldsValue.address_data, fieldsValue.time_picker

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
     * 展开版本
     */
    renderAdvancedForm (typeList) {
        const {
            form: {getFieldDecorator}
        } = this.props

        const searchOptions = [{
            value: 'notice_at',
            label: '账单通知日'
        }, {
            value: 'pay_end_at',
            label: '最晚支付日'
        }, {
            value: 'bill_period',
            label: '账期'
        }]

        // 搜索框组件入参
        let selectTitle = '搜索方式'
        let selectData = [
            {
                key: '1',
                value: '账单编号'
            },
            {
                key: '2',
                value: '订单编号'
            },
            {
                key: '3',
                value: '用户名称'
            }
        ]

        let showInputVal = '3'
        let inputTitle = '请输入账单编号/订单编号/用户名称'
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
                                    {getFieldDecorator('bill_issue_status', {
                                        // initialValue: null
                                    })(
                                        <SelectBox 
                                            selectTitle='账单出具状态'
                                            data={{types: [ 'bill_issue_status' ]}}
                                            dataList={typeList.bill_issue_status}
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
                                    {getFieldDecorator('bill_status', {
                                        // initialValu:e: {}
                                    })(
                                        <SelectBox 
                                            selectTitle='账单支付状态'
                                            data={{types: [ 'bill_status' ]}}
                                            dataList={typeList.bill_status}
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
                                    {getFieldDecorator('pay_type', {
                                        // initialValue: {}
                                    })(
                                        <SelectBox 
                                            selectTitle='支付方式'
                                            data={{types: [ 'pay_type' ]}}
                                            dataList={typeList.pay_type}
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
                                    {getFieldDecorator('invoice_type', {
                                        // initialValue: {}
                                    })(
                                        <SelectBox 
                                            selectTitle='发票类型'
                                            data={{types: [ 'invoice_type' ]}}
                                            dataList={typeList.invoice_type}
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
                                    {getFieldDecorator('invoice_status', {
                                        // initialValue: {}
                                    })(
                                        <SelectBox 
                                            selectTitle='开票状态'
                                            data={{types: [ 'invoice_status' ]}}
                                            dataList={typeList.invoice_status}
                                        />
                                    )}
                                </FormItem>
                            )
                        },
                        {
                            lg: 8,
                            sm: 16,
                            component: (
                                <FormItem style={{ width: '100%' }}>
                                    {getFieldDecorator('time_picker', {
                                        initialValue: {
                                            selectValue: 'notice_at',
                                            time: [],
                                        }
                                    })(
                                        <SelectAndDataPicker options={searchOptions}></SelectAndDataPicker>
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
                scroll={{ x: 2000 }}
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
            <div className="office_bill_box">
                <Title title="办公服务账单管理"></Title>

                <div className="office_content_box">
                    <Card bordered={false} className={'search_card'}>
                        <div className="table_list_form">
                            { JSON.stringify(typeList) != '{}' ? this.renderAdvancedForm(typeList) : null}
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
        office_order_bills_list: state.office_order_bills_list
    };
})(office_order_bills)