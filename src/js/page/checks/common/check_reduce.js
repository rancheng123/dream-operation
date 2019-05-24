import React, { Component ,Fragment} from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import ShadowBox from '@modules/shadowBox/shadowBox';

import {
    Row, Col, Divider, Form, Icon, message
  } from 'antd';
  
import main_right from '../../../components/layout/main_right';
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

class CheckReduce extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            th : "审核订单变更-减租"
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
      },reject=>{
        console.log(reject);
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
      const { member_owner = {},
      refunds = {},goods = [],bill_list = {},
      /**原订单数据  start */
      old_order,old_order : { goods : old_goods=[],
      bill_list : old_bill_list={},deductions = {items : []}
      },
      /**原订单数据  end */
      audit_history = [] } = sellteDetailData; 
      const old_pr = getGoodsPlace(old_goods);
      const pr = getGoodsPlace(goods);
      const count_detaion_money = (amountDeductions(deductions) / 100).toFixed(2);
        return (
          
            <div className="check_end">
               <Title title={this.state.th} />
               <Approve sellteDetailData={sellteDetailData} />
               <ShadowBox style={shadowBoxCSS.box}>
                  <CoreCheck 
                    isChange = {true}
                    sellteDetailData = {sellteDetailData}
                    office = {
                      {pr, old_pr}}
                    old_order = {
                      { start_date : old_order.start_date,
                        end_date : old_order.end_date,
                        diff_service_date : old_order.diff_service_date }
                    }
                    count_detaion_money = {count_detaion_money}
                   />
                    <OrganizeInfo sellteDetailData={sellteDetailData} />
                    <OrderInfo 
                    title={'原订单信息'}
                    sellteDetailData={old_order}
                    pr={old_pr}
                     /> 
                    <div style={shadowBoxCSS.container}>
                      <p style={shadowBoxCSS.head}>
                      <span className='icon'></span>申请变更内容
                      </p><Divider style={shadowBoxCSS.divider} /> 
                      <Form style={{margin : "16px 0 8px 9px",overflow : "hidden"}}>
                          <Col span={8}>
                            <Form.Item
                            label = "申请变更类型" 
                            >
                              <span>{sellteDetailData.business_name}</span>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                            label = "减少生效时间" 
                            >
                              <span>{sellteDetailData.start_date}</span>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                            label = "减少内容后" 
                            >
                              <span>固定工位数 {pr.p}&emsp;房间数 {pr.r}</span>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                            label = "减少内容成交价" 
                            >
                              <span style={shadowBoxCSS.c3}>¥{sellteDetailData.charge_all_price ? (sellteDetailData.charge_all_price / 100).toFixed(2) : '0.00'}</span>
                            </Form.Item>
                          </Col>

                      </Form>
                      {/* 变更订单商品信息 */}
                      <MxjTable                        //固定列
                        scroll={{ x: '100%' }}
                        columns={column_order}
                        showPaination={false}
                        dataSource={(()=>{
                          return goods.map((d,i)=>{
                              d.key = i;
                              return d;
                          })
                      })()}
                       />
                    </div>
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
                      {/* <MxjTable
                        className='mxj_table'
                        style={{marginTop : 32}}
                        //固定列
                        scroll={{ x: '100%' }}
                        showPaination={false}
                        columns={column_return_money}
                        dataSource={(()=>{
                          return refunds.map((d,i)=>{
                              d.key = i;
                              return d;
                          })
                      })()} 
                        footer={() => 
                        <p style={{textAlign : 'right',marginRight : 26}}>退款合计: <em style={shadowBoxCSS.c4}>¥{'0.00'}</em></p>
                        }
                      /> */}
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
})(CheckReduce);

