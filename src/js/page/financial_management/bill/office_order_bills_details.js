import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import utils from '../../../asset'
// 引入 金币 单位转换 组件
import {intToFloat} from '../../../asset/intToFloat'


// api接口
import { 
    getBillDetailData,
    setDunningRequest,
    setCompletedAuditRequest
} from '../../../api/financial/bill'

import {
    Card,
    Icon,
    Button,
    Skeleton
} from 'antd'

// 引入header title组件
import Title from '@/js/components/modules/title/title'
// 引入CarBox组件
import CardBox from '@/js/components/modules/cardBox/cardBox'
// 引入tableDetails组件
import TableDetails from '@/js/components/modules/tableDetails/index'
// 引入tableDiversified组件
import TableDiversified from '@/js/components/modules/tableDiversified/index'

// 引入descriptionList组件
import DescriptionList from '@/js/components/modules/descriptionList'

// 引入style样式
import './office_order_bills_details.scss'

const { Description } = DescriptionList

@connect(({ office_order_bills_list }) => ({
    office_order_bills_list,
}))

class office_order_bills_details extends Component {
    constructor (props) {
        super(props)

        this.state = {
            data: {},
            bill_info: {},
            code: '',
            loadingStatus: false,
        }
    }

    updateState = (stateName, stateData) => {
        this.setState({
            [stateName]: stateData
        })
    }

    // *组件实例化完成后
    componentDidMount () {
        // 页面渲染完成，调用接口获取数据
        const { params } = this.props
        const { dispatch } = this.props
        // 更新reducers 数据
        dispatch({
            type: 'office_order_bills_list',
            data: {
                codeData: params.code.toString()
            }
        })

        if (params.code) {
            let data = params.code.toString()

            this.updateState('code', params.code)
            // 打开loading状态
            this.updateState('loadingStatus', true)

            // 获取账单-明细数据
            getBillDetailData(data).then((res) => {
                if (res != undefined && res.code == 10000) {
                    // TODO: 这里应该处理数据
                } else {
                    // mock数据
                }

                // 将数据保存到 state 中
                this.updateState('data', res.data)
                this.updateState('bill_info', res.data.details)
                // 关闭loading状态
                this.updateState('loadingStatus', false)
            })
        }
    }
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }

    // 账单详细信息目录
    columns = [
        {
            title: '支付时间',
            dataIndex: 'created_at',
            // width: 80,
            // fixed: 'left'
        },
        {
            title: '录入人',
            dataIndex: 'admin_user_id_name'
        },
        {
            title: '支付方式',
            dataIndex: 'pay_type_name'
        },
        {
            title: '支付金额',
            dataIndex: 'pay_amount',
            render: val => `￥ ${intToFloat(val)}`
        },
        {
            title: '支付人账户',
            dataIndex: 'account'
        },
        {
            title: '交易流水号',
            dataIndex: 'pay_no'
        },
        {
            title: '收款备注',
            dataIndex: 'comment'
        }
    ]

    /**
     * 催款按钮点击事件
     */
    onClickDunningEvent = () => {
        if (this.state.code) {
            let params = this.state.code
            let data = {
                push_type: this.state.data.notice_type
            }
            setDunningRequest(params, data).then((res) => {
                // TODO: 催款按钮 接口
            })
        }
    }

    /**
     * 用户 对账完成 点击事件
     */
    reviewCompletedEvent = () => {
        if (this.state.code) {
            let data = {
                code: this.state.code
            }
            setCompletedAuditRequest(data).then((res) => {
                // TODO: 对账完成
                utils.Router.switchRoute('/financial/bill/order')
            })
        }
    }

    /**
     * 返回办公服务账单管理页面
     */
    goBackEvent = () => {
        // utils.Router.switchRoute('/financial/bill/order')
        utils.Router.backRoute()
    }
    
    /**
     * 发票列表数据
     * @param {*} data 
     */
    invoiceTableListRender (invoice) {
        const { loadingStatus } = this.state
        let logList = []

        if ( invoice.invoice_logs != undefined )  {
            logList = invoice.invoice_logs.map((item, i) => {
                item['key'] = i
                return item
            })
        }

        const columns = [
            {
                title: '发票码',
                dataIndex: 'invoice_code'
            },
            {
                title: '出具时间',
                dataIndex: 'created_at'
            },
            {
                title: '出具人',
                dataIndex: 'handled_by_name'
            },
            {
                title: '出具方式',
                dataIndex: 'handle_type_name'
            },
            {
                title: '发票类型',
                dataIndex: 'invoice_type_name'
            },
            {
                title: '开票内容',
                dataIndex: 'invoice_content'
            },
            {
                title: '开票金额',
                dataIndex: 'invoice_amount',
                render: val => `￥ ${val}`
            },
            {
                title: '申请编号',
                dataIndex: 'apply_code'
            },
            {
                title: '申请状态',
                dataIndex: 'invoice_status_name'
            }
        ]

        return (
            <CardBox title="发票信息">
                <div style={{ marginTop: '24px' }}>
                    <TableDetails
                        rowKey="key"
                        pagination={false}
                        // size="middle"
                        scroll={{ x: 1400 }}
                        dataSource={logList}
                        columns={columns}
                        loading={loadingStatus}
                    >
                        <DescriptionList size="large" title="" style={{ marginTop: '24px' }}>
                            <Description term="开票状态">{invoice == undefined ?  null : invoice.invoice_status_name}</Description>
                            <Description term="发票数量">{invoice == undefined ?  null : invoice.invoice_logs_count}</Description>
                            <Description term="已开票金额">￥{invoice == undefined ?  null : intToFloat(invoice.invoice_amount)}</Description>
                        </DescriptionList>
                    </TableDetails>
                </div>
            </CardBox>
        )
    }

    /**
     * 是否显示发票内容
     */
    invoiceShowStatus () {
        const { data = {} } = this.state
        const { invoice = {} } = data
        return data ? this.invoiceTableListRender(invoice) : null
    }

    render () {
        const { params = {} } = this.props
        const { bill_status } = params

        let { data = {}, loadingStatus } = this.state

        let list = []
        if (this.state.data.payments !== undefined) {
            list = this.state.data.payments.map((item, i) => {
                item['key'] = i
                return item
            })
        }

        // 账单详细内容目录
        const columns2 = (modifyArr) => {
            return [
                {
                    title: '费用类型',
                    dataIndex: 'type_name'
                },
                {
                    title: '费用服务',
                    dataIndex: 'money_content'
                },
                {
                    title: '应付金额',
                    dataIndex: 'amount',
                    render: val => {
                        if (val != undefined) return `￥ ${ intToFloat(val) }`
                    }
                },
                {
                    title: '实付金额',
                    dataIndex: 'pay_amount',
                    render: val => {
                        if (val != undefined) return `￥ ${ intToFloat(val) }`
                    }
                },
                {
                    title: '付款日期',
                    dataIndex: 'pay_at',
                    render: (text, row, index) => {
                        if (modifyArr.indexOf(index) > -1) {
                            return <span>应收总额: ￥<span style={{ color: '#FF5555' }}>{ intToFloat(text) }</span></span>
                        } else {
                            return text
                        }
                    }
                },
                {
                    title: '付款状态',
                    dataIndex: 'pay_status_name',
                    render: (text, row, index) => {
                        if (modifyArr.indexOf(index) > -1) {
                            return <span>实收总额: ￥<span style={{ color: '#FF5555' }}>{ intToFloat(text) }</span></span>
                        } else {
                            if ( text == "待支付" ) {
                                return (
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <div style={{ width: '6px', height: '6px', background: '#FF5555', borderRadius: '50%', marginRight: '4px' }}></div>
                                        {text}
                                    </div>
                                )
                            } else {
                                return (
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <div style={{ width: '6px', height: '6px', background: '#36DCB6', borderRadius: '50%', marginRight: '4px' }}></div>
                                        {text}
                                    </div>
                                )
                            }
                        }
                    }
                }
            ]
        }

        return (
            <div>
                <Title title="办公服务订单账单详情"></Title>
                <div  style={{ boxShadow: '0 2px 14px 0 rgba(0,0,0,0.10)', borderRadius: '4px', overflow: 'hidden' }}>
                    <CardBox title="账单基础信息">
                        <Skeleton loading={loadingStatus} active paragraph={{ rows: 5 }}>
                            <DescriptionList size="small" title="" style={{ marginTop: '24px' }}>
                                <Description term="账单编号">{data.bill_code}</Description>
                                <Description term="账单类型">{data.bill_type_name}</Description>
                                <Description term="生成时间">{data.created_at}</Description>
                                <Description term="生成状态">{data.bill_issue_status_name}</Description>
                                <Description term="用户类型">{data.member_type_name}</Description>
                                <Description term="组织名称">{data.member_id_name}</Description>
                                <Description term="账单金额">￥ { intToFloat(data.bill_amount) }</Description>
                                <Description term="订单编号">{data.order_code}</Description>
                                <Description term="订单类型">{data.order_type_name}</Description>
                                <Description term="城市">
                                    {   
                                        data.city_name != undefined && data.city_name.length > 0 ?
                                            data.city_name.map((item, i) => {
                                                return <div key={i}>{item}</div>
                                            })
                                            : null
                                    }
                                </Description>
                                <Description term="楼盘">
                                    { 
                                        data.building_name != undefined && data.building_name.length > 0 ?
                                            data.building_name.map((item, i) => {
                                                return <div key={i}>{item}</div>
                                            })
                                            : null
                                    }
                                </Description>
                                <Description term="来源场地">
                                    {
                                        data.location_name != undefined && data.location_name.length > 0 ?
                                            data.location_name.map((item, i) => {
                                                return <div key={i}>{item}</div>
                                            })
                                            : null
                                    }
                                </Description>
                                <Description term="结算主体">{data.main_body_id_name}</Description>
                                <Description term="账单状态">{data.bill_status_name}</Description>
                                <Description term="账单接收邮箱">{data.bill_email}</Description>
                                <Description term="账单通知方式">
                                    {data.notice_type_name}

                                    {/* TODO: 6.30版本实现 */}
                                    {/* <Button
                                        type="danger"
                                        style={{ marginLeft: '20px', color: '#FFFFFF', backgroundColor: '#FF5555' }}
                                        onClick={() => this.onClickDunningEvent()}
                                    >
                                        催&nbsp;缴
                                    </Button> */}
                                </Description>
                            </DescriptionList>
                        </Skeleton>
                    </CardBox>

                    {/* 账单详细 - 信息 */}
                    <CardBox title="账单详细信息">
                        <TableDetails
                            rowKey="key"
                            pagination={false}
                            // size="middle"
                            scroll={{ x: 1000 }}
                            dataSource={list}
                            columns={this.columns}
                            loading={loadingStatus}
                        >
                            <Skeleton loading={loadingStatus} active paragraph={{ rows: 1 }}>
                                <DescriptionList size="large" title="" style={{ marginTop: '24px' }}>
                                    <Description term="账单周期">
                                        {data == undefined ?  null : moment(data.start_at).format('YYYY-MM-DD')  + ' 至 ' + moment(data.end_at).format('YYYY-MM-DD') }
                                    </Description>
                                    <Description term="账单期数">{data == undefined ?  null : data.payment_term}</Description>
                                    <Description term="账单通知日">
                                        {data == undefined ?  null : moment(data.notice_at).format('YYYY-MM-DD')}
                                    </Description>
                                    <Description term="最晚支付日">
                                        <Icon style={{ color: '#FF5555', marginRight: '6px' }} type="exclamation-circle" theme="filled" />
                                        {data == undefined ?  null : moment(data.pay_end_at).format('YYYY-MM-DD')}
                                    </Description>
                                    <Description term="对账方式">{data == undefined ?  null : data.account_check_type_name}</Description>
                                    <Description term="开票状态">{data == undefined ?  null : data.invoice_status_name}</Description>
                                </DescriptionList>
                            </Skeleton>
                        </TableDetails>
                    </CardBox>

                    {/* 账单详情 - 内容 */}
                    <CardBox title="账单详细内容">
                        <div style={{ marginTop: '24px' }}>
                            <TableDiversified
                                arraySum={['amount', 'pay_amount']}
                                arrayAttr={['pay_at', 'pay_status_name']}
                                dataList={this.state.data.details}
                                columns={columns2}
                                scroll={{ x:1000 }}
                                loading={loadingStatus}
                            >
                            </TableDiversified>
                        </div>
                    </CardBox>

                    {/* 发票详情 */}
                    {this.invoiceShowStatus()}
                    
                    <Card className="button_box" bordered={false}>
                        {bill_status == 2 && <Button type="primary" className="button_1" onClick={() => this.reviewCompletedEvent()}>对账完成</Button>}
                        <Button onClick={() => this.goBackEvent()}>返回</Button>
                    </Card>
                </div>
            </div>
        )
    }
}


export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    }
})(office_order_bills_details)