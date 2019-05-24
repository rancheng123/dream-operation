import React, {Component, PropTypes} from 'react';
import utils from "../../../../asset";
import {Col, Input, Row, Form} from "antd";
import {Select} from "antd/lib/select";
import DetailBox from '@/js/components/modules/detailBox'


class Index extends Component {
    constructor() {
        super();
        this.state = {
            labelCol:{span: 8},
            wrapperCol:{span: 16},
        }
    }
    render() {
        return (
            <DetailBox title='业主基础信息' dividerStyle={{margin: '11px 0 31px'}}>

                {(()=>{

                    //编辑楼盘
                    if(utils.Url.parseUrl(location.href).params.id){
                        return (
                            <Row gutter={95}>
                                <Col className="gutter-row" span={8}>
                                    <Form.Item
                                        label={'业主编号'}
                                        labelCol={this.state.labelCol}
                                        wrapperCol={this.state.wrapperCol}
                                    >
                                        {this.state.detailData.code}
                                    </Form.Item>

                                </Col>

                                <Col className="gutter-row" span={8}>

                                    <Form.Item
                                        label={'创建时间'}
                                        labelCol={this.state.labelCol}
                                        wrapperCol={this.state.wrapperCol}
                                    >
                                        {this.state.detailData.created_at}
                                    </Form.Item>

                                </Col>
                                <Col className="gutter-row" span={8}>

                                    <Form.Item
                                        label={'创建人'}
                                        labelCol={this.state.labelCol}
                                        wrapperCol={this.state.wrapperCol}
                                    >
                                        {this.state.detailData.created_by_name}
                                    </Form.Item>

                                </Col>

                            </Row>
                        )
                    }
                })()}


                <Row gutter={95}>
                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            label={'业主名称'}
                            labelCol={this.state.labelCol}
                            wrapperCol={this.state.wrapperCol}

                        >
                            {getFieldDecorator('name', {
                                validateFirst: true,
                                initialValue: this.state.detailData.name,
                                rules: [
                                    {
                                        required: true
                                    },
                                    {
                                        max: 50
                                    },
                                    {
                                        validator: formRules.ChineseEnglishDigital
                                    }

                                ],
                            })(
                                <Input
                                    placeholder="请输入业主名称"
                                />
                            )}
                        </Form.Item>

                    </Col>



                    <Col className="gutter-row" span={8}>

                        <Form.Item
                            label={'业主类型'}
                            labelCol={this.state.labelCol}
                            wrapperCol={this.state.wrapperCol}
                        >
                            {getFieldDecorator('type_id', {
                                validateFirst: true,
                                initialValue: this.state.detailData.type_id,
                                rules: [
                                    {
                                        required: true
                                    }
                                ],
                            })(
                                <Select
                                    allowClear
                                    placeholder="请选择"
                                >
                                    {(()=>{
                                        var directionList = [{
                                            id: 1,
                                            value: 'aa'
                                        }]
                                        return directionList.map((item)=>{
                                            return (
                                                <Select.Option key={item.id}>
                                                    {item.value}
                                                </Select.Option>
                                            )
                                        })
                                    })()}
                                </Select>
                            )}
                        </Form.Item>

                    </Col>

                </Row>


            </DetailBox>


        )
    }
}

export default Index;

