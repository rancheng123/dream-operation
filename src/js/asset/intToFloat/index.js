// 将传入数据转换为字符串,并清除字符串中非数字与.的字符 

// 按数字格式补全字符串  
const getFloatStr = function(num) { 
    num += ''  
    num = num.replace(/[^0-9|\.]/g, '')     //清除字符串中的非数字非.字符  
    
    //清除字符串开头的0
    if (/^0+/) {
        num = num.replace(/^0+/, '')
    } 

    //为整数字符串在末尾添加.00
    if (!/\./.test(num)) {
        num += '.00'
    } 
     
    //字符以.开头时,在开头添加0  
    if (/^\./.test(num)) {
        num = '0' + num
    } 

    //在字符串末尾补零
    num += '00'         
    num = num.match(/\d+\.\d{2}/)[0]
    
    return num
}

const intToFloat = (num) => {
    let number = ''

    number = getFloatStr(num / 100)

    return number
}

const toFloat = (num) => {
    let number = ''

    number = getFloatStr(num)

    return number
}
 
module.exports = {
    intToFloat,
    toFloat
}