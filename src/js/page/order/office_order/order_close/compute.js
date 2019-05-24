import { getOrderOfficeCompute} from '@api/order'

export const computeOrder = async (detail, goods, reduce_at, dispatch, start_date) => {
    const body = {
        contract_book_code: detail.contract_book_code,
        tax_rate: detail.tax_rate,
        free_days: detail.free_days,
        free_type: detail.free_type,
        start_date: start_date,
        end_date: detail.end_date,
        deposit_is_other: detail.deposit_is_other,
        deposit_payment: detail.deposit_payment,
        discount_rate: detail.discount_rate,
        rent_discount_rate: detail.rent_discount_rate,
        inc_rate: detail.inc_rate,
        is_intermediary: detail.is_intermediary,
        galleryful_scale: detail.galleryful_scale,
        memo: detail.memo,
        reduce_at,
        goods,
    }
    getOrderOfficeCompute(body).then(res => {
        if (res.code = 10000) {
            dispatch({
                type: 'order_office_close',
                data: {
                    compute_value: res.data,
                }
            })
            Promise.resolve(true)
        }
        Promise.reject()
    })
}