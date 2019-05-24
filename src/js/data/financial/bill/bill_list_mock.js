/**
 * 财务管理 账单mock数据
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
            per_page: per_page,
            total: 5,
            total_page: 1
        }
    }

    // 100条假数据
    const numbers = 100
    for (let i = 0; i < numbers; i++) {
        let number1 = parseInt(Math.random()*4, 10)
        let warning_status = 0
        switch (number1) {
            case 0:
                warning_status = 0
                break;
            case 1:
                warning_status = 1
                break;
            default:
                warning_status = 2
                break;
        }
    
        let number = parseInt(10*Math.random())
        let bill_status_name = '待支付'
        switch (number) {
            case 0:
                bill_status_name = '待支付'
                break;
            case 1:
                bill_status_name = '部分支付'
                break;
            case 2:
                bill_status_name = '已支付'
                break;
            case 3:
                bill_status_name = '对账完成'
                break;
            case 4:
                bill_status_name = '冻结中'
                break;
            case 5:
                bill_status_name = '已关闭'
                break;
            case 6:
                bill_status_name = '全部'
                break;
            case 7:
                bill_status_name = '已作废'
                break;
            default:
                bill_status_name = '已取消'
                break;
        }
    
        data.data.push({
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
            member_id_name: '韩雪',
            location_name: '天祥广场27',
            city_name: '北京'
        })
    }

    return data
}

module.exports = MockData