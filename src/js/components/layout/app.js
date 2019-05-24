import React, { Component, PropTypes } from 'react';

import {Breadcrumb, Layout, Spin} from 'antd';
import Main_left from './main_left'
import menuList from "./menu";

import AppHeader from './header';
import { Test } from '@/js/asset/debug'
import { connect } from 'react-redux'
import {Link} from "react-router";
import Footer from "./footer";
import BreadCrumbView from '@modules/breadcrumb'

const {Content} = Layout;
// import { Layout } from 'antd';
// import Main_left from './main_left'
// import menuList from "./menu/index";
@connect(({ common }) => ({
    common
}))
class App extends Component {
    constructor() {
        super();
        // utils.Cookies.get('token') ? "" : utils.Router.switchRoute('/login');
    }
    loadingDom () {
        const { common } = this.props

        if (common.loadingStatus) {
            return (
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.05)',
                    borderRadius: '4px',
                    zIndex: '999999',
                    // display: 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                }}
                >
                    <div style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                    }}
                    >
                        <Spin tip="Loading..."/>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }
    render() {
        return (
            <Layout>

                <Test></Test>

                {/*头部  start*/}

                {/*头部  end*/}


                {/*左侧导航  start*/}
                <Main_left
                    $id="main_left"
                    data={menuList}
                ></Main_left>
                <Layout style={{overFlowY : 'auto', marginLeft: 224 }}>
                    <AppHeader></AppHeader>
                    {/*左侧导航  end*/}
                    <Layout className={this.props.className}  style={{minHeight: '100vh', padding: '0 24px 24px'}}>

                        <BreadCrumbView {...this.props}></BreadCrumbView>
                        <Content id="main_right_content" style={{
                            padding: 0, margin: 0,
                            position: 'relative',
                        }}
                        >
                            {this.loadingDom()}

                            {this.props.children}
                        </Content>
                        <Footer></Footer>
                    </Layout>
                </Layout>


            </Layout>
        )
    }

}


export default App


