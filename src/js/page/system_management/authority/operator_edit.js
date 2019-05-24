import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import main_right from '../../../components/layout/main_right'


class operator_edit extends Component {
    constructor () {
        super()
    }

    render () {
        return (
            <div>
                <p>编辑操作员</p>
                <p>operator edit</p>
            </div>
        )
    }
}

let NewRightContent = main_right(operator_edit, [
    {
        text: '系统设置'
    },
    {
        text: '角色与权限管理'
    },
    {
        text: '编辑操作员',
        path: '/system/authority/operator/edit'
    }
])


export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    };
})(NewRightContent)