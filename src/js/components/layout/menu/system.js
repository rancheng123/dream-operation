export default {
    key: '/system',
    text: '系统设置',
    children: [
        {
            key: '/system/business',
            text: '业务配置',
            children: [
                {
                    path: '/system/business/office',
                    key: '/system/business/office',
                    text: '办公服务订单配置'
                },
                {
                    path: '/system/business/deposit',
                    key: '/system/business/deposit',
                    text: '业务押金配置'
                }
            ]
        },
        {
            key: '/system/organization',
            text: '组织机构管理',
            children: [
                {
                    path: '/system/organization/venue',
                    key: '/system/organization/venue',
                    text: '场地主体管理'
                }
            ]
        },
        ,
        {
            key: '/system/authority',
            text: '角色与权限管理',
            children: [
                {
                    path: '/system/authority/role',
                    key: '/system/authority/role',
                    text: '角色与权限管理'
                },
                {
                    path: '/system/authority/operator',
                    key: '/system/authority/operator',
                    text: '操作员权限管理'
                }
            ]
        },
        {
            key: '/system/approval',
            text: '审批与审核权限管理',
            children: [
                {
                    path: '/system/approval/approval',
                    key: '/system/approval/approval',
                    text: '审批与审核权限管理'
                }
            ]
        }
    ]
}