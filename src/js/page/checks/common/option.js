import Create from '@svg/create.svg';
import End from '@svg/end.svg';
import DueSettle from '@svg/due_settle.svg';
import Myclean from '@svg/myclean.svg';
import Reduce from '@svg/reduce.svg';
import Expand from '@svg/expand.svg';
import Continue from '@svg/continue.svg';

//订单编码
const order_type_code = {
    'SHDDCJ' : { text : '创建订单审核' ,icon : Create ,path : '/checks/wait/project/order/create/',path2 : '/checks/apply/project/order/create/' },
    'SHDDDQ' : { text : '到期结算审核' ,icon : End ,path : '/checks/wait/project/order/settle/',path2 : '/checks/apply/project/order/settle/' },
    'SHDDTQ' : { text : '提前终止审核' ,icon : DueSettle ,path : '/checks/wait/project/order/end/',path2 : '/checks/apply/project/order/end/' },
    'SHDDQZ' : { text : '我方清租审核' ,icon : Myclean ,path : '/checks/wait/project/order/myclear/',path2 : '/checks/apply/project/order/myclear/' },
    'SHDDJZ' : { text : '变更-减租审核' ,icon : Reduce ,path : '/checks/wait/project/order/reduce/',path2 : '/checks/apply/project/order/reduce/' },
    'SHDDKZ' : { text : '变更-扩租审核' ,icon : Expand ,path : '/checks/wait/project/order/expand/',path2 : '/checks/apply/project/order/expand/' },
    'SHDDXZ' : { text : '变更-续租审核' ,icon : Continue ,path : '/checks/wait/project/order/continue/',path2 : '/checks/apply/project/order/continue/' }
}

module.exports = {
    order_type_code 
}