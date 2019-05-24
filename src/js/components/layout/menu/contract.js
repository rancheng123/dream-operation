import Contract from '@svg/contract.svg'

export default {
    //二级路由
    key: '/contract',
    text: '合同&协议管理',
    icon: Contract,
    children: [
        {
            path: '/contract/list',
            key: '/contract',
            text: '合同&协议列表'
        },
        {
            path: '/template/list',
            key: '/template',
            text: '合同&协议模板列表'
        }
    ]
};