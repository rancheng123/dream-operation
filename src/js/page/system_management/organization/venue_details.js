import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import main_right from '../../../components/layout/main_right'


class venue_details extends Component {
    constructor () {
        super()
    }

    render () {
        return (
            <div>
                <p>主体详情</p>
                <p>venue details</p>
            </div>
        )
    }
}

let NewRightContent = main_right(venue_details, [
    {
        text: '系统设置'
    },
    {
        text: '组织机构管理'
    },
    {
        text: '主体详情',
        path: '/system/organization/venue/details'
    }
])


export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    };
})(NewRightContent)