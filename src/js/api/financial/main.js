import fetchData from '../fetchData'

import config from '../../config'

/**
 * 获取状态分类list
 * @param {*} params 
 */
export const getTypeList = async (params) => {
    return await fetchData({
        method: 'get',
        url: config.api + '/finance/type-list',
        data: params
    })
}
/**
 * 模糊搜索提示 接口
 * @param {*} params 
 */
export const getSearchList = async (params) => {
    return await fetchData({
        method: 'get',
        url: config.api + '/user/org-search',
        data: params
    })
}