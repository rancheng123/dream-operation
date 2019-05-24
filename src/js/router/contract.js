import { Route} from "react-router";
import React, {Fragment} from "react";
import {requireAuth} from './checkToken'


// const contract = (location, callback)=>{
//     require.ensure([],require=>{
//         callback(null,require('../page/contract/contract').default)
//     },'contract')
// }

const contract_list = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/contract/contract_list/contract_list').default)
    },'contract_list')
}
const contract_detail = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/contract/contract_detail/contract_detail').default)
    },'contract_detail')
}
const template_list = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/contract/template_list/contract_template_list').default)
    },'template_list')
}
const template_detail = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/contract/template_detail/contract_template_detail').default)
    },'template_detail')
}
// 引入pdf组件路径
// const pdfView = (location, callback)=>{
//     require.ensure([],require=>{
//         callback(null,require('../../webStatic/web/viewer.html').default)
//     },'pdfView')
// }


export default (
    <Fragment>
        <Route title="合同列表" path="/contract/list" onEnter={requireAuth} getComponent={contract_list}></Route>
        <Route title="合同详情" path="/contract/detail/:code" onEnter={requireAuth} getComponent={contract_detail}></Route>
        <Route title="合同&模板列表" path="/template/list" onEnter={requireAuth} getComponent={template_list}></Route>
        <Route title="合同&模板详情" path="/template/detail/:code" onEnter={requireAuth} getComponent={template_detail}></Route>
        {/* <Route title="pdfView" path="/pdf/view" getComponent={pdfView}></Route> */}
    </Fragment>
)