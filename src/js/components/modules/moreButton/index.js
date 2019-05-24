import React, {PureComponent, Fragment} from 'react'
import { connect } from 'react-redux'
import {
    Dropdown,
    Menu
} from 'antd'

import utils from '../../../asset'

const MenuItem = Menu.Item

const MoreButton = ({ routerName, menuNames, data }) => {
    const menuItem = menuNames.map((item, i) => {
        // TODO: 本期做限制，下期移除此功能
        if (data.bill_status_name == '对账完成' && data.invoice_type_name == '不开发票') {
            return (
                <MenuItem key={item.key} disabled={true}>{item.name}</MenuItem>
            )
        } else if (data.bill_status_name == '对账完成' && data.invoice_apply_code != '') {
            return (
                <MenuItem key={item.key} disabled={true}>{item.name}</MenuItem>
            )
        } else {
            return (
                <MenuItem key={item.key} disabled={item.disabled}>{item.name}</MenuItem>
            )
        }
    })

    
    const editAndOthers = (key, routerName, data) => {
        // 订单页跳转到发票申请页时 做的特殊处理
        if (key == 'invoice' && data.bill_status == 3) {
            utils.Router.switchRoute(`/${routerName}${key}/${data.bill_code}/${data.bill_status}`)
        } else {
            utils.Router.switchRoute(`/${routerName}${key}/${data.id}/${data.bill_status}`)
        }
    }

    return (
        <div>
            <Dropdown
                overlay={
                    <Menu onClick={({ key }) => editAndOthers(key, routerName, data)}>
                        {menuItem}
                    </Menu>
                }
            >
                <a>
                    ···
                </a>
            </Dropdown>
        </div>
    )
}

export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    }
})(MoreButton)
