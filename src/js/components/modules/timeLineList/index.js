/**
 * 时间线 list 组件
 * @param {listData} param0 组件timeList数据
 * @param {titles} param0 组件属性名
 * @param {keys} param0 组件属性key
 * @param {status} param0 判断状态
 */

import React, { Component, PropTypes, createContext } from 'react'
import { connect } from 'react-redux'

import {
    Timeline,
    Icon,
} from 'antd'

const TimelineItem = Timeline.Item

// 引入样式
import './index.scss'

// 内部item
const printDom = (printList, titles, keys, status) => {
    // console.log(printList)
    // console.log(keys)
    return printList.map((item, i) => {
        if (item[status] == 1 || status == '') {
            return (
                <TimelineItem key={i} dot={<Icon type="check-circle" theme="filled" style={{ fontSize: '16px' }} />} color="green">
                    <div className="timeline_item_content">
                        <div className="timeline_item_header">
                            { item.created_at != undefined ? <span>{item.created_at}</span> : null }

                            <span className="item_header_space">
                                {/* 生成校验码：{item.check_code} */}
                                { titles.headerTitle != undefined ? <span>{titles.headerTitle}：</span> : null }
                                { keys != undefined && item[keys.headerKey] != undefined ? <span>{item[keys.headerKey]}</span> : null }
                            </span>
                        </div>

                        <div className="timeline_item_content">
                            <div>
                                {/* 状 &nbsp; 态：{item.check_status_name} */}
                                { titles.titleList[0] != undefined ? <span>{titles.titleList[0]}</span> : null }：
                                { keys.keyList != undefined && item[keys.keyList[0]] != undefined ? <span>{item[keys.keyList[0]]}</span> : null }
                            </div>

                            <div>
                                {/* 操作人： {item.printed_by_name} */}
                                { titles.titleList[1] != undefined ? <span>{titles.titleList[1]}</span> : null }：
                                { keys.keyList != undefined && item[keys.keyList[1]] != undefined ? <span>{item[[keys.keyList[1]]]}</span> : null }
                            </div>
                        </div>
                    </div>
                </TimelineItem>
            )
        } else {
            return (
                <TimelineItem key={i} dot={<Icon type="close-circle" theme="filled" style={{ fontSize: '16px' }} />} color="red">
                    <div className="timeline_item_content">
                        <div className="timeline_item_header">
                            <span>{item.created_at}</span>
                            <span className="item_header_space">
                                {/* 生成校验码：{item.check_code} */}
                                { titles.headerTitle != undefined ? <span>{titles.headerTitle}：</span> : null }
                                { keys != undefined && item[keys.headerKey] != undefined ? <span>{item[keys.headerKey]}</span> : null }
                            </span>
                        </div>

                        <div className="timeline_item_content2">
                            <div>
                                {/* 状 &nbsp; 态：{item.check_status_name} */}
                                { titles.titleList[0] != undefined ? <span>{titles.titleList[0]}</span> : null }：
                                { keys.keyList != undefined && item[keys.keyList[0]] != undefined ? <span>{item[keys.keyList[0]]}</span> : null }
                            </div>

                            <div>
                                {/* 操作人： {item.printed_by_name} */}
                                { titles.titleList[1] != undefined ? <span>{titles.titleList[1]}</span> : null }：
                                { keys.keyList != undefined && item[keys.keyList[1]] != undefined ? <span>{item[keys.keyList[1]]}</span> : null }
                            </div>
                        </div>
                    </div>
                </TimelineItem>
            )
        }
    })
}

/**
 * 
 * @param {listData} param0 组件timeList数据
 * @param {titles} param0 组件属性名
 */
const TimeLineList = ({ listData, titles, keys, status, ...restProps }) => (
    <div className="timeLine_list_box">
        <Timeline style={{ padding: '20px 30px' }}>
            {printDom(listData, titles, keys, status)}
        </Timeline>
    </div>
)

export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    }
})(TimeLineList)
