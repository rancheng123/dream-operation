import {Component, Fragment} from "react";
import React from "react";
import Bind from 'lodash-decorators/bind';
import Debounce from 'lodash-decorators/debounce';
import {
    Input, Select, AutoComplete, Icon, Form
} from 'antd/lib/index';
const InputGroup = Input.Group;
const Option = Select.Option;
/**
 * 下拉
 */
export default class SelectInputGroup extends Component{
    constructor(props){
        super(props)
    }
    @Bind()
    handleChange(val, index) {
        const { value, onChange } = this.props
        value[index] = val
        // 类型改变，输入框清空
        if (index === 'selectValue') {
            value.autoValue = ''
        }
        onChange(value)
    }

    render() {
        return (
            <Fragment>
                <InputGroup compact style={this.props.style}>
                    <Select style={{width: '30%'}} value={this.props.value.selectValue} onChange={e => this.handleChange(e, 'selectValue')}>
                        {
                            this.props.options.map((items,index)=>{
                                return <Option key={index} value={items.value}>{items.label}</Option>
                            })
                        }
                    </Select>
                    <AutoComplete
                        style={{width: '70%'}}
                        allowClear
                        value={this.props.value.autoValue}
                        dataSource={this.props.dataSource}
                        onChange={e => this.handleChange(e, 'autoValue')}
                        onSearch={this.props.handleSearch}
                        {...this.props.autoCom}
                    >
                        <Input
                            placeholder={this.props.placeholder}
                            suffix={
                                <Icon
                                type="search"
                                className="certain-category-icon"
                                style={{color: '#CCCCCC '}}
                                />
                            } />
                    </AutoComplete>
                </InputGroup>
            </Fragment>
        )
    }
}