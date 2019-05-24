// 合同管理列表 假数据
/**
 * hao liang
 */

const MockData = (page, per_page) => {
    let data = {
        code: 10000,
        message: 'success',
        error_data: [],
        data: {
            list: [],
            current_page: page,
            per_page: per_page,
            total_page: 4,
            total: 40
        }
    }

    const numbers = 100
    for (let i = 0; i < numbers; i++) {
        let number = parseInt(Math.random()*4, 10)
        let status_code_name = '待签署'
        switch (number) {
            case 0:
                status_code_name = '已生效'
                break;
            case 1:
                status_code_name = '已到期'
                break;
            case 2:
                status_code_name = '已生成'
                break;
            case 3:
                status_code_name = '待签署'
                break;
            default:
                status_code_name = '待上传'
                break;
        }
    
        data.data.push({
            key: i,
            code: 'MXJFW' + 10000000 + i,
            created_at: '2019-04-17 21:33:38',
            created_by: 1,
            deleted_at: null,
            id: 2,
            place_code: 'CNBJBJ0160001',
            print_count: 0,
            root_code: 'MXJFW000000002',
            sign_part: '北京梦想加悦港科技有限责任公司',
            source_code: 'B0119041721654224',
            source_type_code: 1,
            source_type_str: '办公服务订单',
            status_code: 2,
            status_str: status_code_name,
            tax_rate: 6,
            template_code: 'MXJFW',
            template_name: '梦想加办公服务协议',
            type_code: 1,
            type_str: '办公服务订单协议',
            updated_at: '2019-04-17 21:33:38',
        })
    }

    return data
}

module.exports = MockData