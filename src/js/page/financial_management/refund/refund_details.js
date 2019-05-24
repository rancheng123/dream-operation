import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import utils from '../../../asset'
// 引入 金币 单位转换 组件
import {intToFloat} from '../../../asset/intToFloat'

// api接口
import { 
    getRefundDetails
} from '../../../api/financial/refund'

import {
    Card,
    Button,
    Skeleton,
} from 'antd'

// 引入header title组件
import Title from '@/js/components/modules/title/title'
// 引入CarBox组件
import CardBox from '@/js/components/modules/cardBox/cardBox'
// 引入tableDetails组件
import TableDetails from '@/js/components/modules/tableDetails/index'
// 引入descriptionList组件
import DescriptionList from '@/js/components/modules/descriptionList'
const { Description } = DescriptionList

// 引入样式
import './refund_details.scss'

class refund_details extends Component {
    constructor (props) {
        super(props)

        this.state = {
            data: {},
            code: '',
            loadingStatus: false
        }
    }

    updateState = (stateName, stateData) => {
        this.setState({
            [stateName]: stateData,
        })
    }

    // *组件实例化完成后
    componentDidMount () {
        // 页面渲染完成，调用接口获取数据
        const { params } = this.props

        console.log(params)

        if (params.code) {
            let data = params.code.toString()
            // 保存 code 到 state 中
            this.updateState('code', params.code)
            this.updateState('loadingStatus', true)

            // 获取账单-明细数据
            getRefundDetails(data).then((res) => {
                if (res.code == 10000) {
                    // 接口请求成功，真实数据
                } else {
                    // mock数据
                }

                // 将数据保存到 state 中
                this.updateState('data', res.data)
                this.updateState('loadingStatus', false)
            })     
        }
    }
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }

    /**
     * 返回发票申请列表页
     */
    goBackEvent = () => {
        // utils.Router.switchRoute('/financial/refund/list')
        utils.Router.backRoute()
    }

    /**
     * 打款流程
     */
    paymentEvent = (id) => {
        utils.Router.switchRoute(`/financial/refund/apply/${id}`)
    }

    // 退款内容
    columns = [
        {
            title: '退款申请编号',
            dataIndex: 'detail_code',
        },
        {
            title: '退款类型',
            dataIndex: 'detail_type_name'
        },
        {
            title: '退款内容',
            dataIndex: 'detail_content'
        },
        {
            title: '退款金额',
            dataIndex: 'detail_amount',
            render: val => `￥ ${ intToFloat(val) }`
        },
        {
            title: '已退金额',
            dataIndex: 'pay_amount',
            render: val => `￥ ${ intToFloat(val) }`
        },
        {
            title: '退款状态',
            dataIndex: 'detail_status_name'
        }
    ]

    render () {
        const { data = {}, code, loadingStatus } = this.state
        const { details = [], payments = [] } = data

        const paymentsDom = (payments) => {
            return payments.map((item, i) => {
                return (<div key={i} style={{ marginBottom: '24px' }}>{item}</div>)
            })
        }

        return (
            <div className="refund_details_box">
                <Title title="退款申请详情"></Title>

                <div className="refund_content_box">
                    <CardBox title="退款详情">
                        <TableDetails
                            rowKey="id"
                            pagination={false}
                            size="middle"
                            scroll={{ x: 1000 }}
                            dataSource={details}
                            columns={this.columns}
                            loading={loadingStatus}
                        >
                            <Skeleton loading={loadingStatus} active paragraph={{ rows: 2 }}>
                                <DescriptionList size="large" title="" style={{ margin: '24px 0px' }}>
                                    <Description term="退款编号">{data == undefined ?  null : data.refund_code}</Description>
                                    <Description term="用户名称">{data == undefined ?  null : data.member_id_name}</Description>
                                    <Description term="城市">{data == undefined ?  null : data.city_name}</Description>
                                    <Description term="退款申请来源">{data == undefined ?  null : data.source_type_name}</Description>
                                    <Description term="申请退款总额">
                                        <span style={{ color: '#FF5555' }}>￥{data == undefined ?  null : intToFloat(data.refund_amount) }</span>
                                    </Description>
                                    <Description term="场地">{data == undefined ?  null : data.location_name}</Description>
                                    <Description term="退款状态">{data == undefined ?  null : data.refund_status_name}</Description>
                                    <Description term="订单编号">{data == undefined ?  null : data.order_code}</Description>
                                    <Description term="生成时间">{data == undefined ?  null : data.created_at}</Description>
                                </DescriptionList>
                            </Skeleton>
                        </TableDetails>
                    </CardBox>

                    <CardBox title="退款信息">
                        <Skeleton loading={loadingStatus} active paragraph={{ rows: 0 }}>
                            <DescriptionList size="large" title="" style={{ margin: '24px 0px' }}>
                                <Description term="退款金额">
                                    <span style={{ color: '#FF5555' }}>￥{data == undefined ?  null : intToFloat(data.refund_amount)}</span>
                                </Description>
                                <Description term="待退款金额">
                                    <span style={{ color: '#FF5555' }}>￥{data == undefined ?  null : intToFloat(data.remaining_amount)}</span>
                                </Description>
                                <Description term="银行流水号">
                                    {  payments.length > 0 ? paymentsDom(payments) : null }
                                </Description>
                            </DescriptionList>
                        </Skeleton>

                        <Card bordered={false} className="button_box">
                            { data.refund_status_name != '已退款' ? <Button type="primary" style={{ marginRight: '16px' }} onClick={() => this.paymentEvent(code)}>打款</Button> : null }
                            <Button onClick={() => this.goBackEvent()}>返回</Button>
                        </Card>
                    </CardBox>
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
})(refund_details)