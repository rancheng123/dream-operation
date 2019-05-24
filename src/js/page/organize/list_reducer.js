import modifyState from '../../redux/reducers/modifyState';

const returnState = function(){
    return {
        loading : true,
        autoCompleteOpts: {
            input: {
                value: '',
                dataSource: []
            },
            select: {
                id: 'id',
                data: [
                    {
                        value: '组织编号',
                        id: 'id'
                    },
                    {
                        value: '组织名称',
                        id: 'name'
                    }
                ]
            }
        },
        pageOption : {
            page : 1,
            per_page : 20,
            type_id : "",
            name : ""
        },
        organizeTypeList : {
            org_type : [],
            identity_type : [],
            from_type : []
        },
        listData: {
            total : 0,
            total_page : 0,
            current_page : 1,
            data : []
        },
        checkedList : []
    };
}

export const organize_list = (state=returnState() ,action) => {
    switch(action.type){
        case 'organize_list':
        if(action.reset) action.data = returnState();
            return modifyState(state,action);
        default:
            return state;
    }
};


