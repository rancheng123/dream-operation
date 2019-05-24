

//redux
import {createStore ,applyMiddleware ,compose} from 'redux';
//redux与react链接插件

//中间件1  action creator 和 网络请求结合起来( 让action生成器 支持返回函数，并且提供dispatch等参数 )
import thunk from 'redux-thunk';
// 中间件2   一个很便捷的 middleware，用来打印 action 日志
//import createLogger from 'redux-logger';
import { createLogger } from 'redux-logger'


//redux 开发工具
import DevTools from './devTools/devTools'
//reducers
import reducers from './reducers/combineReducers';


if(NODE_ENV == 'production'){
    var res = compose(
        //应用中间件
        applyMiddleware(
            thunk,
        ),
    )
}else{
    var res = compose(
        //应用中间件
        applyMiddleware(
            thunk,
            createLogger()
        ),
        DevTools.instrument()
    )
}


export default createStore(
  reducers,
  //从右到左来组合多个函数,见http://cn.redux.js.org/docs/api/compose.html
  res
);
