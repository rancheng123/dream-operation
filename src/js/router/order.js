import { Route, Redirect} from "react-router";
import React, {Fragment} from "react";

import {toString} from '@/js/asset/str';

// const order = (location, callback)=>{
//     require.ensure([],require=>{
//         callback(null,require('../page/order/order').default)
//     },'order15')
// }
const order_office = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/order/office_order/office').default)
    },'order15')
}
/**
 * 办公服务订单管理 router
 * @param location
 * @param callback
 */
const order_office_list = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/order/office_order/order_list/order_list').default)
    },'order_office14')
}
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
/**
 * 办公服务订单详情 router
 * @param location
 * @param callback
 */
const order_office_detail = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/order/office_order/order_detail').default)
    },'order_detail8')
}
/**
 * 办公服务订单变更引导页 router
 * @param location
 * @param callback
 */
const order_office_change_guide = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/order/office_order/change_order/change_order_guide').default)
    },'order_detail7')
}
/**
 * 办公服务订单变更引导页 router
 * @param location
 * @param callback
 */
const order_office_change_clear_rent = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/order/office_order/change_order/clearRent').default)
    },'order_detail6')
}
/**
 * 提前终止 我方清算 到期结算 parent
 * @param location
 * @param callback
 */
const order_office_close = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/order/office_order/order_close').default)
    },'order_close5')
}
/**
 * 增加订单 step1
 * @param location
 * @param callback
 */
const order_office_close_basic = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/order/office_order/order_create/components/basic').default)
    },'order_close4')
}
/**
 * 提前终止 我方清算 到期结算 step1
 * @param location
 * @param callback
 */
const order_office_close_step1 = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/order/office_order/order_close/step1').default)
    },'order_close3')
}
/**
 * 提前终止 我方清算 到期结算 step2
 * @param location
 * @param callback
 */
const order_office_close_step2 = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/order/office_order/order_close/step2').default)
    },'order_close2')
}
/**
 * 提前终止 我方清算 到期结算 step3
 * @param location
 * @param callback
 */
const order_office_close_step3 = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/order/office_order/order_close/step3').default)
    },'order_close1')
}
const system = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/system').default)
    },'system')
}

export default (
    <Fragment>
        <Redirect from="/order" to='/order/office/pre/list'></Redirect>
        <Redirect from="/order/office" to='/order/office/pre/list'></Redirect>
        {/*办公服务订单管理*/}
        <Route title="订单管理" hiddenLink={true} path="order" getComponent={order_office}>
            <Route title={toString({type: {'pre': '办公服务订单管理', 'altered': '办公服务订单变更管理'}})} path="office/:type/list" getComponent={order_office_list}></Route>
            {/*新建办公服务订单*/}
            {/*新建办公服务订单*/}
            <Route title="办公服务变更管理" path="office/:sourceType/change/guide/:code" getComponent={order_office_change_guide}>
            </Route>
            <Route title="办公服务变更管理" path="" getComponent={system}>

            </Route>
        </Route>
        <Route hiddenLink={true} title="订单管理" path="order" getComponent={order_office}>
            <Route title="办公服务订单管理" path="office"  getComponent={order_office}>
                {/*<Route title="办公订单管理" path=":type/list" getComponent={order_office_list}></Route>*/}
                {/*新建办公服务订单*/}

                <Route title={toString({
                    type: {
                        create: '新建办公服务订单',
                        renewal: '创建续租'
                    }
                })} path=":sourceType/info" getComponent={order_office_create}>
                    <Route path=":type/:code/step1" getComponent={order_office_create_step01}></Route>
                    <Route path=":type/:code/step2" getComponent={order_office_create_step02}></Route>
                    <Route path=":type/:code/step3" getComponent={order_office_create_step03}></Route>
                    <Route path=":type/:code/step4" getComponent={order_office_create_step04}></Route>
                </Route>


                {/*我方清租 作废*/}
                {/*<Route title="新建办公服务订单" path="/order/office/change/clear/rent" getComponent={order_office_change_clear_rent}>*/}
                {/*</Route>*/}
                {/*订单变更 增加，减少，提前终止，到期结算，我方请租*/}
                <Route title={toString({
                    type: {
                        'terminate-auditing': '提交提前终止',
                        'cleared': '我方清租',
                        'account-auditing': '到期结算'
                    }
                })} path=":sourceType/alteration/:type/:id" getComponent={order_office_close}>
                    <Route path="basic" getComponent={order_office_close_basic}></Route>
                    <Route path="step1" getComponent={order_office_close_step1}></Route>
                    <Route path="step2" getComponent={order_office_close_step2}></Route>
                    <Route path="step3" getComponent={order_office_close_step3}></Route>
                </Route>
                <Route title="办公订单详情" path=":sourceType/detail/:id" getComponent={order_office_detail}></Route>
            </Route>

        </Route>

    </Fragment>
)
