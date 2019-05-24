import React, { Component, PropTypes } from 'react';
import { Provider , connect } from 'react-redux';


import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

class Order_c extends Component{
    constructor(){
        super();
    }

    render(){
        return (
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{
              background: '#fff', padding: 24, margin: 0, minHeight: 280,
            }}
            >
              this is  order_c
            </Content>
          </Layout>
        )
    }

}
export default connect(function(state) {
  return {
    common: state.common,
    home: state.home
  };
})(Order_c);

