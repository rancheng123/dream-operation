import modifyState from '../../../../redux/reducers/modifyState';

export const initState = {

    // 组织类型
    member_type: 0,
    // 组织名称
    member_id: null,
    //身份证号
    id_cord: '1111111',
    // 订单城市
    order_city: 'beijing',
    // 订单商品选中数据
    selectTableCheckData: [],
    selectTableCheckNumber: 0,
    selectedRowKeys: [],
    //订单开始日
    start_date: null,
    //订单截止日
    end_date: null,
    // 订单免租日期
    free_start_data: null,
    // 订单免租结束日期
    free_end_data: null,
    // 订单实际开始日期
    actual_start_data: null,
    // 订单实际结束日期
    actual_end_data: null,
    //城市选择
    city:'0',
    //场地选择
    site: '0',
    //服务时间
    service_time: '',
    //免租类型
    free_type: 1,
    //免租时长
    free_days: 0,
    //是否通过中介
    is_intermediary: null,
    //成交人数
    galleryful_scale: null,
    //付款方式
    deposit_payment: null,
    //押付方式
    deposit_payment_all: [],
    // 选择其他押付方式-押
    deposit_payment_ya: 1,
    // 选择其他押付方式-付
    deposit_payment_fu: 1,
    //选择其他押付方式-日
    deposit_payment_ri: null,
    //实际涨幅
    inc_rate: null,
    //积分
    present_credits: 30,
    default_present_credits: 30,
    //打印纸张数量
    present_prints: 100,
    default_present_prints: 100,
    //本单实际付款折扣
    discount_rate: 100,
    //税率
    tax_rate: 0,
    // 第三步数据集合
    pay_invoice: null,
    //账单通知方式
    notice_type: [],
    // 账单接收邮箱
    bill_email: '',
    //支付方式
    pay_type: [1,2,3],
    //发票类型
    invoice_type: 0,
    //发票抬头
    invoice_title: '',
    //纳税人识别号
    taxpayer_number: '',
    //发票地址
    invoice_address: '',
    // 发票电话
    invoice_tel: '',
    //发票开户行
    invoice_pay: '',
    //发票账号
    invoice_account: '',
    invoice_bank: '',
    // 合同类型
    contract_book_code: null,
    //备注
    memo: null,
    // 操作人
    operator_id: null,
    // 商品

    // 商品选中数据 选择服务商品弹窗内选中的数据，不能当成创建页，数据展示，数据分析的源头
    goods_list_select: [],
    // 创建页商品数据
    goods_list_select_data: [],
    summary_data: {
        // 原单价汇总
        pre_unit_price: null,
        //原总价汇总
        pre_total_price: null,
        // 修改后单价汇总
        change_unit_price: null,
        // 修改后总价汇总
        change_total_price: null,

    },
    // 组织名称搜索数据
    member_user_data: [],
    member_user_info: null,
    goods_list_redux: {
        list: [],
        current_page: 1,
        total: 0,
        page_size: 10
    },
    // 最低租金付款折扣
    min_discount: 100,
    // 最低年涨幅
    year_rent_rate: null,
    // 实现报价基础上浮比例
    basic_rent_rate: null,
    orderOfficeCompute: null,
    check_sale_rule: {},
    check_sale_rule_model_show: false,
    // 订单创建审核状态
    audit_pass: 1,
    alter_reason: '',
    // 合同订单管理
    contract_order: [],
    // 页面全局loading 提示标题
    tip: '',
    // 页面全局loading 开关
    loading: false,
    // 步骤条步数
    current: 0,
    // 续租准备的字段
    renewalValue: null,
    renewal_rent_rate: null,
    disableSelectRow: []
};




export const orderCreateState = (state=initState ,action) => {
    switch(action.type){
        case 'modify_office_order_create':
            return modifyState(state,action);
        case 'clear_order_office_create':
            action.data = initState
            return modifyState(state,action);
        default:
            return state;
    }
};






