import {Component} from "react";
import React from "react";
import {Select, Tag} from 'antd';
import fetchData from "../../../api/fetchData";
import config from "../../../config";

/**
 * 标签处理
 */
class MxjLocationType extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: []
        }


        fetchData({
            method: 'get',
            url: config.api + '/location/location-attribute',
            data: {}
        }).then((res) => {
            if (res.code === 10000) {
                this.setState({
                    data: res.data.location_type
                })

            }
        })


    }
    render() {
        return (
            <Select
                {...this.props}
                allowClear
                placeholder="全部场地类型"
            >
                {(()=>{
                    return this.state.data.map((ele)=>{
                        return (
                            <Select.Option
                                key={ele.key}
                                value={ele.key}
                            >
                                {ele.value}
                            </Select.Option>
                        )
                    })
                })()}
            </Select>

        )
    }
}
export default MxjLocationType