import React,{ Component } from 'react';
import {Icon} from 'antd';
import './title.scss';

import TitleSvg from '@svg/title.svg'
class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="titleWrap">
            <p className='title'><Icon component={TitleSvg} style={{width : 20,height : 20,fontSize : 20,marginRight : '10px'}} />
            {this.props.title}
            {this.props.children}
            </p>
            </div>
        );
    }
}

export default Title;