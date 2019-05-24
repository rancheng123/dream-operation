import modifyState from '../../../redux/reducers/modifyState';

const initState = {
   order_filter_colum: ['1'],
    spinTip: '',
    spinLoading: false,
    status_init_data: [],
    status_init_obj: {}
};




export const orderCommonState = (state=initState ,action) => {
    switch(action.type){
        case 'modify_office_order_common':
            return modifyState(state,action);

        default:
            return state;
    }
};






