import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import main_right from '../../../components/layout/main_right'


class operator_rights_management extends Component {
    constructor () {
        super()
    }

    render () {
        return (
            <div>
                <p>操作员权限管理</p>
                <p>operator rights management</p>
            </div>
        )
    }
}

let NewRightContent = main_right(operator_rights_management, [
    {
        text: '系统设置'
    },
    {
        text: '角色与权限管理'
    },
    {
        text: '操作员权限管理',
        path: '/system/authority/operator'
    }
])


export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    };
})(NewRightContent)