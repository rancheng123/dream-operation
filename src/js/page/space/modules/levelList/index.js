import {Component} from "react";
import React from "react";
import {Select, Tag} from 'antd';
import config from "../../../../config";



/**
 * 标签处理
 */
class Index extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
        //获取楼盘详情
        fetchData({
            method: 'get',
            url: config.api + '/location/building-attribute'
        }).then((res) => {
            if (res.code === 10000) {



                this.setState({
                    data: res.data.building_level
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
export default Index