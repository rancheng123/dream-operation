import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import main_right from '../../../components/layout/main_right'


class approval_add extends Component {
    constructor () {
        super()
    }

    render () {
        return (
            <div>
                <p>新建审批与审核</p>
                <p>approval add</p>
            </div>
        )
    }
}

let NewRightContent = main_right(approval_add, [
    {
        text: '系统设置'
    },
    {
        text: '审批与审核权限管理'
    },
    {
        text: '新建审批与审核',
        path: '/system/approval/approval/add'
    }
])


export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    };
})(NewRightContent)