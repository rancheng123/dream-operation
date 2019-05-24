import validator from 'validator'
export default {
    //中文&英文&数字
    ChineseEnglishDigital: (rule, value, callback) => {
        //有值 并且没有通过校验
        if (
            value && value.trim() &&
            !/^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/.test(value)
        )
        {
            callback('只能包含中文，英文和数字');
            return;
        }
        callback();
    },
    //英文&数字
    EnglishDigital: (rule, value, callback) => {
        //有值 并且没有通过校验
        if (
            value && value.trim() &&
            !/^[a-zA-Z0-9]+$/.test(value)
        )
        {
            callback('只能包含英文和数字');
            return;
        }
        callback();
    },


    //数字（数字、小数点）
    Digital: (rule, value, callback) => {
        if (
            value && value.trim() &&
            !/^[-\+]?\d+(\.\d+)?$/.test(value)
        )
        {
            callback('请输入正确的数字格式');
            return;
        }


        callback();
    },
    //整数
    Int: (rule, value, callback) => {
        if(typeof value == 'number'){
            value = value + ''
        }

        if (
            value && value.trim() &&
            !validator.isInt(value)
        )
        {
            callback('请输入整数');
            return;
        }
        callback();
    },
    //正数
    PositiveNumber: (rule, value, callback) => {
        if(typeof value == 'number'){
            value = value + ''
        }

        if (
            value && value.trim() &&
            value<0
        )
        {
            callback('请输入正数');
            return;
        }
        callback();
    },
    //浮点数
    Float: (rule, value, callback) => {

        if(typeof value == 'number'){
            value = value + ''
        }

        if (
            value && value.trim() &&
            !new RegExp('^[-\\+]?\\d+(\\.\\d{0,'+ rule.floatLength +'})?$').test(value)
        )
        {
            callback('最多可输入'+ rule.floatLength +'位浮点数');
            return;
        }
        callback();
    },


    //数字（数字、小数点、最大支持9位及2位小数）
    DigitalNumber: (rule, value, callback) => {
        if (
            value && value.trim() &&
            !(/^\d{1}\d{0,8}(\.\d{1,2})?$/).test(value)

        )
        {
            callback('最大支持9位正数及2位小数');
            return;
        }


        callback();
    },

    //不大于某数
    NoLargerSomeNum: (rule, value, callback) => {
        if (
            value && value.trim() &&
            value > rule.num
        )
        {
            callback('请输入不大于'+ rule.num +'的数字');
            return;
        }


        callback();
    },
}


export const validateMessages = {
    default: 'Validation error on field %s',
    required: (key)=>{
        return '此项为必填项'
    },
    enum: '%s must be one of %s',
    //whitespace: '%s cannot be empty',
    whitespace: (key)=>{
        return '此项不能为空'
    },

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
        //len: '%s 必须是 %s 个字符    ,',
        len:  (key,parmas)=>{
            return '请输入 '+ parmas +' 个字符'
        },


        //min: '%s must be at least %s characters',

        min:  (key,parmas)=>{
            return '不能少于 '+ parmas +' 个字符'
        },
        max:  (key,parmas)=>{
            return '不能超过 '+ parmas +' 个字符'
        },
        //range: '%s must be between %s and %s characters',
        range:  (key,parmas)=>{
            return '请输入 '+ parmas +' 个字符'
        },
    },
    number: {
        //len: '%s must equal %s',
        len:  (key,parmas)=>{
            return '请输入 '+ parmas +' 个字符'
        },
        //min: '%s cannot be less than %s',
        min:  (key,parmas)=>{
            return '不能少于 '+ parmas +' 个字符'
        },
        max:  (key,parmas)=>{
            return '不能超过 '+ parmas +' 个字符'
        },
        //range: '%s must be between %s and %s',
        range:  (key,parmas)=>{
            return '请输入 '+ parmas +' 个字符'
        },
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