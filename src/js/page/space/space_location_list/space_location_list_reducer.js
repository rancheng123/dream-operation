import modifyState from '../../../redux/reducers/modifyState';

export const initState = {
    autoCompleteOpts: {
        input: '',
        select: 'name'
    },

    locationCascader: {

    },





    cities: [],


    "code":"",
    "name":"",

    page: 1,
    per_page: 10,


    checkedList: [],
    listData: {
        //当前页
        "page": 1,
        //总页数
        "total_page": 1,
        //总条数
        "total": 0,
        //每页数量
        "per_page": 10,
        "data": [

        ],
    }
};




export const space_location_list = (state=initState ,action) => {
    switch(action.type){
        case 'space_location_list':
            return modifyState(state,action);
        default:
            return state;
    }
};






