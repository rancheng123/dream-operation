import fetchData from '../fetchData'

import config from '../../config'

/* ---------------------------------------------------- */
/**
 * 退款管理
 * @param {*} params 
 */
export const getRefundList = async (params) => {
    return await fetchData({
        method: 'get',
        url: config.api + '/finance/refund-list',
        data: params
    })
}
/**
 * 退款申请打款
 * @param {*} params 
 */
export const setRefundApplyPay = async (params, id) => {
    return await fetchData({
        method: 'post',
        url: config.api + '/finance/refund-pay/' + id,
        data: params
    })
}
/**
 * 获取退款申请详情
 * @param {*} params 
 */
export const getRefundDetails = async (params) => {
    return await fetchData({
        method: 'get',
        url: config.api + '/finance/refund-detail/' + params,
        // data: params
    })
}