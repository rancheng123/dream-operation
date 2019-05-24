import React, { Component, PropTypes, Fragment } from 'react';
import { connect } from 'react-redux';
import {setInitStatus} from "./common/operation";
import '../order.scss'
@connect(({ orderCommonState }) => ({
    orderCommonState
}))
export default class OrderOffice extends Component{
    constructor(){
        super();
    }
    async componentDidMount() {
        const {dispatch} = this.props
        const status_data = await setInitStatus()
        if (status_data) {
            dispatch({
                type: 'modify_office_order_common',
                data: {
                    status_init_data: status_data.status_init_data,
                    status_init_obj: status_data.status_init_obj
                }
            })
        }
    }
    render(){
        return (
            <Fragment>
                {this.props.children}
            </Fragment>
        )
    }

}




