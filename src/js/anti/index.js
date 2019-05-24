import { LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import React, {Component} from "react";

//引入antd 样式
import './selfAntd.less'



class Anti extends Component{
    constructor(){
        super();
    }

    render(){
        return (
            <LocaleProvider locale={zhCN}>
                {this.props.children}
            </LocaleProvider>
        )
    }

}
export default Anti;