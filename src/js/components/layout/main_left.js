import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu,Layout,Icon, Row } from 'antd';

import Bind from 'lodash-decorators/bind';

const { SubMenu } = Menu;
const { Sider } = Layout;
const MenuItemGroup = Menu.ItemGroup;

import MenuItem from './menu'

import MenuLogo from '@svg/menu_logo.svg';

import SpaceCk from '@svg/space_ck.svg';
import GoodsCk from '@svg/goods_ck.svg';
import OrderCk from '@svg/order_ck.svg';
import FinancialCk from '@svg/financial_ck.svg';
import CheckCk from '@svg/check_ck.svg';
import ContractCk from '@svg/contract_ck.svg';
import OrganizeCk from '@svg/organize_ck.svg';


// import AppHeader from './header';

import './main_left.scss'


const IconCk = {
  '/space' : SpaceCk,
  '/goods' : GoodsCk,
  '/order' : OrderCk,
  '/financial' : FinancialCk,
  '/checks' : CheckCk,
  '/contract' : ContractCk,
  '/organize' : OrganizeCk
}


class Main_left extends Component{
    constructor(){
        super()
        this.state = {
          openKeys: [],
          rootSubmenuKeys : [],
          collapsed : false,
          icon_ck : "/"+location.pathname.split("/")[1]
        }
    }
    componentDidMount(){
      componentStore.set(this);
    }
    componentWillUnmount(){
        componentStore.clear(this);
    }

    onOpenChange = (openKeys) => {
      
      console.log(openKeys,11111);
      //console.log(this.state.rootSubmenuKeys)
      // const rootSubmenuKeys = openKeys;
      // rootSubmenuKeys.push(openKeys);
      // const openK = this.state.openKeys;
      //localStorage.setItem("root_sub",openKeys);
      // this.setState({
      //   rootSubmenuKeys : openKeys
      // })
      // const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
      // console.log(latestOpenKey)
      // console.log(this.rootSubmenuKeys)
      // console.log(openKeys)
      // ;
      // if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      //   this.setState({
      //     openKeys: [...openKeys]
      //   })
      // } else {
      //   this.setState({
      //     openKeys: latestOpenKey ? [latestOpenKey] : [],
      //   })
      // }

      // this.setState({
      //   openKeys: latestOpenKey ? [openKeys.pop()] : [...openKeys]
      // })
    }
    @Bind()
    onSelect(item){
      const icon_ck = '/'+item.key.split('/')[1];
      this.setState({
        icon_ck
      });
      // const openK = this.state.openKeys;
      // this.setState({
      //   openKeys: [...openK,item.key]
      //  })

    }


    renderSubMenu(data){
      return data.map(d=>{
        if(d.children && d.children.length > 0){
          return <SubMenu
            key={d.key} title={
            <span style={{whiteSpace : this.state.collapsed ? 'normal' : 'nowrap'}}>
              {
                  d.icon ?
                  (<Icon 
                    component={d.key == this.state.icon_ck && IconCk[this.state.icon_ck] ? IconCk[this.state.icon_ck] : d.icon} 
                    style={{fontSize : 16}}/>) :
                  ('')
              }
              <span>{d.text}</span>
            </span>
          }
          >
          {
            this.renderSubMenu(d.children)
          }
          </SubMenu>
        }else{
          return <Menu.Item key={d.key}>
          <Link to={d.path}>
            {/*<Icon type="user" />*/}
            {d.text}
          </Link>
        </Menu.Item>
        }
      });
      
    }
    //根据地址栏获取相关key
    getKeyByUrl(){
      let url_key = window.location.pathname.split("/");
      url_key = url_key.filter(s=>s);
      let cur_key = '';
      const all_key = [];
      for(let i = 0; i < url_key.length; i++){
        cur_key = cur_key + '/' + url_key[i];
        all_key.push(cur_key);
      }
      return all_key;
    }
    render(){
      let de = this.getKeyByUrl();
      //localStorage.clear();
        return (
          <Sider className="menu_left" width={224}
          // collapsed={this.state.collapsed}
          >
            <Row className="logo_container" type={'flex'} align={'middle'}>
              {/* <Icon component={MenuLogo} style={{textAlign:'center',fontSize : 65,marginTop: 30}} /> */}
              <span className="logo_title">运营系统</span>
            </Row>
            <Menu
              mode="inline"
              // forceSubMenuRender={true}
              selectedKeys={de}
              defaultOpenKeys={de}
              style={{ borderRight: 0,maxHeight : '100vh',overflow : 'auto',zIndex : 2,paddingBottom : 70 }}
              theme={'dark'}
              //openKeys={this.state.rootSubmenuKeys}
              onSelect={this.onSelect}
              //onOpenChange={this.onOpenChange}
            >
              {/* <AppHeader></AppHeader> */}

              {
                this.renderSubMenu(this.props.data)
              }
            </Menu>
          </Sider>
        )
    }
}
export default Main_left

