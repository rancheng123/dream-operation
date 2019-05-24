/**
 * select + input 带有模糊 搜索功能 的组件
 * 
 * @param {selectTitle} param0 select提示字段
 * @param {selectData} param0 select数据 数组 带有 key，value 两种属性
 * @param {showInputVal} param0 那种select下需要模糊搜索功能
 * @param {inputTitle} param0 input 提示字段
 * @param {requestUrl} param0 模糊搜索接口
 * 
 */

import React, { Component, PropTypes, createContext, Children } from 'react'
import { connect } from 'react-redux'
import Bind from 'lodash-decorators/bind'
import Debounce from 'lodash-decorators/debounce'

// 接口请求
import fetchData from '../../../api/fetchData'
import config from '../../../config'

import {
    Input,
    Select,
    AutoComplete,
} from 'antd'

const { Option } = Select
const InputGroup = Input.Group

// 引入样式
import './index.scss'

class SearchBox extends Component {
    constructor (props) {
        super(props)
        this.state = {
            dataSource: [],
            selectVal: '',
        }
    }

    @Bind()
    handleChange (val, index) {
        const { value, onChange } = this.props
        this.setState({
            selectVal: val
        })

        value[index] = val
        onChange(value)
    }

    @Bind()
    // @Debounce(200)
    handleChangeInput (val, index) {
        const { value, onChange, showInputVal, requestUrl } = this.props
        const { selectVal } = this.state
        console.log(selectVal)

        if ( selectVal == showInputVal && requestUrl != undefined ) {
            fetchData({
                method: 'get',
                url: config.api + requestUrl,
                keywords: val
            }).then((res) => {
                // !这个数组 需要做去重处理
                // let nameArray = []
                // res.data.data.map((item, i) => {
                //     item['key'] = i
                //     if (nameArray.indexOf(item.name) <= -1) nameArray.push(item.name)
                //     return item
                // })
                this.setState({
                    // dataSource: nameArray
                    dataSource: res.data.data
                })
            })
        }
        value[index] = val
        onChange(value)
    }

    render () {
        let { selectTitle, selectData, inputTitle } = this.props
        const { dataSource } = this.state
        const children = dataSource != undefined ? dataSource.map((item, i) => <Option key={item.id}>{item.name}</Option>) : null

        return (
            <div className="search_box">
                <InputGroup compact>
                    <Select 
                        value={this.props.value.selectValue}
                        placeholder={selectTitle} 
                        style={{ width: '30%' }}
                        onChange={e => this.handleChange(e, 'selectValue')}
                    >
                        {
                            selectData.map((item, i) => {     
                                return <Option key={i} value={item.key}>{item.value}</Option>
                            })
                        }
                    </Select>

                    <AutoComplete
                        value={this.props.value.inputValue}
                        allowClear={true}
                        dataSource={this.state.dataSource}
                        placeholder={inputTitle}
                        style={{ width: '70%' }}
                        onChange={e => this.handleChangeInput(e, 'inputValue')}
                    >
                        {children}
                    </AutoComplete>
                </InputGroup>
            </div>
        )
    }
}

export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    }
})(SearchBox)