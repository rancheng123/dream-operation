import {orderCommonState} from '../../page/order/office_order/reducers'
import {orderCreateState} from '../../page/order/office_order/order_create/reducers'
import {orderChangeState} from '../../page/order/office_order/change_order/reducers'
import {orderCreateStateFetch} from '@/js/page/order/office_order/order_create/components/step01_reducers'
import {orderDetailState} from '@/js/page/order/office_order/order_detail/reducers'
import {orderDetailCloseState} from '@/js/page/order/office_order/order_close/reducers'
import {orderListState} from '@/js/page/order/office_order/order_list/reducers'

export default {
    orderCommonState,
    orderCreateState,
    orderCreateStateFetch,
    orderChangeState,
    orderListState,
    orderDetailState,
    orderDetailCloseState
}