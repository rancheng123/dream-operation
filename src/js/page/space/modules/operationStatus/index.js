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
            url: config.api + '/location/status',
            data: {}
        }).then((res) => {
            if (res.code === 10000) {


                //过滤
                if(this.props.filter){
                    this.props.filter.forEach((filterItem,i)=>{
                        res.data.status.forEach((statusItem,j)=>{
                            if(filterItem == statusItem.key){
                                res.data.status.splice(j,1);
                            }
                        })
                    })
                }



                this.setState({
                    data: res.data.status
                })

            }
        })


    }
    render() {
        return (
            <Select
                allowClear
                placeholder="全部状态"
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