import modifyState from '../../../redux/reducers/modifyState';

const generateInitState = ()=>{
    return {
        autoCompleteOpts: {
            select: 'name',
            input: '',
            dataSource: []
        },

        locationCascader: {

        },



        cities: [],


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
    }
}




export const space_build_list = (state=generateInitState() ,action) => {
    switch(action.type){
        case 'space_build_list':
            if(action.reset) action.data = generateInitState();
            return modifyState(state,action);
        default:
            return state;
    }
};






