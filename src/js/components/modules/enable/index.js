import {Component} from "react";
import React from "react";
import {Modal, Select, Switch, Tag} from 'antd';
import fetchData from "@api/fetchData";
class Index extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }
    render() {

        var {fetchDataFn,messageFn , ...restProps} = this.props;

        return (
            <Switch
                onChange={(status) => {

                    var opts = fetchDataFn(status);
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

                    fetchData(opts).then((res) => {
                        if (res.code === 10000) {
                            Modal.info({
                                title: '提示',
                                content: (
                                    <div>
                                        {messageFn(status)}
                                    </div>
                                ),
                                onOk: () => {

                                    this.props.onOk && this.props.onOk()
                                },
                            });
                        }
                    })



                }}

                {...restProps}
            />

        )
    }
}
export default Index