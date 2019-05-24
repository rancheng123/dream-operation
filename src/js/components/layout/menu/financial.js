import Financial from '@svg/financial.svg'
//import Goods from '@svg/goods.svg'

export default {
    key: '/financial',
    text: '财务管理',
    icon: Financial,
    children: [
        {
            // key: '/financial/bill',
            key: '/financial/bill',
            path: '/financial/bill/order',
            text: '账单管理',
            // children: [
            //     {
            //         path: '/financial/bill/order',
            //         key: '/financial/bill/order',
            //         text: '办公服务订单账单管理'
            //     }
            // ]
        },
        {
            // key: '/financial/income',
            key: '/financial/income',
            text: '其他收入管理',
            path: '/financial/income/list',
            // children: [
            //     {
            //         path: '/financial/income/list',
            //         key: '/financial/income/list',
            //         text: '其他收入(扣款)管理'
            //     }
            // ]
        },
        {
            // key: '/financial/invoice',
            key: '/financial/invoice',
            text: '发票管理',
            path: '/financial/invoice/list',
            // children: [
            //     {
            //         path: '/financial/invoice/list',
            //         key: '/financial/invoice/list',
            //         text: '发票申请列表'
            //     }
            // ]
        },
        {
            // key: '/financial/refund',
            path: '/financial/refund/list',
            key: '/financial/refund',
            text: '退款管理',
            // children: [
            //     {
            //         path: '/financial/refund/list',
            //         key: '/financial/refund/list',
            //         text: '退款申请列表'
            //     }
            // ]
        },
        {
            // key: '/financial/deposit',
            // text: '押金管理',
            path: '/financial/deposit/record/list',
            key: '/financial/deposit/record',
            text: '押金记录列表',
            // children: [
            //     {
            //         path: '/financial/deposit/record/list',
            //         key: '/financial/deposit/record/list',
            //         text: '押金记录列表'
            //     },
            //     {
            //         path: '/financial/deposit/form/list',
            //         key: '/financial/deposit/form/list',
            //         text: '押金单列表'
            //     }
            // ]
        },
        {
            path: '/financial/deposit/form/list',
            key: '/financial/deposit/form',
            text: '押金单列表'
        }
    ]
}