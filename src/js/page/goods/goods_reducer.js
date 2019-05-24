import modifyState from '../../redux/reducers/modifyState';

const initState = {
    detailData : {
    }
};




export const goods_detail = (state=initState ,action) => {
    switch(action.type){
        case 'goods_detail':
            return modifyState(state,action);
        default:
            return state;
    }
};


