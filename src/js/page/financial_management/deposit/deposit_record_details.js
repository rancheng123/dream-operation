import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import MainRight2 from '../../../components/layout/main_right2'
import utils from '../../../asset'
// 引入 金币 单位转换 组件
import {intToFloat} from '../../../asset/intToFloat'

// api接口
import { 
    getDepositRecordDetails
} from '../../../api/financial/deposit'

import {
    Card,
    Button,
    // Row,
    // Col,
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
import './deposit_record_details.scss'

class deposit_record_details extends Component {
    constructor (props) {
        super(props)

        this.state = {
            data: {},
            code: '',
            detailList: [],
            loadingStatus: false
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
            getDepositRecordDetails(data).then((res) => {
                if (res.code = 10000) {
                    console.log(res)
                    // 为数组增加key
                    res.data.details.map((item, i) => {
                        item['key'] = i
                        return item
                    })
                } else {
                    // mock数据
                }

                // 将数据保存到 state 中
                this.updateState('data', res.data)
                this.updateState('detailList', res.data.details)
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
     * 返回押金记录列表页
     */
    goBackEvent = () => {
        // utils.Router.switchRoute('/financial/deposit/record/list')
        utils.Router.backRoute()
    }

    // 押金记录列表目录
    columns = [
        {
            title: '押金详细编码',
            dataIndex: 'detail_code',
        },
        {
            title: '押金详细',
            dataIndex: 'detail_content',
        },
        {
            title: '单价',
            dataIndex: 'unit_price',
            render: val => `￥ ${ intToFloat(val) }`
        },
        {
            title: '数量',
            dataIndex: 'number'
        },
        {
            title: '押金额',
            dataIndex: 'amount',
            render: val => `￥ ${ intToFloat(val) }`
        }
    ]

    render () {
        const { data = {}, detailList = [], loadingStatus } = this.state

        const topMenu = [
            {
                text: '财务管理'
            },
            {
                text: '押金管理'
            },
            {
                text: '押金记录详情',
                // path: '/financial/invoice/manage'
                path: `/financial/deposit/record/details${this.state.code}`
            }
        ]

        return (
            <MainRight2 breadcrumbData={topMenu}>
                <div className="deposit_record_details_box">
                    <Title title="押金详情"></Title>
                    
                    <div className="deposit_record_box">
                        <CardBox title="押金详情">
                            <TableDetails
                                rowKey="key"
                                pagination={false}
                                // size="middle"
                                scroll={{ x: 1000 }}
                                dataSource={detailList}
                                columns={this.columns}
                                loading={loadingStatus}
                            >
                                <Skeleton loading={loadingStatus} active paragraph={{ rows: 3 }}>
                                    <DescriptionList size="large" title="" style={{ margin: '24px 0px' }}>
                                        <Description term="押金编号">{data == undefined ?  null : data.code}</Description>
                                        <Description term="押金类型">{data == undefined ?  null : data.deposit_type_name}</Description>
                                        <Description term="生成时间">{data == undefined ?  null : data.created_at}</Description>
                                        <Description term="城市">
                                            {   
                                                data.city_name != undefined && data.city_name.length > 0 ?
                                                    data.city_name.map((item, i) => {
                                                        return <div key={i}>{item}</div>
                                                    })
                                                    : null
                                            }
                                        </Description>
                                        <Description term="场地">
                                            {
                                                data.location_name != undefined && data.location_name.length > 0 ?
                                                    data.location_name.map((item, i) => {
                                                        return <div key={i}>{item}</div>
                                                    })
                                                    : null
                                            }
                                        </Description>
                                        <Description term="用户名称">{data == undefined ?  null : data.member_id_name}</Description>
                                        <Description term="押金内容">{data == undefined ?  null : data.deposit_content}</Description>
                                        <Description term="押金金额">￥{data == undefined ?  null : intToFloat(data.amount)}</Description>
                                        <Description term="订单号">{data == undefined ?  null : data.order_code}</Description>
                                        <Description term="押金单编号">{data == undefined ?  null : data.deposit_receipt_code}</Description>
                                        <Description term="押金状态">{data == undefined ?  null : data.deposit_status_name}</Description>
                                    </DescriptionList>
                                </Skeleton>
                            </TableDetails>

                            <Card bordered={false}  className="button_box">
                                <Button onClick={() => this.goBackEvent()}>返回</Button>
                            </Card>
                        </CardBox>             
                    </div>
                </div>
            </MainRight2>
        )
    }
}

export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    }
})(deposit_record_details)
