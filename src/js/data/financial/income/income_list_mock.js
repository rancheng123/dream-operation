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
            data: [],
            current_page: page,
            total_page: 4,
            per_page: per_page,
            total: 40
        }
    }

    const numbers = 40
    for (let i = 0; i < numbers; i++) {
        data.data.push({
            key: i,
            id: 1,
            income_code: '77777',
            source_code: 'abcdeg',
            source_type: 1,
            source_type_name: '提前终止办公服务合同',
            member_id: 2,
            city_code: '110000000000',
            location_code: 'CNDCDC0010001',
            receivable_amount: 0,
            received_amount: 0,
            created_at: '2019-04-09 11:05:35',
            member_id_name: '韩雪',
            location_name: '天祥广场27',
            city_name: '北京'
        })
    }

    return data
}

module.exports = MockData