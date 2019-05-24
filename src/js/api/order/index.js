import fetchData from '../fetchData';

import config from '../../config'

const api = config.api
/**
 * 获取订单列表数据
 * @param {*} params
 */
export const getOrderOfficeList = async (data, error) => {
    return await fetchData({
        method: 'get',
        url: api + '/order/office/lists',
        data,
        errorHandle: error
    })
}
/**
 * 获取组织列表
 * @param {*} params
 */
export const getUserOrganizationList = async (data) => {
    return await fetchData({
        method: 'get',
        url: api + '/user/organization-list',
        data
    })
}
/**
 * 获取商品信息列表
 * @param {*} params
 */
export const getGoodsStatiionInfoList = async (data) => {
    return await fetchData({
        method: 'get',
        url: api + '/goods/station_available',
        data
    })
}
/**
 * 获取商品信息列表
 * @param {*} params
 */
export const getGoodsRoomInfoList = async (data) => {
    return await fetchData({
        method: 'get',
        url: api + '/goods/room_available',
        data
    })
}
/**
 * 办公服务订单配置信息
 * @param {*} params
 */
export const getOrderOfficeSetting = async (data) => {
    return await fetchData({
        method: 'get',
        url: api + '/setting/office/info',
        data
    })
}
/**
 * 办公服务订单详情
 * @param {*} params
 */
export const getOrderOfficeDetail = async (order_code) => {
    return await fetchData({
        method: 'get',
        url: api + '/order/office/detail/'+ order_code,
    })
}
/**
 * 办公服务订单详情(续租的时候需要)
 * @param {*} params
 */
export const getOrderOfficeDetailForReview = async (order_code) => {
    return await fetchData({
        method: 'get',
        url: api + '/order/office/detail-refresh-goods/'+ order_code,
    })
}
/**
 * 办公服务订单计算系列价格
 * @data {*} data
 */
export const getOrderOfficeCompute = async (data, error) => {
    return await fetchData({
        method: 'post',
        url: api + '/order/office/compute',
        data,
        errorHandle: error
    })
}
/**
 * 办公服务订单销售规则检查
 * @data {*} data
 */
export const getOrderOfficeCheckSaleRule = async (data) => {
    return await fetchData({
        method: 'post',
        url: api + '/order/office/check-sale-rule',
        data
    })
}
/**
 * 办公服务订单合同
 * @data {*} data
 */
export const getOrderOfficeContract = async (data) => {
    return await fetchData({
        method: 'get',
        url: api + '/contract/template-to-order',
        data
    })
}
/**
 * 办公服务订单创建
 * @data {*} data
 */
export const getOrderOfficeCreate = async (data) => {
    return await fetchData({
        method: 'post',
        url: api + '/order/office/create/new',
        data
    })
}
/**
 * 办公服务订单创建
 * @data {*} data
 */
export const getOrderOfficeRenewal = async (data) => {
    return await fetchData({
        method: 'post',
        url: api + '/order/office/create/renewal',
        data
    })
}
/**
 * 办公服务订单变更 押金单校验
 * @data {*} data
 */
export const checkDeposiCode = async (data, error) => {
    return await fetchData({
        method: 'get',
        url: api + '/order/office/deposit-receipt/validate-code',
        data,
        errorHandle: error
    })
}
/**
 * 获取退款和扣款的下拉选项
 * @data {*} data
 */
export const getDeductRefundOption = async (type) => {
    return await fetchData({
        method: 'get',
        url: api + `/order/office/deduct-refund-option/${type}`,
    })
}
/**
 * 到期结算，提前终止，清租
 * @param type
 * @param data
 * @returns {Promise<*>}
 */
export const postOrderOfficeCreateAuditing = async (type, data) => {
    return await fetchData({
        method: 'post',
        url: api + `/order/office/create/${type}`,
        data
    })
}
/**
 * 获取账单开始日期
 * @param type
 * @param data
 * @returns {Promise<*>}
 */
export const getOrderOfficeStartAt = async (data) => {
    return await fetchData({
        method: 'get',
        url: api + `/order/office/bill/start-date`,
        data
    })
}
/**
 * 更改状态
 * @param type
 * @param data
 * @returns {Promise<*>}
 */
export const changeOrderStatus = async (status, data, error) => {
    return await fetchData({
        method: 'put',
        url: api + `/order/office/status/to/${status}`,
        data,
        errorHandle: error
    })
}
/**
 * 获取某个订单的可操作类型
 * @param code
 * @returns {Promise<*>}
 */
export const getOrderOfficeSingleOperation = async (data) => {
    return await fetchData({
        method: 'get',
        url: api + `/order/office/operate/status/permissions`,
        data
    })
}
/**
 * 获取某个订单的可操作类型
 * @param code
 * @returns {Promise<*>}
 */
export const getOrderOfficeAlteredList = async (data) => {
    return await fetchData({
        method: 'get',
        url: api + `/order/office/lists/altered`,
        data
    })
}
/**
 * 获取订单状态数据
 * @returns {Promise<*>}
 */
export const getOrderOfficeInitStatusData = async () => {
    return await fetchData({
        method: 'get',
        url: api + `/order/office/init/data`,
    })
}