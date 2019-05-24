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
            deposit_order_code: 234123123 + i + '(押金单code)',
            source: '办公服务订单(押金单来源)',
            order_code: 1231231 + i + '(订单编号)',
            type: '办公服务押金(押金类型)',
            deposit_order_status: deposit_status,
            deposit_content: '服务押金(押金内容)',
            enable_at: '2019/01/11',
            amount: '1700.00(押金金额)',
            city: '北京',
            location: '场地名',

            id: 1,
            code: 'safd' + i,
            deposit_receipt_code: '1234' + i,
            order_code: '1234125' + i,
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