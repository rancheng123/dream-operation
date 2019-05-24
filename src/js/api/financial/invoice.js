import fetchData from '../fetchData'

import config from '../../config'

/**
 * 发票管理 列表数据
 * @param {*} params 
 */
export const getInvoicesList = async (params) => {
    return await fetchData({
        method: 'get',
        url: config.api + '/finance/finance-invoice',
        data: params
    })
}
/**
 * 发票管理 详情
 * @param {*} params
 */
export const getInvoicesDetails = async (params) => {
    return await fetchData({
        method: 'get',
        url: config.api + '/finance/finance-invoice/detail/' + params,
        // data: params
    })
}

/**
 * 申请发票信息 接口
 * @param {*} params 
 */
export const getInvoiceInfo = async (params) => {
    return await fetchData({
        method: 'get',
        url: config.api + '/finance/finance-invoice/detail/' + params,
    })
}
/**
 * 提交申请发票 接口
 * @param {*} params 
 */
export const setInvoiceInfo = async (params, data) => {
    return await fetchData({
        method: 'post',
        url: config.api + '/finance/finance-invoice/apply/' + params,
        data: data
    })
}
/**
 * 确认开具发票 接口
 * @param {*} params 
 */
export const setInvoicing = async (params) => {
    return await fetchData({
        method: 'post',
        url: config.api + '/finance/finance-invoice/opener',
        data: params
    })
}
