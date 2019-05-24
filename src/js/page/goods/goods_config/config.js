import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import main_right from '../../../components/layout/main_right';
import Title from '../../../components/modules/title/title';
import MxjTable from '../../../widget/table/table';

import ShadowBox from '../../../components/modules/shadowBox/shadowBox'

import {
  Row, Col, Select, Icon, Input, Button, Divider
} from 'antd';

import './config.scss'



const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 40,
  address: 'London Park',
}];



// rowSelection object indicates the need for row selection


class GoodsConfig extends Component{
    constructor(){
        super();
        this.state = { 
          th : '商品分类设置'
        };
    }

    render(){
        const shadowBoxCSS = {
          container : {padding : '24px 0',height: 400,overflow : "auto"},
          head : {fontSize : '14px',color : 'rgba(0,0,0,1)',marginBottom : 11,padding : '0 16px'},
          divider : {minWidth : 'auto',width: 'calc(100% - 32px)',margin : '0 auto'},
          addBtn : {float : 'right',color : '#0179FF'},
          itemCSS : {marginLeft : 24},
          iconBox : {float : 'right',marginRight : '20px'},
          iconCSS : {color : '#36DCB6',marginRight : 20}
        };
        return (
          <div className='goods_config'>
            <Title title={this.state.th } />
              <Row gutter={24}>
                <Col span={8} xs={24} sm={24} md={8}>
                <ShadowBox style={shadowBoxCSS.container}>
                  <p style={shadowBoxCSS.head}>
                  <span className='icon'></span>一级分类
                  </p><Divider style={shadowBoxCSS.divider} />
                  <ul>
                      <li className="item_li">102
                        <span style={shadowBoxCSS.itemCSS}>经营性商品</span>
                      </li>
                      <li className="item_li">102
                        <span style={shadowBoxCSS.itemCSS}>场地商品</span>
                      </li>
                  </ul>
                </ShadowBox>
                </Col>
                <Col span={8} xs={24} sm={24} md={8}>
                  <ShadowBox style={shadowBoxCSS.container}>
                    <p style={shadowBoxCSS.head}>
                    <span className='icon'></span>二级分类<Icon type='plus-circle' style={shadowBoxCSS.addBtn} />
                    </p><Divider style={shadowBoxCSS.divider} />
                    <ul>
                      <li className="item_li">102<span style={shadowBoxCSS.itemCSS}>办公增值服务</span>
                        <div style={shadowBoxCSS.iconBox}><Icon type='edit' style={shadowBoxCSS.iconCSS} /><Icon type='delete' style={{color : '#FF5555'}} /></div>
                      </li>
                      <li className="item_li">102<span style={shadowBoxCSS.itemCSS}>积分配额</span>
                        <div style={shadowBoxCSS.iconBox}><Icon type='edit' style={shadowBoxCSS.iconCSS} /><Icon type='delete' style={{color : '#FF5555'}} /></div>
                      </li>
                      <li className="item_li">102<span style={shadowBoxCSS.itemCSS}>实体</span></li>
                    </ul>
                  </ShadowBox>
                </Col>
                <Col span={8} xs={24} sm={24} md={8}>
                  <ShadowBox style={shadowBoxCSS.container}>
                      <p style={shadowBoxCSS.head}>
                      <span className='icon'></span>三级分类<Icon type='plus-circle' style={shadowBoxCSS.addBtn} />
                      </p><Divider style={shadowBoxCSS.divider} />
                      <ul>
                        <li className="item_li">102<span style={shadowBoxCSS.itemCSS}>办公增值服务</span>
                          <div style={shadowBoxCSS.iconBox}><Icon type='edit' style={shadowBoxCSS.iconCSS} /><Icon type='delete' style={{color : '#FF5555'}} /></div>
                        </li>
                        <li className="item_li">102<span style={shadowBoxCSS.itemCSS}>积分配额</span>
                          <div style={shadowBoxCSS.iconBox}><Icon type='edit' style={shadowBoxCSS.iconCSS} /><Icon type='delete' style={{color : '#FF5555'}} /></div>
                        </li>
                        <li className="item_li">102<span style={shadowBoxCSS.itemCSS}>实体</span></li>
                      </ul>
                  </ShadowBox>
                </Col>
              </Row>

          </div>
        )
    }

}

var NewRightContent = main_right(GoodsConfig,[
    {
        text: '商品配置管理'
    },
    {
        text: '商品分类设置',
        path : '/goods/config/config'
    }
])


export default connect(function(state) {
  return {
    common: state.common,
    home: state.home
  };
})(NewRightContent);

