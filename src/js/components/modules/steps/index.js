import React, { Component } from 'react';

import {
   Steps
  } from 'antd';
const {Step} = Steps;
class MxjSteps extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const {style,items,labelPlacement="horizontal"} = this.props;
        return (
                <Steps style={style} current={this.props.current} labelPlacement={labelPlacement} >
                    {
                        items.map((item,i)=>{
                            return <Step key={i} {...item} />
                        })
                    }
                </Steps>
        );
    }
}

export default MxjSteps;
