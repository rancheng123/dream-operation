import React, { Component, Fragment } from 'react';
import {Link} from "react-router";
import { Divider, Icon, Skeleton } from 'antd';
import { connect } from 'react-redux';
import DetailBox from '@/js/components/modules/detailBox'
import DescriptionList from '@/js/components/modules/descriptionList'
const { Description } = DescriptionList
import moment from 'moment'
import MxjTag from '@widget/tag/mxjTag'
import MxjTable from '@/js/widget/table/table'
import {statusText, changeNumberPriceDiff} from '@/js/asset/common'
import ColumsText from '@modules/columsText'
/**
 * 基础详情信息
 */
@connect(({ orderDetailState }) => ({
    orderDetailState
}))
class BasicDetail extends Component{
    constructor(props){
        super(props);
    }
    renderTableTitle(detail) {
        return (
            <div className='mxj-table-detail-title'>
                <Icon type="calendar"/>
                <div style={{margin: '0 36px 0 16px'}}>{moment(detail.inner_start_at).format('YYYY-MM-DD')} 至 {moment(detail.inner_end_at).format('YYYY-MM-DD')}</div>
                <div style={{flexGrow: 1}}>{detail.diff_inner_date}</div>
                {/*<a>查看更多</a>*/}
            </div>
        )
    }
    renderTableFooter(detail) {
        return (
            <div>
                {detail.free_type !== 1 && (
                    <div className='mxj-table-detail-title' style={{background: '#bfbfbf', marginTop: 16}}>
                        <div className='mxj-detail-mian'>免租期</div>
                        <Icon className='icon' type='calendar'></Icon>
                        <div style={{margin: '0 36px 0 16px'}}>{moment(detail.free_start_at).format('YYYY-MM-DD')} 至 {moment(detail.free_end_at).format('YYYY-MM-DD')}</div>
                        {/*<div style={{flexGrow: 1}}>{detail.free_days}天</div>*/}
                    </div>
                )}
                <div className='mxj-float-right mxj-error-color' style={{paddingRight: 76, height: 50, lineHeight: '50px'}}>
                    <span>原总价：
                        <span className=''>¥{
                            changeNumberPriceDiff(detail.origin_all_price)
                        }</span>
                    </span>
                    &nbsp;&nbsp;
                    <span>成交总价：
                        <span className=''>¥{
                            changeNumberPriceDiff(detail.charge_all_price)
                        }</span>
                    </span>
                </div>
                {/*<div className='mxj-table-detail-footer'>*/}
                    {/*<div style={{flexGrow: 1, textAlign: 'right'}}>原总价：<span className={'mxj-error-color'}>¥{detail.origin_all_price}</span></div>*/}
                    {/*<div>成交总价：<span className={'mxj-error-color'}>¥{detail.charge_all_price}</span></div>*/}
                {/*</div>*/}
            </div>
        )
    }


    /**
     * 用户类型
     * @param e
     * @returns {string}
     */
    memberType(e) {
        switch (e) {
            case 1:
                return '企业';
            case 2:
                return '非企业';
            case 3:
                return '个人'
        }
    }

    /**
     * 渲染城市楼盘场地层数
     */
    renderLocation() {
        const {orderDetailState} = this.props
        const {detail} = orderDetailState
        const {location_floors} = detail
        let arr = []
        for(let i in location_floors) {
            arr.push(location_floors[i])
        }
        return(
            <Fragment>
                {arr.map((value, index) => (
                    <DescriptionList key={index} col={4} size="small" title="" style={{ marginBottom: 0 }}>
                        <Description term="城市">{value.city_name}</Description>
                        <Description term="场地">{value.location_name}</Description>
                        <Description term="楼盘名称">{value.building_name}</Description>
                        <Description term="层数">{value.floor}</Description>
                    </DescriptionList>
                ))}
            </Fragment>
        )
    }

    /**
     * 统计汇总商品
     */
    statisticsRender() {
        const {orderDetailState} = this.props
        const {detail} = orderDetailState
        const {goods, location_floors} = detail
        let gongwei_gu = 0
        let gongwei_liu = 0
        let room = 0
        let cities = []
        let location = []
        goods.forEach(value => {
            if (value.place_item_type === 1) {
                if (value.station_type === 1) {
                    gongwei_gu++
                } else {
                    gongwei_liu++
                }
            } else if( value.place_item_type=== 2) {
                room++
            }
            cities.push(value.city_code)
            location.push(value.location_code)
        })
        cities = [...new Set(cities)]
        location = [...new Set(location)]
        let str_arr = []
        if (cities.length) {
            str_arr.push('城市数：' + cities.length)
        }
        if (location.length) {
            str_arr.push('场地数：' + location.length)
        }
        if (gongwei_gu) {
            str_arr.push(`固定工位数：${gongwei_gu}`)
        }
        if (gongwei_liu) {
            str_arr.push(`流动工位数：${gongwei_liu}`)
        }
        if (room) {
            str_arr.push('房间数：' + room)
        }
        let str = str_arr.length? (<span>{str_arr.join(`  `)}</span>): ''

        return (
            <Fragment>{str}</Fragment>
        )
    }
    paymentRender(detail) {
        const arr = detail.deposit_payment.split('-')
        return (
            `押${arr[0]}付${arr[1]}  提前${arr[2]}日交租`
        )
    }
    render(){
        const {orderDetailState, params} = this.props
        const {detail} = orderDetailState
        const columns = [{
            title: '商品类型',
            dataIndex: 'place_item_type',
            key: 'place_item_type',
            render: (text, record) => {
                if (text === 1) {
                    if (record.station_type ===1) {
                        return '固定工位'
                    } else {
                        return '流动工位'
                    }
                } else {

                    return '房间'
                }
            },
        }, {
            title: '商品编号',
            dataIndex: 'code',
            key: 'code',
            render: (text, record) => {
                return <Link to={`/goods/${record.place_item_type === 1 ? 'space': 'room'}/detail/${text}`} target='_blank'>{text}</Link>
            }
        }, {
            title: '商品名称',
            dataIndex: 'name',
            key: 'name',
            render: (text) => {
                return <ColumsText text={text} />
            }
        }, {
            title: '原单价',
            dataIndex: 'single_price',
            key: 'single_price',
            render: text => (`¥${changeNumberPriceDiff(text)}/月`)
        }, {
            title: '成交单价',
            dataIndex: 'changed_price',
            key: 'changed_price',
            render: text => (`¥${changeNumberPriceDiff(text)}/月`)
        }, {
            title: '原总价',
            dataIndex: 'single_price_total',
            key: 'single_price_total1',
            render: (text, record) => (`¥${changeNumberPriceDiff(record.single_price * record.num)}`),
        }, {
            title: '成交总价',
            dataIndex: 'changed_price_total',
            key: 'changed_price_total1',
            render: (text, record) => (`¥${changeNumberPriceDiff(record.changed_price * record.num)}`),
        }];
        const columns1 = [{
            title: '押金类型',
            dataIndex: 'money_type_val',
            key: 'money_type_val',

        }, {
            title: '押金内容',
            dataIndex: 'money_content_val',
            key: 'money_content_val',
        },
        {
            title: '单价',
            dataIndex: 'price',
            key: 'price',
            render: text => `-`,
        },
            {
            title: '数量',
            dataIndex: 'number',
            key: 'number',
        }, {
            title: '押金总价',
            dataIndex: 'amount',
            key: 'amount',
            render: text => (`¥${changeNumberPriceDiff(text)}`)
        }];
        return (
            <div className='mxj-margin-top-27 mxj-order-detail-basic'>
                <Skeleton active loading={!detail}>
                    {detail && (
                        <DetailBox showDivider={true} mainStyle={{marginBottom: 37}} logo={true} title={'订单基础信息'}>
                            <DescriptionList size="small" title="" style={{ marginBottom: 0 }}>
                                <Description term="订单号"><Link to={`/order/office/${params.sourceType}/detail/${detail.order_code}`}>{detail.order_code}</Link></Description>
                                <Description term="下单时间">{detail.created_at}</Description>
                                <Description term="创建人">{detail.created_name}</Description>
                                <Description term="订单状态">{statusText(detail.status)}</Description>
                                <Description term="订单共计"><span className='mxj-error-color'>¥{changeNumberPriceDiff(detail.charge_all_price)}</span></Description>
                            </DescriptionList>
                        </DetailBox>
                    )}
                </Skeleton>
                <Skeleton active loading={!detail}>
                    {detail && (
                        <DetailBox showDivider={true} mainStyle={{marginBottom: 32}} logo={true} title={'用户信息'}>
                            <DescriptionList size="small" title="" style={{ marginBottom: 0 }}>
                                <Description term="用户编码">{detail.member_id}</Description>
                                <Description term="用户名称"><Link to={`/organize/owner/detail/${detail.member_id}`}>{detail.member_name}</Link></Description>
                                <Description term="组织类型">{this.memberType(detail.member_type)}</Description>
                                <Description term="联系方式">{detail.member_owner.mobile}</Description>
                                <Description term="联系邮箱">{detail.member_owner.email}</Description>
                            </DescriptionList>
                        </DetailBox>
                    )}
                </Skeleton>
                <Skeleton active loading={!detail}>
                    {detail && (
                        <DetailBox showDivider={true} mainStyle={{marginBottom: 32}} logo={true} title={'办公服务商品详细信息'}>
                            {this.renderLocation()}
                            <DescriptionList col={2} size="small" title="" style={{ marginBottom: 0 }}>
                                <Description term="订单开始日">{detail.start_date}</Description>
                                <Description term="订单截止日">{detail.end_date}</Description>
                            </DescriptionList>
                            <DescriptionList col={2} size="small" title="" style={{ marginBottom: 0 }}>
                                <Description term="总服务时长">{detail.diff_service_date}</Description>
                                <Description term="办公服务内容">{this.statisticsRender()}</Description>
                            </DescriptionList>
                            {this.renderTableTitle(detail)}
                            <MxjTable
                                className='mxj-table-page-common'
                                showPaination={false}
                                scroll={{ x: 150* columns.length }}
                                rowKey={record => record.code}
                                columns={columns} dataSource={detail.goods} />
                            {this.renderTableFooter(detail)}
                            <Divider style={{margin: '0 0 16px'}}/>
                            <DescriptionList col={2} size="small" title="" style={{ marginBottom: 0 }}>
                                <Description term="押付方式">{this.paymentRender(detail)}</Description>
                                <Description term="配送积分配额">{detail.present_credits} <MxjTag type='info' style={{height: 20, lineHeight: '20px'}}>积分/月</MxjTag> <span style={{marginLeft: 24}}>{detail.present_prints}</span> <MxjTag style={{height: 20, lineHeight: '20px'}} type='info'>打印纸张数/月</MxjTag></Description>
                                <Description term="订单折扣">{detail.discount_rate}%</Description>
                                <Description term="年涨幅">{detail.inc_rate}%</Description>
                            </DescriptionList>
                        </DetailBox>
                    )}
                </Skeleton>
                <Skeleton active loading={!detail}>
                    {detail && (
                        <DetailBox showDivider={true} mainStyle={{marginBottom: 32}} logo={true} title={'押金信息'}>
                            <MxjTable
                                showPaination={false}
                                className='mxj-table-page-common'
                                scroll={{ x: 150* columns1.length }}
                                rowKey={(text, record, index) => index}
                                // footer={() => (<div style={{textAlign: 'right',color: '#000000'}}>押金总额：<span className='mxj-error-color'>¥{detail.finance_info.compute_cost.deposit_amount}</span></div>)}
                                columns={columns1} dataSource={detail.finance_info.compute_cost.deposit.map((value, index) => {
                                    value.key = index
                                    return value
                                })} />
                            <div className='mxj-float-right mxj-error-color' style={{paddingRight: 76, height: 50, lineHeight: '50px'}}>
                                <span>押金总额：
                                    <span className=''>¥{
                                        changeNumberPriceDiff(detail.finance_info.compute_cost.deposit_amount)
                                    }</span>
                                </span>
                            </div>
                        </DetailBox>
                    )}

                </Skeleton>
                <Skeleton active loading={!detail}>
                    {detail && (
                        <DetailBox showDivider={true} mainStyle={{marginBottom: 56}} logo={true} title={'订单备注'}>
                            <DescriptionList size="small" title="" style={{ marginBottom: 0 }}>
                                <Description term="备注人">{detail.created_name}</Description>
                                <Description term="备注时间">{moment(detail.created_at).format('YYYY-MM-DD')}</Description>
                            </DescriptionList>
                            <div className='memo-mxj'>{detail.memo}</div>
                        </DetailBox>
                    )}
                </Skeleton>

            </div>
        )
    }
}
export default BasicDetail