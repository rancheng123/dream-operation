import fetchData from '../fetchData';

import config from '../../config'

const {api} = config;

//获取组织列表
const getOrganizeList = async (data) => {
    return await fetchData({
        method: 'get',
        url: api + '/user/organization-list',
        data
    })
}
//获取组织相关类型列表
const getOrganizeTypeList = async () => {
    return await fetchData({
        method: 'get',
        url: api + '/user/type-list'
    })
}
//获取某个组织详情
const getOrganizeDetail = async data=> {
    return await fetchData({
        method: 'get',
        url: api + '/user/organization-detail/'+data.id
    }) 
}

//获取所有人列表
const getOwnerSearch = async data=> {
    return await fetchData({
        method: 'get',
        url: api + '/user/owner-search',
        data
    }) 
}
//新建组织
const createOrganize = async data=> {
    return await fetchData({
        method: 'post',
        url: api + '/user/organization-create',
        data
    })
}
//更新某个组织详情
const updateOrganize = async data=> {
    return await fetchData({
        method: 'put',
        url: api + '/user/organization-update/'+data.id,
        data
    }) 
}

module.exports = {
    getOrganizeList,
    getOrganizeTypeList,
    getOrganizeDetail,
    getOwnerSearch,
    createOrganize,
    updateOrganize
}