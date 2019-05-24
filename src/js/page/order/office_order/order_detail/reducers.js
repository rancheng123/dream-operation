import modifyState from '../../../../redux/reducers/modifyState';

const initStateDetail = {
    detail: null
};




export const orderDetailState = (state=initStateDetail ,action) => {
    switch(action.type){
        case 'order_office_detail':
            return modifyState(state,action);
        case 'clear_order_office_detail':
            action.data = initStateDetail
            return modifyState(state,action);
        default:
            return state;
    }
};






