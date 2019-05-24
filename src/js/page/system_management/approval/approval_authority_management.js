import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import main_right from '../../../components/layout/main_right'


class approval_authority_management extends Component {
    constructor () {
        super()
    }

    render () {
        return (
            <div>
                <p>审批与审核权限管理</p>
                <p>approval authority management</p>
            </div>
        )
    }
}

let NewRightContent = main_right(approval_authority_management, [
    {
        text: '系统设置'
    },
    {
        text: '审批与审核权限管理'
    },
    {
        text: '审批与审核权限管理',
        path: '/system/approval/approval'
    }
])


export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    };
})(NewRightContent)