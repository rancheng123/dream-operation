import {browserHistory} from "react-router";


class Router{
    constructor(){
        this.momery = {
            from: {},
            to: {}
        }
    }

    //切换路由
    switchRoute(routeStr){
        var that = this;


        switch (arguments.length){
            case 1:
                var routeStr = arguments[0];
                break;
            case 2:
                var arr = [];
                for(var name in arguments[1]){
                    arr.push(name+'='+arguments[1][name])
                }
                var routeStr = arguments[0] + '?' + arr.join('&');
                break;
        }

        var timer = setTimeout(function () {

            browserHistory.push(routeStr);
            clearTimeout(timer)

            var timer = setTimeout(function () {

                window.scrollTo(0,0)
                clearTimeout(timer)
            },100)
        },100)









        /*that.momery.from = {
            path: location.pathname,
            params: that.Url.parseUrl(location.href).params
        }


        //定时器 等待软键盘落下
        setTimeout(function () {
            browserHistory.push(routeStr);

            that.momery.to = {
                path: location.pathname,
                params: that.Url.parseUrl(location.href).params
            };
        },500)*/

    }

    //返回路由
    backRoute(){


        browserHistory.goBack();

        var timer = setTimeout(function () {
            window.scrollTo(0,0)
            clearTimeout(timer)
        },100)


        /*
        var that = this;
        that.momery.from = {
            path: location.pathname,
            params: that.Url.parseUrl(location.href).params
        };

        //页面无刷新切换路由
        let scrollTop = browserHistory.getCurrentLocation().query.scrollTop;
        if(scrollTop){
            setTimeout(function () { //定时器是为了解决进入页面直接调用window.scrollTo不执行
                window.scrollTo(0,scrollTop);
            },30)
        }
        browserHistory.goBack();

        var timer1 = setTimeout(function () {
            that.momery.to = {
                path: location.pathname,
                params: that.Url.parseUrl(location.href).params
            };
            clearTimeout(timer1);
        },100)*/

    }

};

export default new Router()