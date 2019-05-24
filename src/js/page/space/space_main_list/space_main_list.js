import React, { Component, PropTypes, Fragment } from 'react';
import { connect } from 'react-redux';
import main_right from '../../../components/layout/main_right';
import utils from '../../../asset'
import {Icon} from 'antd';
import MxjTable from '../../../widget/table_v2/table';
import ShadowBox from '../../../components/modules/shadowBox/shadowBox';
import Title from '../../../components/modules/title/title';

import {initState} from './space_main_list_reducer'
import {Link} from "react-router";

class Space_main_list extends Component{
    constructor(){
        super();
    }

    componentDidMount() {






        //清空数据
        this.props.dispatch({
            type: 'space_main_list',
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

        this.props.dispatch({
            type: 'space_main_list',
            data: {
                loading: true
            }
        })
        fetchData({
            method: 'get',
            url: config.api + '/location/main-body-list',
            data:{}
        }).then((res)=>{
            this.props.dispatch({
                type: 'space_main_list',
                data: {
                    loading: false
                }
            })

            if(res.code === 10000){
                res.data.page = res.data.current_page;
                this.props.dispatch({
                    type: 'space_main_list',
                    data: {
                        listData: res.data
                    }
                })

            }
        })
    }

    render(){
        const {space_main_list} = this.props;
        return (
          <div>
              <div>
                  <Title title={'主体数据列表'} />
                  <ShadowBox>
                      {(()=>{
                          return (
                              <MxjTable
                                  className={'mxj-table-page-common'}
                                  //固定列
                                  //scroll={{ x: 1200 }}

                                  pagination={false}
                                  loading={space_main_list.loading}
                                  columns={(()=>{

                                      var columns = [
                                          {
                                              title: '主体编号',
                                              dataIndex: 'code',
                                              key: 'code',
                                              width: 100,
                                              fixed: 'left',
                                              render: (text,buildItem) => {
                                                  return (
                                                      <Link to={
                                                          '/space/main/add?id='+
                                                          buildItem.id +
                                                          '&type=look'
                                                      } style={{textDecoration : 'underline'}}>{text}</Link>
                                                  )
                                              }
                                          },
                                          {
                                              title: '主体名称',
                                              dataIndex: 'name',
                                              key: 'name',
                                          },
                                          {
                                              title: '统一信用代码',
                                              dataIndex: 'credit_code',
                                              key: 'credit_code',

                                          },
                                          {
                                              title: '主体简称',
                                              dataIndex: 'main_short_name',
                                              key: 'main_short_name',

                                          },
                                          {
                                              title: '关联场地数',
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
                                                                          '/space/main/add?id='+
                                                                          buildItem.id +
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
                                                                        utils.Router.switchRoute('/space/main/add?' +
                                                                            '&code='+ buildItem.code + '' +
                                                                            '&id='+ buildItem.id + '' +
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

                                  //数据个数转换入口
                                  dataSource={space_main_list.listData}

                              />
                          )
                      })()}

                  </ShadowBox>
              </div>
          </div>
        )
    }

}

// var NewRightContent = main_right(Space_main_list,[
//     {
//         text: '场地管理'
//     },
//     {
//         text: '房间信息管理'
//     },
//     {
//         text: '主体列表'
//     }
// ])


export default connect(function(state) {
  return {
      common: state.common,
      space_main_list: state.space_main_list
  };
})(Space_main_list);

