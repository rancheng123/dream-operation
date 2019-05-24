import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import main_right from '../../../components/layout/main_right'


class venue_configuration_edit extends Component {
    constructor () {
        super()
    }

    render () {
        return (
            <div>
                <p>编辑主体配置</p>
                <p>venue configuration edit</p>
            </div>
        )
    }
}

let NewRightContent = main_right(venue_configuration_edit, [
    {
        text: '系统设置'
    },
    {
        text: '组织机构管理'
    },
    {
        text: '编辑主体配置',
        path: '/system/organization/venue/edit'
    }
])


export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    };
})(NewRightContent)