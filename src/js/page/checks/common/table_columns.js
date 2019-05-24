//订单商品信息表(到期结算、提前终止)
const column_order = [
    { title: '商品类型', dataIndex: 'business_type', key: 'business_type',
    render(text,data){
        return data.business_type == 1 ? '周期性服务' : '一次性';
    }
},
    { title: '商品编号', dataIndex: 'code', key: 'code' },
    { title: '商品名称', dataIndex: 'name', key: 'name' },
    { title: '成交单价', dataIndex: 'single_price', key: 'single_price',
    render(text,data){
        return data.single_price ? (data.single_price / 100).toFixed(2) : '-'
    } },
    { title: '城市', dataIndex: 'city_name', key: 'city_name' },
    { title: '楼盘', dataIndex: 'building_name', key: 'building_name' },
    { title: '场地', dataIndex: 'location_name', key: 'location_name' },
    { title: '楼层', dataIndex: 'floor', key: 'floor' }
];

//商品基础信息
const base_goods_info = [
    { title: '城市', dataIndex: 'city_name', key: 'city_name'},
    { title: '楼盘', dataIndex: 'building_name', key: 'building_name' },
    { title: '场地', dataIndex: 'location_name', key: 'location_name' },
    { title: '层数', dataIndex: 'floor', key: 'floor' }];

//订单商品信息表(创建申请)
const column_create = [
    { title: '商品类型', dataIndex: 'business_type', key: 'business_type',
    render(text,data){
        return data.business_type == 1 ? '周期性服务' : '一次性';
    }
    },
    { title: '商品编号', dataIndex: 'code', key: 'code' },
    { title: '商品名称', dataIndex: 'goods_name', key: 'goods_name' },
    { title: '城市', dataIndex: 'city_name', key: 'city_name' },
    { title: '场地', dataIndex: 'place_name', key: 'place_name' },
    { title: '销售价格', dataIndex: 'single_price', key: 'single_price',
    render(text,data){
        return data.single_price ? (data.single_price / 100).toFixed(2) : '-'
    }},
    { title: '数量', dataIndex: 'num', key: 'num' },
    { title: '修改商品单价', dataIndex: 'changed_price', key: 'changed_price',
    render(text,data){
        return data.changed_price ? (data.changed_price / 100).toFixed(2) : '-'
    }},
    { title: '原商品总价', dataIndex: 'single_price', key: 'single_price',
    render(text,data){
        return data.single_price ? (data.single_price * data.num / 100).toFixed(2) : '-'
    }},
    { title: '修改后商品总价', dataIndex: 'changed_price', key: 'changed_price',
    render(text,data){
        return data.changed_price ? (data.changed_price * data.num / 100).toFixed(2) : '-'
    }},
];
//退还押金物品表
const column_return_deposit = [
    { title: '押金物品', dataIndex: 'unit', key: 'unit' },
    { title: '单价', dataIndex: 'price', key: 'price',
    render(text,data){
        return data.price ? (data.price / 100).toFixed(2) : '-'
    } },
    { title: '总数', dataIndex: 'place_name', key: 'place_name' },
    { title: '金额', dataIndex: 'floor', key: 'floor' },
    { title: '退还数量', dataIndex: 'salse_price', key: 'salse_price' },
    { title: '扣款金额', dataIndex: 'sales_unit', key: 'sales_unit' }
];
//押金信息表
const column_deposit = [
    { title: '押金类型', dataIndex: 'money_type_val', key: 'money_type_val' },
    { title: '押金内容', dataIndex: 'money_content_val', key: 'money_content_val'},
    { title: '单价', dataIndex: 'price', key: 'price',
    render(text,data){
        return data.price ? (data.price / 100).toFixed(2) : '-'
    }
    },
    { title: '数量', dataIndex: 'number', key: 'number',
    render(text,data){
        return data.number ? data.number : '-'
    }
    },
    { title: '押金总价', dataIndex: 'amount', key: 'amount',
    render(text,data){
        return data.amount ? (data.amount / 100).toFixed(2) : '-'
    } }
];
//扣款信息表
const column_detain_money = [
    { title: '扣款类型', dataIndex: 'entry_type_text', key: 'entry_type_text' },
    { title: '扣款内容', dataIndex: 'entry_type_content_text', key: 'entry_type_content_text' },
    { title: '单价', dataIndex: 'price', key: 'price',
    render(text,data){
        return data.price ? (data.price / 100).toFixed(2) : '-'
    }  },
    { title: '数量', dataIndex: 'number', key: 'number' },
    { title: '金额', dataIndex: 'amount', key: 'amount',
    render(text,data){
        return data.amount ? (data.amount / 100).toFixed(2) : '-'
    }  },
    { title: '备注', dataIndex: 'remark', key: 'remark' }
];
//退款信息表
const column_return_money = [
    { title: '退款类型', dataIndex: 'entry_type_text', key: 'entry_type_text' },
    { title: '退款内容', dataIndex: 'entry_type_content_text', key: 'entry_type_content_text' },
    { title: '单价', dataIndex: 'price', key: 'price',
    render(text,data){
        return data.price ? (data.price / 100).toFixed(2) : '-'
    }   },
    { title: '数量', dataIndex: 'number', key: 'number' },
    { title: '金额', dataIndex: 'amount', key: 'amount',
    render(text,data){
        return data.amount ? (data.amount / 100).toFixed(2) : '-'
    }},
    { title: '备注', dataIndex: 'remark', key: 'remark' }
    
    // { title: '原始单据', dataIndex: 'floor', key: 'floor' }
];
//其他费用
const column_other = [
    { title: '费用内容', dataIndex: 'content', key: 'content' },
    { title: '金额', dataIndex: 'price', key: 'price',
    render(text,data){
        return data.price ? (data.price / 100).toFixed(2) : '-'
    } }
    
    // { title: '原始单据', dataIndex: 'floor', key: 'floor' }
];

module.exports = {
    column_order,
    column_return_deposit,
    column_deposit,
    column_detain_money,
    column_return_money,
    column_create,
    column_other,
    base_goods_info
}