import modifyState from '@/js/redux/reducers/modifyState'

const initState = {
    data: {
        income_code: 'SR09878(收入编号)',
        member_user: '黄晓曦',
        city: '成都',
        location: '东方希望天祥广场',
        source_type: '提前终止周期服务订单',
        source_code: '213123123(来源code)',
        created_at: '2019/03/22(生成时间)',
        receivable_amount: '6020.00(应收)',
        received_amount: '6020.00(实收)',
        data: [
            {
                detail_code: 'KK123456(扣款编号)',
                detail_type: '违约扣款(收入类型)',
                content: '提前终止周期服务订单违约金(收入内容)',
                remark: '提前终止服务，押金不做退还(收入说明)',
                receivable_amount: '6000(应收金额)',
                received_amount: '6000(实收金额)'
            },
            {
                detail_code: 'KK123456(扣款编号)',
                detail_type: '违约扣款(收入类型)',
                content: '提前终止周期服务订单违约金(收入内容)',
                remark: '提前终止服务，押金不做退还(收入说明)',
                receivable_amount: '20(应收金额)',
                received_amount: '20(实收金额)'
            }
        ]
    }
}

export const income_list_data = (state=initState, action) => {
    switch ( action.type ) {
        case 'income_list_data':
            return modifyState(state, action)
        default:
            return state
    }
}