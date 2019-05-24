import modifyState from '../../../redux/reducers/modifyState';

export const initState = {
    //业主名称
    name: '',
    //业主类型
    type_id: '',
    checkedList: [],
    listData: {
        "data": [],
    }
};




export const space_owner_list = (state=initState ,action) => {
    switch(action.type){
        case 'space_owner_list':
            return modifyState(state,action);
        default:
            return state;
    }
};






