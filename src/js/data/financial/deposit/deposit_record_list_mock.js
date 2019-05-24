/**
 * 财务管理
 * hao liang
 */

const MockData = () => {
    let data = {
        code: 10000,
        message: 'success',
        error_data: [],
        data: {
            current_page: data.page,
            data: [],
            total_page: 1,
            per_page: data.per_page,
            total: 1
        }
    }

    const numbers = 100
    for (let i = 0; i < numbers; i++) {
        let number = parseInt(Math.random()*4, 10)
        let deposit_status = '生效中'
        switch (number) {
            case 0:
            deposit_status = '未生效'
                break;
            case 1:
            deposit_status = '未生效'
                break;
            default:
            deposit_status = '生效中'
                break;
        }
        
        data.data.push({
            key: i,
            id: i,
            code: 'CD0001FJ' + 10000 + i + '(押金记录code)',
            deposit_receipt_code: '234123123(押金单code)',
            order_code: 1231231 + i + '(订单编号)',
            deposit_type: 1,
            deposit_type_name: '办公服务押金',
            deposit_status: 1,
            deposit_status_name: deposit_status,
            deposit_content: '1234',
            amount: 123,
            city_code: '110000000000',
            location_code: 'CNDCDC0010001',
            created_at: '2019-04-11 12:44:40',
            location_name: '天祥广场27',
            city_name: '北京'
        })
    }

    return data
}

module.exports = MockData