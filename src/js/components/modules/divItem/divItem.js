import {Component} from "react";
import React from "react";
import './divItem.scss'

class DivItem extends Component{
    constructor(){
        super()
    }
    render() {
        return (
            <div className={'divItem'}>
                {this.props.children}
            </div>
        )
    }
}

export default DivItem