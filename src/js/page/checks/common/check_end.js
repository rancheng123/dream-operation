import React, { Component ,Fragment} from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import ShadowBox from '@modules/shadowBox/shadowBox';

import {
    Row, Divider, Form, Icon, message
  } from 'antd';
  
import Title from '@modules/title/title';

// 审批流
import Approve from '../modules/approve';
// 组织信息
import OrganizeInfo from '../modules/organize_info';
//订单信息
import OrderInfo from '../modules/order_info';
//核心审核信息
import CoreCheck from '../modules/core_check';


import MxjSteps from '@modules/steps'
import MxjTable from '@widget/table/table';
import MxjHistory from '@modules/history';
import CheckBtn from './check_btn';

import { amountDeductions,deducationItems,getGoodsPlace } from './global';
import api from '@api/checks';

import {column_order,column_return_deposit,column_detain_money,column_return_money} from './table_columns';

import Reply from '@svg/reply.svg';
import Observe from '@svg/observe.svg';

import "./check_end.scss"
import { instanceOf } from 'prop-types';

class CheckEnd extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            th : "审核提前终止"
         };
    }
    componentDidMount(){
      let type = 0;
      if(window.location.pathname.indexOf('apply') != -1) type = 1;
      this.getCheckDetailByStepId(type);
    }
    componentWillUnmount() {
      const { dispatch } = this.props;
      dispatch({
        type : 'checks_wait',
        reset : true,
        data : {
        }
      }); 
    }
    
    //通过step_assignee_id获取审核详情数据
    getCheckDetailByStepId(type){
      const { checks_wait,dispatch } = this.props;
      const { step_assignee_id } = this.props.routeParams;
      api.getCheckDetailByStepId(step_assignee_id,type).then(res=>{
        if(res.code != 10000) {
          message.error(res.message);
          return;
        }
        checks_wait.sellteDetailData = res.data;
        dispatch({
          type : 'checks_wait',
          data : {
            sellteDetailData : checks_wait.sellteDetailData 
          }
        });
      });
    }

    render() {
      const shadowBoxCSS = {
          box : {padding : 32,marginBottom : 32},
          container : {padding : '0 8px',marginBottom : 48,overflow: 'hidden',},
          head : {fontSize : '14px',color : 'rgba(0,0,0,1)',marginBottom : 11},
          divider : {minWidth : 'auto',width: '100%',margin : '0 auto'},
          c1 : {color : "#36DCB6"},
          c2 : {color : "#0179FF"},
          c3 : {color : "#F8B156"},
          c4 : {color : "#FF5555"},
          fontWeight : {fontWeight : 600},
          form : {marginTop : 16,marginLeft : 8}
      }
      const { checks_wait } = this.props;
      const { sellteDetailData } = checks_wait;
      const { member_owner = {},deductions = {},refunds = {},goods = [],bill_list = {},audit_history = [] } = sellteDetailData; 
      const pr = getGoodsPlace(goods);
      const count_detaion_money = (amountDeductions(deductions) / 100).toFixed(2);
        return (
          
            <div className="check_end">
               <Title title={this.state.th} /> 
               <Approve sellteDetailData={sellteDetailData} />
               <ShadowBox style={shadowBoxCSS.box}>
                  <CoreCheck 
                    isChange = {false}
                    sellteDetailData = {sellteDetailData}
                    office = {
                      {pr}}
                    count_detaion_money = {count_detaion_money}
                   />
                    
                    <OrganizeInfo sellteDetailData={sellteDetailData} />
                    <OrderInfo 
                    title={'订单信息'}
                    sellteDetailData={sellteDetailData}
                    pr={pr}
                     /> 
                    {/* <div style={shadowBoxCSS.container}>
                      <p style={shadowBoxCSS.head}>
                      <span className='icon'></span>核心审核信息
                      </p><Divider style={shadowBoxCSS.divider} />
                        <Form style={shadowBoxCSS.form}>
                          <Row>
                            <Col span={8}>
                              <Form.Item
                              label = "城市"
                              >
                              <span>{sellteDetailData.city_names}</span>
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item
                              label = "场地"
                              >
                              <span>{sellteDetailData.location_names}</span>
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item
                              label = "用户"
                              >
                              <span>{member_owner.display_name}</span>
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={8}>
                              <Form.Item
                              label = "申请类型"
                              >
                              <span>{sellteDetailData.business_name}</span>
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row style={{margin : "16px 0"}}>
                            <Form.Item
                            label = "订单内容"
                            >
                            <p>{sellteDetailData.start_date}&ensp;至&ensp;{sellteDetailData.end_date}&ensp;<em style={shadowBoxCSS.c2}>{sellteDetailData.diff_service_date}</em>&ensp;<span>固定工位数&ensp;{pr.p}&emsp;房间数&ensp;{pr.r}</span></p>
                            </Form.Item>
                          </Row>
                          <Row>
                            <Form.Item
                            label = "扣款信息"
                            >
                            {/* 应扣（-¥9898.99）&emsp;  &ensp;押金品遗失（-¥9898.99） &ensp;其他（-¥9898.99） deductions.default ? deductions.default : '0.00' deductions.default ? deductions.default :
                            <p><em style={shadowBoxCSS.c3}>实扣（-¥{deductions.default ? (deductions.default / 100).toFixed(2) : '0.00'}）</em><span style={shadowBoxCSS.fontWeight}>违约金提前终止（-¥{deductions.wyj ? (deductions.wyj / 100).toFixed(2) : '0.00'}）</span></p>
                            </Form.Item>
                          </Row>
                          <Row>
                            <Form.Item
                            label = "退款信息"
                            >
                            <p><em style={shadowBoxCSS.c3}>实退（¥{refunds.bill ? (refunds.bill / 100).toFixed(2) : '0.00'}）</em><span style={shadowBoxCSS.fontWeight}>已支付账单退款（-¥{refunds.bill ? (refunds.bill / 100).toFixed(2) : '0.00'}）</span></p>
                            </Form.Item>
                          </Row>
                          <Row style={{margin : "16px 0"}}>
                            <Form.Item
                            label = "申请原因"
                            >
                            <p>{sellteDetailData.alter_reason}</p>
                            </Form.Item>
                          </Row>
                        </Form>
                    </div> */}
                    <OrganizeInfo sellteDetailData={sellteDetailData} />
                    <OrderInfo
                    title={'订单信息'}
                    sellteDetailData={sellteDetailData}
                    pr={pr}
                     /> 
                    
                    {/* <div style={shadowBoxCSS.container}>
                      <p style={shadowBoxCSS.head}>
                      <span className='icon'></span>退还押金品
                      </p><Divider style={shadowBoxCSS.divider} />
                      <MxjTable
                        className='mxj_table'
                        style={{marginTop : 32}}
                        //固定列
                        scroll={{ x: '100%' }}
                        columns={column_return_deposit}
                        
                      />
                    </div> */}
                    <div style={shadowBoxCSS.container}>
                      <p style={shadowBoxCSS.head}>
                      <span className='icon'></span>退还纸质押金单
                      </p><Divider style={shadowBoxCSS.divider} />
                      <Form style={shadowBoxCSS.form}>
                          <Row>
                            <Form.Item
                            label = "押金单处理" 
                            >
                              <span>{ sellteDetailData.recycle_deposit_type == 1 ? '已拿到纸质' : '遗失需要扣款' }</span>
                            </Form.Item>
                          </Row>
                          {
                            sellteDetailData.recycle_deposit_type == 1 ? (
                              <Row span={8}>
                                <Form.Item
                                label = "押金单校验码" 
                                >
                                  <p>{sellteDetailData.recycle_deposit_verify}&emsp;&emsp;<span style={shadowBoxCSS.c1}><Icon component={Reply} style={{marginRight : 5}} />校验成功</span>&emsp;&emsp;<Link to={'/financial/deposit/form/details/'+sellteDetailData.deposit_recept_id}><span style={shadowBoxCSS.c2}><Icon component={Observe} style={{marginRight : 5}}  />查看押金单</span></Link></p>
                                </Form.Item>
                              </Row>
                            ) : ''
                          }
                      </Form> 
                    </div>
                    <div style={shadowBoxCSS.container}>
                      <p style={shadowBoxCSS.head}>
                      <span className='icon'></span>扣款信息
                      </p><Divider style={shadowBoxCSS.divider} />
                      {/* 扣款信息 */}
                      <MxjTable
                        className='mxj_table'
                        style={{marginTop : 32}}
                        //固定列
                        scroll={{ x: '100%' }}
                        showPaination={false}
                        columns={column_detain_money}
                        dataSource={(()=>{
                          return deducationItems(deductions).map((d,i)=>{
                              d.key = i;
                              return d;
                          })
                      })()} 
                        footer={() => 
                          <p style={{textAlign : 'right',marginRight : 26}}>
                          {/* <span>应扣款合计: <em style={shadowBoxCSS.c4}>¥37688278.99</em></span> */}
                          <span style={{marginLeft : 40}}>扣款前押金: <em style={shadowBoxCSS.c4}>¥{deductions.before ? (deductions.before / 100).toFixed(2) : '0.00'}</em></span>
                          <span style={{marginLeft : 40}}>扣款后剩余: <em style={shadowBoxCSS.c4}>¥{deductions.after ? (deductions.after / 100).toFixed(2) : '0.00'}</em></span>
                          <span style={{marginLeft : 40}}>实扣款: <em style={shadowBoxCSS.c4}>¥{count_detaion_money}</em></span>
                          </p>
                        }
                      />
                    </div>
                    <div style={shadowBoxCSS.container}>
                      <p style={shadowBoxCSS.head}>
                      <span className='icon'></span>退款信息
                      </p><Divider style={shadowBoxCSS.divider} />
                      {/* 退款信息 */}
                      <MxjTable
                        className='mxj_table'
                        style={{marginTop : 32}}
                        //固定列
                        scroll={{ x: '100%' }}
                        showPaination={false}
                        columns={column_return_money}
                        dataSource={(()=>{
                          return deducationItems(refunds).map((d,i)=>{
                              d.key = i;
                              return d;
                          })
                      })()} 
                        footer={() => 
                        <p style={{textAlign : 'right',marginRight : 26}}>退款合计: <em style={shadowBoxCSS.c4}>¥{refunds.bill ? (refunds.bill / 100).toFixed(2) : '0.00'}</em></p>
                        }
                      />
                      {/* <p style={{marginTop : 24}}>备注:&emsp;无</p> */}
                    </div>
                    <MxjHistory
                    shadowBoxCSS = {shadowBoxCSS}
                    data = {audit_history}
                    />
                    <CheckBtn step_assignee_id={this.props.routeParams.step_assignee_id} />
                </ShadowBox>
            </div>
        );
    }
}



export default connect(function(state) {

  return {
    common: state.common,
    checks_wait : state.checks_wait
  };
})(CheckEnd);

