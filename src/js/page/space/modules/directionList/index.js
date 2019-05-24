import {Component} from "react";
import React from "react";
import {Select, Tag} from 'antd';



/**
 * 标签处理
 */
class Index extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
        fetchData({
            method: 'get',
            url: config.api + '/location/room-attribute',
            data: {}
        }).then((res) => {
            if (res.code === 10000) {
                this.setState({
                    data: res.data.room_orientation
                })

            }
        })


    }
    render() {
        return (
            <Select
                allowClear
                placeholder="全部朝向"
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