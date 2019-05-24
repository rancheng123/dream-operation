// office_service_order_bills 页面的假数据
import { parse } from 'url'

const numbers = 100

let tableListDataSource = []

for (let i = 0; i < numbers; i++) {
    tableListDataSource.push({
        key: i,
        bill_number: '777777',
        order_number: 2019032600000 + i,
        bill_type: i % 6 ? '首期账单' : '周期账单',
        bill_status: i % 2 ? '待支付' : '已支付',
        build_status: i % 4 ? '已出' : '未出',
        user_name: 'test name',
        city: '北京',
        space: '朝阳MEN',
        periods: '12-1',
        money: '18000',
        notice_data: '2018-03-26',
        last_date: '2018-05-01',
        invoice_type: i % 3 ? '普票' : '专票',
        invoice_status: '20000'
    })
}

function getRule(req, res, u) {
    let url = u
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url
    }

    const params = parse(url, true).query

    let dataSource = tableListDataSource

    if (params.sorter) {
        const s = params.sorter.split('_');
        dataSource = dataSource.sort((prev, next) => {
            if (s[1] === 'descend') {
                return next[s[0]] - prev[s[0]]
            }
            return prev[s[0]] - next[s[0]]
        })
    }

    if (params.status) {
        const status = params.status.split(',')
        let filterDataSource = []
        status.forEach(s => {
            filterDataSource = filterDataSource.concat(
                dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
            )
        })
        dataSource = filterDataSource
    }
    
    if (params.name) {
        dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1)
    }
    
    let pageSize = 10
    if (params.pageSize) {
        pageSize = params.pageSize * 1
    }
    
    const result = {
        list: dataSource,
        pagination: {
            total: dataSource.length,
            pageSize,
            current: parseInt(params.currentPage, 10) || 1,
        }
    }
    
    return res.json(result)
}

export default {
    'GET /api/rule': getRule
}