import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import main_right from '@components/layout/main_right';
import utils from '../../../asset'
import {Icon, Button, Divider, Input,} from 'antd';

import MxjTable from '@widget/table_v2/table';

import DivItem from '@components/modules/divItem/divItem';
import ShadowBox from '@components/modules/shadowBox/shadowBox';
import Title from '@components/modules/title/title';
import SearchConditons from '@modules/searchConditions'
import OwnerType from '../modules/ownerType'
import {initState} from './space_owner_list_reducer'
import {Link} from "react-router";
import ColumsText from '@modules/columsText'



class Space_owner_list extends Component{
    constructor(){
        super();
    }

    componentDidMount() {
        //清空数据
        this.props.dispatch({
            type: 'space_owner_list',
            data: initState,
            reset: true,
            callback: ()=>{
                this.searchList()
            }
        })
        //清空数据




    }
    //获取列表
    searchList(){
        const {space_owner_list} = this.props;


        this.props.dispatch({
            type: 'space_owner_list',
            data: {
                loading: true
            }
        })
        fetchData({
            method: 'get',
            url: config.api + '/location/owner-list',
            data:{
                "name": space_owner_list.name,
                "type_id":space_owner_list.type_id,
                "page": space_owner_list.listData.page,
                //每页数量
                "per_page": space_owner_list.listData.per_page,
            }
        }).then((res)=>{
            this.props.dispatch({
                type: 'space_owner_list',
                data: {
                    loading: false
                }
            })
            if(res.code === 10000){
                res.data.page = res.data.current_page;
                this.props.dispatch({
                    type: 'space_owner_list',
                    data: {
                        listData: res.data
                    }
                })

            }
        })
    }

    render(){
        const {space_owner_list,dispatch} = this.props;
        return (
          <div>
              <div>
                  <Title title={'业主数据列表'} />
                  <ShadowBox>


                      <SearchConditons
                          data={[
                              {
                                  lg: 4,
                                  sm: 8,
                                  component: (
                                      <Input
                                          style={{width: '100%'}}
                                          placeholder={'请输入业主名称'}
                                          onChange={(e)=>{
                                              dispatch({
                                                  type: 'space_owner_list',
                                                  data: {
                                                      name: e.target.value
                                                  }
                                              })
                                          }}
                                      />
                                  )

                              },

                              {
                                  lg: 4,
                                  sm: 8,
                                  component: (
                                      <OwnerType
                                          placeholder="请选择"
                                          style={{width: '100%'}}
                                          defaultValue="业主类型"
                                          onChange={(value)=>{
                                              dispatch({
                                                  type: 'space_owner_list',
                                                  data: {
                                                      type_id: value
                                                  }
                                              })
                                          }}
                                      >

                                      </OwnerType>

                                  )

                              },


                              {
                                  lg: 4,
                                  sm: 8,
                                  component: (
                                      <div style={{width: '100%'}}>
                                          <Button
                                              type="primary"
                                              style={{width:77,height:32,marginRight: 24}}
                                              onChange={(value)=>{}}
                                              onClick={()=>{

                                                  //查询楼盘列表
                                                  this.searchList()

                                              }}
                                          >
                                              查询
                                          </Button>
                                      </div>
                                  )

                              }

                          ]}
                      >

                      </SearchConditons>



                      <Divider style={{margin:0}}/>

                      <DivItem>
                          <Button type="primary"
                                  style={{width:90,height:32,marginRight:16}}
                                  icon="plus"
                                  onClick={()=>{
                                      utils.Router.switchRoute(
                                          '/space/owner/add?'+
                                          'type=new'
                                      )
                                  }}
                          >
                              新建
                          </Button>


                      </DivItem>

                      {(()=>{
                          return (
                              <MxjTable
                                  className={'mxj-table-page-common'}
                                  //固定列
                                  //scroll={{ x: 1200 }}
                                  onPaginationChange={(listData)=>{
                                      dispatch({
                                          type: 'space_owner_list',
                                          data: {
                                              listData: listData
                                          },
                                          callback: ()=>{
                                              //查询楼盘列表
                                              this.searchList()
                                          }
                                      })



                                  }}
                                  loading={space_owner_list.loading}
                                  dataSource={space_owner_list.listData}


                                  columns={(()=>{

                                      var columns = [
                                          {
                                              title: '业主编号',
                                              dataIndex: 'code',
                                              key: 'code',
                                              width: 100,
                                              //fixed: 'left',
                                              render: (text,buildItem) => {
                                                  return (
                                                      <Link to={
                                                          '/space/owner/add?'+
                                                          'id='+ buildItem.id +
                                                          '&code='+ buildItem.code +
                                                          '&type=look'
                                                      } style={{textDecoration : 'underline'}}>{text}</Link>
                                                  )
                                              }
                                          },
                                          {
                                              title: '业主名称',
                                              dataIndex: 'name',
                                              key: 'name',
                                              render: (text) => {
                                                  return <ColumsText text={text} />
                                              },
                                          },
                                          {
                                              title: '业主类型',
                                              dataIndex: 'type_name',
                                              key: 'type_name',

                                          },
                                          {
                                              title: '关联场地数',
                                              dataIndex: 'location_num',
                                              key: 'location_num',

                                          },
                                          {
                                              title: '创建时间',
                                              dataIndex: 'created_at',
                                              key: 'created_at',


                                          },

                                          {
                                              title: '操作',
                                              key: 'operation',
                                              fixed: 'right',
                                              width: 100,
                                              render: (buildItem) => {
                                                  return (
                                                      <div>
                                                          <span style={{marginRight:'15px'}}>
                                                              <Icon
                                                                  type="eye"
                                                                  style={{color: '#0179FF' }}
                                                                  onClick={()=>{
                                                                      utils.Router.switchRoute(
                                                                          '/space/owner/add?'+
                                                                          'id='+ buildItem.id +
                                                                          '&code='+ buildItem.code +
                                                                          '&type=look'
                                                                      )

                                                                  }}
                                                              />
                                                          </span>
                                                          <span style={{marginRight:'15px'}}>
                                                                <Icon
                                                                    type="edit"
                                                                    style={{color: '#44D7B6'}}
                                                                    onClick={()=>{
                                                                        utils.Router.switchRoute(
                                                                            '/space/owner/add?'+
                                                                            'id='+ buildItem.id +
                                                                            '&code='+ buildItem.code +
                                                                            '&type=edit'
                                                                        )
                                                                    }}
                                                                />
                                                          </span>

                                                      </div>
                                                  )
                                              },
                                          },
                                      ]


                                      return columns
                                  })()}

                              />
                          )
                      })()}

                  </ShadowBox>
              </div>
          </div>
        )
    }

}
//
// var NewRightContent = main_right(Space_owner_list,[
//     {
//         text: '场地管理'
//     },
//     {
//         text: '房间信息管理'
//     },
//     {
//         text: '业主列表'
//     }
// ])


export default connect(function(state) {
  return {
      common: state.common,
      space_owner_list: state.space_owner_list
  };
})(Space_owner_list);

