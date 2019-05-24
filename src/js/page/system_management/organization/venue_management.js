import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import main_right from '../../../components/layout/main_right'


class venue_management extends Component {
    constructor () {
        super()
    }

    render () {
        return (
            <div>
                <p>场地主体管理</p>
                <p>venue management</p>
            </div>
        )
    }
}

let NewRightContent = main_right(venue_management, [
    {
        text: '系统设置'
    },
    {
        text: '组织机构管理'
    },
    {
        text: '场地主体管理',
        path: '/system/organization/venue'
    }
])


export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    };
})(NewRightContent)