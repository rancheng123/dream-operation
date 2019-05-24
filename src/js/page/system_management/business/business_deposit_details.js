import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import main_right from '../../../components/layout/main_right'


class business_deposit_details extends Component {
    constructor () {
        super()
    }

    render () {
        return (
            <div>
                <p>业务押金详情</p>
                <p>business deposit details</p>
            </div>
        )
    }
}

let NewRightContent = main_right(business_deposit_details, [
    {
        text: '系统设置'
    },
    {
        text: '业务配置'
    },
    {
        text: '业务押金详情',
        path: '/system/business/deposit/details'
    }
])


export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    };
})(NewRightContent)