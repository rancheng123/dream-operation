
import modifyState from '../../../redux/reducers/modifyState';

import _ from 'lodash';

const returnState = function(){
    return {
        loading : true,
        autoCompleteOpts: {
            input: {
                value: '',
                dataSource: []
            },
            select: {
                id: 'code',
                data: [
                    {
                        value: '商品编号',
                        id: 'code'
                    },
                    {
                        value: '商品名称',
                        id: 'name'
                    }
                ]
            }
        },
        pageOption : {
            "page" : 1,
            "per_page" : 20,
            "search_field":"code",
            "search" : "",
            "city_code" : "",
            "building_code" : "",
            "place_code" : "",
            "business_type" : "",
            "status" : ""
        },
        listData: {
            "total": 0,
            "list": []
        },
        checkedList : [],
        locationCascader: {
    
        }
    }; 
}

export const goods_space_list = (state=returnState() ,action) => {
    switch(action.type){
        case 'goods_space_list':
            if(action.reset) action.data = returnState();
            return modifyState(state,action);

        default:
            return state;
    }
};


