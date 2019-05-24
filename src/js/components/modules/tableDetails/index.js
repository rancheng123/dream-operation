import React, {PureComponent, Fragment} from 'react'
import { connect } from 'react-redux'

import {
    Table
} from 'antd'

// 引入中间组件传递props
import MiddleContext from '@/js/components/modules/context/middleContext'

// 引入样式
import './index.scss'

const TableDetails = ({ children, ...restProps }) => (
    <div className="table_details">
        {/* 显示嵌套内容 */}
        {children ? (
            <div>{children}</div>
        ) : null}

        {/* 显示table表格 */}
        <MiddleContext.Consumer>
            {value => (
                // 子组件封装
                <div className="table_details_box">
                    <Table
                        { ...value }
                        { ...restProps }
                    ></Table>
                </div>
            )}
        </MiddleContext.Consumer>
    </div>
)

export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    }
})(TableDetails)