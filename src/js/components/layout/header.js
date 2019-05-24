import React, { Component, PropTypes } from 'react';
import { Link, Router } from 'react-router';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Avatar, Popover, Modal } from 'antd';
import { Base64 } from 'js-base64';
import _ from 'lodash';
import utils from "../../asset";
import './header.scss';

const { Header } = Layout;
const confirm = Modal.confirm;

class AppHeader extends Component {
    constructor() {
        super();
        this.state = {
            defaultSelectedKeys: location.pathname !== '/' ?location.pathname.match(/^\/[\w]+/)[0]: null,
            collapsed: false
        }
        this.userInfo = Base64.decode((utils.Cookies.get('token') || '').split('.')[1] || '') || '{}';
        this.name = _.get(JSON.parse(this.userInfo), 'name', '默认用户');
    }
    collapsedMeun = (e) => {
        const collapsed = componentStore.getById('main_left').state.collapsed;
        componentStore.update('main_left', {
            collapsed: !collapsed
        });
        this.setState({
            collapsed: !collapsed
        });
    }

    showLogout = () => {
        const that = this;
        confirm({
            title: '确定退出当前用户?',
            content: '',
            onOk() {
                that.logout();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    logout = () => {
        const { common, dispatch } = this.props;
        fetchData({
            method: 'post',
            url: config.api + '/user/logout',
            data: {
                "token": utils.Cookies.get('token') || '',
            }
        }).then((res) => {
            if (res.code === 10000) {
                dispatch({
                    type: 'modifyCommonData',
                    data: {
                        token: ''
                    }
                });
                utils.Cookies.remove('token');
                utils.Router.switchRoute('/login')
            }
        })
    }

    renderInfo = () => {
        return (
            <div
                className='logout'
                onClick={this.showLogout}>退出</div>
        )
    }

    render() {
        const { common, dispatch } = this.props;

        return (
            <Header className="menu_header" style={{ height: 56 }}>
                <div className="logo" />
                <span style={{ color: 'white' }}>
                    <span style={{ marginLeft: 55, display: 'none' }}>
                    <Icon onClick={this.collapsedMeun} type={this.state.collapsed ? 'menu-fold' : 'menu-unfold'} /></span>
                </span>

                <div style={{ float: 'right', height: '56px', lineHeight: '56px', color: '#fff' }}>
                    {/* <Avatar style={{ background: 'red' }}
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> */}
                        <Icon type="user" />
                        <span style={{ paddingLeft: '8px' }}>{this.name}&emsp;|&emsp;<span style={{color : '#A8A8A8',cursor : 'pointer'}} onClick={this.showLogout}>退出</span></span>

                </div>

            </Header>
        )
    }

}

export default connect(function (state) {
    return {
        common: state.common
    };
})(AppHeader);
