import React, { Component } from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div style={{height : 2,color : '#B8B8B8',backgroundColor : '#E0E0E0',display: 'flex',justifyContent : 'center',alignItems : 'center',margin: '112px 0 48px',}}>
            <span style={{fontSize: 12,padding : 8,backgroundColor : 'rgb(251, 251, 251)',position : 'relative',zIndex : 2}}>copyright 2019 梦想加筑梦产品 出品</span>
            </div>
        );
    }
}

export default Footer;