import {Component} from "react";
import React from "react";
import {Select, Tag} from 'antd';



/**
 * 标签处理
 */
class MxjOperationType extends Component{
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
                    data: res.data.location_operation_type
                })

            }
        })


    }
    render() {

        return (
            <Select
                allowClear
                {...this.props}
                placeholder="全部经营方式"
            >
                {(()=>{
                    return this.state.data.map((ele)=>{
                        return (
                            <Select.Option
                                /*disabled={(()=>{
                                    var res = this.props.disabledArr.filter((disabledKey)=>{
                                        return ele.key == disabledKey
                                    })

                                    return res.length ? true : false

                                })()}*/
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
export default MxjOperationType