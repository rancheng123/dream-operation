import fetchData from '../fetchData'

import config from '../../config'

/** -------- 账单管理 -------------------------------------------------- */
/**
 * 获取账单——列表数据
 * @param {*} params 
 */
export const getBillsList = async (params) => {
    return await fetchData({
        method: 'get',
        url: config.api + '/finance/bill-list',
        data: params
    })
}
/**
 * 账单-催缴按钮
 * @param {*} params 
 */
export const setDunningRequest = async (params, data) => {
    return await fetchData({
        method: 'post',
        url: config.api + '/finance/bill/urge_message/' + params,
        data: data
    })
}
/**
 * 账单-对账按钮
 * @param {*} params 
 */
export const setCompletedAuditRequest = async (params) => {
    return await fetchData({
        method: 'post',
        url: config.api + '/finance/bill/check-bill/' + params,
        // data: params
    })
}
/**
 * 获取账单详情
 * @param {*} params 
 */
export const getBillDetailData = async (params) => {
    return await fetchData({
        method: 'get',
        url: config.api + '/finance/bill-detail/' + params,
    })
}
/**
 * 线下转账
 * @param {*} params 
 */
export const getBillPay = async (params, data) => {
    return await fetchData({
        method: 'post',
        url: config.api + '/finance/bill-pay/transfer/' + params,
        data: data
    })
}

/* ---------------------------------------------------- */
