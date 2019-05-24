import {Component, Fragment} from "react";
import React from "react";
import Bind from 'lodash-decorators/bind';
import {
    Input, Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader, Icon, Form
} from 'antd/lib/index';
const InputGroup = Input.Group;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
/**
 * 时间组按钮
 */
export default class SelectDataPicker extends Component{
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
    @Bind()
    disabledStartDate(startValue) {
        const {end_date} = this.props.value;
        if (!startValue || !end_date) {
            return false;
        }
        return startValue.valueOf() > end_date.valueOf();
    }
    /**
     *
     * 订单结束日不可使用日期
     */
    @Bind()
    disabledEndDate(endValue) {
        const {start_date} = this.props.value;
        if (!endValue || !start_date) {
            return false;
        }
        return endValue.valueOf() <= start_date.valueOf();
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
                    <DatePicker
                        disabledDate={this.disabledStartDate}
                        style={{width: '35%', maxWidth: 400}}
                        onChange={e => this.handleChange(e, 'start_date')}
                        value={this.props.value.start_date}
                        format={dateFormat}
                        placeholder='开始日期'
                    >
                    </DatePicker>
                    <DatePicker
                        disabledDate={this.disabledEndDate}
                        style={{width: '35%', maxWidth: 400}}
                        onChange={e => this.handleChange(e, 'end_date')}
                        value={this.props.value.end_date}
                        format={dateFormat}
                        placeholder='结束日期'
                    >
                    </DatePicker>
                </InputGroup>
            </Fragment>
        )
    }
}