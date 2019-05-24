//押金品编辑弹窗

import React, { Component } from 'react';
import {
  Modal, Form, Input
} from 'antd';
import MxjOperateSelect from "../../../components/modules/operateSelect"

const cityData = ['Zhejiang', 'Jiangsu'];
const spaceData = {
        Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
        Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
      };
const dataSource = {cityData,spaceData}
class DepositEdit extends Component {
    constructor(props) {
      super(props);
    }
    submitDetail(){}
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Modal 
        className="detailModal"
        title="编辑业务押金品"
        onOk={this.submitDetail}
        visible={this.props.visible}
        onCancel={this.props.hideEditModal}
        okText="保存"
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
                  <Input placeholder='请输入' style={{width : '160px'}} />
                )}
            </Form.Item>
            <Form.Item
              label='押金品单位'
              className='flex'
              >
                {getFieldDecorator('goodsName', {
                  rules: [{ required: true}],
                })(
                  <Input placeholder='请输入' style={{width : '160px'}} />
                )}
            </Form.Item>
            <Form.Item
              label='押金品单价'
              className='flex'
              >
                {getFieldDecorator('goodsName', {
                  rules: [{ required: true}],
                })(
                    <Input placeholder='请输入' style={{width : '160px'}} suffix="/月" />
                )}
            </Form.Item>
          </Form>
          <MxjOperateSelect dataSource={dataSource} />
        </div>
        </Modal>
      );
    }
  }
  const DepositEditForm = Form.create({name : 'Form_deposit_edit'})(DepositEdit);

  export default DepositEditForm 