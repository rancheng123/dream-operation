import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import main_right from '../../../components/layout/main_right'


class business_deposit_add extends Component {
    constructor () {
        super()
    }

    render () {
        return (
            <div>
                <p>新建业务押金</p>
                <p>business deposit add</p>
            </div>
        )
    }
}

let NewRightContent = main_right(business_deposit_add, [
    {
        text: '系统设置'
    },
    {
        text: '业务配置'
    },
    {
        text: '新建业务押金',
        path: '/system/business/deposit/add'
    }
])


export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    };
})(NewRightContent)