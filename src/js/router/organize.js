import { Route} from "react-router";
import React, { Fragment } from "react";

import {requireAuth} from './checkToken';

// const organize = (location, callback)=>{
//     require.ensure([],require=>{
//         callback(null,require('../page/organize/organize').default)
//     },'organize')
// }
const system = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/system').default)
    },'system')
}

/**组织列表 */
const organize_list = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/organize/list').default)
    },'organize_list')
}

/**新建组织 */
const organize_create = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/organize/create').default)
    },'organize_create')
}
/**编辑组织 */
const organize_edit = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/organize/edit').default)
    },'organize_edit')
}
/**组织详情 */
const organize_detail = (location, callback)=>{
    require.ensure([],require=>{
        callback(null,require('../page/organize/detail').default)
    },'organize_detail')
}



export default (
    <Fragment>
        <Route title="组织管理" path="organize" getComponent={system} hiddenLink={true} >
            <Route path="owner" getComponent={system} hiddenLink={true}>
                    <Route title="组织列表" path="list" getComponent={organize_list} ></Route>
                    <Route title="新建组织" path="create" getComponent={organize_create} ></Route>
                    <Route title="编辑组织" path="edit/:id" getComponent={organize_edit} ></Route>
                    <Route title="组织详情" path="detail/:id" getComponent={organize_detail} ></Route> 
            </Route>
        </Route>
    </Fragment>
)