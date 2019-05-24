import Checks from '@svg/checks.svg'
export default {
    //二级路由 商品管理
    key: '/checks',
    text: '审核管理',
    icon : Checks,
    children: [
        {
            key : '/checks/wait',
            text : '待我审核&审批',
            path : "/checks/wait/project"
        },
        {
            key : '/checks/apply',
            text : '我发起的审核',
            path : "/checks/apply/project",
            children : [
                // ,
                // {
                //     key : '/checks/wait/goods',
                //     path : '/checks/wait/goods',
                //     text : '商品审核'
                // },
                // {
                //     key : '/checks/wait/users',
                //     path : '/checks/wait/users',
                //     text : '用户审核'
                // },
                // {
                //     key : '/checks/wait/contracts',
                //     path : '/checks/wait/contracts',
                //     text : '合同&协议审核'
                // }
            ]
        }
        
        
    ]
}