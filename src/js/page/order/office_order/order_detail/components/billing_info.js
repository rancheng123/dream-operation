import React, { Component, PropTypes, Fragment } from 'react';
import { Divider, Form, Typography, Row, Col, Table } from 'antd';
import DetailBox from '@/js/components/modules/detailBox'
import DescriptionList from '@/js/components/modules/descriptionList'

const { Description } = DescriptionList
import MxjTag from '@widget/tag/mxjTag';
import formItemLayout from '../../../form_wrapper'
/**
 * 账单信息
 */
class BilLingInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            goods_list: [
                {
                    key: 1, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
                },
                {
                    key: 2, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
                },
                {
                    key: 3, name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
                },
            ],
            expandedRowKeys: []
        }
    }
    render(){
        const columns = [{
            title: '账单编号',
            dataIndex: 'name',
            key: 'name1',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '账单类型',
            dataIndex: 'age',
            key: 'age1',
        }, {
            title: '期数',
            dataIndex: 'address',
            key: 'address1',
        }, {
            title: '账期',
            dataIndex: 'address',
            key: 'address2',
        }, {
            title: '通知日',
            dataIndex: 'address',
            key: 'address3',
        }, {
            title: '最晚支付',
            dataIndex: 'address',
            key: 'address4',
        }, {
            title: '状态',
            dataIndex: 'address',
            key: 'address5',
        }, {
            title: '共计',
            dataIndex: 'address',
            key: 'address6',
        }, {
            title: '',
            dataIndex: 'address',
            key: 'address7',
            render: (text, record) => {
                return (
                    <Fragment>
                        {
                            record.key && <MxjTag style={{height: 20}} type='success'>已出</MxjTag>
                        }
                        {
                            !record.key && <MxjTag style={{height: 20}} type='error'>未出</MxjTag>
                        }
                    </Fragment>
                )
            }
        }];
        return (
            <div  className='mxj-margin-top-27'>
                <DetailBox showDivider={true} mainStyle={{marginBottom: 37}} logo={true} dividerStyle={{margin: '11px 0 32px'}} title={'账单配置信息'}>
                    <DescriptionList size="small" title="" style={{ marginBottom: 0 }}>
                        <Description term="账单截止支付日">账单截止支付日 <MxjTag style={{height: 20}} type='info'>提前34日</MxjTag></Description>
                        <Description term="账单截止支付日">账单截止支付日 <MxjTag style={{height: 20}} type='info'>提前34日</MxjTag></Description>
                        <Description term="账单通知方式">账单通知方式</Description>
                        <Description term="账单接收邮箱">账单接收邮箱</Description>
                    </DescriptionList>
                </DetailBox>
                <DetailBox showDivider={true} mainStyle={{marginBottom: 37}} logo={true} dividerStyle={{margin: '11px 0 32px'}} title={'默认发票配置'}>
                    <DescriptionList size="small" title="" style={{ marginBottom: 0 }}>
                        <Description term="发票类型">发票类型</Description>
                        <Description term="发票抬头">发票抬头</Description>
                        <Description term="纳税人识别号">纳税人识别号</Description>
                    </DescriptionList>
                </DetailBox>
                <DetailBox showDivider={true} mainStyle={{marginBottom: 37}} logo={true} dividerStyle={{margin: '11px 0 32px'}} title={'办公服务商品详细信息'}>
                    <Table
                        rowKey={row => row.key}
                        expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
                        columns={columns} dataSource={this.state.goods_list} />
                </DetailBox>
            </div>
        )
    }
}
export default BilLingInfo