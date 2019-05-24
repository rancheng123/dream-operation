import { Route} from "react-router";
import React from "react";

const system = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/system_management/system').default)
    }, 'system')
}
/** ------------业务配置--------------- **/
// 业务配置/办公服务订单配置
const system_business = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/system_management/business/business_order_setting').default)
    }, 'system_business')
}
// 业务配置/业务押金配置
const system_deposit = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/system_management/business/business_deposit_configuration').default)
    }, 'system_deposit')
}
// 业务配置/新建业务押金
const system_deposit_add = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/system_management/business/business_deposit_add').default)
    }, 'system_deposit_add')
}
// 业务配置/编辑业务押金
const system_deposit_edit = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/system_management/business/business_deposit_edit').default)
    }, 'system_deposit_edit')
}
// 业务配置/业务押金详情
const system_deposit_details = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/system_management/business/business_deposit_details').default)
    }, 'system_deposit_details')
}

/** ------------组织机构管理--------------- **/
// 组织机构管理/场地主体管理
const system_venue = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/system_management/organization/venue_management').default)
    }, 'system_venue')
}
// 组织机构管理/编辑主体配置
const system_venue_edit = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/system_management/organization/venue_configuration_edit').default)
    }, 'system_venue_edit')
}
// 组织机构管理/主体详情
const system_venue_details = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/system_management/organization/venue_details').default)
    }, 'system_venue_details')
}

/** ------------角色&权限管理--------------- **/
// 角色与权限管理/角色与权限管理
const role_management = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/system_management/authority/role_management').default)
    }, 'role_management')
}
// 角色与权限管理/新建角色
const role_add = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/system_management/authority/role_add').default)
    }, 'role_add')
}
// 角色与权限管理/编辑角色
const role_edit = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/system_management/authority/role_edit').default)
    }, 'role_edit')
}
// 角色与权限管理/角色详情
const role_details = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/system_management/authority/role_details').default)
    }, 'role_details')
}
// 操作员权限管理/操作员权限管理
const operator_rights_management = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/system_management/authority/operator_rights_management').default)
    }, 'operator_rights_management')
}
// 操作员权限管理/新建操作员
const operator_add = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/system_management/authority/operator_add').default)
    }, 'operator_add')
}
// 操作员权限管理/编辑操作员
const operator_edit = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/system_management/authority/operator_edit').default)
    }, 'operator_edit')
}
// 操作员权限管理/操作员详情
const operator_details = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/system_management/authority/operator_details').default)
    }, 'operator_details')
}

/** ------------审批&审核权限管理--------------- **/
// 审批与审核权限管理/审核与审批权限管理
const approval_authority_management = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/system_management/approval/approval_authority_management').default)
    }, 'approval_authority_management')
}
// 审批与审核权限管理/编辑审批与审核权限
const approval_edit = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/system_management/approval/approval_edit').default)
    }, 'approval_edit')
}
// 审批与审核权限管理/新建审核与审批流
const approval_add = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/system_management/approval/approval_add').default)
    }, 'approval_add')
}

export default (
    <Route  title="系统设置"    path="/system"  getComponent={system}>
        {/* 业务配置 */}
        <Route title="办公服务订单配置" path="/system/business/office" getComponent={system_business}></Route>
        <Route title="业务押金配置" path="/system/business/deposit" getComponent={system_deposit}></Route>
        <Route title="新建业务押金" path="/system/business/deposit/add" getComponent={system_deposit_add}></Route>
        <Route title="编辑业务押金" path="/system/business/deposit/edit" getComponent={system_deposit_edit}></Route>
        <Route title="业务押金详情" path="/system/business/deposit/details" getComponent={system_deposit_details}></Route>

        {/* 组织机构管理 */}
        <Route title="场地主体管理" path="/system/organization/venue" getComponent={system_venue}></Route>
        <Route title="编辑主体配置" path="/system/organization/venue/edit" getComponent={system_venue_edit}></Route>
        <Route title="主体详情" path="/system/organization/venue/details" getComponent={system_venue_details}></Route>

        {/* 角色&权限管理 */}
        <Route title="角色与权限管理" path="/system/authority/role" getComponent={role_management}></Route>
        <Route title="新建角色" path="/system/authority/role/add" getComponent={role_add}></Route>
        <Route title="编辑角色" path="/system/authority/role/edit" getComponent={role_edit}></Route>
        <Route title="角色详情" path="/system/authority/role/details" getComponent={role_details}></Route>
        <Route title="操作员权限管理" path="/system/authority/operator" getComponent={operator_rights_management}></Route>
        <Route title="新建操作员" path="/system/authority/operator/add" getComponent={operator_add}></Route>
        <Route title="编辑操作员" path="/system/authority/operator/edit" getComponent={operator_edit}></Route>
        <Route title="操作员详情" path="/system/authority/operator/details" getComponent={operator_details}></Route>

        {/* 审批&审核权限管理 */}
        <Route title="审核与审批权限管理" path="/system/approval/approval" getComponent={approval_authority_management}></Route>
        <Route title="编辑审核与审批权限" path="/system/approval/approval/edit" getComponent={approval_edit}></Route>
        <Route title="新建审核与审批流" path="/system/approval/approval/add" getComponent={approval_add}></Route>
    </Route>
)