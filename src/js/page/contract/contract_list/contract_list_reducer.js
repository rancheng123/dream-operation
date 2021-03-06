import modifyState from '../../../redux/reducers/modifyState';

const initState = {

    autoCompleteOpts: {
        input: {
            value: '333',
            dataSource: []
        },
        select: {
            id: '1',
            data: [
                {
                    value: '场地名称',
                    id: '1'
                },
                {
                    value: '场地编号',
                    id: '2'
                },
                {
                    value: '楼盘名称',
                    id: '3'
                }
            ]
        }
    },

    //业主名称
    name: '',
    //业主类型
    type_id: '',
    checkedList: [],
    listData: {

        //当前页
        "current_page": 1,
        //总页数
        "total_page": 1,
        //总条数
        "total": 0,
        //每页数量
        "per_page": 10,
        "data": [],
    },

    cities: []
};




export const contract_list = (state=initState ,action) => {
    switch(action.type){
        case 'contract_list':
            return modifyState(state,action);
        default:
            return state;
    }
};






