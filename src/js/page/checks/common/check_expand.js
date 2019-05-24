import React, { Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import ShadowBox from '@modules/shadowBox/shadowBox';

import {
    Row, Col, Divider, Form, Icon,Input, message
  } from 'antd';
  
import main_right from '../../../components/layout/main_right';
import Title from '@modules/title/title';

// 审批流
import Approve from '../modules/approve';
// 组织信息
import OrganizeInfo from '../modules/organize_info';
//订单信息
import OrderInfo from '../modules/order_info';



import MxjSteps from '@modules/steps'
import MxjTable from '@widget/table/table';
import MxjHistory from '@modules/history';
import CheckBtn from './check_btn';

import { getdeposits,getGoodsPlace } from './global';
import api from '@api/checks';

import Calendar from '@svg/calendar.svg';
import New from '@svg/new.svg';

import {column_order,column_return_deposit,
        column_detain_money,column_return_money,
        column_deposit,column_create,column_other
      } 
  from './table_columns';


import "./check_end.scss"

const { TextArea } = Input;
class CheckExpand extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            th : "审核订单变更-扩租"
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
          form : {marginTop : 16},
          formItem : {marginLeft : 8}
      }
      const { checks_wait } = this.props;
      const { sellteDetailData } = checks_wait;
      const { member_owner = {},deductions = {},refunds = {},goods = [],
      bill_list = {},audit_history = [],finance_info = {},
      /**原订单数据  start */
      old_order,old_order : { goods : old_goods=[],sales_rules : old_sales_rules={},
      bill_list : old_bill_list={}
      },
      /**原订单数据  end */

      sales_rules,sales_rules : lod_sales_rules = {}
            } = sellteDetailData; 
      const { compute_cost : {other=[],deposit=[],deposit_amount='',other_amount='',order_amount=''} } = finance_info;
      const old_pr = getGoodsPlace(old_goods);
      const pr = getGoodsPlace(goods);
      //原订单押付方式
      const old_deposit_payment = old_order.deposit_payment ? old_order.deposit_payment.split('-') : [];
      //新订单押付方式
      const deposit_payment = sellteDetailData.deposit_payment ? sellteDetailData.deposit_payment.split('-') : [];
        return (
          
            <div className="check_end">
               <Title title={this.state.th} />
               <Approve sellteDetailData={sellteDetailData} />
               <ShadowBox style={shadowBoxCSS.box}>
                    <div style={shadowBoxCSS.container}>
                      <p style={shadowBoxCSS.head}>
                      <span className='icon'></span>核心审核信息
                      </p><Divider style={shadowBoxCSS.divider} />
                        <Form style={shadowBoxCSS.form}>
                          <Row style={shadowBoxCSS.formItem}>
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
                              label = "组织"
                              >
                              <span>{member_owner.display_name}</span>
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item
                              label = "申请变更类型"
                              >
                              <span>{sellteDetailData.business_name}</span>
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item
                              label = "扩租生效时间"
                              >
                              <span>{sellteDetailData.start_at}</span>
                              </Form.Item>
                            </Col>
                          </Row>
                          <Col span={24} style={{marginTop : 24}}>
                            <Row className="order_row">
                              <Col span={6}></Col>
                              <Col span={8}><span className="c1">原订单</span></Col>
                              <Col span={10}><span className="c1" style={{position : 'relative'}}>变更后<Icon className='new_icon' component={New}  /></span></Col> 
                            </Row>
                            <Row className="order_row">
                              <Col span={6}><span className="c1">订单总价</span></Col>
                              <Col span={8}><span className="c2">¥{old_order.charge_all_price ? (old_order.charge_all_price / 100).toFixed(2) : '0.00'}</span></Col>
                              <Col span={10}>
                                <Row>
                                  <Col span={16}><span className="c3">¥{sellteDetailData.charge_all_price ? (sellteDetailData.charge_all_price / 100).toFixed(2) : '0.00'}</span></Col>
                                  <Col span={8}><span style={shadowBoxCSS.c4}>¥{sellteDetailData.charge_all_price ? ((sellteDetailData.charge_all_price - old_order.charge_all_price) / 100).toFixed(2) : '0.00'}</span></Col>
                                </Row>
                              </Col> 
                            </Row>
                            <Row className="order_row">
                              <Col span={6}><span className="c1">办公服务内容</span></Col>
                              <Col span={8}><span className="c2">固定工位数&ensp;{old_pr.p}&emsp;房间数&ensp;{old_pr.r}</span></Col>
                              <Col span={10}>
                              <span className="c3">固定工位数&ensp;{pr.p}&emsp;房间数&ensp;{pr.r}</span>
                              </Col> 
                            </Row>
                            <Row className="order_row">
                              <Col span={6}><span className="c1">办公服务总价</span></Col>
                              <Col span={8}><span className="c2">¥{old_order.charge_all_price ? (old_order.charge_all_price / 100).toFixed(2) : '0.00'}</span></Col>
                              <Col span={10}>
                                <Row>
                                  <Col span={16}><span className="c3">¥{sellteDetailData.charge_all_price ? (sellteDetailData.charge_all_price / 100).toFixed(2) : '0.00'}</span></Col>
                                  <Col span={8}><span style={shadowBoxCSS.c4}>¥{sellteDetailData.charge_all_price ? ((sellteDetailData.charge_all_price - old_order.charge_all_price) / 100).toFixed(2) : '0.00'}</span></Col>
                                </Row>
                              </Col> 
                            </Row>
                            {/* <Row className="order_row">
                              <Col span={6}><span className="c1">免租期金额</span></Col>
                              <Col span={8}><span className="c2">¥50000.00</span></Col>
                              <Col span={10}>
                                <Row>
                                  <Col span={16}><span className="c3">¥50000.00</span></Col>
                                  <Col span={8}><span style={shadowBoxCSS.c4}>-¥50000.00</span></Col>
                                </Row>
                              </Col> 
                            </Row> */}
                            {
                              sellteDetailData.free_type != 1 ? (
                                <Row className="order_row">
                                  <Col span={6}><span className="c1">免租期</span></Col>
                                  <Col span={8}>
                                    {
                                    sellteDetailData.free_type!=1 ? (
                                      <span className="c2">{sellteDetailData.free_type == 2 ? '前置免租' : '后置免租'}&emsp;{sellteDetailData.free_days}天</span>
                                    ) : ''
                                    }
                                  </Col>
                                  <Col span={10}>
                                    {
                                    old_order.free_type!=1 ? (
                                      <span className="c3">{old_order.free_type == 2 ? '前置免租' : '后置免租'}&emsp;{old_order.free_days}天</span>
                                    ) : ''
                                    }
                                  </Col> 
                                  {/* <Col span={10}>
                                    {
                                    free_rent.free_type!=1 ? (
                                      <span className="c3">{free_rent.free_type == 2 ? '前置免租' : '后置免租'}&emsp;{free_rent.free_days}天</span>
                                    ) : ''
                                    }
                                  </Col>  */}
                                </Row>
                              ) : ''
                            }
                            <Row className="order_row">
                              <Col span={6}><span className="c1">押付方式</span></Col>
                              <Col span={8}><span className="c2">押{old_deposit_payment[0]}付{old_deposit_payment[1]}&emsp;提前{deposit_payment[2]}日交租</span></Col>
                              <Col span={10}>
                              <span className="c3">押{deposit_payment[0]}付{deposit_payment[1]}&emsp;提前{deposit_payment[2]}日交租</span>
                              </Col> 
                            </Row>
                            <Row className="order_row">
                              <Col span={6}><span className="c1">配送积分配额</span></Col>
                              <Col span={8}><span className="c2">{sellteDetailData.present_credits}积分/月&emsp;&emsp;{sellteDetailData.present_prints}打印纸张数/月</span></Col>
                              <Col span={10}>
                              <span className="c3">{old_order.present_credits}积分/月&emsp;&emsp;{old_order.present_prints}打印纸张数/月</span>
                              </Col> 
                            </Row>
                            <Row className="order_row">
                              <Col span={6}><span className="c1">租金年涨幅</span></Col>
                              {
                                'inc_rate' in sellteDetailData ? (
                                  <Col span={8}><span className="c2">{sellteDetailData.inc_rate}%</span></Col>
                                ) : ''
                              }
                              <Col span={10}>
                                <Row>
                                  {
                                  'inc_rate' in old_order ? (
                                      <Col span={16}><span className="c3">{old_order.inc_rate}%</span></Col>
                                    ) : ''
                                  }
                                  {/* <Col span={8}><span style={shadowBoxCSS.c4}>-¥50000.00</span></Col> */}
                                </Row>
                              </Col> 
                            </Row>
                          </Col>
                          <Col span={24} stlyle={{marginTop : 16}}>
                            <Form.Item
                              label = "申请原因"
                              >
                              <span style={{marginLeft : 32}}>{sellteDetailData.alter_reason}</span>
                            </Form.Item>
                          </Col>
                        </Form>
                    </div>
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
                      <Form style={{margin : "16px 0 8px",overflow : "hidden"}}>
                          <Row style={shadowBoxCSS.formItem}>
                          <Col span={8}>
                            <Form.Item
                            label = "申请变更类型" 
                            >
                              <span>{sellteDetailData.business_name}</span>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                            label = "变更生效时间" 
                            >
                              <span>{sellteDetailData.operator_name}</span>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                            label = "变更后内容" 
                            >
                              <span>固定工位数 {pr.p}&emsp;房间数 {pr.r}</span>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                            label = "总服务时长" 
                            >
                              <span>{sellteDetailData.diff_service_date}</span>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                            label = "变更后订单号" 
                            >
                              <span>{sellteDetailData.order_code}</span>
                            </Form.Item>
                          </Col>
                          </Row>
                      </Form>
                      <Divider style={{margin : '16px 0'}} />
                      <Row className='date_row'><Icon component={Calendar} />&emsp;<span>{sellteDetailData.inner_start_at ? sellteDetailData.inner_start_at.split(" ")[0] : ''}&ensp;至&ensp;{sellteDetailData.inner_end_at ? sellteDetailData.inner_end_at.split(" ")[0] : ''}</span><span style={{marginLeft : 36}}>{sellteDetailData.diff_inner_date}</span></Row>
                      {/* 订单商品信息 */}
                      <MxjTable
                        className='mxj_table'
                        //固定列
                        scroll={{ x: '100%' }}
                        columns={column_create}
                        showPaination={false}
                        dataSource={(()=>{
                          return goods.map((d,i)=>{
                              d.key = i;
                              return d;
                          })
                      })()}
                       />
                        {
                          sellteDetailData.free_start_at ? (
                          <Row className="date_footer">
                          <span className="free_rent">免租期</span>
                          <span style={{marginLeft : 55}}><Icon component={Calendar} />&emsp;{sellteDetailData.free_start_at ? sellteDetailData.free_start_at.split(" ")[0] : ''}&ensp;至&ensp;{sellteDetailData.free_end_at ? sellteDetailData.free_end_at.split(" ")[0] : ''}</span> 
                          </Row>
                          ) : ''
                        }
                        <Row style={{textAlign : 'right',marginTop : 16}}>
                          <p>原总价：<span style={shadowBoxCSS.c4}>¥{sellteDetailData.origin_all_price ? (sellteDetailData.origin_all_price / 100).toFixed(2) : '0.00'}/月</span><span style={{marginLeft : 41,marginRight : 14}}>成交总价：<span style={shadowBoxCSS.c4}>¥{sellteDetailData.charge_all_price ? (sellteDetailData.charge_all_price / 100).toFixed(2) : '0.00'}</span></span></p>
                        </Row>
                        <Divider style={{margin : '16px 0'}} />
                        <Form>
                          <Row style={shadowBoxCSS.formItem}>
                          <Col span={8}>
                          <Form.Item
                          label = "押付方式"
                          >
                            <span>押{deposit_payment[0]}付{deposit_payment[1]}&emsp;提前{deposit_payment[2]}日交租</span>
                          </Form.Item>
                          </Col>
                          <Col span={12}>
                          <Form.Item
                          label = "配送积分配额"
                          >
                            <span>{sellteDetailData.present_credits}&ensp;<span className="border_mon">积分/月</span></span>
                            <span style={{marginLeft : 24}}>{sellteDetailData.present_prints}&ensp;<span className="border_mon">打印纸张数/月</span></span>
                          </Form.Item>
                          </Col>
                          <Col span={4}>
                          <Form.Item
                          label = "订单折扣"
                          >
                            <span>{sellteDetailData.discount_rate}%</span>
                          </Form.Item>
                          </Col>
                          <Col span={8}>
                          <Form.Item
                          label = "年涨幅"
                          >
                            <span>{sellteDetailData.inc_rate}%</span>
                          </Form.Item>
                          </Col>
                          </Row>
                        </Form>
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
                      <span className='icon'></span>押金信息
                      </p><Divider style={shadowBoxCSS.divider} />
                      {/* 押金信息 */}
                      <MxjTable
                        className='mxj_table'
                        style={{marginTop : 32}}
                        //固定列
                        scroll={{ x: '100%' }}
                        showPaination={false}
                        columns={column_deposit}
                        dataSource={(()=>{
                          return getdeposits(deposit).map((d,i)=>{
                              d.key = i;
                              return d;
                          })
                      })()} 
                        footer={() => 
                          <p style={{textAlign : 'right',marginRight : 20}}>
                          {/* <span>应扣款合计: <em style={shadowBoxCSS.c4}>¥37688278.99</em></span> */}
                          <span style={{marginLeft : 40}}>押金总额: <em style={shadowBoxCSS.c4}>¥{deposit_amount ? (deposit_amount / 100).toFixed(2) : '0.00'}</em></span>
                          </p>
                        }
                      />
                    </div>
                    <div style={shadowBoxCSS.container}>
                      <p style={shadowBoxCSS.head}>
                      <span className='icon'></span>其他费用
                      </p><Divider style={shadowBoxCSS.divider} />
                      {/* 其他费用 */}
                      <MxjTable
                        className='mxj_table'
                        style={{marginTop : 32}}
                        //固定列
                        scroll={{ x: '100%' }}
                        showPaination={false}
                        columns={column_other}
                        dataSource={(()=>{
                          return other.map((d,i)=>{
                              d.key = i;
                              return d;
                          })
                      })()} 
                        footer={() => 
                        <p style={{textAlign : 'right',marginRight : 26}}>
                        <span style={{marginLeft : 40}}>其他费用总额: <em style={shadowBoxCSS.c4}>¥{other_amount ? (other_amount / 100).toFixed(2) : '0.00'}</em></span>
                          <span style={{marginLeft : 40}}>变更订单共计: <em style={shadowBoxCSS.c4}>¥{order_amount ? (order_amount / 100).toFixed(2) : '0.00'}</em></span>
                        </p>
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
})(CheckExpand);

