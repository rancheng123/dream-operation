import modifyState from '@/js/redux/reducers/modifyState';

export const settingsRedu = {
    addGoodsItemSelectRowKeys: [],
    canEditTableSelectRowKeys: [],
    orderOfficeSetting: null,
    // 押金押付
    paySettingsArr: [],

};




export const orderCreateStateFetch = (state=settingsRedu ,action) => {
    switch(action.type){
        case 'order_create_step_fetch':
            return modifyState(state,action);
        case 'clear_order_office_fetch':
            action.data = settingsRedu
            return modifyState(state,action);
        default:
            return state;
    }
};






