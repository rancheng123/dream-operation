import React, { Component } from 'react';
import { shadowBoxCSS } from '../../common/style';
import MxjTable from '@widget/table/table';

import { column_order } from '../../common/table_columns';


import {
    Divider, Form, Col
  } from 'antd';

class OrderInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const { title,sellteDetailData,pr } = this.props;
        const { goods = [],bill_list = {} } = sellteDetailData;
        return (
            <div style={shadowBoxCSS.container}>
                <p style={shadowBoxCSS.head}>
                <span className='icon'></span>{title}
                </p><Divider style={shadowBoxCSS.divider} /> 
                <Form style={{margin : "16px 0 8px 8px",overflow : "hidden"}}>
                    <Col span={8}>
                    <Form.Item
                    label = "订单号" 
                    >
                        <span>{sellteDetailData.order_code}</span>
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item
                    label = "下单时间" 
                    >
                        <span>{sellteDetailData.created_at}</span>
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item
                    label = "操作人" 
                    >
                        <span>{sellteDetailData.operator_name}</span>
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item
                    label = "订单状态" 
                    >
                        <span>{sellteDetailData.status_name}</span>
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item
                    label = "当前账单支付状态" 
                    >
                        <span>{bill_list.status_text}</span>
                    </Form.Item>
                    </Col>
                    {/* 支付总价 */}
                    <Col span={8}>
                    <Form.Item
                    label = "订单总价" 
                    >
                        <span style={shadowBoxCSS.c4}>¥{sellteDetailData.charge_all_price ? (sellteDetailData.charge_all_price / 100).toFixed(2) : '0.00'}</span>
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item
                    label = "订单开始日" 
                    >
                        <span>{sellteDetailData.start_at}</span>
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item
                    label = "订单截止日" 
                    >
                        <span>{sellteDetailData.end_at}</span>
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item
                    label = "城市" 
                    >
                        <span>{sellteDetailData.city_names}</span>
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item
                    label = "场地" 
                    >
                        <span>{sellteDetailData.location_names}</span>
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item
                    label = "办公服务订单内容" 
                    >
                        <span>固定工位数 {pr.p}&emsp;房间数 {pr.r}</span>
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item
                    label = "服务时长" 
                    >
                        <span style={shadowBoxCSS.c1}>{sellteDetailData.diff_service_date}</span>
                    </Form.Item>
                    </Col>
                </Form>
                {/* 订单商品信息 */}
                <MxjTable
                className='mxj_table'
                //固定列
                scroll={{ x: '100%' }}
                showPaination={false}
                columns={column_order}
                dataSource={(()=>{
                    return goods.map((d,i)=>{
                        d.key = i;
                        return d;
                    })
                })()}
                />
            </div>
        );
    }
}

export default OrderInfo;