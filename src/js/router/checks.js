import { Route} from "react-router";
import React, { Fragment } from "react";

import {toString} from '@/js/asset/str';

const system = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/system').default)
    },'system')
}
const checks_wait_project = (location,callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/checks/wait/project').default)
    },'checks_wait_project')
}
//待我审核下的订单审核
const checks_wait_order_list = (location,callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/checks/wait/order_list').default)
    },'checks_wait_order_list')
}

//我发起的审核
const checks_apply_project = (location,callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/checks/apply/project').default)
    },'checks_apply_project')
}
//我发起审核下的订单审核
const checks_apply_order_list = (location,callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/checks/apply/order_list').default)
    },'checks_apply_order_list')
}

//审核订单创建申请
const checks_create = (location,callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/checks/common/check_create').default)
    },'checks_create')
}
//审核订单变更-扩租
const checks_expand = (location,callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/checks/common/check_expand').default)
    },'checks_expand')
}
//审核订单变更-减租
const checks_reduce = (location,callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/checks/common/check_reduce').default)
    },'checks_reduce')
}
//审核订单变更-续租
const checks_continue = (location,callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/checks/common/check_continue').default)
    },'checks_continue')
}
//我方清租
const checks_myclear = (location,callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/checks/common/check_myclear').default)
    },'checks_myclear')
}
//审核提前终止
const checks_end = (location,callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/checks/common/check_end').default)
    },'checks_wait_check_end')
}
//审核到期结算
const checks_due_settle = (location,callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/checks/common/check_due_settle').default)
    },'checks_wait_check_end')
}

//审批流demo
const checks_demo = (location,callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/checks/check_demo').default)
    },'checks_demo')
}

export default (
    <Fragment>
        <Route title="审核管理" path="checks" getComponent={system} hiddenLink={true} >
            <Route  path="wait" getComponent={system} onlyShow={true}>
                <Route title="待我审核&审批" path="project" getComponent={checks_wait_project}></Route>
                <Route title="待我审核&审批" path="project" getComponent={system}>
                    <Route title={toString(
                        {type_code: {
                            'SHDDCJ': '创建订单审核', 'SHDDDQ': '到期结算审核',
                            'SHDDTQ': '提前终止审核', 'SHDDQZ': '我方清租审核',
                            'SHDDJZ': '变更-减租审核', 'SHDDKZ': '变更-扩租审核', 'SHDDXZ' : '变更-续租审核'
                        }}
                        )} path="order" getComponent={checks_wait_order_list}>
                    
                    </Route>
                </Route>

                <Route title="待我审核&审批" path="project" getComponent={system}>
                    <Route title={toString(
                        {type_code: {
                            'SHDDCJ': '创建订单审核', 'SHDDDQ': '到期结算审核',
                            'SHDDTQ': '提前终止审核', 'SHDDQZ': '我方清租审核',
                            'SHDDJZ': '变更-减租审核', 'SHDDKZ': '变更-扩租审核', 'SHDDXZ' : '变更-续租审核'
                        }}
                        )} path="order" getComponent={system}>
                        <Route title="审核订单创建申请" path="create/:step_assignee_id" getComponent={checks_create}></Route>
                        <Route title="审核订单变更-扩租" path="expand/:step_assignee_id" getComponent={checks_expand}></Route>
                        <Route title="审核订单变更-减租" path="reduce/:step_assignee_id" getComponent={checks_reduce}></Route>
                        <Route title="审核订单变更-续租" path="continue/:step_assignee_id" getComponent={checks_continue}></Route>
                        <Route title="我方清租" path="myclear/:step_assignee_id" getComponent={checks_myclear}></Route>
                        <Route title="审核提前终止" path="end/:step_assignee_id" getComponent={checks_end}></Route>
                        <Route title="审核到期结算" path="settle/:step_assignee_id" getComponent={checks_due_settle}></Route>
                    </Route>
                </Route>

                
            </Route>

            <Route  path="apply" getComponent={system} onlyShow={true}>
                <Route title="我发起的审核" path="project" getComponent={checks_apply_project}>              
                </Route>
                <Route title="我发起的审核" path="project" getComponent={system}>
                    <Route title={toString(
                        {type_code: {
                            'SHDDCJ': '创建订单审核', 'SHDDDQ': '到期结算审核',
                            'SHDDTQ': '提前终止审核', 'SHDDQZ': '我方清租审核',
                            'SHDDJZ': '变更-减租审核', 'SHDDKZ': '变更-扩租审核', 'SHDDXZ' : '变更-续租审核'
                        }}
                        )} path="order" getComponent={checks_apply_order_list}>
                    
                    </Route>
                </Route>

                <Route title="我发起的审核" path="project" getComponent={system}>
                    <Route title={toString(
                        {type_code: {
                            'SHDDCJ': '创建订单审核', 'SHDDDQ': '到期结算审核',
                            'SHDDTQ': '提前终止审核', 'SHDDQZ': '我方清租审核',
                            'SHDDJZ': '变更-减租审核', 'SHDDKZ': '变更-扩租审核', 'SHDDXZ' : '变更-续租审核'
                        }}
                        )} path="order" getComponent={system}>
                        <Route title="审核订单创建申请" path="create/:step_assignee_id" getComponent={checks_create}></Route>
                        <Route title="审核订单变更-扩租" path="expand/:step_assignee_id" getComponent={checks_expand}></Route>
                        <Route title="审核订单变更-减租" path="reduce/:step_assignee_id" getComponent={checks_reduce}></Route>
                        <Route title="审核订单变更-续租" path="continue/:step_assignee_id" getComponent={checks_continue}></Route>
                        <Route title="我方清租" path="myclear/:step_assignee_id" getComponent={checks_myclear}></Route>
                        <Route title="审核提前终止" path="end/:step_assignee_id" getComponent={checks_end}></Route>
                        <Route title="审核到期结算" path="settle/:step_assignee_id" getComponent={checks_due_settle}></Route>
                    </Route>
                </Route>

                
            </Route>



            <Route title="审批流设置" path="demo" getComponent={checks_demo}></Route>
        </Route>

        
        {/* <Route title="我发起的审核" onEnter={requireAuth} path="/checks/apply/project" getComponent={checks_apply_project}></Route>
        <Route title="订单审核" onEnter={requireAuth} path="/checks/apply/order" getComponent={checks_apply_order_list}></Route>
        <Route title="审核订单创建申请" onEnter={requireAuth} path="/checks/apply/create/:step_assignee_id" getComponent={checks_create}></Route>
        <Route title="审核订单变更-扩租" onEnter={requireAuth} path="/checks/apply/expand/:step_assignee_id" getComponent={checks_expand}></Route>
        <Route title="审核订单变更-减租" onEnter={requireAuth} path="/checks/apply/reduce/:step_assignee_id" getComponent={checks_reduce}></Route>
        <Route title="审核订单变更-续租" onEnter={requireAuth} path="/checks/apply/continue/:step_assignee_id" getComponent={checks_continue}></Route>
        <Route title="我方清租" onEnter={requireAuth} path="/checks/apply/myclear/:step_assignee_id" getComponent={checks_myclear}></Route>
        <Route title="审核提前终止" onEnter={requireAuth} path="/checks/apply/end/:step_assignee_id" getComponent={checks_end}></Route>
        <Route title="审核到期结算" onEnter={requireAuth} path="/checks/apply/settle/:step_assignee_id" getComponent={checks_due_settle}></Route> */}
    </Fragment>
)