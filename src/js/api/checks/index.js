import fetchData from '../fetchData';

import config from '../../config'

const {api} = config;


//获取审核列表配置（待我审核）
const getwaitOption = async () => {
    return await fetchData({
        method: 'get',
        url: api + '/workflow/audit/wait-option'
    }) 
}

//获取审核列表配置（我发起的审核）
const getApplyOption = async () => {
    return await fetchData({
        method: 'get',
        url: api + '/workflow/my-apply/wait-option'
    }) 
}

//获取申请状态
const getApplyStatusList = async () => {
    return await fetchData({
        method: 'get',
        url: api + '/workflow/my-apply/apply-status-map'
    })
} 
//获取审核列表(待审核)
const getCheckListByCode = async (data) => {
    return await fetchData({
        method: 'post',
        url: api + '/workflow/audit/lists/'+data.type_code,
        data
    })
}

//获取审核列表(我发起的审核)
const getApplyCheckListByCode = async (data) => {
    return await fetchData({
        method: 'post',
        url: api + '/workflow/my-apply/lists/'+data.type_code,
        data
    })
}
//根据step_assignee_id 获取审核详情数据
const getCheckDetailByStepId = async (step_assignee_id,type) =>{
    let url = '/workflow/audit/info/'+step_assignee_id;
    if(type == 1) url = '/workflow/my-apply/info/'+step_assignee_id;
    return await fetchData({
        method: 'get',
        url: api + url
    })
}

//审批通过、驳回
const checkOp = async data => {
    let url = api + '/workflow/audit/reject/';
    if(data.type == 1) url = api + '/workflow/audit/allow/';
    return await fetchData({
        method: 'post',
        url: url+data.step_assignee_id,
        data : {
            remark : data.remark.remark
        }
    })
}

module.exports = {
    getwaitOption,
    getApplyOption,
    getCheckListByCode,
    getApplyCheckListByCode,
    getApplyStatusList,
    getCheckDetailByStepId,
    checkOp
    
}