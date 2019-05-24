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
        refund_code: '12345',
        order_code: '123223',
        refund_status: 1,
        refund_status_name: '待退款',
        member_id: 10,
        refund_amount: 100,
        city_code: '110000000000',
        location_code: 'CNDCDC0010001',
        source_type: 1,
        source_type_name: '清租',
        operated_by: 2,
        remaining_amount: '-59282',
        created_at: '2019-04-10 14:57:25',
        details: [
            {
                id: 1,
                detail_code: 'sdfsdf',
                detail_type: 1,
                detail_type_name: '押金退款',
                detail_content: 'sdfsdf',
                detail_status: 1,
                detail_status_name: '待退款',
                detail_amount: 1231,
                pay_amount: 1231
            },
            {
                id: 2,
                detail_code: 'sdfsdfg',
                detail_type: 1,
                detail_type_name: '押金退款',
                detail_content: 'sdfsdf',
                detail_status: 1,
                detail_status_name: '待退款',
                detail_amount: '1234',
                pay_amount: '1234'
            }
        ],
        payments: [
            '11123',
            '11122'
        ],
        member_id_name: '徐勇',
        location_name: '天祥广场27',
        city_name: '北京'
    }
}