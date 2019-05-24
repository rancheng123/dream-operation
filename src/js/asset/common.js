import moment from 'moment'
import React, {Fragment} from "react";
import {Icon, message} from 'antd'

export const cityBuildingLocationInit = (data) => {
    const citiesData = data.cities
    if (!citiesData) {
        return []
    }
    const buildings = data.buildings
    const locations = data.locations
    const location_data = {}
    const Buildings_data = {}
    if (buildings){
        if (locations){
            locations.forEach(value => {
                if(!location_data[value.building_code]){
                    location_data[value.building_code] = []
                }
                location_data[value.building_code].push(value)
            })
        }
        buildings.forEach(value => {
            if (!Buildings_data[value.city_code]) {
                Buildings_data[value.city_code] = []
            }
            if (location_data[value.building_code]) {
                value['locations'] = location_data[value.building_code]
            }
            Buildings_data[value.city_code].push(value)
        })
    }
    citiesData.forEach(value => {
        if(Buildings_data[value.city_code]) {
            value.buildings = Buildings_data[value.city_code]
        }
    })
    return citiesData
}
/**
 * 数组差集
 * @param arr1
 * @param arr2
 */
export const subSet = (arr1, arr2) => {
    var set1 = new Set(arr1);
    var set2 = new Set(arr2);

    var subset = [];

    for (let item of set1) {
        if (!set2.has(item)) {
            subset.push(item);
        }
    }

    return subset;
}
/**
 * 数组差集
 * @param arr1
 * @param arr2
 */
export const removeArr = (arr1, val) => {
    var index = arr1.indexOf(val);
    if (index > -1) {
        arr1.splice(index, 1);
    }
    return arr1
}
/**
 * 数组去重并统计数量
 * @param arr
 * @returns {Array}
 */
export const arrayCnt = (arr) => {
    var newArr = [];
    //使用set进行数组去重
    newArr = [...new Set(arr)];
    var newarr2 = new Array(newArr.length);
    for(var t = 0; t < newarr2.length; t++) {
        newarr2[t] = 0;
    }
    for(var p = 0; p < newArr.length; p++) {
        for(var j = 0; j < arr.length; j++) {
            if(newArr[p] == arr[j]) {
                newarr2[p]++;
            }
        }
    }
    let this_arr = []
    for(var m = 0; m < newArr.length; m++) {
        this_arr.push([newArr[m], newarr2[m]])
    }
    return this_arr
}
/**
 * 日期格式化
 * @param e
 * @returns {*|string}
 */
export const timeFormat = (e) => {
    return e.format('YYYY-MM-DD')
}
/**
 * 订单状态吗
 * @param value
 * @returns {string}
 */
export const statusText = (value) => {
    switch (value) {
        case 1:
            return '已下单'
        case 2:
            return '进行中'
        case 3:
            return '已完结'
        case 4:
            return '已关闭'
        case 5:
            return '已取消'
        case 6:
            return '下单审核中'
        case 7:
            return '变更审核中'
        case 8:
            return '已变更'
        case 9:
            return '终止审核中'
        case 10:
            return '审核已经终止'
        case 11:
            return '清租审核中'
        case 12:
            return '已清租'
        case 13:
            return '结算审核中'
        case 14:
            return '已完成结算'
        case 15:
            return '续租审核中'
        case 16:
            return '已续租'
        case 17:
            return '变更生效中'
    }
}
export const statusColorClassName = (status) => {
    if ([1,3, 8, 12, 16, 14, 10].indexOf(status)>-1) {
        return 'mxj-color-success'
    }
    if ([6, 15, 7, 9, 11, 13, 2].indexOf(status)>-1) {
        return 'mxj-color-warn'
    }
    if ([4, 5].indexOf(status)>-1) {
        return 'mxj-color-error'
    }
    return ''
}
/**
 * 统计商品数量
 * @param goods_list_select_data 商品数组
 * @returns {*}
 */
export const getGoodsNumberCommon = (goods) => {
    const this_arr = arrayCnt(goods.map(value => value.place_item_type))
    let str = []
    this_arr.map(value => {
        if (value[0] === 2){
            str.push(`房间${value[1]}个`)
        }
    })
    let station_gu = 0
    let station_liu = 0
    goods.map(value => {
        if ('station_type' in value) {
            if (value['station_type'] === 1) {
                station_gu++
            } else {
                station_liu++
            }
        }
    })
    if (station_gu) {
        str.push( `固定工位${station_gu}个`)
    }
    if (station_liu) {
        str.push(` 流动工位${station_gu}个`)
    }
    return str.join(' ')
}
/**
 * 返回数组
 * @param goods
 * @returns {string}
 */
export const getGoodsNumberCommonArr = (goods) => {
    const this_arr = arrayCnt(goods.map(value => value.place_item_type))
    let str = []
    return this_arr.map(value => {
        return {
            place_item_type: value[0],
            number: value[1]
        }
    })
}
export const getGoodsNumberByNameArr = (goods_list_select_data) => {
    const this_arr = arrayCnt(goods_list_select_data.map(value => value.category))
    let str = ''
    return this_arr.map(value => {
        return {
            place_item_type: value[0]==='房间'? 2: 1,
            number: value[1]
        }
    })
}
/**
 * 状态转换
 * @param type
 * @returns {string}
 */
export const getPageTypeChange = (type) => {
    switch (type) {
        case 'terminate-auditing':
            return 'terminate';
        case 'cleared':
            return 'clear';
        case 'account-auditing':
            return 'account';
        case 'add':
            return 'enlarge';
        case 'minus':
            return 'reduce';
        case '':
            return 'terminate';
    }
}
/**
 * 分转元
 * @param num
 * @returns {number}
 */
export const changeNumberPriceDiff = (num) => {
    return (num / 100).toFixed(2)
}
/**
 * 元转分
 * @param num
 * @returns {number}
 */
export const changeNumberPriceAdd = (num) => {
    return num * 100
}
