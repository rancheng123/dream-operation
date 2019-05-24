import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import main_right from '../../components/layout/main_right';
import AntiDome from '../1antiDome/antiDome'

class Home_a extends Component{
    constructor(){
        super();
    }

    render(){
        return (
          <div>
              this is  home_a

              <AntiDome></AntiDome>
          </div>
        )
    }

}

var NewRightContent = main_right(Home_a,[
    {
        text: 'Home'
    },
    {
        text: 'List'
    },
    {
        text: 'Home_a'
    }
])


export default connect(function(state) {
  return {
    common: state.common,
    home: state.home
  };
})(NewRightContent);

