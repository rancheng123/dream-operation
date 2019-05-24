import React, { Component } from 'react';
import { shadowBoxCSS } from '../../common/style';

import {
    Divider, Form, Row, Col
  } from 'antd';

class CoreCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const { sellteDetailData,old_order = {},count_detaion_money,office,isChange=false } = this.props;
        const { member_owner = {},deductions = {},refunds = {} } = sellteDetailData;
        return (
            <div style={shadowBoxCSS.container}>
                <p style={shadowBoxCSS.head}>
                <span className='icon'></span>核心审核信息
                </p><Divider style={shadowBoxCSS.divider} />
                <Form style={shadowBoxCSS.form}>
                    <Row>
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
                        label = "组织"
                        >
                        <span>{member_owner.display_name}</span>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                        label = {isChange ? '申请变更类型' : '申请类型'}
                        >
                        <span>{sellteDetailData.business_name}</span>
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row style={{margin : "16px 0"}}>
                    <Form.Item
                    label = {isChange ? '原订单内容' : '订单内容'}
                    >
                    <p>
                    {isChange ? old_order.start_date : sellteDetailData.start_date}&ensp;至&ensp;
                    {isChange ? old_order.end_date : sellteDetailData.end_date}&ensp;<em style={shadowBoxCSS.c2}>{isChange ? old_order.diff_service_date : sellteDetailData.diff_service_date}</em>&ensp;
                    <span>固定工位数&ensp;{isChange ? office.old_pr.p : office.pr.p}&emsp;房间数&ensp;{isChange ? office.old_pr.r : office.pr.r}</span>
                    </p>
                    </Form.Item>
                    </Row>
                    {
                        isChange ? (
                            <Row>
                                <Col span={8}>
                                <Form.Item
                                label = "办公服务订单内容"
                                >
                                    <span>固定工位数 {office.pr.p}&emsp;房间数 {office.pr.r}</span>
                                </Form.Item>
                                </Col>
                                <Col span={8}>
                                <Form.Item
                                label = "减少内容成交价" 
                                >
                                    <span style={shadowBoxCSS.c3}>¥{sellteDetailData.charge_all_price ? (sellteDetailData.charge_all_price / 100).toFixed(2) : '0.00'}</span>
                                </Form.Item>
                                </Col>
                                <Col span={8}>
                                <Form.Item
                                label = "减少生效时间" 
                                >
                                    <span>{sellteDetailData.start_date}</span>
                                </Form.Item>
                                </Col>

                                </Row>
                        ) : ('')
                    }
                    <Row>
                    <Form.Item
                    label = {isChange ? '押金扣款信息' : '扣款信息'}
                    > 
                    {/* 应扣（-¥9898.99）&emsp;&ensp; 
                    <span style={shadowBoxCSS.fontWeight}>违约扣款-减少（-¥{deductions.default ? deductions.default : '0.00'}）
                    &emsp;&emsp;押金物品遗失（-¥{deductions.default ? deductions.default : '0.00'}）
                    &emsp;&emsp;其他（-¥{deductions.default ? deductions.default : '0.00'}）</span>
                    */}
                    <p><em style={shadowBoxCSS.c3}>实扣（-¥{count_detaion_money}）</em>
                    {
                        !isChange ? (
                            <span style={shadowBoxCSS.fontWeight}>违约金提前终止（-¥{deductions.wyj ? (deductions.wyj / 100).toFixed(2) : '0.00'}）</span>
                        ) : ('')
                    }
                    </p>
                    </Form.Item>
                    </Row>
                    <Row>
                    <Form.Item
                    label = "退款信息"
                    >
                    <p><em style={shadowBoxCSS.c3}>实退（¥{'0.00'}）</em>
                    <span style={shadowBoxCSS.fontWeight}>押金退款（¥{refunds.bill ? (refunds.bill / 100).toFixed(2) : '0.00'}）</span>
                    <span style={shadowBoxCSS.fontWeight}>乙方支付账单退款（¥{refunds.bill ? (refunds.bill / 100).toFixed(2) : '0.00'}）</span>
                    </p>
                    </Form.Item>
                    </Row>
                    <Row style={{margin : "16px 0"}}>
                    <Form.Item
                    label = "申请原因"
                    >
                    <p>{sellteDetailData.alter_reason}</p>
                    </Form.Item>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default CoreCheck;