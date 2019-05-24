import React, { Component, Fragment } from 'react';
export default class OrderOffice extends Component{
    constructor(){
        super();
    }
    render(){
        return (
            <Fragment>
                {this.props.children}
            </Fragment>
        )
    }

}




