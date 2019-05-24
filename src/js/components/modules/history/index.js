import React, { Component, Fragment } from 'react';
import {
    Icon, Collapse, Divider
  } from 'antd';

import RecordSuccess from '@svg/record_success.svg';
import RecordCheck from '@svg/record_checking.svg';
import RecordReject from '@svg/record_reject.svg';
import CollapseSvg from '@svg/collapse.svg';
import NoCollapseSvg from '@svg/no_collapse.svg';
import "./index.scss";
const Panel = Collapse.Panel;
class MxjHistory extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            activeKey : []
         };
    }

    //处理展开和收起
    collapseHandle = () => {
        let { activeKey } = this.state;
        activeKey = activeKey.length != 0 ? [] : ['1'];
        this.setState({
           activeKey 
        });
    }

    //通过
    renderStatus(d,index){
        const diff = this.getbgColorByStatus(d.status);
        return (
            <li key={index}>
                <p className='title'><span>{d.statuses_title}</span><span className='date'>{d.operationd_at}</span></p>
                <div className='ct' style={diff.css}>
                    <p>状&emsp;态: {d.audit_status_text}</p>
                    <p>操作人: {d.operationd_by_name}</p>
                    <p>备&emsp;注: {d.remark}</p>
                </div>
                <Icon className='history_icon' component={diff.icon} />
            </li>
        )
    }
    getbgColorByStatus(status){
        switch(status){
            case 2: case 8:
            return {css: {background : 'rgba(54,220,182,0.10)',display: status == 8 ? 'none' : 'flex'} ,icon : RecordSuccess};
            case 1: case 7 :
            return {css: {background : 'rgba(1,121,255,0.08)'},icon : RecordCheck};
            case 3: case 4: case 5:
            return {css: {background : 'rgba(255,85,85,0.08)'},icon : RecordReject};
            default:
            return {css: {background : 'rgba(255,85,85,0.08)'},icon : RecordReject}; 
        } 
    }

    render() {
        const data = this.props.data;
        return (
            <div className="mxj_history" style={this.props.shadowBoxCSS.container}>
                <p style={this.props.shadowBoxCSS.head}>
                <span className='icon'></span>历史记录
                <span style={{float : 'right',cursor : 'pointer',color : '#0179FF'}} onClick={this.collapseHandle}>
                {
                    this.state.activeKey.length != 0 ? 
                    (<Fragment>收起&ensp;<Icon component={NoCollapseSvg} style={{fontSize : 12}} /></Fragment>) 
                    : 
                    (<Fragment>展开&ensp;<Icon component={CollapseSvg} style={{fontSize : 12}} /></Fragment>)
                }
                </span>
                </p><Divider style={this.props.shadowBoxCSS.divider} />
                <Collapse
                bordered={false}
                activeKey={this.state.activeKey}
                >
                    <Panel 
                    showArrow={false}
                    key="1">
                    {
                        data.length > 0 ? (
                            <ul>
                                {
                                    data.map((d,i)=>{
                                        return this.renderStatus(d,i);
                                    })
                                }
                            </ul> 
                        ) : '暂无记录'
                    }
                    </Panel>
                </Collapse>
            </div>
            
        );
    }
}

export default MxjHistory;