import fetchData from '../fetchData';

import config from '../../config'

//获取楼盘详情
export const getBuildDetail = async (params) => {
    return await fetchData({
        method: 'get',
        url: config.mockApi + '/building/detail',
        data: params
    })
}
export const getBuildDetail2 = async (params) => {
    return await fetchData({
        method: 'post',
        url: config.mockApi + 'zcm/bdsale/getExpressList',
        data: params
    })
}






