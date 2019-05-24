import React from 'react'
import { Router, Route, Link ,browserHistory ,IndexRoute } from 'react-router';

import homeRoute from './space';
import goodsRoute from './goods';
import checksRoute from './checks';
import organizeRoute from './organize';
import orderRoute from './order';
import systemRoute from './system';
import financialRoute from './financial'
import contractRoute from './contract'

import {backHome, requireAuth} from "./checkToken";

const app = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../components/layout/app').default)
    },'app')
}
const welcome = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/welcome/welcome').default)
    },'welcome')
}


const login = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/login/login').default)
    },'login')
}

// 针对销售系统添加的系统配置 start

/**
 * 新建办公服务订单 router
 * @param location
 * @param callback
 */
const order_office_create = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/order/office_order/order_create').default)
    },'order_office13')
}
/**
 * 新建办公服务订单第一步 router
 * @param location
 * @param callback
 */
const order_office_create_step01 = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/order/office_order/order_create/components/step01').default)
    },'order_office12')
}
/**
 * 新建办公服务订单第二步 router
 * @param location
 * @param callback
 */
const order_office_create_step02 = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/order/office_order/order_create/components/step02').default)
    },'order_office11')
}
/**
 * 新建办公服务订单第三步 router
 * @param location
 * @param callback
 */
const order_office_create_step03 = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/order/office_order/order_create/components/step03').default)
    },'order_office10')
}
/**
 * 新建办公服务订单第4步 router
 * @param location
 * @param callback
 */
const order_office_create_step04 = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/order/office_order/order_create/components/step04').default)
    },'order_office9')
}

// end


export default function renderRoute(){
    return (
        <Router history={browserHistory}>

            <Route title="首页" path="/" getComponent={app} onEnter={backHome}></Route>
            <Route title="登陆页" path="/login" getComponent={login}></Route>
            <Route title="欢迎页" path="/welcome" getComponent={welcome}></Route>
            {/*新建办公服务订单 针对销售系统额外的路由*/}
            <Route title="新建办公服务订单1" path="/exctal/order/office/:sourceType/info/" getComponent={order_office_create} onEnter={requireAuth}>
                <Route title="新建办公服务订单" path=":type/:code/step1" getComponent={order_office_create_step01} onEnter={requireAuth}></Route>
                <Route title="新建办公服务订单" path=":type/:code/step2" getComponent={order_office_create_step02} onEnter={requireAuth}></Route>
                <Route title="新建办公服务订单" path=":type/:code/step3" getComponent={order_office_create_step03} onEnter={requireAuth}></Route>
                <Route title="新建办公服务订单" path=":type/:code/step4" getComponent={order_office_create_step04} onEnter={requireAuth}></Route>
            </Route>
            <Route title="main模块" path="/" getComponent={app} onEnter={requireAuth}>
                {/*<IndexRoute getComponent={welcome} />*/}

                {homeRoute}
{goodsRoute}
{checksRoute}
{organizeRoute}
{orderRoute}
{systemRoute}
{financialRoute}
{contractRoute}

            </Route>


        </Router>
    )
}
