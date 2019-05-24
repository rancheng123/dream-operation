import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import main_right from '../../../components/layout/main_right'


class operator_details extends Component {
    constructor () {
        super()
    }

    render () {
        return (
            <div>
                <p>操作员详情</p>
                <p>operator details</p>
            </div>
        )
    }
}

let NewRightContent = main_right(operator_details, [
    {
        text: '系统设置'
    },
    {
        text: '角色与权限管理'
    },
    {
        text: '操作员详情',
        path: '/system/authority/operator/details'
    }
])


export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    };
})(NewRightContent)