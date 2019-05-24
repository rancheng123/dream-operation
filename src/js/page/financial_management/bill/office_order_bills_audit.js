import React, { Component } from 'react';
import { connect } from 'react-redux';
import utils from '../../../asset'
import moment from 'moment'
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
    Modal,
    Skeleton,
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
import './office_order_bills_audit.scss'

const { Description } = DescriptionList

// redux里保存的profile属性
@connect(({ profile }) => ({
    profile,
}))

class office_order_bills_audit extends Component {
    constructor (props) {
        super(props)

        this.state = {
            data: {},
            bill_info: {},
            code: '',
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

        if (params.code) {
            let data = params.code.toString()
            this.updateState('code', params.code)
            this.updateState('loadingStatus', true)

            // 获取账单-明细数据
            getBillDetailData(data).then((res) => {
                if (res != undefined && res.code == 10000) {
                    // TODO: 将数据存储在 reducer上
                } else {
                    // mock数据
                }
                // 将数据保存到 state 中
                this.updateState('data', res.data)
                this.updateState('bill_info', res.data.bill_info)
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
            render: val => `￥ ${ intToFloat(val) }`
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
            let data = {
                code: this.state.code
            }
            setDunningRequest(data).then((res) => {
                // TODO: 催款成功后 逻辑处理
            })
        }
    }

    /**
     * 用户 对账完成 点击事件
     */
    reviewCompletedEvent = () => {
        let { data } = this.state

        if (data.bill_code) {
            let code = data.bill_code

            setCompletedAuditRequest(code).then((res) => {
                
                Modal.info({
                    title: '提示',
                    content: (
                        <div>
                            <p>成功</p>
                        </div>
                    ),
                    onOk() {
                        // 关闭表单
                        utils.Router.switchRoute('/financial/bill/order')
                    },
                })
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
    invoiceTableListRender (data) {
        const { loadingStatus } = this.state

        const columns = [
            {
                title: '发票码',
                dataIndex: 'invoice_code'
            },
            {
                title: '出具时间',
                dataIndex: 'handle_at'
            },
            {
                title: '出具人',
                dataIndex: 'admin_user'
            },
            {
                title: '出具方式',
                dataIndex: 'handle_type'
            },
            {
                title: '发票类型',
                dataIndex: 'invoice_type'
            },
            {
                title: '开票内容',
                dataIndex: 'invoice_content'
            },
            {
                title: '开票金额',
                dataIndex: 'amount',
                render: val => `￥ ${ intToFloat(val) }`
            },
            {
                title: '申请编号',
                dataIndex: 'apply_code'
            },
            {
                title: '申请编号',
                dataIndex: 'invoice_status'
            }
        ]
        
        if (this.state.data.invoice) {
            this.state.data.invoice.detail.map((item, i) => {
                item['key'] = i
                return item
            })
        }

        return (
            <CardBox title="发票信息">
                <div style={{ marginTop: '24px' }}>
                    <TableDetails
                        rowKey="key"
                        pagination={false}
                        scroll={{ x: 1400 }}
                        dataSource={data.detail}
                        columns={columns}
                        loading={loadingStatus}
                    >
                        <Card bordered={false}>
                            <DescriptionList size="large" title="" style={{ marginBottom: 0 }}>
                                <Description term="开票状态">{data.invoice_status == undefined ?  null : data.invoice_status}</Description>
                                <Description term="发票数量">{data.total == undefined ?  null : data.total}</Description>
                                <Description term="已开票金额">￥ {data.amount == undefined ?  null : intToFloat(data.amount) }</Description>
                            </DescriptionList>
                        </Card> 
                    </TableDetails>
                </div>
            </CardBox>
        )
    }

    /**
     * 是否显示发票内容
     */
    invoiceShowStatus () {
        const { invoice } = this.state.data
        return invoice ? this.invoiceTableListRender(invoice) : null
    }

    render () {
        const { params = {} } = this.props
        const bill_status = params.bill_status

        // 获取账单基本信息数据
        // ?data数据
        let { data = {}, loadingStatus } = this.state

        let list = []
        if (this.state.data.payments !== undefined) {
            list = data.payments.map((item, i) => {
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
                            <DescriptionList size="small" title="" style={{ marginTop: '20px' }}>
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

                                    {/* TODO: 6.30 实现 */}
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

                    <CardBox title="账单详细信息">  
                        <TableDetails
                            rowKey="key"
                            pagination={false}
                            // size="middle"
                            scroll={{ x: 1200 }}
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

                    <CardBox title="账单详细内容">
                        <div style={{ marginTop: '24px' }}>
                            <TableDiversified
                                arraySum={['amount', 'pay_amount']}
                                arrayAttr={['pay_at', 'pay_status_name']}
                                dataList={data.details}
                                columns={columns2}
                                scroll={{ x: 1000 }}
                                loading={loadingStatus}
                            >
                            </TableDiversified>
                        </div>
                    </CardBox>

                    {/* 发票信息 */}
                    {/* {this.invoiceShowStatus()} */}

                    <Card className="button_box" bordered={false}>
                        { bill_status == 2 && <Button type="primary" className="button_1" onClick={() => this.reviewCompletedEvent()}>对账完成</Button> }
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
    };
})(office_order_bills_audit)