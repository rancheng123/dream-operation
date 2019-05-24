import modifyState from '../../../redux/reducers/modifyState';

const initState = {
    autoCompleteOpts: {
        input: {
            value: '',
            dataSource: []
        },
        select: {
            id: 'code',
            data: [
                {
                    value: '业务押金品编号',
                    id: 'code'
                },
                {
                    value: '业务押金品名称',
                    id: 'name'
                }
            ]
        }
    },
    pageOption : {
        "page" : 1,
        "limit" : 20,
        "search_field":"code",
        "search" : "",
        "city_code" : "",
        "building_code" : "",
        "palce_code" : "",
        "business_type" : "",
        "status" : ""
    },
    listData: {
        "total": 0,
        "list": []
    },
    checkedList : []
};




export const goods_business_deposit_list = (state=initState ,action) => {
    switch(action.type){
        case 'goods_business_deposit_list':
            return modifyState(state,action);
        default:
            return state;
    }
};


