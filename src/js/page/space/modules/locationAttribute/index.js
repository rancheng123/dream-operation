import {Component} from "react";
import React from "react";
import {Select, Tag} from 'antd';



/**
 * 标签处理
 */
class MxjOperationStatus extends Component{
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
                    data: res.data.location_attribute
                })

            }
        })


    }
    render() {
        return (
            <Select
                allowClear
                {...this.props}
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
export default MxjOperationStatus