import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import main_right from '../../../components/layout/main_right'


class role_edit extends Component {
    constructor () {
        super()
    }

    render () {
        return (
            <div>
                <p>编辑角色</p>
                <p>role edit</p>
            </div>
        )
    }
}

let NewRightContent = main_right(role_edit, [
    {
        text: '系统设置'
    },
    {
        text: '角色与权限管理'
    },
    {
        text: '编辑角色',
        path: '/system/authority/role/edit'
    }
])


export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    };
})(NewRightContent)