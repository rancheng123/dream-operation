import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import fetchData from "../../api/fetchData";
import utils from "../../asset";
import config from "../../config";
import { Base64 } from 'js-base64'
import Bind from 'lodash-decorators/bind';
import moment from 'moment'
import { Button, Col, Input, Modal, Row, Icon, message, Form } from "antd";
import './login.scss';
import UserNameIcon from '../../../image/svg/usename.svg';
import PwIcon from '../../../image/svg/pw.svg';
import Logo from '../../../image/svg/logo.svg';
import { Transform } from 'stream';
import { validateMessages } from '@widget/form/form.rules.js';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'text',
            loading: false,
        };
    }
    @Bind()
    onSubmit(e) {
        e.preventDefault();
        const { dispatch, form, location } = this.props;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({
                    loading: true
                })
                fetchData({
                    method: 'post',
                    url: config.api + '/user/login',
                    data: {
                        "username": values.name,
                        "password": values.password
                    },
                    errorHandle: {
                        40004: (res) => {
                        },
                        20001: (res) => {
                            form.setFields({
                                name: {
                                    value: values.name,
                                    errors: [new Error('')]
                                },
                                password: {
                                    value: values.password,
                                    errors: [new Error(res.message)]
                                }
                            })
                        }
                    }
                }).then((res) => {
                    this.setState({
                        loading: false
                    })
                    if (res && res.code === 10000) {
                        dispatch({
                            type: 'modifyCommonData',
                            data: {
                                token: res.data.token
                            }
                        });
                        const res_toekn = res.data.token
                        const pre_token = res_toekn.split('.')[1] || ''
                        const bas_token = Base64.decode(pre_token)
                        const this_token = JSON.parse(bas_token)
                        const exp_time = moment.unix(this_token.exp)
                        const exp_day = exp_time.diff(moment(), 'days', true)
                        utils.Cookies.set('token', res.data.token, exp_day);
                        if (location.query.redict) {
                            utils.Router.switchRoute(location.query.redict)
                            return
                        }
                        if (location.query.backto) {
                            utils.Router.backRoute()
                            return;
                        }
                        utils.Router.switchRoute('/space/build/list')
                    }
                })
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form
                className="ant-advanced-search-form"
                style={{ background: 'transparent' }}
                onSubmit={this.onSubmit}
            >
                <Row>
                    <Col className="gutter-row" span={24}>
                        <Form.Item className={'noMarginBottom'}>
                            {getFieldDecorator('name', {
                                validateFirst: true,
                                initialValue: '',
                                rules: [
                                    {
                                        required: true
                                    },
                                    {
                                        max: 50
                                    }
                                ]
                            })(
                                <Input
                                    placeholder="请输入账号"
                                    autoComplete='off'
                                    prefix={<Icon component={UserNameIcon} />}
                                />
                            )}
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col className="gutter-row" span={24}>
                        <Form.Item className={'noMarginBottom'}>
                            {getFieldDecorator('password', {
                                validateFirst: true,
                                initialValue: '',
                                rules: [
                                    {
                                        required: true
                                    },
                                    {
                                        max: 50
                                    }

                                ]
                            })(
                                <Input
                                    placeholder="请输入密码"
                                    autoComplete='new-password'
                                    type={this.state.type}
                                    onFocus={() => {
                                        this.setState({ type: 'password' })
                                    }}
                                    prefix={<Icon component={PwIcon} />}
                                />
                            )}
                        </Form.Item>

                    </Col>

                </Row>

                <Row style={{ marginTop: 16 }}>
                    <Col span={24} className='login_btn'>
                        <Button htmlType="submit"
                            loading={this.state.loading}
                            className='login_button'>
                            登录</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}
const WrappedLoginForm = Form.create({
    onFieldsChange(props, changedFields) {
    },
    name: 'advanced_search',
    validateMessages: validateMessages
})(LoginForm);

export default connect(function (state) {
    return {
        common: state.common
    };
})(WrappedLoginForm);
