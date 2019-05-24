import modifyState from '../../redux/reducers/modifyState';

const initState = {
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




export const antiDome = (state=initState ,action) => {
    switch(action.type){
        case 'antiDomeData':
            return modifyState(state,action);

        default:
            return state;
    }
};






