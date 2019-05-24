/**
 * 财务管理
 * hao liang
 */

const MockData = (page, per_page) => {
    let data = {
        code: 10000,
        message: 'success',
        error_data: [],
        data: {
            current_page: page,
            data: [],
            total_page: 1,
            per_page: per_page,
            total: 1
        }
    }

    const numbers = 40
    for (let i = 0; i < numbers; i++) {
        let number = parseInt(Math.random()*4, 10)
        let refund_status_name = '已退款'
        switch (number) {
            case 0:
                refund_status_name = '已退款'
                break;
            case 1:
                refund_status_name = '已部分退款'
                break;
            default:
                refund_status_name = '待退款'
                break;
        }
        
        data.data.push({
            key: i,
            id: i,
            refund_code: '12345',
            order_code: '123223',
            refund_status: number,
            refund_status_name: refund_status_name,
            member_id: 10,
            refund_amount: 100,
            city_code: '110000000000',
            location_code: 'CNDCDC0010001',
            source_type: 1,
            source_type_name: '清租',
            operated_by: 2,
            operated_by_name: '小溪' + i,
            member_id_name: '徐勇',
            location_name: '天祥广场27',
            city_name: '北京'
        })
    }

    return data
}

module.exports = MockData