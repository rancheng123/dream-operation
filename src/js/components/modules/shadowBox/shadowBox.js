import {Component} from "react";
import React from "react";
import './shadowBox.scss'

class ShadowBox extends Component{
    constructor(){
        super()
    }
    render() {
        return (
            <div
                className={'shadowBox'}
                {...this.props}
            >
                {this.props.children}
            </div>
        )
    }
}

export default ShadowBox