import React, { Component ,Fragment} from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import ShadowBox from '../../../components/modules/shadowBox/shadowBox';

import {
    Row, Col, Divider, Badge, Icon
  } from 'antd';
  
import api from '@api/checks';

import { order_type_code } from '../common/option'

import Title from '../../../components/modules/title/title';
import './project.scss';

class ChecksWaitProject extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            th : "待我审核&审批",
            data : []
         };
    }
    componentWillMount() {
      api.getwaitOption().then(res=>{
        if(res.code != 10000) return;
        this.setState({
          data : res.data
        });
      });
    }
    render() {
      const shadowBoxCSS = {
        
        head : {fontSize : '14px',color : 'rgba(0,0,0,1)',marginBottom : 11,padding : '0 40px'},
        icon : {
          width: 6,
          height: 12,
          display: 'inline-block',
          marginRight: 8,
          backgroundImage: 'linear-gradient(-90deg, #61B7FF 0%, #0179FF 100%)',
          borderRadius: 2
        },
        divider : {minWidth : 'auto',width: 'calc(100% - 80px)',margin : '0 auto'},
        p : {color : '#2C2D31',fontSize : 16,marginTop : 16,textAlign : 'center'}
      }
        return (
            <div className='project'>
               <Title title={this.state.th} />
               {
                   this.state.data.map((r,i)=>{
                      const len = r.list.length;
                     return <ShadowBox key={i} style={{padding : '18px 0',height : 218}}>
                     <p style={shadowBoxCSS.head}>
                       <span style={shadowBoxCSS.icon}></span>{r.title}
                     </p><Divider style={shadowBoxCSS.divider} />
                    <Row style={{paddingTop : 35}} type={'flex'}>
                      {
                        
                        r.list.map((l,i)=>{
                          return  <Col key={i} style={{width : 100 / len+'%'}}>
                                      <Link to={'/checks/wait/project/order?type_code='+l.business}>
                                      <Row type={'flex'} justify={'center'}>
                                        <Badge count={l.wait_count} overflowCount={99} className='mxj_badge'>
                                          <Icon component = {order_type_code[l.business].icon} style={{fontSize : 56}} />
                                        </Badge>
                                      </Row>
                                      <p style={shadowBoxCSS.p}>{l.title}</p>
                                      </Link>
                                  </Col>  
                        })
                      }
                       
                    </Row>
                  </ShadowBox>
                   })
               }
               
            </div>
        );
    }
}


export default connect(function(state) {
  return {
    common: state.common
  };
})(ChecksWaitProject);

