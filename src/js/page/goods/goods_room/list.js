import React, { Component, PropTypes } from 'react';
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

import Enable from '../../space/modules/enable';

import {
  Row, Col, Icon, 
  Button, Divider, Switch, Tag
} from 'antd';

import '../list.scss'

class GoodsRoomList extends Component{
    constructor(){
        super();
        this.state = { 
          th : '房间办公服务商品列表',
          filter_visible : false,
          status_code : 1,
          
          columns : [
            {
              title: '商品编号', dataIndex: 'code', key: 'code',width : '20%',
              render: (text,record) => {
                return (
                    <Link to={"/goods/manage/room/detail/"+record.code} style={{textDecoration : 'underline'}}>{text}</Link>
                )
              }
            },

            {
                title: <span style={{position : 'relative'}}>上架状态</span>,dataIndex: 'status_str', key: 'status_str',
                filterIcon : filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
                render: (tags,record) => {
                  return (
                      <div>
                          <Tag style={{color : record.status_code == 2 ? '#36DCB6' : '#FF5555',border: record.status_code == 2 ? '1px solid #36DCB6' : '1px solid #FF5555',borderRadius: 2,backgroundColor : 'transparent'}}>{tags}</Tag>
                      </div>
                  )
                }


            },
            // {
            //     title: <span style={{position : 'relative'}}>商品状态</span>,dataIndex: 'goods_status_str', key: 'goods_status_str',
            //     filterIcon : filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
            //     render: (text,record) => {
            //       return (
            //         <div>
            //           <span><em className="goods_status_cricle" style={{backgroundColor : this.getGoodsStatusByCode(record.goods_status_code)}}></em>{text}</span>
            //         </div>
            //       )
            //     }


            // },
            { title: '城市', dataIndex: 'city_name', key: 'city_name' },
            { title: '商品名称', dataIndex: 'goods_name', key: 'goods_name' },
            { title: '单位', dataIndex: 'unit', key: 'unit' },
            { title: '朝向', dataIndex: 'orientation', key: 'orientation' },
            { title: '销售面积', dataIndex: 'acreage', key: 'acreage' },
            { title: '场地名称', dataIndex: 'place_name', key: 'place_name' },
            { title: '层数', dataIndex: 'floor', key: 'floor',
            render: (text,record) => {
              return (
                <div>
                  <span>{record.floor}层</span>
                </div>
              )
            }
           },
            { title: '售价', dataIndex: 'sales_price', key: 'sales_price' },
            { title: '价格单位', dataIndex: 'sales_unit', key: 'sales_unit' },
            {
                title: '操作',
                key: '13',
                // fixed : 'right',
                render: (text,record) => {
                    return (
                        <div>
                            <span style={{marginRight:'15px'}}>
                                <Link to={"/goods/manage/room/detail/"+record.code}><Icon type="eye" style={{color: '#0179FF' }}/></Link>
                            </span>
                            <span style={{marginRight:'15px'}}>
                                <Link to={"/goods/manage/room/edit/"+record.code}><Icon type="edit" style={{color: '#44D7B6'}} /></Link>
                            </span>
                            <span style={{marginRight:'15px'}}>
                                {/* <Switch checkedChildren="下" unCheckedChildren="上" onChange={this.changeSwitch.bind(this,record)} defaultChecked={record.status_code == 1 ? false : true} disabled={(record.goods_status_code == 5) || (record.goods_status_code == 6) ? true : false } /> */}
                                <Enable
                                  checkedChildren="下" unCheckedChildren="上"
                                  checked={record.status_code == 1 ? false : true}
                                  messageFn={(status)=>{
                                      return <p>商品已{status ? '上架' : '下架'}</p>
                                  }}
                                  fetchDataFn={(status)=>{
                                    let url = config.api + '/goods/room/online/'+record.code;
                                    if(!status) {
                                      url = config.api + '/goods/room/offline/'+record.code;
                                    }
                                      return {
                                          method: 'put',
                                          url,
                                          data: {}
                                      }
                                  }}
                                  onOk={()=>{
                                    this.getGoodsRoomList();
                                  }}
                                />
                            </span>
                        </div>
                    )
                }
            }
          ]
        };
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
      this.getGoodsRoomList();
      this.getLocations();
    }
    componentWillUnmount() {
      const {dispatch} = this.props;
      dispatch({
        type : 'goods_room_list',
        reset : true,
        data : {
        }
      }); 
    }
    //获取房间列表
    getGoodsRoomList(){
      const {goods_room_list,dispatch} = this.props;
      dispatch({         
          type: 'goods_room_list',
          data: {
              loading : true
          }
      });
      //获取工位列表
          fetchData({
            method : 'get',
            url : config.api + '/goods/room',
            data : goods_room_list.pageOption
        }).then((res)=>{
            console.log(res)
            if(res.code === 10000){
                dispatch({
                  
                    type: 'goods_room_list',
                    data: {
                        listData: res.data,
                        loading : false
                    }
                })

            }
        })
    }
    //获取城市楼盘场地数据
    getLocations(){

    }
    // onChangeLocation(locations){
    //   let {goods_room_list,dispatch} = this.props; 
    //   goods_room_list.pageOption.city_code = locations[0];
    //   goods_room_list.pageOption.building_code = locations[1];
    //   goods_room_list.pageOption.place_code = locations[2];
    //   dispatch({
    //     type : "goods_room_list",
    //     data : {
    //       pageOption : goods_room_list.pageOption 
    //     }
    //   });
    // }
    changeSwitch(data,switchStatus){
      let url = config.api + '/goods/room/online/'+data.code;
      if(!switchStatus) {
        url = config.api + '/goods/room/offline/'+data.code;
      }

      //上下架商品
      fetchData({
        method : 'put',
        url,
        data : {}
      }).then((res)=>{

          if(res.code === 10000){
              this.getGoodsRoomList();

          }
      })
      
    }
    render(){
        const {goods_room_list,dispatch} = this.props;
        const {list : data} = goods_room_list.listData;
        const labels = [{label : "商品名称",value : "goodsName"},{label : "商品编号",value : "goodsNo"}];
        const defaultColumns = this.state.columns;
        return (
          <div className='goods_container'>
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
                                          value={goods_room_list.autoCompleteOpts.input.value}
                                          selectOpts={{
                                              value:goods_room_list.autoCompleteOpts.select.id,
                                              width: 100,
                                              data: goods_room_list.autoCompleteOpts.select.data,
                                              onChange: (id)=>{

                                                goods_room_list.autoCompleteOpts.select.id = id;
                                                goods_room_list.pageOption.search_field = id;

                                                  dispatch({
                                                      type: 'goods_room_list',
                                                      data: {
                                                          autoCompleteOpts: goods_room_list.autoCompleteOpts,
                                                          pageOption : goods_room_list.pageOption
                                                      }
                                                  })
                                              }
                                          }}
                                          dataSource={goods_room_list.autoCompleteOpts.input.dataSource}
                                          onChange={(value) => {

                                            goods_room_list.autoCompleteOpts.input.value = value;
                                            goods_room_list.pageOption.search = value;
                                              dispatch({
                                                  type: 'goods_room_list',
                                                  data: {
                                                      autoCompleteOpts: goods_room_list.autoCompleteOpts,
                                                      pageOption : goods_room_list.pageOption 
                                                  }
                                              })
                                          }}
                                          onSearch={(value) => {

                                              //模糊搜索 未完成(本期不做，勿删)
                                              return;

                                              goods_room_list.autoCompleteOpts.input.dataSource = !value ? [] : [
                                                  value,
                                                  value + value,
                                                  value + value + value,
                                              ];

                                              dispatch({
                                                  type: 'goods_room_list',
                                                  data: {
                                                      autoCompleteOpts: goods_room_list.autoCompleteOpts
                                                  }
                                              })


                                          }}
                                          placeholder=""
                                      >

                                      </MxjAutoComplete>
                                  )

                              },
                              {
                                lg: 14,
                                sm: 24,
                                component: (
                                    <div style={{width: '100%'}}>
                                      <MxjLocationCascaderForm 
                                      value={goods_room_list.locationCascader}
                                      selectType={['buildings', 'cities', 'locations']}
                                      onChange={(values)=>{
                                        goods_room_list.pageOption.city_code = values.cities;
                                        goods_room_list.pageOption.building_code = values.buildings;
                                        goods_room_list.pageOption.place_code = values.locations;
                                        dispatch({
                                          type: 'goods_room_list',
                                          data: {
                                            locationCascader: values,
                                            pageOption : goods_room_list.pageOption 
                                          }
                                        });
                                      }}
                                        />
                                    </div>
                                )

                              },
                              {
                                  lg: 2,
                                  sm: 12,
                                  component: (
                                      <div style={{width: '100%'}}>
                                          <Button
                                              type="primary"
                                              style={{width:77,height:32}}
                                              onChange={(value)=>{}}
                                              onClick={()=>{

                                                  //查询工位列表
                                                  this.getGoodsRoomList();

                                              }}
                                          >
                                              查询
                                          </Button>
                                      </div>
                                  )

                                }
                              //   ,
                              // {
                              //   lg: 3,
                              //   sm: 12,
                              //   component: (
                              //       <div style={{width: '100%'}}>
                              //          <Button icon="down" style={{width : 107,float : 'right'}} onClick={this.showSiftModal.bind(this)}>筛选</Button>
                              //       </div>
                              //   )

                              // }
                              

                          ]}
                      >

                      </SearchConditons>
              <MxjSiftColumns visible={this.state.filter_visible} sureFilterOperation={this.sureFilterOperation.bind(this)} filterOperation={this.filterOperation.bind(this)} columns={defaultColumns}  />

              <MxjTable
                    className='mxj_table mxj-table-page-common'

                    //固定列
                    scroll={{ x: '100%' }}
                    loading={goods_room_list.loading}
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        current: goods_room_list.pageOption.per_page,
                        pageSize : goods_room_list.pageOption.per_page,
                        total: goods_room_list.listData.total,
                        //改变每页条数
                        onShowSizeChange: (current, pageSize)=>{
                          goods_room_list.pageOption.per_page = pageSize;
                          goods_room_list.pageOption.page = 1;
                          dispatch({
                              type: 'goods_room_list',
                              data: {
                                pageOption: goods_room_list.pageOption
                              }
                          })

                          //查询房间列表
                          this.getGoodsRoomList()

                      },

                      //改变页码
                      onChange: (pageNumber)=>{

                        goods_room_list.pageOption.page = pageNumber;
                          dispatch({
                              type: 'goods_room_list',
                              data: {
                                pageOption: goods_room_list.pageOption
                              }
                          })

                          //查询房间列表
                          this.getGoodsRoomList()


                      }
                        

                    }}
                    //checkbox 选中时
                    // onCheckboxSelect={(selectedRowKeys, selectedRows)=>{

                    //   dispatch({
                    //       type: 'goods_room_list',
                    //       data: {
                    //           checkedList: selectedRows.map((selectedRow,i)=>{
                    //               return selectedRow.id
                    //           })
                    //       }
                    //   })
                    // }}
                    columns={this.state.columns}
                    dataSource={(()=>{
                      return data.map((d,i)=>{
                          d.key = d.code;
                          return d;
                      })
                  })()}

                />

          </ShadowBox>
          </div>
        )
    }

}


export default connect(function(state) {
  return {
    common: state.common,
    goods_room_list: state.goods_room_list
  };
})(GoodsRoomList);

