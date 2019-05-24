/**
 * 财务管理 申请开票 mock 数据
 * hao liang
 */

module.exports = {
    code: 10000,
    message: 'success',
    error_data: [],
    data: {
        id: 1,
        bill_info_id: 3,
        apply_code: '15549043705608',
        order_code: '123123123',
        member_type: 1,
        member_id: '6666',
        invoice_body: '梦想加信息',
        invoice_content: 2,
        invoice_content_name: '办公服务费',
        amount: 135219,
        limit_amount: 7000,
        apply_amount: 7000,
        invoice_type: 2,
        invoice_type_name: '专用发票',
        invoice_title_type: 1,
        invoice_title_type_name: '企业',
        invoice_title: '成都尼比鲁科技股份有限公司',
        invoice_mode: 2,
        invoice_mode_name: '电子',
        taxpayer_number: '123123123',
        invoice_address: '北京市东城区故宫太和殿',
        invoice_tel: '8888888',
        invoice_bank: '北京市东城区工商银行',
        invoice_account: '882882288828282',
        invoice_status: 0,
        handle_type: 1,
        status: 2,
        status_name: '已开具',
        city_code: '123',
        building_code: '111',
        location_code: '2222',
        admin_user_id: null,
        apply_at: '2019-04-10 21:52:52',
        handle_at: null,
        created_at: '2019-04-10 13:52:52',
        merge_invoice: [
            {
                order_code: '123123123',
                limit_amount: 7000
            },
            {
                order_code: '123123123',
                limit_amount: 7000
            }
        ],
        invoice_log: [
            {
                id: 2,
                bill_info_invoice_id: 1,
                admin_user_id: 1,
                invoice_amount: 77429,
                invoice_code: 'd1d1d1d1',
                created_at: '2019-04-12 15:04:25'
            }
        ]
    }
}