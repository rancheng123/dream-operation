import React, { Component,Fragment } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import ShadowBox from '@modules/shadowBox/shadowBox';

import {
    Row, Col, Divider, Form, Icon,Input, message
  } from 'antd';
  
import Title from '@modules/title/title';

// 审批流
import Approve from '../modules/approve';
// 组织信息
import OrganizeInfo from '../modules/organize_info';


import MxjSteps from '@modules/steps'
import MxjTable from '@widget/table/table';
import MxjHistory from '@modules/history';
import CheckBtn from './check_btn';

import { getdeposits,getGoodsPlace } from './global';
import api from '@api/checks';

import {column_order,column_return_deposit,
        column_detain_money,column_return_money,
        base_goods_info,
        column_deposit,column_create,column_other
      } 
  from './table_columns';

import Calendar from '@svg/calendar.svg'

import "./check_end.scss"

const { TextArea } = Input;
class CheckCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            th : "审核订单创建申请"
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
          formItem : {marginLeft : 8},
          formItem2 : {marginLeft : 20},
          carve : {paddingLeft : 30,borderLeft : '1px solid #e8e8e8'}
      }
      const { checks_wait } = this.props;
      const { sellteDetailData } = checks_wait;
      const { sales_rules={},finance_info = {},
      member_owner = {},deductions = {},refunds = {},goods = [],location_floors = {},
      is_intermediary=1,multi_info : {office_service_order_setting : { pattern_one=[],pattern_two=[] }},
      bill_list = {},audit_history = [] } = sellteDetailData; 
      const { compute_cost : {other=[],deposit=[],deposit_amount='',other_amount='',order_amount=''} } = finance_info;
      const pr = getGoodsPlace(goods)
      const deposit_payment = sellteDetailData.deposit_payment ? sellteDetailData.deposit_payment.split('-') : [];
      const sales_deposit_payment = sales_rules.deposit_pay_mode ? sales_rules.deposit_pay_mode.deposit_payment.split('-') : '';
      const payment = is_intermediary == 1 ? pattern_one : pattern_two; 
        return (
            <div className="check_end">
               <Title title={this.state.th} />
               <Approve sellteDetailData={sellteDetailData} />
               <ShadowBox style={shadowBoxCSS.box}>
                    <div style={shadowBoxCSS.container}>
                      <p style={shadowBoxCSS.head}>
                      <span className='icon'></span>审核信息
                      </p><Divider style={shadowBoxCSS.divider} />
                        <Form style={shadowBoxCSS.form}>
                          <Row style={shadowBoxCSS.formItem}>
                            <Col span={8}>
                              <Form.Item
                              label = "组织名称"
                              >
                              <span>{sellteDetailData.member_name}</span>
                              </Form.Item>
                            </Col>
                            <Col span={16}>
                              <Form.Item
                              label = "办公服务订单服务期"
                              >
                              {sellteDetailData.start_date}&ensp;至&ensp;{sellteDetailData.end_date}&ensp;<em style={shadowBoxCSS.c2}>{sellteDetailData.diff_service_date}</em>&ensp;<span>固定工位数&ensp;{pr.p}&emsp;房间数&ensp;{pr.r}</span>
                              </Form.Item>
                            </Col>
                          </Row>
                          {
                            'two_months_before_spring_festival' in sales_rules ? 
                            (<Fragment><Row className='form_title'>春节前两月到期</Row>
                              <Row style={shadowBoxCSS.formItem2}>
                                  <Col span={12}>
                                    <span>{sales_rules.two_months_before_spring_festival.start_date}&ensp;至&ensp;<span style={shadowBoxCSS.c4}>{sales_rules.two_months_before_spring_festival.end_date}</span></span> 
                                  </Col>
                                  <Col span={12}>
                                    <span>{sales_rules.two_months_before_spring_festival.spring_date.substring(0,4)}年春节：{sales_rules.two_months_before_spring_festival.spring_date}</span>
                                  </Col>
                                
                              </Row></Fragment>) : ''
                          }
                          {
                            'free_rent' in sales_rules && sales_rules.free_rent.free_type && sales_rules.free_rent.free_type!=1 ? (
                              <Fragment>
                                <Row className='form_title'>免租期</Row>
                                <Row style={shadowBoxCSS.formItem2}>
                                <Col span={24}>
                                  <span>{sales_rules.free_rent.free_type == 2 ? '前置免租' : '后置免租'}&ensp;<span style={shadowBoxCSS.c4}>{sales_rules.free_rent.free_days}</span>&ensp;天</span> 
                                </Col>
                                </Row>
                              </Fragment>
                            ) : ''
                          }
                          
                          {
                            sales_deposit_payment ? (
                              <Fragment>
                                <Row className='form_title'>押付方式</Row>
                                <Row style={shadowBoxCSS.formItem2} type={'flex'} justify={'space-between'}>
                                    <Col span={11} style={{marginTop : 8}}>
                                      <span>押{sales_deposit_payment[0]}付{sales_deposit_payment[1]}&emsp;提前{sales_deposit_payment[2]}日交租</span> 
                                    </Col>
                                    <Col span={13} style={{postion : 'relative'}}>
                                      
                                      <Row style={shadowBoxCSS.carve}>
                                        {
                                          payment.map(p=>{
                                            return <Col key={p.id} span={12} style={{marginTop : 8}}>
                                            <span>押{p.deposit_month}付{p.pay_month}&emsp;提前{p.pre_pay_day}日交租</span>
                                            </Col>
                                          })
                                        }
                                      </Row>
                                    </Col>
                                </Row>
                              </Fragment>
                            ) : ''
                          }
                          {
                            'presented_goods' in sales_rules ? (
                              <Fragment>
                                <Row className='form_title'>配送积分配额</Row>
                                <Row style={shadowBoxCSS.formItem2}>
                                    <Col span={11}>
                                          <Row style={{marginTop : 8}}><span><span style={shadowBoxCSS.c4}>{sales_rules.presented_goods.present_credits}</span>&emsp;积分/月&emsp;<span style={{marginLeft : 26}}>{sales_rules.presented_goods.present_prints}&emsp;打印纸张数/月</span></span></Row>
                                    </Col>
                                    <Col span={13} style={shadowBoxCSS.carve} >
                                    <Row style={{marginTop : 8}}><span>{sales_rules.presented_goods.default_present_credits}&emsp;积分/月</span><span style={{marginLeft : 123}}>{sales_rules.presented_goods.default_present_prints}&emsp;打印纸张数/月</span></Row>
                                    </Col>
                                    
                                </Row>
                              </Fragment>
                            ) : ''
                          }
                          {
                            'rent_amount_discount' in sales_rules ? (
                              <Fragment>
                                <Row className='form_title'>租金折扣</Row>
                                <Row style={shadowBoxCSS.formItem2}>
                                    <Col span={11}>
                                      <Row><span>租金折扣</span>&emsp;&emsp;&emsp;{sales_rules.rent_amount_discount.discount_rate}%</Row>
                                      <Row style={{marginTop : 8}}><span>当前有效租金</span>&emsp;&ensp;¥{sales_rules.rent_amount_discount.effective_rent ? (sales_rules.rent_amount_discount.effective_rent / 100).toFixed(2) : '0.00'}<span style={{marginLeft : 100}}>差值&ensp;<span style={shadowBoxCSS.c1}>¥{sales_rules.rent_amount_discount.min_effective_rent ? ((sales_rules.rent_amount_discount.min_effective_rent - sales_rules.rent_amount_discount.effective_rent) / 100).toFixed(2) : '0.00' }</span></span></Row>
                                    </Col>
                                    <Col span={13} style={shadowBoxCSS.carve}>
                                      <Row><span style={{marginRight : 55}}>本单最低租金付款折扣</span><span style={shadowBoxCSS.c4}>{sales_rules.rent_amount_discount.min_rent_discount_rate}%</span></Row>
                                      <Row style={{marginTop : 8}}>
                                        <Col span={12}><span>本单最低有效租金</span>&emsp;&ensp;<span style={shadowBoxCSS.c4}>¥{sales_rules.rent_amount_discount.min_effective_rent ? (sales_rules.rent_amount_discount.min_effective_rent / 100).toFixed(2) : '0.00'}</span></Col>
                                        {/* <Col span={12} style={{textAlign : 'right'}}><span>本单低价</span>&emsp;&ensp;<span style={shadowBoxCSS.c4}>¥50000.00</span></Col> */}
                                      </Row>
                                    </Col>
                                </Row>
                              </Fragment>
                            ) : ''
                          }
                          {
                            'rent_annual_raising' in sales_rules ? (
                              <Fragment>
                                <Row className='form_title'>租金年涨幅</Row>
                                <Row style={shadowBoxCSS.formItem2}>
                                    <Col span={11}>
                                      {
                                        sales_rules.rent_annual_raising.inc_rate || sales_rules.rent_annual_raising.inc_rate == 0 ? (
                                          <Row>
                                          <Col span={8}><span>年涨幅</span></Col>
                                          <Col span={6} style={{textAlign : 'center'}}><span style={{marginLeft : -60}}>{sales_rules.rent_annual_raising.inc_rate}%</span></Col>
                                          {/* <Col span={8}><span>差值&ensp;<span style={shadowBoxCSS.c1}>-¥2000.00</span></span></Col> */}
                                          </Row>
                                        ) : ''
                                      }
                                      {
                                        sales_rules.rent_annual_raising.actual_quoted_price_raising || sales_rules.rent_annual_raising.actual_quoted_price_raising == 0 ? (
                                          <Row style={{marginTop : 8}}>
                                          <Col span={8}><span>报价基础上浮</span></Col>
                                          <Col span={6} style={{textAlign : 'center'}}><span style={{marginLeft : -60}}>{sales_rules.rent_annual_raising.actual_quoted_price_raising}%</span></Col>
                                          {/* <Col span={8}><span>差值&ensp;<span style={shadowBoxCSS.c1}>-¥5000.00</span></span></Col> */}
                                          </Row>
                                        ) : ''
                                      }
                                      {
                                        sales_rules.rent_annual_raising.valid_rent_amount_raising || sales_rules.rent_annual_raising.valid_rent_amount_raising == 0 ? (
                                          <Row style={{marginTop : 8}}>
                                            <Col span={8}><span>有效租金上浮</span></Col>
                                            <Col span={6} style={{textAlign : 'center'}}><span style={{marginLeft : -60}}>{sales_rules.rent_annual_raising.valid_rent_amount_raising}%</span></Col>
                                            {/* <Col span={8}><span>差值&ensp;<span style={shadowBoxCSS.c1}>-¥5000.00</span></span></Col> */}
                                          </Row>
                                        ) : ''
                                      }
                                    </Col>
                                    <Col span={13} style={shadowBoxCSS.carve}>
                                      {
                                        sales_rules.rent_annual_raising.min_inc_rate ? (
                                          <Row style={{marginTop : 8}}>
                                            <Col span={6}><span>最低年涨幅</span></Col>
                                            <Col span={18}><span style={shadowBoxCSS.c4}>{sales_rules.rent_annual_raising.min_inc_rate}%</span></Col>
                                          </Row>
                                        ) : ''
                                      }
                                      {
                                        sales_rules.rent_annual_raising.min_actual_quoted_price_raising ? (
                                          <Row style={{marginTop : 8}}>
                                            <Col span={6}><span>最低报价基础上浮</span></Col>
                                            <Col span={18}><span style={shadowBoxCSS.c4}>{sales_rules.rent_annual_raising.min_actual_quoted_price_raising}%</span></Col>
                                          </Row>
                                        ) : ''
                                      }
                                      {
                                        sales_rules.rent_annual_raising.min_valid_rent_amount_raising ? (
                                          <Row style={{marginTop : 8}}>
                                            <Col span={6}><span>最低有效租金上浮</span></Col>
                                            <Col span={18}><span style={shadowBoxCSS.c4}>{sales_rules.rent_annual_raising.min_valid_rent_amount_raising}%</span></Col>
                                          </Row>
                                        ) : ''
                                      }
                                    </Col>
                                </Row>
                              </Fragment>
                            ) : ''
                          }
                          <Row className='form_title'>申请原因</Row>
                          <p style={shadowBoxCSS.formItem2}>{sellteDetailData.alter_reason}</p>
                        </Form>
                    </div>
                    <div style={shadowBoxCSS.container}>
                      <p style={shadowBoxCSS.head}>
                      <span className='icon'></span>订单基础信息
                      </p><Divider style={shadowBoxCSS.divider} /> 
                      <Form style={shadowBoxCSS.form}>
                          <Row style={shadowBoxCSS.formItem}>
                          <Col span={8}>
                            <Form.Item
                            label = "订单号" 
                            >
                              <span>{sellteDetailData.order_code}</span>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                            label = "下单时间" 
                            >
                              <span>{sellteDetailData.created_at}</span>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                            label = "操作人" 
                            >
                              <span>{sellteDetailData.operator_name}</span>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                            label = "订单状态" 
                            >
                              <span>{sellteDetailData.status_name}</span>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                            label = "订单共计" 
                            >
                              <span style={shadowBoxCSS.c4}>¥{sellteDetailData.charge_all_price ? (sellteDetailData.charge_all_price / 100).toFixed(2) : '0.00'}</span>
                            </Form.Item>
                          </Col>
                          </Row>
                      </Form>
                    </div>
                    <OrganizeInfo sellteDetailData={sellteDetailData} />
                    <div style={shadowBoxCSS.container}>
                      <p style={shadowBoxCSS.head}>
                      <span className='icon'></span>办公服务商品详细信息
                      </p><Divider style={shadowBoxCSS.divider} /> 
                      
                      <MxjTable
                      className='mxj_table'
                      //固定列
                      scroll={{ x: '100%' }}
                      columns={base_goods_info}
                      showPaination={false}
                      dataSource={(()=>{
                        return Object.entries(location_floors).map((d,i)=>{
                            d = d[1];
                            d.key = i;
                            return d;
                        })
                      })()}
                      />
                      <Form style={{margin : "16px 0 8px",overflow : "hidden"}}>
                          <Row style={shadowBoxCSS.formItem}>
                          <Col span={8}>
                            <Form.Item
                            label = "订单开始日" 
                            >
                              <span>{sellteDetailData.start_date}</span>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                            label = "订单截止日" 
                            >
                              <span>{sellteDetailData.end_date}</span>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                            label = "总服务时长" 
                            >
                              <span style={shadowBoxCSS.c1}>{sellteDetailData.diff_service_date}</span>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                            label = "办公服务订单内容" 
                            >
                              <span>固定工位数 {pr.p}&emsp;房间数 {pr.r}</span>
                            </Form.Item>
                          </Col>
                          </Row>
                      </Form>
                      <Divider style={{margin : '16px 0'}} />
                      <Row className='date_row'><Icon type='calendar' />&emsp;<span>{sellteDetailData.inner_start_at ? sellteDetailData.inner_start_at.split(" ")[0] : ''}&ensp;至&ensp;{sellteDetailData.inner_end_at ? sellteDetailData.inner_end_at.split(" ")[0] : ''}</span><span style={{marginLeft : 36}}>{sellteDetailData.diff_inner_date}</span></Row>
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
                          <p>原总价：<span style={shadowBoxCSS.c4}>¥{sellteDetailData.origin_all_price ? (sellteDetailData.origin_all_price / 100).toFixed(2) : '0.00'}</span><span style={{marginLeft : 41,marginRight : 14}}>成交总价：<span style={shadowBoxCSS.c4}>¥{sellteDetailData.charge_all_price ? (sellteDetailData.charge_all_price / 100).toFixed(2) : '0.00'}</span></span></p>
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
                        columns={column_deposit}
                        showPaination={false}
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
                        columns={column_other}
                        showPaination={false}
                        dataSource={(()=>{
                          return other.map((d,i)=>{
                              d.key = i;
                              return d;
                          })
                      })()} 
                        footer={() => 
                        <p style={{textAlign : 'right',marginRight : 26}}>
                        <span style={{marginLeft : 40}}>其他费用总额: <em style={shadowBoxCSS.c4}>
                        {other_amount ? (other_amount / 100).toFixed(2) : '0.00'}</em></span>
                          <span style={{marginLeft : 40}}>订单共计: <em style={shadowBoxCSS.c4}>¥{order_amount ? (order_amount / 100).toFixed(2) : '0.00'}</em></span>
                        </p>
                        }
                      />
                      {/* <p style={{marginTop : 24}}>备注:&emsp;无</p> */}
                    </div>
                    <div style={shadowBoxCSS.container}>
                      <p style={shadowBoxCSS.head}>
                      <span className='icon'></span>订单备注
                      </p><Divider style={shadowBoxCSS.divider} />
                      <Form style={{marginTop : 24}}>
                        <Row style={shadowBoxCSS.formItem}>
                          <Col span={6}>
                          <Form.Item
                            label="备注人"
                          >
                            <span>{sellteDetailData.operator_name}</span>
                          </Form.Item>
                          </Col>
                          <Col span={6}>
                          <Form.Item
                            label="备注时间"
                          >
                            <span>{sellteDetailData.created_at}</span>
                          </Form.Item>
                          </Col>
                        </Row>
                        <Row style={shadowBoxCSS.formItem}>
                          <Form.Item
                          style={{width : '100%',display : 'block',marginTop : 8}}
                          >
                          <p>{sellteDetailData.memo}</p>
                            {/* <TextArea
                              style={{height : 87,padding : '16px 24px'}}
                             /> */}
                          </Form.Item>
                        </Row>
                      </Form>
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
})(CheckCreate);

