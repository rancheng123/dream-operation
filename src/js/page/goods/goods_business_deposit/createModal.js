//押金品编辑弹窗

import React, { Component } from 'react';
import {
  Modal, Form, Input, Select, Col, Row, Button, Icon
} from 'antd';
import MxjOperateSelect from "../../../components/modules/operateSelect";
import { getAddressInfo } from "@api/main";
const cityData = ['Zhejiang', 'Jiangsu'];
const spaceData = {
        Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
        Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
      };
// const tableCSS = {
//   container : 
//   {border : '1px solid red',borderRadius: 4,boxSizing : 'content-box'}
// };
const dataSource = {cityData,spaceData}
class DepositCreate extends Component {
    constructor(props) {
      super(props);
    }
    submitDetail(){}
    
    render() {
      const { getFieldDecorator } = this.props.form;
      const tableCss = {
          container : {border : '1px solid #E9E9E9',borderRadius: 4,boxSizing : 'content-box'},
          tableHead : {height : 40,paddingLeft : 32,backgroundColor : 'rgba(114,126,139,0.06)',lineHeight : '40px',borderBottom : "1px solid #E9E9E9"},
          tableRow : {padding : '7px 0',paddingLeft : 32,borderBottom : "1px solid #E9E9E9",display: 'flex',alignItems: 'center',},
          selectW : {width : 160},
          btn : {width : 360,margin : '8px auto',height : 32,border : '1px dashed #E9E9E9',color : '#BFBFBF',display : 'block'}
      };
      
    
      return (
        <Modal 
        className="detailModal"
        title="新建业务押金品"
        onOk={this.submitDetail}
        visible={this.props.visible}
        onCancel={this.props.hideCreateModal}
        destroyOnClose={true}
        okText="保存"
        cancelText="取消">
        <div className='detailContent'>
          <Form>
            <Form.Item
              label='押金品名称'
              className='flex'
              >
                {getFieldDecorator('goodsName', {
                  rules: [{ required: true,message: 'Please input!'}],
                })(
                  <Input placeholder='请输入' style={tableCss.selectW} />
                )}
            </Form.Item>
            <Form.Item
              label='押金品单位'
              className='flex'
              >
                {getFieldDecorator('goodsName', {
                  rules: [{ required: true}],
                })(
                  <Input placeholder='请输入' style={tableCss.selectW} />
                )}
            </Form.Item>
            <Form.Item
              label='押金品单价'
              className='flex'
              >
                {getFieldDecorator('goodsName', {
                  rules: [{ required: true}],
                })(
                    <Input placeholder='请输入' style={tableCss.selectW} suffix="/月" />
                )}
            </Form.Item>
          </Form>
          {/* 新增城市场地 */}
          <MxjOperateSelect dataSource={dataSource} />
        </div>
        </Modal>
      );
    }
  }
  const DepositCreateForm = Form.create({name : 'Form_deposit_create'})(DepositCreate);

  export default DepositCreateForm 