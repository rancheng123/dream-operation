import {Component} from "react";
import React from "react";
import {Icon, Modal, Popconfirm, } from 'antd';
import fetchData from "@api/fetchData";


class Index extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }
    render() {

        return (
            <Popconfirm
                title="您确定删除吗?"
                onConfirm={()=>{

                    var opts = this.props.fetchDataFn();
                    opts.errorHandle = {
                        40004: (res)=>{
                            Modal.info({
                                title: '提示',
                                content: (
                                    <div>
                                        <p>{res.message}</p>
                                    </div>
                                ),
                                onOk:()=> {

                                    this.props.onOk && this.props.onOk()
                                },
                            });
                        }
                    }

                    fetchData(opts).then((res)=>{
                        if(res.code === 10000){
                            Modal.info({
                                title: '提示',
                                content: (
                                    <div>
                                        <p>删除成功</p>
                                    </div>
                                ),
                                onOk:()=> {

                                    this.props.onOk && this.props.onOk()
                                },
                            });
                        }
                    })

                }}
                //onCancel={cancel}
                okText="是"
                cancelText="不"
            >

                <Icon
                    type="delete"
                    style={{color: '#FF7E7E'}}
                />
            </Popconfirm>

        )
    }
}
export default Index