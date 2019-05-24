import React, { Component } from 'react';
import {
    Select, Icon, Input, AutoComplete
  } from 'antd';
import "./index.scss"

  const InputGroup = Input.Group,
  Option = Select.Option;

class MxjSelectSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { keyword : '' };
    }
    handleChange = e => {
        const keyword = e.target.value;
        this.setState({
            keyword
        });
    }
    render() {
        return (
            <InputGroup className="mxj_select_search">
            <Select onChange={this.props.changeSelectSearch}  className="mxj_select" defaultValue="goodsName">
               {
                   this.props.labels.map((l,i)=>{
                       return <Option key={i} value={l.value}>{l.label}</Option> 
                   })
               }
            </Select>
            <AutoComplete
            style={{ width: 150 }}
            className="mxj_search"
            >
            <Input onInput={(e)=>this.handleChange(e)} suffix={<Icon type="search" onClick={this.props.onSearch(this.state.keyword)} className="certain-category-icon" style={{color : "#bfbfbf"}} />} />
            </AutoComplete>
            </InputGroup> 
        );
    }
}

export default MxjSelectSearch;