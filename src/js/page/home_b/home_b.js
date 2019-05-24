import React, { Component, PropTypes } from 'react';
import main_right from '../../components/layout/main_right'

import ReactDemo from '../0reactDome/reactDome'

class Home_b extends Component{
    constructor(){
        super();
    }

    render(){
        return (
          <div>
              this is  home_b

              <ReactDemo></ReactDemo>
          </div>
        )
    }

}
var NewRightContent = main_right(Home_b,[
    {
        text: 'Home'
    },
    {
        text: 'List'
    },
    {
        text: 'Home_b'
    }
])

export default NewRightContent;

