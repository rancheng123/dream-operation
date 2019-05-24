import React from "react";
import {Button, Checkbox, Form, Icon, Input} from "antd";

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginForm extends React.Component {
    componentDidMount() {
        // To disabled submit button at the beginning.
        //this.props.form.validateFields();

        window.that = this;
    }

    handleSubmit(e){
        console.log(123)
        e.preventDefault();

        //验证表单
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);


                //下一步调用接口
            }
        });



        //获取某个域的值
        //that.props.form.getFieldValue('password'

        //验证单个域
        // that.props.form.validateFields(['userName'], { force: true });

        //获取某个输入控件的 Error
        // that.props.form.getFieldError('userName');

    }

    render() {
        var that = this;
        return (
            <Form layout="inline"

                //提交时
                  onSubmit={that.handleSubmit.bind(that)}>

                {/*<Form.Item
                    label="名称"
                    hasFeedback
                    //  'success' 'warning' 'error' 'validating'
                    validateStatus="error"
                    help="请输入 数字与字母组合"
                >
                    <Input placeholder="unavailable choice" id="error" />
                </Form.Item>*/}

                <Form.Item

                    //额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。
                    extra="此项为必填项，请以字母结尾"
                >
                    {
                        //给表单增加一条校验项目
                        this.props.form.getFieldDecorator('userName', {
                            //当某一规则校验不通过时，是否停止剩下的规则的校验
                            validateFirst: true,
                            rules: [
                                /* {

                                     //是否必填
                                     required: true,

                                     //校验文案(不写的话，使用form默认提示)
                                     message: '请输入名字'

                                     //最大长度
                                     max: 6,

                                     //最小长度
                                     min: 2,

                                     //字段长度
                                     len: 3,

                                     //正则表达式校验
                                     pattern: /^\w+$/,


                                     //自定义校验规则
                                     validator: (rule, value, callback)=>{
                                         if (/^\d+$/.test(value)) {
                                             callback();
                                         } else {
                                             callback('请输入纯数字');
                                         }
                                     },


                                 },*/

                                {
                                    required: true
                                },
                                {
                                    //字段长度
                                    len: 3,

                                },
                                {
                                    //正则表达式校验
                                    pattern: /^\w/,
                                    message: '请以英文开头   ,'

                                },
                                {
                                    //自定义校验规则
                                    validator: (rule, value, callback)=>{
                                        if (/\d$/.test(value)) {
                                            callback();
                                        } else {
                                            callback('请以数字结尾    ,');
                                        }
                                    },
                                }
                            ],
                        })

                        (
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        this.props.form.getFieldDecorator('password', {
                            rules: [
                                { required: true }
                            ],
                        })
                        (
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )
                    }
                </Form.Item>

                <Form.Item>

                    {this.props.form.getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: false,
                        rules: [
                            { //自定义校验规则
                                validator: (rule, value, callback)=>{


                                    //获取某个域的值
                                    //that.props.form.getFieldValue('password')

                                    if (value) {
                                        //成功
                                        callback();
                                    } else {
                                        //失败，提示错误
                                        callback('请选择');
                                    }
                                }
                            }
                        ],
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}

                </Form.Item>


                <Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(this.props.form.getFieldsError())}
                    >
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}



//经 Form.create() 包装过的组件会自带 this.props.form 属性
const WrappedHorizontalLoginForm = Form.create({
    //设置表单域内字段 id 的前缀
    name: 'horizontal_login',

    //默认校验信息，可用于把默认错误信息改为中文等
    validateMessages: {
        default: 'Validation error on field %s',
        required: '%s 为必填项    ,',
        enum: '%s must be one of %s',
        whitespace: '%s cannot be empty',
        date: {
            format: '%s date %s is invalid for format %s',
            parse: '%s date could not be parsed, %s is invalid ',
            invalid: '%s date %s is invalid',
        },
        types: {
            string: '%s is not a %s',
            method: '%s is not a %s (function)',
            array: '%s is not an %s',
            object: '%s is not an %s',
            number: '%s is not a %s',
            date: '%s is not a %s',
            boolean: '%s is not a %s',
            integer: '%s is not an %s',
            float: '%s is not a %s',
            regexp: '%s is not a valid %s',
            email: '%s is not a valid %s',
            url: '%s is not a valid %s',
            hex: '%s is not a valid %s',
        },
        string: {
            len: '%s 必须是 %s 个字符    ,',
            min: '%s must be at least %s characters',
            max: '%s cannot be longer than %s characters',
            range: '%s must be between %s and %s characters',
        },
        number: {
            len: '%s must equal %s',
            min: '%s cannot be less than %s',
            max: '%s cannot be greater than %s',
            range: '%s must be between %s and %s',
        },
        array: {
            len: '%s must be exactly %s in length',
            min: '%s cannot be less than %s in length',
            max: '%s cannot be greater than %s in length',
            range: '%s must be between %s and %s in length',
        },
        pattern: {
            mismatch: '%s value %s does not match pattern %s',
        },
        clone() {
            const cloned = JSON.parse(JSON.stringify(this));
            cloned.clone = this.clone;
            return cloned;
        },
    }
})(LoginForm);



export default WrappedHorizontalLoginForm