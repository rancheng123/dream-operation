import Order from '@svg/order.svg'
export default {
    key: '/order',
    text: '订单管理',
    icon: Order,
    children: [{
        text: '办公服务订单管理',
        key: '/order/office/pre',
        path: '/order/office/pre/list'
    }, {
        text: '办公服务变更管理',
        key: '/order/office/altered',
        path: '/order/office/altered/list'
    }]
}
