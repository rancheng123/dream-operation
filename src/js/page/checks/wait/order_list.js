import React, { Component, PropTypes, Fragment } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import ShadowBox from '../../../components/modules/shadowBox/shadowBox';
import Title from '../../../components/modules/title/title';
import MxjTable from '../../../widget/table/table';

import MxjSiftColumns from '../../../components/modules/siftColumns'

// 城市楼盘场地 连动组件
import MxjLocationCascaderForm from '@/js/components/modules/locationCascader/formCascader'

import SearchConditons from '@modules/searchConditions'

import MxjAutoComplete from '../../../widget/autoComplete/autoComplete';

import Bind from 'lodash-decorators/bind';

import moment from 'moment';
import {
  Icon, Select, DatePicker, Button, Input
} from 'antd';

import api from '@api/checks';

import { order_type_code } from '../common/option'

import Observe from '@svg/observe.svg';
import Edit from '@svg/edit.svg';
import Check from '@svg/check.svg';
import '../list.scss'

const InputGroup = Input.Group;

class ChecksWaitOrderList extends Component{
    constructor(){
        super();
        this.state = { 
          //'订单审核'
          th : (_=>{
            const href = new URL(window.location.href);
            const searchParams = href.searchParams;
            const type_code = searchParams.get('type_code');
            return order_type_code[type_code].text 
          })(),
          filter_visible : false,
          status_code : 1,
          
          columns : [
            {
              title: '申请编号', dataIndex: 'code', key: 'code',
              render: (text,record) => {
                return (
                  ///goods/manage/space/detail/"+record.step_assignee_id"
                    <Link to={this.getDetailUrlByType(record.step_assignee_id)} style={{textDecoration : 'underline',cursor : 'pointer'}}>{text}</Link>
                )
              }
            },
            { title: '订单编号', dataIndex: 'request_code', key: 'request_code' },
            {
              title: <span style={{position : 'relative'}}>申请状态</span>,dataIndex: 'apply_status_text', key: 'apply_status_text',
              render: (text,record) => {
                return (
                  <div>
                    <span>{text}</span>
                  </div>
                )
              }


          },
            { title: '用户名称', dataIndex: 'member_name', key: 'member_name' },
            { title: '用户类型', dataIndex: 'member_type_text', key: 'member_type_text' },
            { title: '城市', dataIndex: 'city_name', key: 'city_name' },
            { title: '场地', dataIndex: 'location_name', key: 'location_name' },
            { title: '创建类型', dataIndex: 'business_name', key: 'business_name' },
            { title: '申请时间', dataIndex: 'applicant_at', key: 'applicant_at' },
            { title: '申请人', dataIndex: 'applicant_by_name', key: 'applicant_by_name' },
            {
                title: '操作',
                key: 'op',
                // fixed : 'right',
                render: (text,record) => {
                    return (
                        <div>
                            {/* <span style={{marginRight:'15px'}}>
                                <Link to={this.getDetailUrlByType(record.step_assignee_id)} style={{cursor : 'pointer'}}><Icon component={Observe} /></Link>
                            </span> */}
                            {/* <span style={{marginRight:'15px'}}>
                                <Link to={"/goods/manage/space/edit/"+record.code}><Icon component={Edit} /></Link>
                            </span> */}
                            <span style={{marginRight:'15px',color : "#FF5555"}}>
                            <Link to={this.getDetailUrlByType(record.step_assignee_id)} style={{cursor : 'pointer'}}><Icon component={Check} /></Link>
                            </span>
                        </div>
                    )
                }
            }
          ]
        };
    }
    @Bind()
    getDetailUrlByType(step_assignee_id){
          const href = new URL(window.location.href);
          const searchParams = href.searchParams;
          const type_code = searchParams.get('type_code');
          return order_type_code[type_code].path+step_assignee_id+'?type_code='+type_code
    }
    getGoodsStatusByCode(code){
      switch(code){
        case 1 :
        return "rgb(242,158,78)";
        case 2 : case 3 : case 4 :
        return "#36DCB6";
        default : 
        return "#FF5555"
      }

    }
    onSearch = keyword =>{
      console.log(1111,keyword);
    }

    /**
     * 筛选框确认按钮
     */
    sureFilterOperation(columns) {
      if(columns.length <= 0) return;
      this.setState({
          filter_visible : false,
          columns 
      })
    }
    //筛选取消按钮
    filterOperation(){
      this.setState({
        filter_visible : false
    })
    }

    showSiftModal(){
      this.setState({
        filter_visible: true
    }) 
    }

    // 生命周期
    componentDidMount() {
      //this.getApplyStatusList();
      this.getCheckListByCode();

    }
    componentWillUnmount() {
      const {dispatch} = this.props;
      dispatch({
        type : 'checks_wait_list',
        reset : true,
        data : {
        }
      }); 
    }
    //获取申请状态列表
    getApplyStatusList(){
      api.getApplyStatusList().then(res=>{
        if(res.code != 10000) return;
        const {checks_wait_list,dispatch} = this.props;
        checks_wait_list.applyStatusList = res.data;
        dispatch({
          type : 'checks_wait_list',
          data : {
            applyStatusList : checks_wait_list.applyStatusList 
          }
        });
      });
    }
    //获取审核订单列表
    getCheckListByCode(){
      const {checks_wait_list,dispatch} = this.props;
      const href = new URL(window.location.href);
      const searchParams = href.searchParams;
      const type_code = searchParams.get('type_code');
      const { pageOption } = checks_wait_list; 
      pageOption.type_code = type_code;
      dispatch({         
        type: 'checks_wait_list',
        data: {
            loading : true
        }
      });
      //通过审核编码获取审核列表
          api.getCheckListByCode(pageOption).then((res)=>{
            if(res.code === 10000){
                dispatch({
                    type: 'checks_wait_list',
                    data: {
                        listData: res.data,
                        pageOption,
                        loading : false
                    }
                })

            }
        })
    }
    // onChangeLocation(locations){
    //   let {checks_wait_list,dispatch} = this.props; 
    //   checks_wait_list.pageOption.city_code = locations[0];
    //   checks_wait_list.pageOption.building_code = locations[1];
    //   checks_wait_list.pageOption.palce_code = locations[2];
    //   dispatch({
    //     type : "checks_wait_list",
    //     data : {
    //       pageOption : checks_wait_list.pageOption 
    //     }
    //   });
    // }


    
    //更改时间（开始时间 结束时间）
    @Bind()
    changeDate(moment,date,type){
      const {checks_wait_list,dispatch} = this.props;
      const { pageOption } = checks_wait_list;
      pageOption[type] = date;
      dispatch({
        type : 'checks_wait_list',
        data : {
          pageOption
        }
      }); 
    }
    //更改申请状态
    @Bind()
    changeApplyStatus(value){
      const {checks_wait_list,dispatch} = this.props;
      const { pageOption } = checks_wait_list;
      pageOption.apply_status = value; 
      dispatch({
        type : 'checks_wait_list',
        data : {
          pageOption
        }
      });
    }
    render(){
        const {checks_wait_list,dispatch} = this.props;
        const { applyStatusList,listData } = checks_wait_list;
        const { data } = listData;  
        const defaultColumns = this.state.columns;
        
        return (
          <Fragment
                // className = 'check_container'
                // breadcrumbData={[
                //   {
                //     text: '审核管理'
                //   },
                //   ,
                //   {
                //       text: '待我审核&审批',
                //       key : '/checks/wait/project',
                //       path : '/checks/wait/project'
                //   },
                //   {
                      
                //       text: (_=>{
                //         const href = new URL(window.location.href);
                //         const searchParams = href.searchParams;
                //         const type_code = searchParams.get('type_code');
                //         return order_type_code[type_code].text
                //       })(),
                //       key : '/checks/wait/order'
                //   }
                // ]}
            >
          <Title title={this.state.th } />
          <ShadowBox>
            <SearchConditons
                          data={[
                              {
                                  lg: 8,
                                  sm: 24,
                                  component: (
                                      <MxjAutoComplete
                                          style={{width: '100%'}}
                                          value={checks_wait_list.autoCompleteOpts.input.value}
                                          selectOpts={{
                                              value:checks_wait_list.autoCompleteOpts.select_order.id,
                                              width: 100,
                                              data: checks_wait_list.autoCompleteOpts.select_order.data,
                                              onChange: (id)=>{

                                                checks_wait_list.autoCompleteOpts.select_order.id = id;
                                                checks_wait_list.pageOption.key_type = id;

                                                  dispatch({
                                                      type: 'checks_wait_list',
                                                      data: {
                                                          autoCompleteOpts: checks_wait_list.autoCompleteOpts,
                                                          pageOption : checks_wait_list.pageOption
                                                      }
                                                  })
                                              }
                                          }}
                                          dataSource={checks_wait_list.autoCompleteOpts.input.dataSource}
                                          onChange={(value) => {

                                            checks_wait_list.autoCompleteOpts.input.value = value;
                                            checks_wait_list.pageOption.key_value = value;
                                              dispatch({
                                                  type: 'checks_wait_list',
                                                  data: {
                                                      autoCompleteOpts: checks_wait_list.autoCompleteOpts,
                                                      pageOption : checks_wait_list.pageOption 
                                                  }
                                              })
                                          }}
                                          onSearch={(value) => {

                                              //模糊搜索 未完成(本期不做，勿删)
                                              return;

                                              checks_wait_list.autoCompleteOpts.input.dataSource = !value ? [] : [
                                                  value,
                                                  value + value,
                                                  value + value + value,
                                              ];

                                              dispatch({
                                                  type: 'checks_wait_list',
                                                  data: {
                                                      autoCompleteOpts: checks_wait_list.autoCompleteOpts
                                                  }
                                              })


                                          }}
                                          placeholder=""
                                      >

                                      </MxjAutoComplete>
                                  )

                              },
                              {
                                lg: 12,
                                sm: 24,
                                component: (
                                    <div style={{width: '100%'}}>
                                      <MxjLocationCascaderForm 
                                        value={checks_wait_list.locationCascader} 
                                        selectType={['locations', 'cities', 'buildings']}
                                        onChange={(values)=>{
                                          checks_wait_list.pageOption.city_code = values.cities;
                                          checks_wait_list.pageOption.build_code = values.buildings;
                                          checks_wait_list.pageOption.location_code = values.locations;
                                          dispatch({
                                            type: 'checks_wait_list',
                                            data: {
                                              locationCascader: values,
                                              pageOption : checks_wait_list.pageOption 
                                            }
                                          });
                                        }}
                                         />
                                    </div>
                                )
                              }
                              // ,
                              // {
                              //   lg: 4,
                              //   sm : 12,
                              //   component: (
                              //     <div style={{width: '100%',textAlign : 'right'}}>
                              //        <Select placeholder="全部申请状态"
                              //        onChange={this.changeApplyStatus}
                              //        style={{width : '100%'}}
                              //        >
                              //        <Option key={0} value={''}>全部</Option>
                              //           {
                              //            applyStatusList.map(a=>{
                              //              return <Option key={a.key} value={a.key}>{a.label}</Option>
                              //            })
                              //           } 
                              //        </Select>
                              //     </div>
                              //   )
                              // }
                              

                          ]}
                      >
                      </SearchConditons>
                      <SearchConditons
                        data={[
                          {
                            lg : 12,
                            sm : 12,
                            component: (
                              <div style={{width: '100%'}}>
                                <InputGroup compact>
                                  <DatePicker
                                    placeholder="开始时间"
                                    format="YYYY-MM-DD HH:mm:ss"
                                    onChange={(moment,date)=>this.changeDate(moment,date,'applicant_at_start')}
                                    // disabledDate={disabledDate}
                                    //disabledTime={disabledDateTime}
                                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                  />
                                  <DatePicker
                                    placeholder="结束时间"
                                    format="YYYY-MM-DD HH:mm:ss"
                                    // disabledDate={disabledDate}
                                    //disabledTime={disabledDateTime}
                                    onChange={(moment,date)=>this.changeDate(moment,date,'applicant_at_end')}
                                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                  />
                                </InputGroup>
                              
                              </div>
                            ) 
                          },
                          {
                            lg : 12,
                            sm : 12,
                            component: (
                              <Button type="primary" style={{width : 78,float : "right"}} onClick={e=>this.getCheckListByCode()}>查询</Button>
                            ) 
                          }
                        ]}
                      >
                      </SearchConditons>

              <MxjSiftColumns visible={this.state.filter_visible} sureFilterOperation={this.sureFilterOperation.bind(this)} filterOperation={this.filterOperation.bind(this)} columns={defaultColumns}  />
              <MxjTable
                    className='mxj_table mxj-table-page-common'

                    //固定列
                    scroll={{ x: '100%' }}
                    loading={checks_wait_list.loading}
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        defaultCurrent: 1,
                        pageSize : checks_wait_list.pageOption.per_page,
                        total: checks_wait_list.listData.total,
                        //改变每页条数
                        onShowSizeChange: (current, pageSize)=>{
                          checks_wait_list.pageOption.per_page = pageSize;
                          dispatch({
                              type: 'checks_wait_list',
                              data: {
                                pageOption: checks_wait_list.pageOption
                              }
                          })

                          //查询审核订单列表
                          this.getCheckListByCode()

                      },

                      //改变页码
                      onChange: (pageNumber)=>{

                        checks_wait_list.pageOption.page = pageNumber;
                          dispatch({
                              type: 'checks_wait_list',
                              data: {
                                pageOption: checks_wait_list.pageOption
                              }
                          })

                          //查询审核订单列表
                          this.getCheckListByCode()


                      }
                        

                    }}
                    columns={this.state.columns}
                    dataSource={(()=>{
                      return data.map((d,i)=>{
                          d.key = i;
                          return d;
                      })
                  })()}

                />
          </ShadowBox>
          </Fragment>        
        )
    }

}



export default connect(function(state) {
  return {
      common: state.common,
      checks_wait_list: state.checks_wait_list
  };
})(ChecksWaitOrderList);

