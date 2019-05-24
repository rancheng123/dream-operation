import Organize from '@svg/organize.svg'
export default {
    //二级路由
    key: '/organize',
    text: '组织管理',
    icon : Organize,
    children: [
        {
            path: '/organize/owner/list',
            key: '/organize/owner',
            text: '组织列表',
            children : []
        }
    ]
}