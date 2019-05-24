import { Route} from "react-router";
import React, { Fragment } from "react";

import {requireAuth} from './checkToken';

// const goods = (location, callback)=>{
//     require.ensure([],require=>{
//         callback(null,require('../page/goods/goods').default)
//     },'goods')
// }
/**工位商品 */
const system = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/system').default)
    },'system')
}
const goods_space_list = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/goods/goods_space/list').default)
    },'goods_space_list')
}
const goods_space_edit = (location,callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/goods/goods_space/edit').default)
    },'goods_space_edit');
}
const goods_space_detail = (location,callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/goods/goods_space/detail').default)
    },'goods_space_detail');
}

/** 房间商品 */
const goods_room_list = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/goods/goods_room/list').default)
    },'goods_room_list')
}
const goods_room_edit = (location,callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/goods/goods_room/edit').default)
    },'goods_room_edit');
}
const goods_room_detail = (location,callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/goods/goods_room/detail').default)
    },'goods_room_detail');
}
/** 商品分类配置 */
const goods_config = (location,callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/goods/goods_config/config').default)
    },'goods_config');
}
/** 业务押金品管理 */
const goods_business_deposit_list = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/goods/goods_business_deposit/list').default)
    },'goods_room_list')
}


export default (
    <Fragment>
        {/*
        <Route title="商品分类配置" onEnter={requireAuth} path="/goods/config" getComponent={goods_config}></Route>
        <Route title="业务押金品管理" onEnter={requireAuth} path="/goods/business_deposit/list" getComponent={goods_business_deposit_list}></Route> */}
        <Route title="商品管理" path="goods" getComponent={system} hiddenLink={true} >
            <Route title="场地商品管理" path="manage" getComponent={system} hiddenLink={true}>
                <Route path="space" getComponent={system} hiddenLink={true} >
                    <Route title="工位商品列表" path="list" getComponent={goods_space_list} ></Route>
                    <Route title="编辑工位办公服务商品" path="edit/:code" getComponent={goods_space_edit} ></Route>
                    <Route title="工位办公服务商品详情" path="detail/:code" getComponent={goods_space_detail} ></Route> 
                </Route>
                <Route path="room" getComponent={system} hiddenLink={true}>
                    <Route title="房间商品列表" path="list" getComponent={goods_room_list} ></Route>
                    <Route title="编辑房间办公服务商品" path="edit/:code" getComponent={goods_room_edit} ></Route>
                    <Route title="房间办公服务商品详情" path="detail/:code" getComponent={goods_room_detail} ></Route> 
                </Route>
            </Route>
        </Route>
    </Fragment>
)