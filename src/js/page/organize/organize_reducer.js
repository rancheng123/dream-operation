import modifyState from '../../redux/reducers/modifyState';

const initState = {
    detailData : {
    },
    params : {
        id : '',
        type_id : 1,
        identity_type : 1,
        picture_urls : {
            front : '',
            back : '',
            logo : ''
        }
    },
    organizeTypeList : {
        org_type : [],
        identity_type : [],
        from_type : []
    },
    ownerList : {
        pageOption : {
            page : 1,
            per_page : 15,
            user_id : "",
            keywords : ""
        },
        data : []
    }
};




export const organize_detail = (state=initState ,action) => {
    switch(action.type){
        case 'organize_detail':
            return modifyState(state,action);
        default:
            return state;
    }
};


