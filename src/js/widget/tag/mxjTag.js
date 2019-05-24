import {Component, Fragment, PropTypes} from "react";
import React from "react";
import { Tag } from 'antd';
import classNames from 'classnames'
/**
 * 标签处理
 */
class MxjTag extends Component{
    constructor(props){
        super(props)
    }
    render() {
        return (
            <Fragment>
                <Tag className={classNames({
                    'fff-bg': true,
                    'mxj-border-2px': true,
                    'mxj-warn-color': this.props.type === 'warn',
                    'mxj-success-color': this.props.type === 'success',
                    'mxj-info-color': this.props.type === 'info',
                    'mxj-error-color': this.props.type === 'error',
                    'mxj-warn-border': this.props.type === 'warn',
                    'mxj-success-border': this.props.type === 'success',
                    'mxj-info-border': this.props.type === 'info',
                    'mxj-error-border': this.props.type === 'error',
                })} {...this.props}>{this.props.children}</Tag>
            </Fragment>

        )
    }
}
export default MxjTag