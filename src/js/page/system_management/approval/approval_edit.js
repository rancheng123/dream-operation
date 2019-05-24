import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import main_right from '../../../components/layout/main_right'


class approval_edit extends Component {
    constructor () {
        super()
    }

    render () {
        return (
            <div>
                <p>编辑审批与审核权限</p>
                <p>approval edit</p>
            </div>
        )
    }
}

let NewRightContent = main_right(approval_edit, [
    {
        text: '系统设置'
    },
    {
        text: '审批与审核权限管理'
    },
    {
        text: '编辑审批与审核权限',
        path: '/system/approval/approval/edit'
    }
])


export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    };
})(NewRightContent)