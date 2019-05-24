import React, { Component, PropTypes } from 'react';
import { Divider } from 'antd';
import './index.scss'

/**
 * 通用详情盒子组件
 */
class DetailBox extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {
            // 是否显示logo
            logo = true,
            // 标题
            title,
            // 头部右侧操作区域
            extra,
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
            // 下划线类型
            dividerType = 1,
            //内容区域样式
            contentStyle
        } = this.props
        if (dividerType === 2) {
            dividerStyle = {margin: '12px auto 24px'}
        }
        return (
            <div className={'mxj-detail-card-com'} style={mainStyle}>
                <div className='mxj-detail-header-com' style={headerStyle}>
                    {logo? <div className='mxj-detail-header-logo-com'></div>: null}
                    <div className='mxj-detail-header-title-com'>{title}</div>
                    {extra? <div>{extra}</div>: null}
                </div>
                {showDivider? <Divider style={dividerStyle} dashed={dividerDashed}/>: null}
                <div className='mxj-detail-content-com' style={contentStyle}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default DetailBox