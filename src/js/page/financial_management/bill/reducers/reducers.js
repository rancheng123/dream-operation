import modifyState from '@/js/redux/reducers/modifyState'

const initState = {
    codeData: ''
}

export const office_order_bills_list = (state=initState, action) => {
    switch ( action.type ) {
        case 'office_order_bills_list':
            return modifyState(state, action)
        default:
            return state
    }
}