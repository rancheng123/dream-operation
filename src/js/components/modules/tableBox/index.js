/**
 * tableBox 组件 create by haoliang
 */

import React, {PureComponent, Fragment} from 'react'
import { connect } from 'react-redux';

import {
    Table,
    Alert,
} from 'antd'

// 引入样式
import './index.scss'

/**
 * 便利传来的数组参数,返回一个新的数组
 * @param {*} columns 
 */
function initTotalList (columns) {
    const totalList = [];
    columns.forEach(column => {
        // if (column.needTotal) {
        //     totalList.push({ ...column, total: 0 })
        // }
        totalList.push({ ...column })
    })
    return totalList
}

class TableBox extends PureComponent {
    constructor(props) {
        super(props)
        const { columns } = props
        // console.log({ columns })
        const needTotalList = initTotalList(columns)

        this.state = {
            selectedRowKeys: [],
            needTotalList,
        }
    }

    showTotal = (total, range) => {
        let { data = {} } = this.props
        let { pagination = {} } = data
        let { current, pageSize } = pagination
        // return `共 ${total} 条记录  第 ${current}/${Math.ceil(total / pageSize)} 页`
        return (
            <div style={{ position: 'absolute', left: '40px' }}>
                共 {total} 条记录  第 <span style={{ color: '#0179FF' }}>{current}</span>/{Math.ceil(total / pageSize)} 页
            </div>
        )
    }

    /**
     * selected框勾选后
     */
    handleRowSelectChange = (selectedRowKeys, selectedRows) => {
        // console.log(selectedRowKeys)
        // console.log(selectedRows)

        let { needTotalList } = this.state
        needTotalList = needTotalList.map(item => ({
            ...item,
            total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0)
        }))
        const { onSelectRow } = this.props
        if (onSelectRow) {
            onSelectRow(selectedRows)
        }

        this.setState({
            selectedRowKeys,
            needTotalList
        })
    }

    /**
     * 分页（排序、筛选）变化时触发
     */
    handleTableChange = (pagination, filter, sorter) => {
        const { onChange } = this.props
        if (onChange) {
            onChange(pagination, filter, sorter)
        }
    }

    /**
     * 清除
     */
    cleanSelectedKeys = () => {
        this.handleRowSelectChange([], []);
    }

    render () {
        const { selectedRowKeys, needTotalList } = this.state
        // 获取父组件传递过来的数据，(...rest遍历其他传递过来的属性)
        const { data = {}, rowKey, ...rest } = this.props
        const { list = [], pagination } = data
        // console.log(pagination)

        const paginationType = {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: this.showTotal,
            ...pagination
        }

        // 勾选选择框的属性
        const rowSelection = {
            selectedRowKeys,
            onChange: this.handleRowSelectChange,
            getCheckboxProps: record => ({
                disabled: record.disabled
            })
        }

        return (
            <div className="table_box">
                <div className="table_alert">
                    <Alert
                        message = {
                            <Fragment>
                                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                                {/* {needTotalList.map(item => (
                                    <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                                        {item.title}
                                        总计&nbsp;
                                        <spam style={{ fontWeight: 600 }}>
                                            {item.render ? item.render(item.total) : item.total}
                                        </spam>
                                    </span>
                                ))} */}

                                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                                    清空
                                </a>
                            </Fragment>
                        }
                        type="info"
                        showIcon
                    />
                </div>

                <div>
                    <Table
                        className="mxj-table-page-common"
                        rowKey={rowKey || 'key'}
                        // rowSelection={rowSelection}
                        dataSource={list}
                        pagination={paginationType}
                        onChange={this.handleTableChange}
                        // size="middle"
                        // bordered={true}
                        {...rest}
                    />
                </div>
            </div>
        )
    }
}

export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    }
})(TableBox)