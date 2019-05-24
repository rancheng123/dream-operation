import Goods from '@svg/goods.svg'
export default {
    //二级路由 商品管理
    key: '/goods',
    text: '商品管理',
    icon : Goods,
    children: [
        {
            key : '/goods/manage',
            text : '场地商品管理',
            children : [
                {
                    key : '/goods/manage/space',
                    path : '/goods/manage/space/list',
                    text : '工位商品列表'
                },
                {
                    key : '/goods/manage/room',
                    path : '/goods/manage/room/list',
                    text : '房间商品列表'
                }
            ]
        }
        // {
        //     key : '/goods/config',
        //     text : '商品配置管理',
        //     children : [
        //         // {
        //         //     key : '/goods/config',
        //         //     path : '/goods/config',
        //         //     text : '商品分类配置'
        //         // },
        //         {
        //             key : '/goods/deposit/list',
        //             path : '/goods/deposit/list',
        //             text : '业务押金品管理',
        //             children : [
        //                 {
        //                     key : '/goods/deposit/list',
        //                     path : '/goods/deposit/list',
        //                     text : '业务押金品管理'
        //                 } 
        //             ]
        //         }
        //     ] 
        // }
        
    ]
}