import React, { Component, PropTypes } from 'react';
import { Divider } from 'antd';
import './index.scss'
import classNames from 'classnames'
/**
 * 通用卡片组件
 */
class CommonCard extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {
            // 是否包含头，可穿字符串和 node节点
            header,
            //是否现实下划线 默认有
            showDivider = true,
            // 下划线样式
            dividerStyle = {margin: '16px auto'},
            //下划线是否是虚线，默认false
            dividerDashed = false,
            //整体区域样式
            mainStyle,
            // 头样式
            headerStyle,
            //内容区域样式
            contentStyle
        } = this.props
        return (
            <div className={classNames('common-card-mxj-com', this.props.className)} style={mainStyle}>
                {header? <div className='mxj-card-header-com' style={headerStyle}>{header}</div>: null}
                {showDivider? <Divider style={dividerStyle} dashed={dividerDashed}/>: null}
                <div className='mxj-card-content-com' style={contentStyle}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default CommonCard