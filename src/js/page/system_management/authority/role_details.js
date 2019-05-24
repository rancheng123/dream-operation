import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import main_right from '../../../components/layout/main_right'


class role_details extends Component {
    constructor () {
        super()
    }

    render () {
        return (
            <div>
                <p>角色详情</p>
                <p>role details</p>
            </div>
        )
    }
}

let NewRightContent = main_right(role_details, [
    {
        text: '系统设置'
    },
    {
        text: '角色与权限管理'
    },
    {
        text: '角色详情',
        path: '/system/authority/role/details'
    }
])


export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    };
})(NewRightContent)