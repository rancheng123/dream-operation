import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import main_right from '../../../components/layout/main_right'


class role_add extends Component {
    constructor () {
        super()
    }

    render () {
        return (
            <div>
                <p>新建角色</p>
                <p>role add</p>
            </div>
        )
    }
}

let NewRightContent = main_right(role_add, [
    {
        text: '系统设置'
    },
    {
        text: '角色与权限管理'
    },
    {
        text: '新建角色',
        path: '/system/authority/role/add'
    }
])


export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    };
})(NewRightContent)