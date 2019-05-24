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
            total_page: '',
            per_page: per_page,
            total: 4,
        }
    }

    const numbers = 100
    for (let i = 0; i < numbers; i++) {
        data.data.push({
            key: i,
            id: 7,
            bill_code: 1111111111 + i,
            apply_code: '15554044878685',
            order_code: 'order-999999999',
            member_type: 1,
            member_type_name: '企业',
            member_id: 6666,
            invoice_body: '梦想加信息',
            invoice_content: 0,
            invoice_content_name: '租金',
            limit_amount: 34692,
            amount: 34672,
            invoice_type: 2,
            invoice_type_name: '普通发票',
            invoice_title_type: 1,
            invoice_title_type_name: '企业',
            invoice_title: '成都尼比鲁科技股份有限公司',
            invoice_mode: 1,
            invoice_mode_name: '纸质',
            taxpayer_number: '123123123',
            invoice_address: '北京市东城区故宫太和殿',
            invoice_tel: '8888888',
            invoice_bank: '北京市东城区工商银行',
            invoice_account: '882882288828282',
            invoice_status: 0,
            invoice_status_name: '未开具',
            handle_type: 1,
            handle_type_name: '社区经理申请',
            city_code: '123',
            building_code: '111',
            location_code: '2222',
            admin_user_id: 7,
            created_at: '2019-04-16 08:48:16',
            admin_user_id_name: '刘今朝'
        })
    }

    return data
}

module.exports = MockData