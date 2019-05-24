import React, { Component, PropTypes, createContext } from 'react'
import { connect } from 'react-redux'

import ChildrenRender from './childrenRender'

// import MiddleContext from '@/js/components/modules/context/middleContext'

// 引入样式
import './index.scss'

import {
    Card,
    Collapse,
    Icon
} from 'antd'

const Panel = Collapse.Panel

const customPanelStyle = {
    // background: '#f7f7f7',
    borderRadius: 4,
    // marginBottom: 24,
    border: 0,
    overflow: 'hidden',
}

const headerStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '20px',
    paddingBottom: '15px',
    borderBottom: '1px solid #E9E9E9',
    left: '0',
}

const FoldBox = ({ headerTitle, showArrow, children, ...restProps }) => (
    <div className="fold_box_module">
        {/* <Card bordered={false} style={{ padding: '0px' }}> */}
            <Collapse
                className="fold_box"
                bordered={false}
                defaultActiveKey={children ? ['1'] : null}
                expandIcon={
                    ({ isActive }) => <div style={headerStyle}>
                        <div className="icon_rectangle"></div>
                        
                        <div className="icon_content">
                            收起 <Icon type="caret-right" rotate={isActive ? -90 : 90} />
                        </div>
                    </div>
                }
            >
                <Panel 
                    showArrow={ showArrow != undefined ? showArrow : false } 
                    header={ headerTitle != undefined ? headerTitle : '' } 
                    key="1"
                    style={customPanelStyle}
                >
                    <div>
                        {/* 如果标签内部有children */}
                        {children ? (
                            // 包装children内部内容
                            <ChildrenRender>{children}</ChildrenRender>
                        ) : null}
                    </div>
                </Panel>
            </Collapse>
        {/* </Card> */}
    </div>
)

export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    }
})(FoldBox)