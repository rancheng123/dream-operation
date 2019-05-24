import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import main_right from '../../../components/layout/main_right'


class business_deposit_edit extends Component {
    constructor () {
        super()
    }

    render () {
        return (
            <div>
                <p>编辑业务押金</p>
                <p>business deposit edit</p>
            </div>
        )
    }
}

let NewRightContent = main_right(business_deposit_edit, [
    {
        text: '系统设置'
    },
    {
        text: '业务配置'
    },
    {
        text: '编辑业务押金',
        path: '/system/business/deposit/edit'
    }
])


export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    };
})(NewRightContent)