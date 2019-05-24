import modifyState from '../../../../redux/reducers/modifyState';

const initStateList = {
    userOrganizationList: [],
    orderList: [],
    otherList: {
        current_page: 1,
        per_page: 10,
        total: 0,
        total_page: 1
    },
    loading: false,
    order_filter_colum: ['order_code', 'status', 'member_name', 'member_type', 'city_names','building_names','start_at','end_at','origin_all_price','created_at', 'deposit_all_price', 'charge_all_price']
};




export const orderListState = (state=initStateList ,action) => {
    switch(action.type){
        case 'order_office_list':
            return modifyState(state,action);
        case 'clear_order_office_list':
            action.data = initStateList
            return modifyState(state,action);
        default:
            return state;
    }
};






