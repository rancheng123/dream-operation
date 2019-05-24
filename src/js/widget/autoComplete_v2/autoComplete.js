import {Component} from "react";
import {AutoComplete, Icon, Input,Select} from "antd";
import React from "react";


const InputGroup = Input.Group;
const Option = Select.Option;
import './autoComplete.scss'


class MxjAutoComplete extends Component{
    constructor(){
        super()

    }
    componentWillMount() {
        //select 默认100
        this.selectWidth = this.props.selectOpts.width || 100;

        this.autoCompleteWidth = this.props.style.width - this.selectWidth;
    }

    render() {

        return (
            <InputGroup
                compact
                className={'autoCompleteWrap'}
                style={this.props.style}
            >
                <Select
                    {...this.props.selectOpts}
                    value={this.props.value.select}
                    style={{width: this.selectWidth,height: '100%'}}
                    onChange={(id)=>{
                        this.props.onChange && this.props.onChange({
                            select: id,
                            input: this.props.value.input,
                            dataSource: this.props.value.dataSource
                        })

                    }}
                >
                    {(()=>{

                        return this.props.selectOpts.data.map((item,i)=>{
                            return (
                                <Option key={item.id} value={item.id}>{item.value}</Option>
                            )
                        })

                    })()}
                </Select>
                {/* <Input  defaultValue="Xihu District, Hangzhou" />*/}
                <AutoComplete

                    value={this.props.value.input}
                    className={'autoCompleteBody'}
                    //{...this.props}
                    //style={{ width: this.autoCompleteWidth, height: '100%' }}
                    dataSource={this.props.value.dataSource}
                    onChange={(value)=>{
                        this.props.onChange && this.props.onChange({
                            select: this.props.value.select,
                            input: value,
                            dataSource: this.props.value.dataSource
                        })

                    }}
                    onSearch={(value)=>{


                        this.props.onSearch && this.props.onSearch(value,(res)=>{
                            this.props.onChange && this.props.onChange({
                                select: this.props.value.select,
                                input: this.props.value.input,
                                dataSource: res
                            })
                        })



                    }}
                    placeholder={this.props.placeholder}
                >
                    <Input suffix={
                        <Icon
                            type="search"
                            className="certain-category-icon"
                            style={{color: '#CCCCCC '}}
                        />
                    } />
                </AutoComplete>

            </InputGroup>


        )
    }

    /**/

    /*render() {
        return (
            <AutoComplete
                {...this.props}
            >
                <Input suffix={
                    <Icon
                        type="search"
                        className="certain-category-icon"
                        style={{color: '#CCCCCC '}}
                    />
                } />
            </AutoComplete>
        )
    }*/
}

export default MxjAutoComplete