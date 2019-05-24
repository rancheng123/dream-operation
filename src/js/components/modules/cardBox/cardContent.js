import React, { Component } from 'react'
import { connect } from 'react-redux'

class CardContent extends Component {
    render () {
        const { children } = this.props
        return <div>{children}</div>
    }
}

export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    };
})(CardContent)