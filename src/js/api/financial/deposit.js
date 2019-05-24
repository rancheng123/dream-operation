import fetchData from '../fetchData'
import config from '../../config'

/* ---------------------------------------------------- */
/**
 * 押金记录列表
 * @param {*} params 
 */
export const getDepositRecordList = async (params) => {
    return await fetchData({
        method: 'get',
        url: config.api + '/finance/deposit-list',
        data: params
    })
}
/**
 * 押金记录详情(明细)
 * @param {*} params 
 */
export const getDepositRecordDetails = async (params) => {
    return await fetchData({
        method: 'get',
        url: config.api + '/finance/deposit-detail/' + params,
        // data: params
    })
}
/**
 * 押金单管理
 * @param {*} params 
 */
export const getDepositFormList = async (params) => {
    return await fetchData({
        method: 'get',
        url: config.api + '/finance/deposit-receipt-list',
        data: params
    })
}
/**
 * 押金单详情
 * @param {*} params 
 */
export const getDepositFormDetails = async (params) => {
    return await fetchData({
        method: 'get',
        url: config.api + '/finance/deposit-receipt-detail/' + params,
        // data: params
    })
}
/**
 * d打印押金单详情
 * @param {*} params 
 */
export const setDepositPrint = async (params) => {
    return await fetchData({
        method: 'get',
        url: config.api + '/finance/deposit-receipt-print/' + params,
        // data: data
    })
}
/**
 * 获取押金单详情pdf
 * @param {*} params 
 */
export const getDepositPDF = async (params, data) => {
    return await fetchData({
        method: 'post',
        url: config.api + '/finance/deposit-receipt-pdf/' + params,
        // data: data
    })
}
