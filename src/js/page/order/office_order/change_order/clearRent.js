import {Component, Fragment} from "react";
import React from "react";
import main_right from "@/js/components/layout/main_right";
import DetailBox from '@/js/components/modules/detailBox'
import CommonCard from '@/js/components/modules/commonCard/index'
import BasicDetail from "../order_detail";
import Bind from 'lodash-decorators/bind';
import DescriptionList from '@/js/components/modules/descriptionList'
import { connect } from 'react-redux';
import EditableCell from './canEditTableView'
import './index.scss'
import {
    Row,
    Col,
    Steps,
    DatePicker,
    Form,
    Input,
    Radio,
    Table,
    Icon
} from 'antd';
import EditableTable from "./canEditTableView";
const { Description } = DescriptionList
const Step = Steps.Step;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

/**
 * 变更引导页
 */
@connect(({ orderChangeState }) => ({
    data: orderChangeState,
}))
@Form.create()
class ChangeOrderClearRent extends Component{
    constructor(props){
        super(props)
        this.state = {
            goods_list: []
        }

    }
    /**
     * 接收可编辑表单数据
     * @param e
     */
    @Bind()
    changeEditTableData(e){
        console.log(e)
        this.setState({
            goodsData: e
        })
    }
    render() {
        const { getFieldDecorator, getFieldsValue } = this.props.form;
        const { data } = this.props;
        const formItemLayoutBottom = {
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 16,
            },
        }
        const colums1 = [{
            title: '押金内容',
            dataIndex: 'name',
            key: 'name1',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '单价',
            dataIndex: 'age',
            key: 'age2',
        }, {
            title: '总数',
            dataIndex: 'address',
            key: 'address3',
        }, {
            title: '金额',
            dataIndex: 'address',
            key: 'address4',
        }];
        const colums2 = [{
            title: '押金内容',
            dataIndex: 'name',
            key: 'name1',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '单价',
            dataIndex: 'age',
            key: 'age2',
        }, {
            title: '总数',
            dataIndex: 'address',
            key: 'address3',
        }, {
            title: '金额',
            dataIndex: 'address',
            key: 'address4',
        }, {
            title: '退还数量',
            dataIndex: 'address',
            key: 'address4',
        }, {
            title: '扣款金额',
            dataIndex: 'address',
            key: 'address4',
        }];
        const colums3 = [{
            title: '押金内容',
            dataIndex: 'name',
            key: 'name1',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '单价',
            dataIndex: 'age',
            key: 'age2',
        }, {
            title: '总数',
            dataIndex: 'address',
            key: 'address3',
        }, {
            title: '金额',
            dataIndex: 'address',
            key: 'address4',
        }];
        return (
            <Fragment>
                <CommonCard header={false}  showDivider={false} mainStyle={{padding: '32px 39px 26px'}}>
                    <DetailBox showDivider={true} mainStyle={{marginBottom: 37}} logo={true} dividerStyle={{margin: '11px 0 32px'}} title={'当前订单信息'}>
                        <DescriptionList size="small" title="" style={{ marginBottom: 0 }}>
                            <Description term="组织名称">组织名称</Description>
                            <Description term="订单编号">订单编号</Description>
                            <Description term="订单状态">订单状态</Description>
                            <Description term="城市">城市</Description>
                            <Description term="场地">场地</Description>
                            <Description term="楼盘名称">楼盘名称</Description>
                            <Description term="层数">层数</Description>
                            <Description term="订单开始日">订单开始日</Description>
                            <Description term="订单截止日">订单截止日</Description>
                            <Description term="总服务时长">总服务时长</Description>
                            <Description term="办公服务内容">办公服务内容</Description>
                        </DescriptionList>
                    </DetailBox>
                    <DetailBox showDivider={true} mainStyle={{marginBottom: 37}} logo={true} dividerStyle={{margin: '11px 0 32px'}} title={'请确认相关事项及费用'}>
                        <Form className='ant-advanced-search-form'>
                            <Row type='flex' gutter={32}>
                                <Col span={8}>
                                    {/*组织用户选择*/}
                                    <Form.Item label="订单终止日" className='mxj-margin-bottom-24'>
                                        {getFieldDecorator('order_end', {
                                            rules: [
                                                { required: true, message: '请选择组织!'},
                                            ],
                                            initialValue: data.clear_rent.order_end,
                                        })(
                                            <DatePicker/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    {/*组织用户选择*/}
                                    <Form.Item label="提前终止原因" className='mxj-margin-bottom-24'>
                                        我方清租
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row type='flex' gutter={32}>
                                <Col span={24}>
                                    {/*组织用户选择*/}
                                    <Form.Item label="终止原因" className='mxj-margin-bottom-24 mxj-remarks-item' style={{width: '100%'}}>
                                        {getFieldDecorator('close_desc', {
                                            rules: [
                                                { required: true, message: '请选择组织!'},
                                            ],
                                            initialValue: data.clear_rent.close_desc,
                                        })(
                                            <TextArea rows={2}/>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                        <Steps direction="vertical" current={1} size="small">
                            <Step title="请确认并处理当前押金" description={
                                <Fragment>
                                    <div style={{color: '#656771', margin: '15px 0 8px'}}>办公服务押金</div>
                                    <Table
                                        columns={colums1} dataSource={this.state.goods_list} />
                                    <div style={{color: '#656771', margin: '15px 0 8px'}}>物品押金</div>
                                    <Table
                                        columns={colums2} dataSource={this.state.goods_list} />
                                    <div style={{color: '#656771', margin: '15px 0 8px'}}>业务押金</div>
                                    <Table
                                        columns={colums3} dataSource={this.state.goods_list} />
                                </Fragment>
                            }>

                            </Step>
                            <Step title={<div>请回收用户的纸质押金单 <span className='mxj-error-color' style={{fontSize: 12}}>当申请通过后，系统将自动为您生成一条【待退回】的押金单据，请您尽快将回收的押金单寄回总部作为退押金的凭证。</span></div>}
                                  description={
                                      <Fragment>
                                          <Form layout='inline'>
                                              <Row type='flex' gutter={32}>
                                                  <Col span={24}>
                                                      {/*组织用户选择*/}
                                                      <Form.Item label="押金单处理" className='mxj-margin-bottom-24'>
                                                          {getFieldDecorator('deposit_ticket', {
                                                              rules: [
                                                                  { required: true, message: '请选择组织!'},
                                                              ],
                                                              initialValue: data.clear_rent.deposit_ticket,
                                                          })(
                                                              <RadioGroup>
                                                                  <Radio value={1}>已拿到纸质押金单，校验</Radio>
                                                                  <Radio value={2}>押金单遗失，需要扣款</Radio>
                                                              </RadioGroup>
                                                          )}
                                                      </Form.Item>
                                                  </Col>
                                                  <Col span={24} style={{display: 'flex', alignItems: 'center'}}>
                                                      {/*组织用户选择*/}
                                                      <Form.Item label="押金单校验码" className='mxj-margin-bottom-24'>
                                                          {getFieldDecorator('deposit_code', {
                                                              rules: [
                                                                  { required: true, message: '请选择组织!'},
                                                              ],
                                                              initialValue: data.clear_rent.deposit_code,
                                                          })(
                                                                  <Input/>
                                                          )}

                                                      </Form.Item>
                                                      <div>
                                                          <span className='mxj-success-color' style={{marginRight: 25}}><Icon type='check'></Icon>校验成功</span>
                                                          <span className='mxj-info-color'><Icon type='eye'></Icon>查看押金单</span>
                                                      </div>
                                                  </Col>
                                              </Row>
                                          </Form>
                                      </Fragment>
                                  }
                            />
                            <Step title={<div>扣款信息 <span className='mxj-error-color' style={{fontSize: 12}}>如果有发生了其他扣款，请创建一条其他扣款信息</span></div>}
                                description={
                                    <EditableTable {...this.props} tableData={this.state.goods_list} onChange={this.changeEditTableData}></EditableTable>
                                }
                            />
                            <Step title={<div>退款 <span className='mxj-error-color' style={{fontSize: 12}}>当申请通过后，系统将自动为您生成一条【待打款】的退款申请，相关工作人员会进行后续处理</span></div>}
                                  description={
                                      <Table
                                          style={{marginTop: 24}}
                                          columns={colums1} dataSource={this.state.goods_list} />
                                  }
                            />
                        </Steps>
                    </DetailBox>
                </CommonCard>
            </Fragment>
        )
    }
}
const NewRightContent = main_right(ChangeOrderClearRent,[
    {
        text: 'Home'
    },
    {
        text: 'List'
    },
    {
        text: 'Home_a'
    }
])
export default NewRightContent