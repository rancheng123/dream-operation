/**
 * 多元化tableList 封装
 * !本组件只是展示table-list数据，并无其他功能
 * @param {*} arraySum 计算总和的属性 索引 (数组）
 * @param {*} arrayAttr 将总和显示在那个column索引下 (数组)
 * @param {*} dataList table list 所要显示的数据 （数组）
 * @param {*} columns table 表目录 函数格式
 */

import React, {PureComponent, Fragment} from 'react'
import { connect } from 'react-redux'

// 引入TableDetails组件
import TableDetails from '@/js/components/modules/tableDetails/index'

// 引入样式
import './index.scss'

const TableDiversified = ({arraySum, arrayAttr, dataList, columns, children, ...restProps}) => {
    let newDetailsList = []
    let itemNumberList = []
    let newColumns = []
    
    for (let i in dataList) {
        dataList[i].data.map((item, j) => {
            if (j == 0) item['type_name'] = dataList[i].type_name
            return item
        })
        
        // 计算 总额 算法，对应属性
        let sumArray = [{}]
        for (let k in arraySum) {
            let sumName = arraySum[k].toString()
            let sumAttrName = arrayAttr[k].toString()
            sumArray[0][sumAttrName] = dataList[i].data.reduce(function (prev, cur, index, arr) {
                return prev + parseInt(arr[index][sumName])
            }, 0)
        }

        // 预存索引
        if (itemNumberList.length > 0) {
            let listSum = itemNumberList.reduce(function (prev, cur, index, arr) {
                return prev + cur
            }, 0)
            itemNumberList.push(itemNumberList[itemNumberList.length - 1] + dataList[i].data.length + 1)
        } else {
            itemNumberList.push(dataList[i].data.length)
        }

        newDetailsList = newDetailsList.concat(dataList[i].data, sumArray)
        newDetailsList.map((newItem, k) => {
            newItem['key'] = k
            return newItem
        })
    }


    newColumns = columns(itemNumberList)

    return (
        <div className='table_diversified_box'>
            <TableDetails
                rowKey="key"
                pagination={false}
                // size="middle"
                dataSource={newDetailsList}
                columns={newColumns}
                rowClassName={(record, index) => {
                    if (itemNumberList.indexOf(index) > -1) return 'table_details_item'
                }}
                {...restProps}
            >
            </TableDetails>
        </div>
    )
}

export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    }
})(TableDiversified)