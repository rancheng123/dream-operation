import moment from "moment";
import {Fragment} from "react";
import React from "react";
import {arrayCnt} from '@/js/asset/common'
import utils from '@/js/asset/index'
import {Icon, message} from "antd";
import MessageError from '@svg/message_error.svg'
import MessageSuccess from '@svg/message_success.svg'
/**
 * 设置数据项
 * @param data
 * @returns {*}
 */
export const filterGoodsListData = (data = []) => {

    return data.map(value => {
        value.single_price = 'single_price' in value ? value.single_price : value.original_sales_price
        value.name = value.name || value.goods_name
        value.business_type = value.business_type || 1
        value.location_code = value.location_code || value.place_code
        value.location_name = value.location_name || value.place_name
        value.pre_price = 'pre_price' in value ? value.pre_price : value.original_sales_price
        value.changed_price = 'changed_price' in value ? value.changed_price : value.original_sales_price
        value.num = value.num || 1
        value.place_item_type = value.place_item_type || (value.category === '工位'? 1: 2)
        value.unit_type = value.place_item_type
        value.total_number= value.total_number || value.sales_price
        value.key = value.key || value.code
        value.station_type = value.station_type || value.type_code
        return value
    })
}
/**
 * 根据月份获取最低年租金涨幅
 * @param month
 * @param arr
 * @returns {*}
 */
export const getMinRentAddUtil = (month, arr) => {
    const obj = {}
    const monArr = arr.map(value => {
        obj[value.rent_month] = value
        return value.rent_month
    }).sort((a, b) => {
        return a - b
    }).filter(value => {
        return value>=month
    })
    if (monArr.length) {
        return obj[monArr[0]]
    }
    return {
        "id":0,
        "rent_month":0,
        "rate":0
    }
}
/**
 * 根据用分获取最底租金涨幅
 * @param month
 * @param arr
 * @returns {*}
 */
export const getMaxRentAddUtil = (month, arr) => {
    const obj = {}
    const monArr = arr.map(value => {
        obj[value.rent_month] = value
        return value.rent_month
    }).sort((a, b) => {
        return b - a
    }).filter(value => {
        return value<=month
    })
    if (monArr.length) {
        return obj[monArr[0]]
    }
    return {
        "id":0,
        "rent_month":0,
        "rate":0
    }

}
/**
 * 获取订单起止日期
 */
export const getStartEndMonth = (start_date, end_date) =>{
    if (!start_date && !end_date) {
        return null
    }
    const diff = end_date.diff(start_date, 'month', true)
    return diff
}
/**
 * 计算计价服务期
 * @param start_date
 * @param end_date
 * @returns {*}
 */
export const getDateText = (start_date, end_date) => {
    if (!start_date || !end_date) {
        return null
    }
    const start_date_format = start_date.format('YYYY年MM月DD日')
    const end_date_format = end_date.format('YYYY年MM月DD日')
    return (
        <Fragment>
            {start_date_format}至{end_date_format}
        </Fragment>
    )
}
/**
 * 统计场地数量
 * @param goods_list_select_data 商品数组
 * @returns {number}
 */
export const getLocationNumber = (goods_list_select_data) => {
    const location_arr = [...new Set(goods_list_select_data.map(value => value.place_code))]
    return location_arr.length
}
/**
 * 统计场地数量
 * @param goods_list_select_data 商品数组
 * @returns {number}
 */
export const getCitiesNumber = (goods_list_select_data) => {
    const cities_arr = [...new Set(goods_list_select_data.map(value => value.city_name))]
    return cities_arr.length
}
/**
 * 统计商品数量
 * @param goods_list_select_data 商品数组
 * @returns {*}
 */
export const getGoodsNumber = (goods_list_select_data) => {
    const this_arr = arrayCnt(goods_list_select_data.map(value => value.category))
    let str = ''
    this_arr.map(value => {
        if (value[0] === '房间'){
            str+=`${value[1]}个房间`
        }
    })
    let station_gu = 0
    let station_liu = 0
    goods_list_select_data.map(value => {
        if ('type_code' in value) {
            if (value['type_code']) {
                station_gu++
            } else {
                station_liu++
            }
        }
    })
    if (station_gu) {
        str+= ` ${station_gu}个固定工位`
    }
    if (station_liu) {
        str+= ` ${station_liu}个流动工位`
    }
    return (
        <Fragment>
            <span>{goods_list_select_data.length}个</span>
            <span className='mxj-error-color'>（共计：{str}）</span>
        </Fragment>
    )
}
/**
 * 返回列表
 */
export const cancelOrder = () => {
    utils.Router.switchRoute('/order/office/list/pre')
}
/**
 * 返回上一步
 *
 *
 */
export const backTo = () => {
    utils.Router.backRoute()
}
/**
 * 设置步骤条
 * @param num
 * @param current
 * @returns {*}
 */
export const setStepsCurrent = (num, current) => {
    if (num>= current) {
        return num
    }
    return current
}
/**
 * 组织类型文案
 * @param type
 * @returns {string}
 */
export const memberTypeText = (type) => {
    switch (type) {
        case 1:
            return '企业'
        case 2:
            return '非企业'
        case 3:
            return '个人'

    }
}
export const timeDiff = (time1) => {
    return Math.ceil(time1.diff(moment(), 'days', true))
}

/**
 * 开始日期，结束日期相差天数
 * @param start 开始日期
 * @param end 结束日期
 * @returns {*}
 */
export const startEndDays =(start, end) => {
    if (!start || !end) {
        return ''
    }
    const end_add = moment(end.format())
    const start_data = moment(start.format('YYYY-MM-DD') + ' 00:00:00')
    const end_data = moment(end_add.add(1, 'days').format('YYYY-MM-DD') + ' 00:00:00')
    return end_data.diff(start_data, 'days', true)
}
/**
 * 开始日期，结束日期相差年份
 * @param start 开始日期
 * @param end 结束日期
 * @returns {*}
 */
export const startEndYears =(start, end) => {
    if (!start || !end) {
        return ''
    }
    const end_add = moment(end.format())
    const start_data = moment(start.format('YYYY-MM-DD') + ' 00:00:00')
    const end_data = moment(end_add.add(1, 'days').format('YYYY-MM-DD') + ' 00:00:00')
    const years = end_data.diff(start_data, 'years', true)
    return years
}
/**
 * 设置默认商品详情信息
 * @param goods
 * @returns {Uint8Array | BigInt64Array | *[] | Float64Array | Int8Array | Float32Array | Int32Array | Uint32Array | Uint8ClampedArray | BigUint64Array | Int16Array | Uint16Array}
 */
export const setDefaultGoods = (goods, callback) => {
    return goods.map(value => {
        // addGoodsItemSelectRowKeys.push(value.code)
        value.key = value.code
        value.category = value.place_item_type === 1?'工位':'房间'
        value.goods_name = value.name
        value.pre_price = value.single_price
        value.sales_price = value.single_price
        value.type_code = value.station_type
        value.place_name = value.location_name
        value.total_number = value.single_price * value.num
        value.new_price_new = value.changed_price * value.num
        callback(value)
        return value
    })
}

export const showMessageClean =(type, info) => {
    message.open({
        content: info,
        icon: <Icon component={type === 'success'? MessageSuccess: MessageError}/>
    } );
}