import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import main_right from '@components/layout/main_right';
import utils from '../../../asset'
import {Icon, Button, Divider} from 'antd';

import MxjTable from '@widget/table_v2/table';
import MxjAutoComplete from '@widget/autoComplete_v2/autoComplete';
import DivItem from '@components/modules/divItem/divItem';
import ShadowBox from '@components/modules/shadowBox/shadowBox';
import Title from '@components/modules/title/title';
import SearchConditons from '@modules/searchConditions'
import ProvinceCityBuildLocation from '@widget/provinceCityBuildLocation';
import Delete from '../modules/delete'
import config from "../../../config";
import ColumsText from '@modules/columsText'
import {Link} from "react-router";
import fetchData from "../../../api/fetchData";

class Space_build_list extends Component{
    constructor(){
        super();
    }

    componentDidMount() {

   /*     fetchData({
            method: 'post',
            url: config.api + '/user/login',
            data: {
                "username": '1',
                "password": 2
            },
            errorHandle: {
                40004: ()=>{

                },
                20001: ()=>{

                }
            },
        }).then((res) => {
        })
return*/



        //清空数据
        this.props.dispatch({
            type: 'space_build_list',
            reset: true,
            callback: ()=>{
                //查询楼盘列表
                this.searchBuildList()
            }
        })
        //清空数据
    }
    //获取楼盘列表
    searchBuildList(){

        const {space_build_list,dispatch} = this.props;

        var data = {
            "city_code":space_build_list.city_code?Number(space_build_list.city_code): '',
            //请求页
            "page": space_build_list.listData.page,
            //每页数量
            "per_page": space_build_list.listData.per_page,
        }
        data[ space_build_list.autoCompleteOpts.select ]  = space_build_list.autoCompleteOpts.input


        this.props.dispatch({
            type: 'space_build_list',
            data: {
                loading: true
            }
        })

        fetchData({
            method: 'get',
            url: config.api + '/location/building-list',
            data:data
        }).then((res)=>{


            if(res.code === 10000){
                res.data.page = res.data.current_page;

                this.props.dispatch({
                    type: 'space_build_list',
                    data: {
                        listData: res.data
                    }
                })

                this.props.dispatch({
                    type: 'space_build_list',
                    data: {
                        loading: false
                    }
                })

            }
        })




    }

    render(){
        const {space_build_list,dispatch} = this.props;
        return (
            <div>
                <div>
                    <Title title={'楼盘数据列表'} />
                    <ShadowBox>
                        <SearchConditons
                            data={[
                                {
                                    lg: 8,
                                    sm: 24,
                                    component: (
                                        <MxjAutoComplete
                                            style={{width: '100%'}}
                                            value={space_build_list.autoCompleteOpts}
                                            onChange={(data) => {
                                                dispatch({
                                                    type: 'space_build_list',
                                                    data: {
                                                        autoCompleteOpts: data
                                                    }
                                                })
                                            }}
                                            selectOpts={{
                                                width: 100,
                                                data: [
                                                    {
                                                        value: '楼盘名称',
                                                        id: 'name'
                                                    },
                                                    {
                                                        value: '楼盘编号',
                                                        id: 'code'
                                                    }
                                                ]
                                            }}
                                            onSearch={(value,callback) => {
                                                return;
                                                //模糊搜索 未完成(本期不做，勿删)
                                                var res =  space_build_list.autoCompleteOpts.dataSource = !value ? [] : [
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
                                    lg: 4,
                                    sm: 8,
                                    component: (

                                        <ProvinceCityBuildLocation
                                            selectType={['cities']}
                                            style={{width: '100%'}}
                                            value={{
                                                city_code: space_build_list.city_code
                                            }}
                                            onChange={(obj)=>{
                                                dispatch({
                                                    type: 'space_build_list',
                                                    data: {
                                                        city_code: obj.city_code
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
                                                    this.searchBuildList()

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
                                            '/space/build/add?'+
                                            'type=new'
                                        )
                                    }}
                            >
                                新建
                            </Button>


                            {/*{(()=>{
                              if(space_build_list.checkedList.length>0){
                                  return (
                                      <Popconfirm
                                          title="您确定删除吗?"
                                          onConfirm={()=>{
                                              this.deleteBuild(space_build_list.checkedList)
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
                          })()}*/}




                        </DivItem>

                        {(()=>{


                            return (
                                <MxjTable
                                    className={'mxj-table-page-common'}
                                    columns={(()=>{
                                        var columns = [
                                            {
                                                title: '楼盘编号',
                                                dataIndex: 'code',
                                                key: 'code',
                                                width: 100,
                                                //fixed: 'left',
                                                render: (text,buildItem) => {
                                                    return (
                                                        <Link to={
                                                            '/space/build/add?'+
                                                            'id='+ buildItem.id +
                                                            '&code='+ buildItem.code +
                                                            '&type=look'
                                                        } style={{textDecoration : 'underline'}}>{text}</Link>
                                                    )
                                                }
                                            },
                                            {
                                                title: '城市',
                                                dataIndex: 'city_name',
                                                key: 'city_name',
                                                width: 100,
                                               //fixed: 'left',
                                            },
                                            {
                                                title: '楼盘名称',
                                                dataIndex: 'name',
                                                key: 'name',
                                                render: (text) => {
                                                    return <ColumsText text={text} />
                                                }
                                            },
                                            {
                                                title: '开发商',
                                                dataIndex: 'developer',
                                                key: 'developer',
                                                render: (text) => {
                                                    return <ColumsText text={text} />
                                                }

                                            },
                                            {
                                                title: '下辖场地数',
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
                                                                          '/space/build/add?'+
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
                                                                            '/space/build/add?'+
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
                                                                          url: config.api + '/location/building-delete/'+ buildItem.id,
                                                                      }
                                                                  }}
                                                                  onOk={()=>{
                                                                      //查询楼盘列表
                                                                      this.searchBuildList()
                                                                  }}
                                                              />





                                                          </span>
                                                        </div>
                                                    )
                                                },
                                            },
                                        ];
                                        return columns;
                                    })()}
                                    scroll={{ x: 1000 }}
                                    dataSource={space_build_list.listData}
                                    loading={space_build_list.loading}
                                    onPaginationChange={(listData)=>{
                                        dispatch({
                                            type: 'space_build_list',
                                            data: {
                                                listData: listData
                                            },
                                            callback: ()=>{
                                                //查询楼盘列表
                                                this.searchBuildList()
                                            }
                                        })


                                    }}
                                    //checkbox 选中时
                                    /*onCheckboxSelect={(selectedRowKeys, selectedRows)=>{

                                        dispatch({
                                            type: 'space_build_list',
                                            data: {
                                                checkedList: selectedRows.map((selectedRow,i)=>{
                                                    return selectedRow.id
                                                })
                                            }
                                        })
                                    }}*/


                                />
                            )
                        })()}

                    </ShadowBox>
                </div>
            </div>
        )
    }

}

// var NewRightContent = main_right(Space_build_list,[
//     {
//         text: '场地管理'
//     },
//     {
//         text: '场地信息管理'
//     },
//     {
//         text: '楼盘列表'
//     }
// ])


export default connect(function(state) {
    return {
        common: state.common,
        space_build_list: state.space_build_list
    };
})(Space_build_list);

