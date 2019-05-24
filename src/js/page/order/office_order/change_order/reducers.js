import modifyState from '../../../../redux/reducers/modifyState';

const initState = {
    //我方清租
    clear_rent: {
        // 订单终止日
        order_end: null,
        // 终止原因
        close_desc: null,
        // 押金单处理
        deposit_ticket: null,
        // 押金单校验码
        deposit_code: null,
    }
};




export const orderChangeState = (state=initState ,action) => {
    switch(action.type){
        case 'modify_office_order_change':
            return modifyState(state,action);
        case 'clear_office_order_change':
            action.data = initState
            return modifyState(state,action);
        default:
            return state;
    }
};






