/**
 * IconBox 组件
 * 
 * 参数：
 * @param {*} title
 * @param {*} value
 * @param {*} bordered
 * @param {*} children
 * 使用方法
 * <IconBox title="城市数" value="5座" bordered>
 *     <Icon style={{ fontSize: '40px' }} type="android"></Icon>
 * </IconBox>
 */


import React, { Component, createContext } from 'react'

import './index.scss'

const IconBox = ({title, value, bordered, children, ...restProps}) => {
    return (
        <div className="icon_box">
            {children !== null && children !== undefined && <div className="header_icon">{children}</div>}

            {
                title !== null && 
                value !== null && 
                <div className="header_info">
                    <span>{title}</span>
                    <p>{value}</p>
                    {bordered && <em />}        
                </div>
            }
        </div>
    )
}

export default IconBox