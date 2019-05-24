//押金品详情弹窗

import React, { Component, PropTypes } from 'react';
import {
  Modal, Form
} from 'antd';

import MxjOperateSelect from "../../../components/modules/operateSelect"

const cityData = ['Zhejiang', 'Jiangsu'];
const spaceData = {
        Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
        Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
      };
const showData = [{cityV : "Zhejiang",spaceV : "Hangzhou"},{cityV : "Zhejiang",spaceV : "Wenzhou"},{cityV : "Jiangsu",spaceV : "Nanjing"}];
const dataSource = {cityData,spaceData,showData}
class DepositDetail extends Component {
  constructor(props) {
    super(props);
  }
  submitDetail(){}
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal 
      className="detailModal"
      title="业务押金品详情"
      onOk={this.submitDetail}
      visible={this.props.visible}
      onCancel={this.props.hideDetailModal}
      okText="确认"
      cancelText="取消">
      <div className='detailContent'>
        <Form>
          <Form.Item
            label='押金品编号'
            className='flex'
            >
                <span>&ensp;Y12897</span>
          </Form.Item>
          <Form.Item
            label='创建时间'
            className='flex'
            >
                <span>&ensp;2019-08-29  21:23:12</span>
          </Form.Item>
          <Form.Item
            label='创建人'
            className='flex' 
            >
                <span>&ensp;祖笑天</span>
          </Form.Item>
          <Form.Item
            label='押金品名称'
            className='flex'
            >
              {getFieldDecorator('goodsName', {
                rules: [{ required: true}],
              })(
                  <span>&ensp;办公桌</span>
              )}
          </Form.Item>
          <Form.Item
            label='押金品单位'
            className='flex'
            >
              {getFieldDecorator('goodsName', {
                rules: [{ required: true}],
              })(
                <span>&ensp;张</span>
              )}
          </Form.Item>
          <Form.Item
            label='押金品单价'
            className='flex'
            >
              {getFieldDecorator('goodsName', {
                rules: [{ required: true}],
              })(
                <span>&ensp;￥6000/张</span>
              )}
          </Form.Item>
        </Form>
        <MxjOperateSelect dataSource={dataSource} isEdit={false} />
      </div>
      </Modal>
    );
  }
}
const DepositDetailForm = Form.create({name : 'Form_deposit_detail'})(DepositDetail);

export default DepositDetailForm