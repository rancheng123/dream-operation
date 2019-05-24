/**
 * 财务管理
 * hao liang
 */

module.exports = {
    code: 10000,
    message: 'success',
    error_data: [],
    data: {
        id: 1,
        code: 'safd',
        deposit_receipt_code: '1234',
        order_code: '1234125',
        deposit_type: 1,
        deposit_type_name: '办公服务押金',
        deposit_status: 1,
        deposit_status_name: '生效中',
        deposit_content: '1234',
        amount: 123,
        city_code: '110000000000',
        location_code: 'CNDCDC0010001',
        created_at: '2019-04-11 12:44:40',
        details: [
            {
                id: 1,
                detail_code: 'YJ0001',
                detail_content: 'asdfasf',
                unit_price: 20,
                number: 2,
                amount: 10
            },
            {
                id: 2,
                detail_code: 'YJ0002',
                detail_content: 'asdfasf',
                unit_price: 20,
                number: 2,
                amount: 10
            }
        ],
        location_name: '天祥广场27',
        city_name: '北京'
    }
}