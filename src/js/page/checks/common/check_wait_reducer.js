import modifyState from '../../../redux/reducers/modifyState';

const returnState = function(){
    return {
    sellteDetailData : {
            sales_rules : {
                free_rent : {},
                rent_amount_discount : {}
            },
            multi_info : {
                office_service_order_setting : {}
            },
            finance_info : {
                compute_cost : {
                    other : [],
                    deposit : []
                }
            },
            member_owner : {},
            //扣款
            deductions : [],
            //退款
            refunds : [],
            bill_list : {},
            goods : [],
            location_floors : {},
            //历史记录
            audit_history : [],
            //原订单
            old_order : {
                goods : [],
                sales_rules : {
                    
                },
                bill_list : {},
                member_owner : {}
            }
        }
    }
};




export const checks_wait = (state=returnState() ,action) => {
    switch(action.type){
        case 'checks_wait':
            if(action.reset) action.data = returnState();
            return modifyState(state,action);
        default:
            return state;
    }
};


