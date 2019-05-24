import { Route} from "react-router"
import React, {Fragment} from "react"
import {requireAuth} from './checkToken'

// const financial = (location, callback) => {
//     require.ensure([], require => {
//         callback(null, require('../page/financial_management/financial').default)
//     }, 'financial')
// }
/** ------------账单管理--------------- **/
// 账单管理/办公服务订单配置
const office_order_bills = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/financial_management/bill/office_order_bills').default)
    }, 'office_order_bills')
}
// 账单管理/办公服务订单详情
const office_order_bills_details = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/financial_management/bill/office_order_bills_details').default)
    }, 'office_order_bills_details')
}
// 账单管理/办公服务账单管理/支付
const office_order_bills_payment = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/financial_management/bill/office_order_bills_payment').default)
    }, 'office_order_bills_payment')
}
// 账单管理/办公服务账单管理/对账
const office_order_bills_audit = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/financial_management/bill/office_order_bills_audit').default)
    }, 'office_order_bills_audit')
}
// 账单管理/办公服务账单管理/申请开票
const office_order_bills_invoice = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/financial_management/bill/office_order_bills_invoice').default)
    }, 'office_order_bills_invoice')
}


/** ------------其他收入管理--------------- **/
// 其他收入管理/其他收入管理/其他收入列表
const other_incomes = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/financial_management/income/other_incomes').default)
    }, 'other_incomes')
}

// 其他收入管理/其他收入管理/其他收入详情
const other_income_details = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/financial_management/income/other_income_details').default)
    }, 'other_income_details')
}

/** ------------发票管理--------------- **/
// 发票管理/发票申请管理/发票申请列表
const invoice_list = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/financial_management/invoice/invoices').default)
    }, 'invoice_list')
}

// 发票管理/发票申请管理/发票详情
const invoice_details = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/financial_management/invoice/invoice_details').default)
    }, 'invoice_details')
}

// 发票管理/发票申请管理/发票详情
const invoice_manage = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/financial_management/invoice/invoice_manage').default)
    }, 'invoice_manage')
}

/** ------------退款管理--------------- **/
// 退款管理/退款申请/退款申请列表
const refund_list = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/financial_management/refund/refunds').default)
    }, 'refund_list')
}
// 退款管理/退款申请/退款申请管理
const refund_apply = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/financial_management/refund/refund_apply').default)
    }, 'refund_apply')
}
// 退款管理/退款申请/退款申请详情
const refund_details = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/financial_management/refund/refund_details').default)
    }, 'refund_details')
}

/** ------------押金管理--------------- **/
// 退款管理/押金管理/押金记录列表
const deposit_record_list = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/financial_management/deposit/deposit_record').default)
    }, 'deposit_record_list')
}
// 退款管理/押金管理/押金记录详情
const deposit_record_details = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/financial_management/deposit/deposit_record_details').default)
    }, 'deposit_record_details')
}
// 退款管理/押金管理/押金单列表
const deposit_form_list = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/financial_management/deposit/deposit_form').default)
    }, 'deposit_form_list')
}
// 退款管理/押金管理/押金单详情
const deposit_form_details = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/financial_management/deposit/deposit_form_details').default)
    }, 'deposit_form_details')
}


export default (
    <Fragment>
        {/* 办公服务订单详情 */}
        <Route title="办公服务订单账单" path="/financial/bill/order" onEnter={requireAuth} getComponent={office_order_bills}></Route>
        <Route title="办公服务订单账单详情" path="/financial/bill/details/:code/:bill_status" onEnter={requireAuth} getComponent={office_order_bills_details}></Route>
        <Route title="支付" path="/financial/bill/payment/:code/:bill_status" onEnter={requireAuth} getComponent={office_order_bills_payment}></Route>
        <Route title="对账" path="/financial/bill/audit/:code/:bill_status" onEnter={requireAuth} getComponent={office_order_bills_audit}></Route>
        <Route title="申请开票" path="/financial/bill/invoice/:code/:bill_status" onEnter={requireAuth} getComponent={office_order_bills_invoice}></Route>

        {/* 其他收入管理 */}
        <Route title="其他收入列表" path="/financial/income/list" onEnter={requireAuth} getComponent={other_incomes}></Route>
        <Route title="其他收入详情" path="/financial/income/details/:code" onEnter={requireAuth} getComponent={other_income_details}></Route>

        {/* 发票管理 */}
        <Route title="发票申请管理列表" path="/financial/invoice/list" onEnter={requireAuth} getComponent={invoice_list}></Route>
        <Route title="发票详情" path="/financial/invoice/details/:code" onEnter={requireAuth} getComponent={invoice_details}></Route>
        <Route title="发票申请" path="/financial/invoice/manage/:code" onEnter={requireAuth} getComponent={invoice_manage}></Route>

        {/* 退款管理 */}
        <Route title="退款申请列表" path="/financial/refund/list" onEnter={requireAuth} getComponent={refund_list}></Route>
        <Route title="退款申请管理" path="/financial/refund/apply/:code" onEnter={requireAuth} getComponent={refund_apply}></Route>
        <Route title="退款申请详情" path="/financial/refund/details/:code" onEnter={requireAuth} getComponent={refund_details}></Route>

        {/* 押金管理 */}
        <Route title="押金记录列表" path="/financial/deposit/record/list" onEnter={requireAuth} getComponent={deposit_record_list}></Route>
        <Route title="押金记录详情" path="/financial/deposit/record/details/:code" onEnter={requireAuth} getComponent={deposit_record_details}></Route>
        <Route title="押金单列表" path="/financial/deposit/form/list" onEnter={requireAuth} getComponent={deposit_form_list}></Route>
        <Route title="押金单详情" path="/financial/deposit/form/details/:code" onEnter={requireAuth} getComponent={deposit_form_details}></Route>
    </Fragment>
)