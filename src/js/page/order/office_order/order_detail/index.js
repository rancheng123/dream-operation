import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import utils from '@/js/asset'
import CommonCard from '../../../../components/modules/commonCard'
import Title from '../../../../components/modules/title/title'
import BasicDetail from './components/basic_detail'
import {getOrderOfficeDetail} from '@api/order'
import {Button} from 'antd'
import './index.scss'
@connect(({ orderDetailState }) => ({
    orderDetailState
}))
class OrderDetailView extends Component{
    constructor(){
        super();
    }
    componentDidMount(){
        this.getOrderOfficeDetailFetch()
    }
    componentWillUnmount(){
        const {dispatch} = this.props
        dispatch({
            type: 'clear_order_office_detail',
        })
    }
    getOrderOfficeDetailFetch() {
        const {dispatch} = this.props
        getOrderOfficeDetail(this.props.params.id).then(res => {
            if (res.code === 10000) {
                dispatch({
                    type: 'order_office_detail',
                    data: {
                        detail: res.data
                    }
                })
            }
        })
    }
    render(){
        const {orderDetailState, params} = this.props
        const {detail} = orderDetailState
        return (
            <Fragment>
                <Title title='办公服务订单详情'></Title>
                <CommonCard header={false} showDivider={false} mainStyle={{padding: '24px 32px 32px 32px'}}>
                    <BasicDetail {...this.props}></BasicDetail>
                    {/*<Tabs defaultActiveKey="2" type="card">*/}
                    {/*<TabPane tab="订单基础信息" key="1">*/}
                    {/*{detail && <BasicDetail></BasicDetail>}*/}

                    {/*</TabPane>*/}
                    {/*<TabPane tab="账单信息" key="2">*/}
                    {/*{detail && <BilLingInfo></BilLingInfo>}*/}

                    {/*</TabPane>*/}
                    {/*<TabPane tab="协议票据" key="3">*/}
                    {/*{detail && <AgreTicket></AgreTicket>}*/}
                    {/*</TabPane>*/}
                    {/*</Tabs>*/}
                    <div className='mxj-flex-center'>
                        <Button onClick={() => {
                            utils.Router.backRoute()
                        }}>返回</Button>
                    </div>
                </CommonCard>
            </Fragment>


        )
    }

}

export default OrderDetailView

