import React, { Component, PropTypes, Fragment } from 'react';
import { Icon, Alert } from 'antd';
import './index.scss'

/**
 * 通用列表提示组件
 */
class ListTips extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {
            // icon类型
            icon='exclamation-circle',
            // 提示数字
            number,
            // 外层组件样式
            mainStyle,
        } = this.props
        return (
            <div className={'tableAlert'}>
                <Alert
                    message={
                        <Fragment>
                            已选择 <a style={{ fontWeight: 600 }}>{number}</a> 项
                        </Fragment>
                    }
                    type="info"
                    showIcon
                />
                {/*<div className='mxj-list-tips' style={mainStyle}>*/}
                {/*<Icon  style={{margin : '0 8px 0 18px',color : '#0179FF'}} type={icon}></Icon>*/}
                {/*<span>已选择 <span className='mxj-number-tips'>{number}</span> 项</span>*/}
                {/*</div>*/}
            </div>
        )
    }
}
export default ListTips