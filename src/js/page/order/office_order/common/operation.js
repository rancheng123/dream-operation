import {getOrderOfficeSingleOperation, getOrderOfficeInitStatusData} from '@api/order'

export const check_operation = async (code, type)=> {
    const result = await getOrderOfficeSingleOperation({
        order_codes: [code]
    })
    if (result.code === 10000) {
        const result_ope = result.data[code]
        return result_ope[type]
    }
    return false
}
export const setInitStatus = async () => {
    const stutas = await getOrderOfficeInitStatusData()
    if (stutas.code === 10000) {
        const status_map = stutas.data.status_map
        const status_arr = []
        for (let i in status_map) {
            status_arr.push({
                value: Number(i),
                text: status_map[i]
            })
        }
        return {
            status_init_obj: status_map,
            status_init_data: status_arr
        }
    }
    return null
}