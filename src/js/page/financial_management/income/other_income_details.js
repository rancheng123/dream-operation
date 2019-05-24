import React, { Component } from 'react'
import { connect } from 'react-redux'
import utils from '../../../asset'
// 引入 金币 单位转换 组件
import {intToFloat} from '../../../asset/intToFloat'

// api接口
import { 
    getIncomeDetails
} from '../../../api/financial/income'

import {
    Card,
    Button,
    Skeleton
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

import './other_income_details.scss'

// redux里保存的profile属性
@connect(({ profile }) => ({
    profile,
}))

class other_income_details extends Component {
    constructor (props) {
        super(props)

        this.state = {
            data: {},
            code: '',
            incomeList: {},
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
            getIncomeDetails(data).then((res) => {
                if (res.code == 10000) {
                } else {
                    // mock数据
                }

                // 将数据保存到 state 中
                this.updateState('data', res.data)
                this.updateState('incomeList', res.data.details)
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
            title: '扣款编号',
            dataIndex: 'detail_code',
        },
        {
            title: '收入类型',
            dataIndex: 'detail_type_name'
        },
        {
            title: '收入内容',
            dataIndex: 'content'
        },
        {
            title: '收入说明',
            dataIndex: 'remark'
        },
        {
            title: '应收金额',
            dataIndex: 'receivable_amount',
            render: val => `￥ ${ intToFloat(val) }`
        },
        {
            title: '实收金额',
            dataIndex: 'received_amount',
            render: val => `￥ ${ intToFloat(val) }`
        }
    ]

    /**
     * 返回办公服务账单管理页面
     */
    goBackEvent = () => {
        // utils.Router.switchRoute('/financial/income/list')
        utils.Router.backRoute()
    }

    render () {
        const {data = {}, loadingStatus} = this.state
        let incomeDetails = data
        let list = []
        if (this.state.data.details !== undefined) {
            list = this.state.data.details.map((item, i) => {
                item['key'] = i
                return item
            })
        }

        return (
            <div>
                <Title title="其他收入详情"></Title>

                <div  style={{ boxShadow: '0 2px 14px 0 rgba(0,0,0,0.10)', borderRadius: '4px' }}>
                    <CardBox title="其他收入详情">  
                        <TableDetails
                            rowKey="key"
                            pagination={false}
                            scroll={{ x: 1000 }}
                            dataSource={list}
                            columns={this.columns}
                            loading={loadingStatus}
                        >
                            <Skeleton loading={loadingStatus} active paragraph={{ rows: 2 }}>
                                <DescriptionList size="large" title="" style={{ margin: '24px 0px' }}>
                                    <Description term="收入编号">{incomeDetails == undefined ?  null : incomeDetails.income_code}</Description>
                                    <Description term="用户名称">{incomeDetails == undefined ?  null : incomeDetails.member_id_name}</Description>
                                    <Description term="收入来源">{incomeDetails == undefined ?  null : incomeDetails.source_type_name}</Description>
                                    <Description term="城市">
                                        {   
                                            incomeDetails.city_name != undefined && incomeDetails.city_name.length > 0 ?
                                                incomeDetails.city_name.map((item, i) => {
                                                    return <div>{item}</div>
                                                })
                                                : null
                                        }
                                    </Description>
                                    <Description term="场地">
                                        {
                                            incomeDetails.location_name != undefined && incomeDetails.location_name.length > 0 ?
                                                incomeDetails.location_name.map((item, i) => {
                                                    return <div key={i}>{item}</div>
                                                })
                                                : null
                                        }
                                    </Description>
                                    <Description term="来源编号">{incomeDetails == undefined ?  null : incomeDetails.source_code}</Description>
                                    <Description term="生成时间">{incomeDetails == undefined ?  null : incomeDetails.created_at}</Description>
                                    <Description term="应收">￥ {incomeDetails == undefined ?  null : intToFloat(incomeDetails.receivable_amount) }</Description>
                                    <Description term="实收">￥ {incomeDetails == undefined ?  null : intToFloat(incomeDetails.received_amount) }</Description>
                                </DescriptionList>
                            </Skeleton> 
                        </TableDetails>
                    </CardBox>
                    
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
})(other_income_details)