import React, { Component, PropTypes, createContext } from 'react'
import { connect } from 'react-redux'
import Bind from 'lodash-decorators/bind'

import {
    Select,
} from 'antd'

const { Option } = Select

// 获取页面状态参数
import {
    getTypeList
} from '../../../api/financial/main'

// 引入样式
import './index.scss'


class SelectBox extends Component {
    constructor (props) {
        super(props)

        this.state = {
            selectData: [],
        }
    }

    /** 组件实例化后
    * 入参模板
    * let data = {
    *     types: [
    *         'pay_status',
    *         'bill_status',
    *     ]
    * }
    */
    componentDidMount () {
        const { data } = this.props
        
        // 请求接口
        getTypeList(data).then((res) => {
            // this.updateStatus(res)
            this.setState({
                selectData: res[data.types[0]]
            })
        })
     }

    @Bind()
    handleChange (val, index) {
        const { value, onChange } = this.props

        value[index] = val
        onChange(value)
    }

    render () {
        let {selectTitle} = this.props
        let { selectData = [] } = this.state

        return (
            <div>
                <Select 
                    value={this.props.value.selectValue}
                    placeholder={selectTitle} 
                    style={{ width: '100%' }}
                    onChange={e => this.handleChange(e, 'selectValue')}
                >
                    {
                        selectData.map((item, i) => {
                            return <Option key={i} value={item.key}>{item.value}</Option>
                        })
                    }
                </Select>
            </div>
        )
    }
}

export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    }
})(SelectBox)