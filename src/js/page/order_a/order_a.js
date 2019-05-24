import React, { Component, PropTypes } from 'react';

import SvgDome from '../../components/svg'



class Order_a extends Component{
    constructor(){
        super();
    }
    render(){
        return (
          <div>
              <SvgDome
                image={require('./houer.jpg')}
              ></SvgDome>
          </div>
        )
    }

}
export default Order_a
