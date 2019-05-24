
import React, { Component } from 'react';
import { shadowBoxCSS } from '../../common/style';

import {
    Divider, Form, Row, Col
  } from 'antd';

class OrganizeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const { sellteDetailData } = this.props;
        const { member_owner } = sellteDetailData;
        return ( 
            <div style={shadowBoxCSS.container}>
                <p style={shadowBoxCSS.head}>
                <span className='icon'></span>组织信息
                </p><Divider style={shadowBoxCSS.divider} /> 
                <Form style={shadowBoxCSS.form}>
                    <Row style={shadowBoxCSS.formItem}>
                    <Col span={8}>
                    <Form.Item
                    label = "组织编号" 
                    >
                        <span>{sellteDetailData.member_id}</span>
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item
                    label = "组织名称" 
                    >
                        <span>{member_owner.display_name}</span>
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item
                    label = "组织类型" 
                    >
                        <span>{sellteDetailData.member_type == 1 ? '企业' : '非企业' }</span>
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item
                    label = "所有人" 
                    >
                        <span>{member_owner.owner_name}</span>
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item
                    label = "联系方式" 
                    >
                        <span>{member_owner.owner_mobile}</span>
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item
                    label = "联系邮箱" 
                    >
                        <span>{member_owner.owner_email}</span>
                    </Form.Item>
                    </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default OrganizeInfo;