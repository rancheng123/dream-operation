/**
 * 账单管理
 * hao liang
 */

module.exports = {
    code: 10000,
    message: 'success',
    error_data: [],
    data: {
        id: 1,
        deposit_receipt_code: '1234',
        source_type: 1,
        source_type_name: '办公服务订单',
        order_code: '1234125',
        deposit_receipt_status: 1,
        deposit_receipt_status_name: '生效中',
        enabled_at: '2019-04-12 14:51:24',
        amount: 100,
        city_code: '110000000000',
        location_code: 'CNDCDC0010001',
        member_id: 1,
        main_body_id: 1,
        print_count: 2,
        image_url: 'www.baidu.com',
        details: [
            {
                id: 1,
                detail_code: 'YJ0001',
                detail_content: 'asdfasf',
                unit_price: 20,
                number: 2,
                amount: 10
            }
        ],
        print_logs: [
            {
                id: 1,
                printed_by: 2,
                check_code: 'YYYYYY',
                check_status: 1,
                check_status_name: '生效中',
                created_at: '2019-04-12 06:24:53'
            }
        ],
        created_at: '2019-04-11 12:46:31',
        location_name: '天祥广场27',
        city_name: '北京'
    }
}