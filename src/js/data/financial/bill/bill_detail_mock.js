/**
 * 财务管理 账单详情 mock数据
 * hao liang 
 */

 module.exports = {
    code: 10000,
    message: 'success',
    error_data: [],
    data: {
        id: 3,
        bill_code: '155490437031490',
        order_code: '123123123',
        bill_type: 1,
        bill_type_name: '首付账单',
        bill_status: 1,
        bill_status_name: '部分支付',
        bill_issue_status: 0,
        bill_issue_status_name: '未出',
        member_id: 2,
        city_code: '110000000000',
        location_code: 'CNDCDC0010001',
        payment_term: '4-1',
        bill_amount: 135219,
        deposit_amount: 28000,
        goods_amount: 324389,
        notice_at: '2019-03-12 00:00:00',
        pay_end_at: '2019-04-11 16:44:06',
        invoice_type: 2,
        invoice_status: 1,
        start_at: '2019-04-11 16:44:06',
        end_at: '2019-03-17 00:00:00',
        created_at: '2019-04-10 13:52:51',
        member_type: 1,
        order_type: 1,
        order_type_name: null,
        building_code: 'CNDCDC001',
        main_body_id: 111,
        notice_type: 1,
        notice_type_name: '微信',
        bill_email: '123123@123.com',
        account_check_type: -1,
        account_check_type_name: '无对账',
        payments: [
            {
                id: 7,
                created_at: '2019-04-11 07:49:08',
                admin_user_id: 1,
                pay_type: 3,
                pay_type_name: '线下转账',
                pay_amount: 100,
                account: 321312,
                pay_no: '2318312932189',
                comment: ''
            }
        ],
        details: [
            {
                type_name: '办公服务费',
                data: [
                    {
                        amount: 55307,
                        id: 3,
                        money_content: '固定工位办公服务费',
                        money_type: 1,
                        money_type_name: '办公服务费',
                        pay_amount: 55307,
                        pay_at: '2019-04-11 07:54:55',
                        pay_status: 2,
                        pay_status_name: '已支付'
                    }
                ]
            },
        ],
        invoice: {
            id: 1,
            invoice_amount: 98429,
            invoice_logs: [
                {
                    apply_code: '15549043705608',
                    created_at: '2019-04-12 15:04:25',
                    handle_type: 1,
                    handle_type_name: '社区经理申请',
                    handled_by: 1,
                    handled_by_name: '朱梦君',
                    id: 2,
                    invoice_amount: 77429,
                    invoice_code: 'd1d1d1d1',
                    invoice_content: 2,
                    invoice_content_name: '办公服务费',
                    invoice_status: 0,
                    invoice_status_name: '未开具',
                    invoice_type: 2,
                    invoice_type_name: '专用发票',
                }
            ],
            invoice_logs_count: 5,
            invoice_status: 0,
            invoice_status_name: '未开具'
        },
        member_id_name: '韩雪',
        location_name: '天祥广场27',
        building_name: '楼盘姓名',
        city_name: '北京'
    }
 }