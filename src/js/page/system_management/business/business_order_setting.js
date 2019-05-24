import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import main_right from '../../../components/layout/main_right'
import {
    Card,
    Form,
    Col,
    Row,
    Input,
    Select,
    Button
} from 'antd'

// 引入header title组件
import Title from '@/js/components/modules/title/title'
// 引入CarBox组件
import CardBox from '@/js/components/modules/cardBox/cardBox'

// 引入样式
import './business_order_setting.scss'

const { Option } = Select
const { Item } = Form

const fieldLabels = {
    name: '仓库名',
    url: '仓库域名',
    owner: '仓库管理员',
    approver: '审批人',
    dateRange: '生效日期',
    type: '仓库类型',
    name2: '任务名',
    url2: '任务描述',
    owner2: '执行人',
    approver2: '责任人',
    dateRange2: '生效日期',
    type2: '任务类型'
}

@connect(({ officeForm }) => ({
    data: officeForm,
}))

@Form.create()

class business_order_setting extends Component {
    constructor () {
        super()
    }

    // 表单提交按钮事件方法
    validate = () => {
        const {
            form: { validateFieldsAndScroll }
        } = this.props

        validateFieldsAndScroll((error, values) => {
            console.log(values)
        })
    }

    render () {
        const { getFieldDecorator } = this.props.form
        
        return (
            
            <div className="office_service_order_box">
                <Title title="办公服务订单配置"></Title>

                <CardBox title="一级目录">
                    {/* 组件内的dom会作为props传递给子组件 */}
                    <Card bordered={false}>
                        <Form layout="vertical" hideRequiredMark={false}>
                            <Row gutter={16}>
                                <Col lg={6} md={12} sm={24}>
                                    <Item label={fieldLabels.name}>
                                    {
                                        getFieldDecorator('name', {
                                            rules: [{ required: true, message: '请输入仓库名称' }]
                                        })(<Input placeholder="请输入仓库名称" />)
                                    }
                                    </Item>
                                </Col>

                                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                                    <Item label={fieldLabels.url}>
                                    {
                                        getFieldDecorator('url', {
                                            rules: [{ required: true, message: '请选择' }]
                                        })(
                                            <Input
                                            style={{ width: '100%' }}
                                            addonBefore="http://"
                                            addonAfter=".com"
                                            placeholder="请输入"
                                            />
                                        )
                                    }
                                    </Item>
                                </Col>

                                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                                    <Item label={fieldLabels.owner}>
                                        {getFieldDecorator('owner', {
                                            rules: [{ required: true, message: '请选择管理员' }],
                                        })(
                                            <Select placeholder="请选择管理员">
                                                <Option value="xiao">付晓晓</Option>
                                                <Option value="mao">周毛毛</Option>
                                            </Select>
                                        )}
                                    </Item>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </CardBox>

                <CardBox title="二级目录">
                    <Card bordered={false}>
                        <Form layout="vertical" hideRequiredMark={false}>
                            <Row gutter={16}>
                                <Col lg={16} md={12} sm={24}>
                                    <Item label={fieldLabels.name2}>
                                        {
                                            getFieldDecorator('name2', {
                                                rules: [{ required: true, message: '请输入' }]
                                            })(<Input placeholder="请输入"></Input>)
                                        }
                                    </Item>
                                </Col>
                                
                                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                                    <Item label={fieldLabels.url2}>
                                        {
                                            getFieldDecorator('url2', {
                                                rules: [{ required: true, message: '请选择' }]
                                            })(
                                                <Input placeholder="请输入"></Input>
                                            )
                                        }
                                    </Item>
                                </Col>

                                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                                    <Item label={fieldLabels.owner2}>
                                        {
                                            getFieldDecorator('owner2', {
                                                rules: [{ required: true, message: '请选择管理员' }]
                                            })(
                                                <Select placeholder="请选择管理员">
                                                    <Option value="xiao">付晓晓</Option>
                                                    <Option value="mao">周毛毛</Option>
                                                </Select>
                                            )
                                        }
                                    </Item>
                                </Col>
                            </Row>
                        </Form>
                    </Card>   
                </CardBox>

                <Card className="office_card" bordered={false}>
                    <Row gutter={16}>
                        <Col>
                            <Button type="primary" onClick={this.validate}>
                                确定
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

let NewRightContent = main_right(business_order_setting, [
    {
        text: '系统设置'
    },
    {
        text: '业务配置'
    },
    {
        text: '办公服务订单配置',
        path: '/system/business/office'
    }
])


export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    };
})(NewRightContent)