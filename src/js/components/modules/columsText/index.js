import React, { Component, PropTypes, Fragment } from 'react';
import { Tooltip } from 'antd';
const common_length = 10
/**
 * 通用列表显示
 */
export default class ColumsText extends Component{
    constructor(props){
        super(props);
    }

    /**
     * 字符串截取
     * @param text text
     * @returns {string}
     */
    renderText(text) {
        const length_com = this.props.length || common_length
        return text.slice(0, length_com) + '...'
    }

    /**
     * 是否有额外的react节点
     * @param Ele
     * @param text
     * @returns {*}
     */
    renderExcat(type, text) {
       switch (type) {
           case 'span':
               return <span>{text}</span>
           case 'link':
               return <a href={this.props.link} target={this.props.target || '_blank'}>{text}</a>
       }
    }

    /**
     * 渲染主节点
     * @param Ele
     * @param text
     * @param length
     * @returns {*}
     */
    renderElement(type, text, length) {
        const length_com = this.props.length || common_length
        if (length > length_com) {
            return (
                <Tooltip title={text} {...this.props.header}>
                    {
                        this.renderExcat(type, this.renderText(text))
                    }
                </Tooltip>
            )
        } else {
            return (
                <span {...this.props.header}>
                    {
                        this.renderExcat(type, text)
                    }
                </span>
            )
        }

    }
    render(){
        const {
            text = '',
            type = 'span'
        } = this.props
        const length = text != '' && text != undefined ? text.length : 0
        return (
            <Fragment>
                {this.renderElement(type, text, length)}
            </Fragment>
        )
    }
}
