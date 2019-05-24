import modifyState from '../../../../redux/reducers/modifyState';

const initStateClose = {
    detail: null,
    current: 0,
    // 第一步第一个模块title
    step1_user_title: '',
    // 变更原因 title
    reason_title: null,
    // 变更方，及其type
    change_user: {
        type: null,
        title: null
    },
    // 是否校验过押金单
    is_check_deposit: false,
    // 是否校验成功
    check_deposit: false,
    // 押金单详情
    deposit_detail: null,
    create_value: {
        // 变更原因
        alter_reason: null,
        memo: null,
        // 是否拥有押金单
        recycle_deposit_type: 1,
        // 押金单校验码
        recycle_deposit_verify: null,
        refunds: [],
        deductions: [],
        deposit_recept_id: null
    },
    modal_type: 'type',
    // 押金剩余金额
    deposite_current: 0,
    // 租金剩余金额
    charge_current: 0,
    // 扣款 弹窗
    modal_form: {
        "entry_type": 1,
        "entry_type_content": null,
        "price": 0,
        "remark": null,
        "number": 1
    },
    // 获取退款和扣款的下拉选项
    deduct_list: {
        deduct: [],
        refund: []
    },
    entry_type_content: [],
    editFormValue: null,
    // 减租，扩租开始生效日期
    time_change: {

    },
    compute_value: null,
    success_step_1: false,
    success_step_2: false,
    success_step_3: false,
    delete_goods: [],
    order_change_content: null,
    // 校验押金单地址
    deposit_data: {},
    sucess_content: ''
};




export const orderDetailCloseState = (state=initStateClose ,action) => {
    switch(action.type){
        case 'order_office_close':
            return modifyState(state,action);
        case 'clear_order_office_close':
            initStateClose.create_value = {
                // 变更原因
                alter_reason: null,
                memo: null,
                // 是否拥有押金单
                recycle_deposit_type: 1,
                // 押金单校验码
                recycle_deposit_verify: null,
                refunds: [],
                deductions: [],
                deposit_recept_id: null
            }
            action.data = initStateClose
            return modifyState(state,action);

        default:
            return state;
    }
};






