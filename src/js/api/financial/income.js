import fetchData from '../fetchData'

import config from '../../config'


/* ---------------------------------------------------- */
/**
 * 获取其他收入管理列表
 * @param {*} params 
 */
export const getIncomeList = async (params) => {
    return await fetchData({
        method: 'get',
        url: config.api + '/finance/income-list',
        data: params
    })
}
/**
 * 获取其他收入管理详情
 * @param {*} params 
 */
export const getIncomeDetails = async (params) => {
    return await fetchData({
        method: 'get',
        url: config.api + '/finance/income-detail/' + params,
    })
}