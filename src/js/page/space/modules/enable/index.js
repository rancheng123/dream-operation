import {Component} from "react";
import React from "react";
import {Modal, Select, Switch, Tag} from 'antd';
import fetchData from "../../../../api/fetchData";
import config from "../../../../config";

class Index extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }
    render() {

        var {fetchDataFn,messageFn ,onOk, ...restProps} = this.props;

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
                                    onOk && onOk()
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

                                    onOk && onOk()
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