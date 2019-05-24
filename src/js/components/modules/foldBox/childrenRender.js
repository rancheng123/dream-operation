import React, { Component, PropTypes, createContext } from 'react'
import { connect } from 'react-redux'

class ChildrenRender extends Component {
    render () {
        const { children } = this.props
        return <div>{children}</div>  
    }
}

export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    }
})(ChildrenRender)