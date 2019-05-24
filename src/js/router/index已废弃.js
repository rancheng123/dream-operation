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
import {backHome} from "./checkToken";

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
const antiDome = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/1antiDome/antiDome').default)
    },'antiDome')
}

const login = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/login/login').default)
    },'login')
}



/*class renderRoute extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Router history={browserHistory}>
                <Route title="钱夹" path="/" getComponent={app}>
                    <IndexRoute getComponent={welcome} />
                    {homeRoute}
                    {goodsRoute}
                    {orderRoute}
                    {systemRoute}
                </Route>
                <Route title="钱夹" path="/antiDome" getComponent={antiDome}></Route>
            </Router>
 
        )

    }

    }*/

export default function renderRoute(){
    return (
        <Router history={browserHistory}>

            <Route title="首页" path="/" getComponent={app} onEnter={backHome}></Route>
            <Route title="登陆页" path="/login" getComponent={login}></Route>
            <Route title="欢迎页" path="/welcome" getComponent={welcome}></Route>
            <Route title="main模块" path="/" getComponent={app}>
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
