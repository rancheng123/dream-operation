import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import MainRight2 from '../../../components/layout/main_right2'
import utils from '../../../asset'
// 引入 金币 单位转换 组件
import {intToFloat} from '../../../asset/intToFloat'

// api接口
import { 
    getInvoicesDetails
} from '../../../api/financial/invoice'

import {
    Card,
    Button,
    Row,
    Col,
    Skeleton
} from 'antd'

// 引入header title组件
import Title from '@/js/components/modules/title/title'
// 引入CarBox组件
import CardBox from '@/js/components/modules/cardBox/cardBox'
// 引入tableDetails组件
import TableDetails from '@/js/components/modules/tableDetails/index'
// 引入属性title组件
import Attribute from '@/js/components/modules/attribute/index'
// 引入descriptionList组件
import DescriptionList from '@/js/components/modules/descriptionList'
const { Description } = DescriptionList

// 引入样式
import './invoice_details.scss'

class invoice_details extends Component {
    constructor (props) {
        super(props)

        this.state = {
            data: {},
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

        this.updateState('loadingStatus', true)

        if (params.code) {
            let data = params.code.toString()

            this.updateState('code', params.code)

            // 获取账单-明细数据
            getInvoicesDetails(data).then((res) => {
                if (res != undefined && res.code == 10000) {
                    
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
        // utils.Router.switchRoute('/financial/invoice/list')
        utils.Router.backRoute()
    }

    // 账单详细信息目录
    columns = [
        {
            title: '发票编号',
            dataIndex: 'invoice_code',
        },
        {
            title: '开票金额',
            dataIndex: 'invoice_amount',
            render: val => `￥ ${ intToFloat(val) }`
        },
        {
            title: '未开票金额',
            dataIndex: 'residue_amount',
            render: val => `￥ ${ intToFloat(val) }`
        }
    ]

    render () {
        const { data = {}, loadingStatus } = this.state
        const { invoice_log = [] } = data
        const list = invoice_log
        list.map((item, i) => {
            item['key'] = i
            return item
        })

        const invoiceInfo = (data) => {
            if (data.invoice_content && data.invoice_amount && data.invoice_account) {
                return (
                    <CardBox title="开票信息">
                        <Card bordered={false}>
                            <DescriptionList size="large" title="" style={{ marginBottom: 0 }}>
                                <Description term="开票内容">{data == undefined ?  null : data.invoice_content}</Description>
                                <Description term="开票金额">￥ {data == undefined ?  null : intToFloat(data.invoice_amount) }</Description>
                                <Description term="发票编号">{data == undefined ?  null : data.invoice_account}</Description>
                            </DescriptionList>
                        </Card>
                    </CardBox>
                )
            }
        }

        return (
            <div className="invoice_details_box">
                <Title title="发票处理详情"></Title>
                
                <div className="invoice_details_content">
                    <Card bordered={false} style={{ padding: '0px 14px' }}>
                        <Skeleton loading={loadingStatus} active paragraph={{ rows: 0 }}>
                            <Row gutter={ 16 }>
                                <Col xxl={6} lg={10} sm={16} className="invoice_col">
                                    <div className="col1_title_box">
                                        <div className="title_rectangle"></div>
                                        <div className="title_name">
                                            申请编号: <span className="title_data">{data == undefined ?  null : data.apply_code}</span>
                                        </div>
                                    </div>
                                </Col>

                                <Attribute title="申请时间" xxl={5} lg={10} sm={16}>{data.created_at}</Attribute>
                                <Attribute title="申请人" xxl={4} lg={10} sm={16}>{data.submit_by_name}</Attribute>
                                <Attribute title="处理时间" xxl={5} lg={10} sm={16}>{data.apply_at}</Attribute>
                                <Attribute title="处理人" xxl={4} lg={10} sm={16}>{data.admin_user_id_name}</Attribute>
                            </Row>
                        </Skeleton>
                    </Card>
                </div>

                <div className="invoice_details_content" style={{ marginTop: '32px' }}>
                    <CardBox title="申请信息">
                        <TableDetails
                            rowKey="key"
                            pagination={false}
                            scroll={{ x: 1200 }}
                            dataSource={list}
                            columns={this.columns}
                            loading={loadingStatus}
                        >
                            <Skeleton loading={loadingStatus} active paragraph={{ rows: 2 }}>
                                <DescriptionList size="large" title="" style={{ margin: '24px 0px' }}>
                                    <Description term="组织名称">{data == undefined ?  null : data.member_id_name}</Description>
                                    <Description term="抬头类型">{data == undefined ?  null : data.invoice_title_type_name}</Description>
                                    <Description term="开票内容">{data == undefined ?  null : data.invoice_content_name}</Description>
                                    <Description term="发票类型">{data == undefined ?  null : data.invoice_type_name}</Description>
                                    <Description term="纳税人识别号">{data == undefined ?  null : data.taxpayer_number}</Description>
                                    <Description term="出具类型">{data == undefined ?  null : data.invoice_mode_name}</Description>
                                    <Description term="发票抬头">{data == undefined ?  null : data.invoice_title}</Description>
                                    <Description term="开票金额">￥ {data == undefined ?  null : intToFloat(data.limit_amount) }</Description>
                                    <Description term="开票状态">{data == undefined ?  null : data.invoice_status_name}</Description>
                                </DescriptionList>
                            </Skeleton>
                        </TableDetails>
                    </CardBox>

                    {/* 开票信息 */}
                    {invoiceInfo(data)}

                    <Card className="button_box" bordered={false}>
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
})(invoice_details)