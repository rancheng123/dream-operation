const isWaitOrApply = ()=> window.location.pathname.indexOf('wait') != -1


//计算扣款/退款金额总额

const deducationItems = deductions => deductions instanceof Array ? deductions : deductions.items;
const amountDeductions = deductions => deducationItems(deductions).reduce((a,b)=>a+b.amount,0).toFixed(2)


//将deposits对象转换成deposits数组
const getdeposits = (deposits) => {
    if(deposits instanceof Array) return deposits;
    const propetty = Object.getOwnPropertyNames(deposits);
    const len = propetty[0] == 1 ? propetty.length+1 : propetty.length
    deposits.length = len;
    return Array.from(deposits).filter(s=>s);
}

//计算固定工位数与房间数
const getGoodsPlace = (goods = []) => {
    const pr = { p : 0,r : 0};
    goods.map(g=>{
      if(g.place_item_type == 1 && g.station_type == 1) pr.p += g.num;
      if(g.place_item_type == 2) pr.r += g.num; 
    
    });
    return pr;
  }

module.exports = {
    isWaitOrApply,
    amountDeductions,
    deducationItems,
    getdeposits,
    getGoodsPlace
}
