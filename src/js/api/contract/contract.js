import fetchData from '../fetchData';

import config from '../../config'

/**
 * 申请发票信息 接口
 * @param {*} params 
 */
export const getContractList = async (params) => {
    return await fetchData({
        method: 'get',
        url: config.api + '/contract/instance-list',
        data: params
    })
}
/**
 * 获取合同实例详情 接口
 * @param {*} params 
 */
export const getContractDetail = async (code) => {
    return await fetchData({
        method: 'get',
        url: config.api + '/contract/instance-detail/' + code,
    })
}
/**
 * 合同打印接口
 * @param {*} params 
 */
export const setPrintHandle = async (code) => {
    return await fetchData({
        method: 'put',
        url: config.api + '/contract/instance-print/' + code,
    })
}
/**
 * 上传文件接口
 * @param {*} params 
 */
export const uploadPdf = async (code, data) => {
    return await fetchData({
        method: 'post',
        url: config.api + '/contract/instance-upload/' + code,
        data: data
    })
}
/**
 * 合同模板列表
 * @param {*} params 
 */
export const getTemplateList = async (params) => {
    return await fetchData({
        method: 'get',
        url: config.api + '/contract/template-list',
        data: params
    })
}

/**
 * 合同模板详情
 */
export const getTemplateDetail = async (params) => {
    return await fetchData({
        method: 'get',
        url: config.api + '/contract/template-detail/' + params
    })
}

/**
 * 审核接口
 */
export const getInstanceCheck = async (params) => {
    return await fetchData({
        method: 'put',
        url: config.api + '/contract/instance-check/' + params
    })
}
