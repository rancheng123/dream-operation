import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux';


class CheckDemo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            th : "审批流设置"
         };
    }
    componentDidMount(){
      
    }
  
    render() {
      return <div>设置审批流</div>
    }
}


export default connect(function(state) {

  return {
    common: state.common,
  };
})(CheckDemo);

