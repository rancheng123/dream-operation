import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import './cardHeader.scss'

class CardHeader extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        const { title } = this.props

        return  (
            <div className="card_header_box">
                {/* CarHeader 样式及内容 */}
                <div className="card_header_rectangle"></div>

                <div className="card_header_title">{title}</div>
            </div>
        )
    }
}

export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    };
})(CardHeader)