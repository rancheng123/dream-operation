import React, { Component, PropTypes, Fragment } from 'react';
import { Divider, Form, Typography, Row, Col, Table } from 'antd';
import DetailBox from '@/js/components/modules/detailBox'
import DescriptionList from '@/js/components/modules/descriptionList'

const { Text } = Typography;
const { Description } = DescriptionList

import formItemLayout from '../../../form_wrapper'
/**
 * 协议票据
 */
class AgreTicket extends Component{
    constructor(props){
        super(props);
        this.state = {
            hetong: []
        }
    }
    render(){
        const columns = [{
            title: '协议编号',
            dataIndex: 'name',
            key: 'name1',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '创建时间',
            dataIndex: 'age',
            key: 'age1',
        }, {
            title: '协议名称',
            dataIndex: 'address',
            key: 'address1',
        }, {
            title: '协议类型',
            dataIndex: 'address',
            key: 'address2',
        }, {
            title: '协议状态',
            dataIndex: 'address',
            key: 'address3',
        }, {
            title: '打印次数',
            dataIndex: 'address',
            key: 'address4',
        }];
        const columns2 = [{
            title: '押金单编号',
            dataIndex: 'name',
            key: 'name1',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '生成时间',
            dataIndex: 'age',
            key: 'age1',
        }, {
            title: '单据内容',
            dataIndex: 'address',
            key: 'address1',
        }, {
            title: '押金单总价',
            dataIndex: 'address',
            key: 'address2',
        }, {
            title: '押金单状态',
            dataIndex: 'address',
            key: 'address3',
        }, {
            title: '打印次数',
            dataIndex: 'address',
            key: 'address4',
        }];
        return (
            <div className='mxj-margin-top-27'>
                <DetailBox showDivider={true} mainStyle={{marginBottom: 37}} logo={true} dividerStyle={{margin: '11px 0 32px'}} title={'标准合同'}>
                    <Table
                        columns={columns} dataSource={this.state.hetong} />
                </DetailBox>
                <DetailBox showDivider={true} mainStyle={{marginBottom: 37}} logo={true} dividerStyle={{margin: '11px 0 32px'}} title={'财务凭证'}>
                    <Table
                        columns={columns2} dataSource={this.state.hetong} />
                </DetailBox>
            </div>
        )
    }
}
export default AgreTicket