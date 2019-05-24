import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import main_right from '../../../components/layout/main_right'


class operator_add extends Component {
    constructor () {
        super()
    }

    render () {
        return (
            <div>
                <p>新建操作员</p>
                <p>operator add</p>
            </div>
        )
    }
}

let NewRightContent = main_right(operator_add, [
    {
        text: '系统设置'
    },
    {
        text: '角色与权限管理'
    },
    {
        text: '新建操作员',
        path: '/system/authority/operator/add'
    }
])


export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    };
})(NewRightContent)