import {Component} from "react";
import React from "react";
import './labelItem.scss'
import {Input} from "antd";

class LabelItem extends Component{
    constructor(){
        super()
    }
    render() {
        return (
            <span>
                {(()=>{
                    if(this.props.required){
                        return (
                            <span style={{color:'#FF0000',marginRight:6}}>
                                *
                            </span>
                        )
                    }
                })()}
                 {this.props.title}：
                {this.props.children}
            </span>
        )
    }
}

export default LabelItem