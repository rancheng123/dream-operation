import {Component, Fragment} from "react";
import React from "react";
import Bind from 'lodash-decorators/bind';
import {
    Input, Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader, Icon, Form
} from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
/**
 * 时间组按钮
 */
class SelectAndDataPicker extends Component{
    constructor(props){
        super(props)
        // this.handleChange = this.handleChange.bind(this)
        this.state = {
            dataSource: []
        }
    }
    @Bind()
    handleChange(val, index) {
        const { value, onChange } = this.props
        value[index] = val
        onChange(value)
    }

    // 最低开始时间
    disabledStartDate = (startValue) => {
        const endValue = this.props.value.to_date
        if (!startValue || !endValue) {
          return false
        }
        return startValue.valueOf() > endValue.valueOf()
    }

    // 最高结束时间
    disabledEndDate = (endValue) => {
        const startValue = this.props.value.from_date
        if (!endValue || !startValue) {
          return false
        }
        return endValue.valueOf() <= startValue.valueOf()
    }

    render() {
        return (
            <Fragment>
                <InputGroup compact>
                    <Select style={{width: '30%', maxWidth: 150}} value={this.props.value.selectValue} onChange={e => this.handleChange(e, 'selectValue')}>
                        {
                            this.props.options.map((items,index)=>{
                                return <Option key={index} value={items.value}>{items.label}</Option>
                            })
                        }
                    </Select>
                    {/* <RangePicker
                        separator='至'
                        style={{width: '70%', maxWidth: 400}}
                        onChange={e => this.handleChange(e, 'time')}
                        value={this.props.value.time}
                        format={dateFormat}
                    >
                    </RangePicker> */}
                    <DatePicker 
                        placeholder="开始日期"
                        style={{width: '35%', maxWidth: 200}}
                        onChange={e => this.handleChange(e, 'from_date')}
                        value={this.props.value.from_date}
                        disabledDate={this.disabledStartDate}
                        format={dateFormat}
                    />
                    <DatePicker 
                        placeholder="结束日期"
                        style={{width: '35%', maxWidth: 200}}
                        onChange={e => this.handleChange(e, 'to_date')}
                        value={this.props.value.to_date}
                        disabledDate={this.disabledEndDate}
                        format={dateFormat}
                    />
                </InputGroup>
            </Fragment>
        )
    }
}

export default SelectAndDataPicker