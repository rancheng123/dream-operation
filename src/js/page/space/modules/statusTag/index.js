import {Component} from "react";
import React from "react";
import MxjTag from '@widget/tag/mxjTag';


class Index extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }
    render() {

        var status = this.props.status;

        /*测试  start*/
        //status = '已停用'
        /*测试  end*/

        return (
            <MxjTag type={(()=>{

                //黄色
                if(status == '待开放'){
                    return 'warn'
                }
                //绿色
                else if(status == '运营中'){
                    return 'success'
                }
                //红色
                else if(status == '已停用' || status == '已销售' || status == '场地已停用'){
                    return 'error'
                }



            })()}>
                {status}
            </MxjTag>

        )
    }
}
export default Index