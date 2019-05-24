import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import main_right from '@components/layout/main_right';
import utils from '../../../asset'
import {Icon,  Button, Divider, Modal, } from 'antd';

import MxjTable from '@widget/table_v2/table';
import MxjAutoComplete from '@widget/autoComplete_v2/autoComplete';
import DivItem from '@components/modules/divItem/divItem';
import ShadowBox from '@components/modules/shadowBox/shadowBox';
import Title from '@components/modules/title/title';
import SearchConditons from '@modules/searchConditions'
import StatusTag from '../modules/statusTag'
import StationType from '../modules/stationType';
import MxjOperationStatus from '../modules/operationStatus'
import ProvinceCityBuildLocation from '@widget/provinceCityBuildLocation'
import Enable from '../../../components/modules/enable'
import config from "../../../config";
import Delete from '../modules/delete'
import {initState} from './space_station_list_reducer'
import {Link} from "react-router";
import ColumsText from '@modules/columsText'



class Space_station_list extends Component{
    constructor(){
        super();
    }

    componentDidMount() {
        //清空数据
        this.props.dispatch({
            type: 'space_station_list',
            data: initState,
            reset: true,
            callback: ()=>{
                //查询楼盘列表
                this.searchList()
            }
        })
        //清空数据



    }


    //获取列表
    searchList(){
        const {space_station_list,dispatch} = this.props;
        var data = {
            type_id: space_station_list.type_id,
            status_id: space_station_list.status_id,
            city_code: space_station_list.city_code,
            building_code: space_station_list.building_code,
            location_code: space_station_list.location_code,
            //请求页
            "page": space_station_list.listData.page,
            //每页数量
            "per_page": space_station_list.listData.per_page,
        }
        data[ space_station_list.autoCompleteOpts.select ] = space_station_list.autoCompleteOpts.input


        this.props.dispatch({
            type: 'space_station_list',
            data: {
                loading: true
            }
        })
        fetchData({
            method: 'get',
            url: config.api + '/location/station-list',
            data: data
        }).then((res)=>{
            this.props.dispatch({
                type: 'space_station_list',
                data: {
                    loading: false
                }
            })
            if(res.code === 10000){

                res.data.page = res.data.current_page;
                this.props.dispatch({
                    type: 'space_station_list',
                    data: {
                        listData: res.data
                    }
                })
            }
        })
    }


    //删除楼盘
    delete(ids){
        fetchData({
            method: 'post',
            url: config.api + '/location/station-delete',
            data:{
                code: ids
            }
        }).then((res)=>{
            if(res.code === 10000){
                Modal.info({
                    title: '提示',
                    content: (
                        <div>
                            <p>删除成功</p>
                        </div>
                    ),
                    onOk:()=> {


                        //查询楼盘列表
                        this.searchList()
                    },
                });
            }
        })
    }



    render(){
        const {space_station_list,dispatch} = this.props;
        return (
          <div>
              <div>
                  <Title title={'工位数据列表'} />
                  <ShadowBox>


                      <SearchConditons
                          data={[
                              {
                                  lg: 8,
                                  sm: 24,
                                  component: (
                                      <MxjAutoComplete
                                          style={{width: '100%'}}
                                          value={space_station_list.autoCompleteOpts}
                                          onChange={(data) => {
                                              dispatch({
                                                  type: 'space_station_list',
                                                  data: {
                                                      autoCompleteOpts: data
                                                  }
                                              })
                                          }}
                                          selectOpts={{
                                              width: 100,
                                              data: [
                                                  {
                                                      value: '工位名称',
                                                      id: 'name'
                                                  },
                                                  {
                                                      value: '工位编号',
                                                      id: 'code'
                                                  }
                                              ]
                                          }}
                                          onSearch={(value,callback) => {
                                              return;
                                              //模糊搜索 未完成(本期不做，勿删)
                                              var res =  space_station_list.autoCompleteOpts.dataSource = !value ? [] : [
                                                  value,
                                                  value + value,
                                                  value + value + value,
                                              ];
                                              callback(res)
                                          }}
                                          placeholder=""
                                      >

                                      </MxjAutoComplete>
                                  )

                              },

                              {
                                  lg: 16,
                                  sm: 8,
                                  component: (
                                      <ProvinceCityBuildLocation
                                          selectType={['cities','buildings','locations']}
                                          style={{width: '100%'}}
                                          disabled={false}

                                          value={{
                                              city_code: space_station_list.city_code,
                                              building_code: space_station_list.building_code,
                                              location_code: space_station_list.location_code,
                                          }}
                                          onChange={(obj)=>{
                                              dispatch({
                                                  type: 'space_station_list',
                                                  data: {
                                                      city_code: obj.city_code,
                                                      building_code: obj.building_code,
                                                      location_code: obj.location_code,
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
                                      <StationType
                                          style={{width: '100%'}}
                                          defaultValue="全部工位类型"
                                          onChange={(value)=>{
                                              dispatch({
                                                  type: 'space_station_list',
                                                  data: {
                                                      type_id: value
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
                                      <MxjOperationStatus
                                          style={{width: '100%'}}
                                          defaultValue="全部状态"
                                          onChange={(value)=>{
                                              dispatch({
                                                  type: 'space_station_list',
                                                  data: {
                                                      status_id: value
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
                                          '/space/station/add?'+

                                          'type=new'
                                      )
                                  }}
                          >
                              新建
                          </Button>


                         {/* {(()=>{
                              if(space_station_list.checkedList.length>0){
                                  return (
                                      <Popconfirm
                                          title="您确定删除吗?"
                                          onConfirm={()=>{
                                              this.delete(space_station_list.checkedList)
                                          }}
                                          //onCancel={cancel}
                                          okText="是"
                                          cancelText="不"
                                      >

                                          <Button
                                              style={{width:107,height:32}}
                                          >批量删除</Button>
                                      </Popconfirm>
                                  )
                              }else{
                                  return (
                                      <Button
                                          style={{width:107,height:32}}
                                          disabled={true}
                                      >批量删除</Button>
                                  )

                              }
                          })()}
*/}



                      </DivItem>




                      {(()=>{
                          return (
                              <MxjTable
                                  className={'mxj-table-page-common'}

                                  loading={space_station_list.loading}
                                  dataSource={space_station_list.listData}
                                  onPaginationChange={(listData)=>{
                                      dispatch({
                                          type: 'space_station_list',
                                          data: {
                                              listData: listData
                                          },
                                          callback: ()=>{
                                              this.searchList()
                                          }
                                      })


                                  }}
                                  //checkbox 选中时
                                  /*onCheckboxSelect={(selectedRowKeys, selectedRows)=>{

                                      dispatch({
                                          type: 'space_station_list',
                                          data: {
                                              checkedList: selectedRows.map((selectedRow,i)=>{
                                                  return selectedRow.id
                                              })
                                          }
                                      })
                                  }}*/
                                  //固定列
                                  scroll={{ x: 1200 }}

                                  columns={(()=>{

                                      var columns = [
                                          {
                                              title: '工位编号',
                                              dataIndex: 'code',
                                              key: 'code',
                                              width: 100,
                                              //fixed: 'left',
                                              render: (text,buildItem) => {
                                                  return (
                                                      <Link to={
                                                          '/space/station/add?'+
                                                          'id='+ buildItem.id +
                                                          '&code='+ buildItem.code +
                                                          '&type=look'
                                                      } style={{textDecoration : 'underline'}}>{text}</Link>
                                                  )
                                              }
                                          },
                                          {
                                              title: '当前状态',
                                              dataIndex: 'status_name',
                                              key: 'status_name',
                                              width: 100,
                                              //fixed: 'left',
                                              render: (station_disabled) => {
                                                  return (
                                                      <StatusTag
                                                          status={station_disabled}
                                                      />
                                                  )
                                              },
                                          },
                                          {
                                              title: '工位名称',
                                              dataIndex: 'name',
                                              key: 'name',
                                              render: (text) => {
                                                  return <ColumsText text={text} />
                                              },
                                          },
                                          {
                                              title: '城市',
                                              dataIndex: 'city_name',
                                              key: 'city_name',

                                          },
                                          {
                                              title: '工位类型',
                                              dataIndex: 'type_name',
                                              key: 'type_name',
                                          },
                                          {
                                              title: '场地名称',
                                              dataIndex: 'location_name',
                                              key: 'location_name',
                                              render: (text) => {
                                                  return <ColumsText text={text} />
                                              },

                                          },
                                          {
                                              title: '楼盘名称',
                                              dataIndex: 'building_name',
                                              key: 'building_name',
                                              render: (text) => {
                                                  return <ColumsText text={text} />
                                              },

                                          },
                                          {
                                              title: '操作',
                                              key: 'operation',
                                              fixed: 'right',
                                              width: 120,
                                              render: (buildItem) => {
                                                  return (
                                                      <div>
                                                          <span style={{marginRight:'15px'}}>
                                                              <Icon
                                                                  type="eye"
                                                                  style={{color: '#0179FF' }}
                                                                  onClick={()=>{
                                                                      utils.Router.switchRoute(
                                                                          '/space/station/add?'+
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
                                                                            '/space/station/add?'+
                                                                            'id='+ buildItem.id +
                                                                            '&code='+ buildItem.code +
                                                                            '&type=edit'
                                                                        )
                                                                    }}
                                                                />
                                                          </span>
                                                          <span style={{marginRight:'15px'}}>
                                                              <Delete
                                                                  fetchDataFn={()=>{
                                                                      return {
                                                                          method: 'post',
                                                                          url: config.api + '/location/station-delete',
                                                                          data:{
                                                                              code: [buildItem.code]
                                                                          }
                                                                      }
                                                                  }}
                                                                  onOk={()=>{
                                                                      //查询楼盘列表
                                                                      this.searchList()
                                                                  }}
                                                              />
                                                          </span>

                                                      </div>
                                                  )
                                              },
                                          },

                                          {
                                              title: '是否启用',
                                              key: 'isEnable',
                                              fixed: 'right',
                                              width: 90,
                                              render: (buildItem) => {

                                                  return (
                                                      <Enable
                                                          checked={buildItem.disabled == 0 ? true : false}
                                                          messageFn={(status)=>{
                                                              return <p>工位已{status ? '启用' : '停用'}</p>
                                                          }}
                                                          fetchDataFn={ (status)=>{
                                                              return {
                                                                  method: 'post',
                                                                  url: config.api + '/location/station-disable/' + buildItem.code,
                                                                  data: {
                                                                      disabled: status? 0: 1
                                                                  }
                                                              }
                                                          }}
                                                          onOk={()=>{
                                                              //查询楼盘列表
                                                              this.searchList()
                                                          }}
                                                      />
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

// var NewRightContent = main_right(Space_station_list,[
//     {
//         text: '场地管理'
//     },
//     {
//         text: '工位信息管理'
//     },
//     {
//         text: '工位列表'
//     }
// ])


export default connect(function(state) {
  return {
      common: state.common,
      space_station_list: state.space_station_list
  };
})(Space_station_list);

