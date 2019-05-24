import modifyState from '../../redux/reducers/modifyState';

const initState = {
    title: '333',
    buttonOpts: {
        loading: false
    },
    radioOpts: {
        value: 'large',
        a: 2
    },
    autoCompleteOpts: {
        dataSource: []
    }
};




export const home_a = (state=initState ,action) => {
    switch(action.type){
        case 'modifyHomeData':
            return modifyState(state,action);

        default:
            return state;
    }
};






