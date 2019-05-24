/**
 * 精确运算法
 * @param {*} num1 
 * @param {*} num2 
 */


// 加法
const AddMethod = (arg1, arg2) => {
    let r1, r2, m, c

    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }

    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2))
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm
        }
        else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm
            arg2 = Number(arg2.toString().replace(".", ""))
        }
    }
    else {
        arg1 = Number(arg1.toString().replace(".", ""))
        arg2 = Number(arg2.toString().replace(".", ""))
    }
    return (arg1 + arg2) / m
}

// 减法
const SubMethod  = (num1, num2) => {
    const num1Digits = (num1.toString().split('.')[1] || '').length
    const num2Digits = (num2.toString().split('.')[1] || '').length
    const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits))
    //动态控制精度长度
　　 let n = (num1Digits >= num2Digits) ? num1Digits : num2Digits
    return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(n)
}

// 除法
const DivMethod = (arg1, arg2) => {
    let t1 = 0, t2 = 0, r1, r2

    try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
    try { t2 = arg2.toString().split(".")[1].length } catch (e) { }
    
    r1 = Number(arg1.toString().replace(".", ""))
    r2 = Number(arg2.toString().replace(".", ""))
    return (r1 / r2) * pow(10, t2 - t1)
}

// 乘法
const MulMethod = (arg1, arg2) => {
    let m = 0, s1 = arg1.toString(), s2 = arg2.toString()

    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

module.exports = {
    AddMethod,
    SubMethod,
    DivMethod,
    MulMethod
}