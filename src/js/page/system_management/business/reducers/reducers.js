import modifyState from '@/js/redux/reducers/modifyState'

const initState = {
    name: 'name',
    url: 'www.mydreamplus.com',
    owner: '仓库管理员',
    approver: '审批人',
    dateRange: '生效日期',
    type: '仓库类型',
    name2: '任务名',
    url2: '任务描述',
    owner2: '执行人',
    approver2: '责任人',
    dateRange2: '生效日期',
    type2: '任务类型'
}

export const officeForm = (state=initState, action) => {
    switch ( action.type ) {
        case 'officeFormData':
            return modifyState(state, action)
        default:
            return state
    }
}