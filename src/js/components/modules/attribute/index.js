/**
 * Attribute 属性标签组件
 * 
 * 传入参数:
 * @param {*} title
 * @param {*} children
 * *使用方法：
 * !使用时 请用 <Row gutter={ 32 }> <Attribute></Attribute> </Row> 将其包住
 * !因为内部使用了<Col></Col> 标签
 * 
 */

import React, { Component, createContext } from 'react';
// import PropTypes from 'prop-types'

import {
    Col
} from 'antd'

// 引入样式
import './index.scss'

const Attribute = ({ title, children, ...restProps }) => {
    return (
        <Col {...restProps}>
            <div className="attribute_box">
                {title && <div className="attribute_name">{title}</div>}
                {children !== null && children !== undefined && <div className="attribute_value">{children}</div>}
            </div>
        </Col>
    )
}

// 
// Attribute.defaultProps = {
//     title: '',
// };
  
// Attribute.propTypes = {
//     title: PropTypes.node,
// };

export default Attribute;