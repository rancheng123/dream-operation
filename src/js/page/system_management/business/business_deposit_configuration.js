import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import main_right from '../../../components/layout/main_right'

// 导入style
import './business_deposit_configuration.scss'


class business_deposit_configuration extends Component {
    constructor () {
        super()
    }

    render () {
        return (
            <div className="business_deposit_box">
                <p>业务押金配置</p>
                <p>business deposit configuration</p>
            </div>
        )
    }
}

let NewRightContent = main_right(business_deposit_configuration, [
    {
        text: '系统设置'
    },
    {
        text: '业务配置'
    },
    {
        text: '业务押金配置',
        path: '/system/business/deposit'
    }
])


export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    };
})(NewRightContent)