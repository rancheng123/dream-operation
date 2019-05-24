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
        return (
            <MenuItem key={item.key} disabled={Boolean(item.disabled)}>{item.name}</MenuItem>
        )
    })

    
    const editAndOthers = (key, routerName, data) => {
        console.log(routerName)
        console.log(data)
        let bill_status = ''
        if (data.bill_status == '已支付') {
            bill_status = '1'
        } else {
            bill_status = '0'
        }

        utils.Router.switchRoute(`/${routerName}${key}/${data.bill_code}/${bill_status}`)
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
