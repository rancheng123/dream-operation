import fetchData from '../fetchData';

import config from '../../config'

/**
 * 获取省、城市、楼盘、场地信息接口
 * @param {*} params 
 */
export const getAddressInfo = async (params) => {
    return await fetchData({
        method: 'get',
        url: config.api + '/location/available-provinces-cities-buildings-locations',
        data: params
    })
}
