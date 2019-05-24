import React, { Component, PropTypes } from 'react';
import { Select } from 'antd';
const Option = Select.Option;

/**
 * 通用卡片组件
 */
class CitySelectSimple extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Select style={{ width: 120 }} onChange={this.props.handleCityEmit}>
                <Option value="beijing">北京</Option>
                <Option value="nanjing">南京</Option>
                <Option value="shanghai">上海</Option>
                <Option value="chengdu">成都</Option>
            </Select>
        )
    }
}
export default CitySelectSimple