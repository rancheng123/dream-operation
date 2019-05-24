import modifyState from '../../../redux/reducers/modifyState';

const returnState = function(){
    return {
        loading : true,
        autoCompleteOpts: {
            input: {
                value: '',
                dataSource: []
            },
            select_order: {
                id: 'code',
                data: [
                    {
                        value: '申请编号',
                        id: 'code'
                    },
                    {
                        value: '订单编号',
                        id: 'request_code'
                    },
                    {
                        value: '用户名称',
                        id: 'member_name'
                    },
                    {
                        value: '申请人',
                        id: 'applicant_by_name'
                    }
                ]
            }
        },
        pageOption : {
            page : 1,
            per_page : 20,
            type_code : '',
            key_type : 'code',
            key_value : '',
            location_code : '',
            build_code : '',
            city_code : '',
            applicant_at_start : '',
            applicant_at_end : ''
        },
        listData: {
            total : 0,
            data : []
        },
        applyStatusList : [],
        checkedList : [],
        locationCascader: {
    
        }
    };
}


export const checks_wait_list = (state=returnState() ,action) => {
    switch(action.type){
        case 'checks_wait_list':
        if(action.reset) action.data = returnState();
            return modifyState(state,action);
        default:
            return state;
    }
};


