import React, { Component, PropTypes } from 'react';
import { Select } from 'antd';
const Option = Select.Option;

class CitySelectForm extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {style} = this.props
        return (
            <Select style={style}>
                <Option value="beijing">北京</Option>
                <Option value="nanjing">南京</Option>
                <Option value="shanghai">上海</Option>
                <Option value="chengdu">成都</Option>
            </Select>
        )
    }
}

export default CitySelectForm;