
import axios from 'axios'
import "babel-polyfill"
import { Modal, message } from "antd";
import React from "react";
import utils from '../asset';

const URL = require('url');
const requestMap = window.requestMap = {};
import whiteToken from './whiteTokenApi'
// const defaultTimeout  = 5000;

axios.defaults.timeout = 10000;

export default async function fetchData(params) {

    params = params || {}

    if (params.method == 'get') {
        params.url = params.url + '?' + utils.paramSerialize(params.data)
    }

    if (!params.hasOwnProperty('headers')) {
        params['headers'] = {}
    }

    params.headers['Content-Type'] = 'application/json;charset=UTF-8'
    // 白名单 token校验
    // const is_has_white = whiteToken.every(value => params.url.indexOf(value) === -1)
    const token = utils.Cookies.get('token');
    // if (is_has_white) {
    //     if (!token) {
    //         // 如果不属于白名单中的请求接口，检测没有token，路由跳转到登陆页
    //         Modal.info({
    //             title: '错误',
    //             content: '登录失效，请重新登陆',
    //             onOk() {
    //                 utils.Router.switchRoute('/login', {
    //                     backto: 1
    //                 })
    //             },
    //         })
    //         return
    //     }
    // }
    if (token) {
        params.headers['Authorization'] = token ? 'Bearer ' + token : '';
    }

    //请求超时
    // params.timeout= defaultTimeout;

    return await axios(params)
}




axios.interceptors.request.use(req => {

    //防止重复提交 start
    var url = req.url.split('?')[0]
    if (req.once && requestMap[url] == 'requesting') {
        return
    }
    requestMap[url] = 'requesting'
    //防止重复提交 end


    return req
})

var whiteList = [
    ''
];

axios.interceptors.response.use(res => {
    // console.log(res)
    //防止重复提交 start
    var url = res.request.responseURL.split('?')[0]
    requestMap[url] = 'done'
    delete requestMap[url]
    //防止重复提交 end


    if(
        res.headers['content-type'] == 'application/pdf'
    ){
        return res.data || {}
    }


    if (
        res && res.status === 200 && res.data.code === 10000
        //||
        //其他业务错误码，如删除场地时（下面关联工位），不让删除
       // res && res.status === 200 && res.data.code === 40004
    ) {
        return res.data || {}
    }

    //接口层面报错处理
    else {
        if (res.data.code === 20001) {
            //全局token失效
            if (res.config.url.indexOf('/user/login') === -1) {
                Modal.info({
                    title: '错误',
                    content: '登录失效，请重新登陆',
                    onOk() {
                        utils.Router.switchRoute('/login', {
                            backto: 1
                        })
                    },
                })
                return
            }

        }

        //自定义错误码处理
        if(res.config.errorHandle){
            for(var code in res.config.errorHandle){
                if(code == res.data.code ){
                    res.config.errorHandle[code](res.data);
                    return;
                }
            }

        }

        Modal.info({
            title: '错误',
            content: (
                <div>
                    {res.data.message}
                </div>
            ),
            onOk() { },
        })
        return res.data || {}

    }
},

    //服务器层面错误处理
    err => {

        if(err.message.indexOf('timeout of ') != -1){
            Modal.info({
                title: '提示',
                content: (
                    <div>
                        {'接口超时'}
                    </div>
                ),
                onOk() { },
            })
        }


        console.error('网络错误' + err)
        /*Modal.info({
            title: '错误',
            content: (
                <div>
                    网络错误！
                </div>
            ),
            onOk() {},
        });*/
    }
)





