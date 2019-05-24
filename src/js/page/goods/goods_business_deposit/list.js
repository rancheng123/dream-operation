import React, { Component ,Fragment} from 'react';
import { connect } from 'react-redux';

import main_right from '../../../components/layout/main_right';
import Title from '../../../components/modules/title/title';
import MxjTable from '../../../widget/table/table';
import ShadowBox from '../../../components/modules/shadowBox/shadowBox';
import MxjSelectSearch from '../../../components/modules/selectSearch'
//押金品详情
import DepositDetailForm from './detailModal'
//编辑押金品
import DepositEditForm from './editModal'
//新建押金品
import DepositCreateForm from './createModal'

import MxjSiftColumns from '../../../components/modules/siftColumns'

import MxjLocationCascader from '../../../components/modules/locationCascader'

import SearchConditons from '@modules/searchConditions'

import MxjAutoComplete from '../../../widget/autoComplete/autoComplete';

import {
  Row, Col, Select, Icon, Input, Button, Divider, Switch, Tag, Modal, Form
} from 'antd';

import './deposit.scss'




// rowSelection object indicates the need for row selection

const loacationData = {
  "data": {
    "cities": [
        {
            "city_code": 130600000000,
            "city_name": "保定市"
        },
        {
            "city_code": 130600000001,
            "city_name": "保定市1"
        }
    ],
    "buildings": [
        {
            "building_code": "BD006",
            "building_name": "250中德英伦城堡",
            "city_code": 130600000000
        },
        {
            "building_code": "BD005",
            "building_name": "251中德英伦城堡",
            "city_code": 130600000001
        },
        {
          "building_code": "BD004",
          "building_name": "252中德英伦城堡",
          "city_code": 130600000000
      }
    ],
    "locations": [
        {
            "location_code": "CD00101",
            "location_name": "场地1",
            "building_code": "BD006",
            "city_code": 130600000000
        },
        {
            "location_code": "CD00102",
            "location_name": "场地2",
            "building_code": "BD005",
            "city_code": 130600000001
        },
        {
            "location_code": "CD00103",
            "location_name": "场地3",
            "building_code": "BD006",
            "city_code": 130600000000
        }
    ]
},
  selectProps : [
    {placeholder : "全部城市",labelName : "cities",codeName : "city_code",locationName : "city_name"},
    {placeholder : "全部楼盘",labelName : "buildings",codeName : "building_code",locationName : "building_name"},
    {placeholder : "全部场地",labelName : "locations",codeName : "location_code",locationName : "location_name"}
  ]
}
class GoodsBusinessDepositList extends Component{
    constructor(){
        super();
        this.state = { 
          th : '业务押金品管理',
          detail_visible : false,
          edit_visible : false,
          create_visible : false,
          filter_visible : false,
          columns : [
            {
              title: '押金品编号', width: 110, dataIndex: 'code', key: '0'
            },
            { title: '押金品名称', dataIndex: 'deposit_name', key: '1' },
            { title: '押金品单位', dataIndex: 'address', key: '2' },
            { title: '押金品单价', dataIndex: 'unit', key: '3' },
            { title: '城市', dataIndex: 'city_name', key: '4' },
            { title: '场地', dataIndex: 'place_name', key: '5' },
            { title: '创建时间', dataIndex: 'create_time', key: '6' },
            {
                title: '操作',
                key: 'operation',
                width: 150,
                render: text => {
                    return (
                        <div>
                            <span style={{marginRight:'15px'}}>
                                <Icon type="eye" onClick={
                                  ()=>this.showDetailModal(text.name)
                                  } style={{color: '#0179FF' }}/>
                            </span>
                            <span style={{marginRight:'15px'}}>
                                <Icon type="edit" onClick={
                                  ()=>this.showEditModal(text.name)
                                  } style={{color: '#44D7B6'}} />
                            </span>
                            {/* <span style={{marginRight:'15px'}}>
                                <Switch checkedChildren="下" unCheckedChildren="上" onChange={this.changeSwitch.bind(this,record)} defaultChecked={record.status_code == 1 ? false : true} />
                            </span> */}
                        </div>
                    )
                }
            }
          ]
        };
    }
    //详情
    showDetailModal(id){
      this.setState({detail_visible : true});
    }
    hideDetailModal(){
      this.setState({detail_visible : false});
    }
    //编辑
    showEditModal(id){
      this.setState({edit_visible : true});
    }
    hideEditModal(){
      this.setState({edit_visible : false});
    }
    //新建
    showCreateModal(id){
      this.setState({create_visible : true});
    }
    hideCreateModal(){
      this.setState({create_visible : false});
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
    //获取城市楼盘场地数据
    getLocations(){

    }
    onChangeLocation(locations){
      let {goods_business_deposit_list,dispatch} = this.props; 
      goods_business_deposit_list.pageOption.city_code = locations[0];
      goods_business_deposit_list.pageOption.building_code = locations[1];
      goods_business_deposit_list.pageOption.palce_code = locations[2];
      // dispatch({
      //   type : "goods_business_deposit_list",
      //   data : {
      //     pageOption : goods_business_deposit_list.pageOption 
      //   }
      // });
    }

    // 生命周期
    componentDidMount() {
      // 清除 start
      componentStore.set(this);
      this.getGoodsBusinessDepositList();
      this.getLocations();
      // 清除 end
    }
    componentWillUnmount() {
        // 清除 start
        componentStore.clear(this);
        // 清除 end
    }
    //获取业务押金品列表
    getGoodsBusinessDepositList(){
      const {goods_business_deposit_list,dispatch} = this.props;
      //获取工位列表
          fetchData({
            method : 'get',
            url : config.api + '/goods/deposit/goods',
            data : goods_business_deposit_list.pageOption
        }).then((res)=>{

            if(res.code === 10000){
                dispatch({
                  
                    type: 'goods_business_deposit_list',
                    data: {
                        listData: res.data
                    }
                })

            }
        })
    }
    changeSwitch(data,switchStatus){
      let url = config.api + '/goods/station/online/'+data.code;
      if(!switchStatus) {
        url = config.api + '/goods/station/offline/'+data.code;
      }

      //上下架商品
      fetchData({
        method : 'put',
        url,
        data : {}
      }).then((res)=>{

          if(res.code === 10000){
              this.getGoodsSpaceList();

          }
      })
      
    }
    render(){
      const {goods_business_deposit_list,dispatch} = this.props;
      const {list : data} = goods_business_deposit_list.listData;
      const defaultColumns = this.state.columns;
        return (
          <div className="deposit">
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
                                          value={goods_business_deposit_list.autoCompleteOpts.input.value}
                                          selectOpts={{
                                              value:goods_business_deposit_list.autoCompleteOpts.select.id,
                                              width: 150,
                                              data: goods_business_deposit_list.autoCompleteOpts.select.data,
                                              onChange: (id)=>{

                                                goods_business_deposit_list.autoCompleteOpts.select.id = id;
                                                goods_business_deposit_list.pageOption.search_field = id;

                                                  dispatch({
                                                      type: 'goods_business_deposit_list',
                                                      data: {
                                                          autoCompleteOpts: goods_business_deposit_list.autoCompleteOpts,
                                                          pageOption : goods_business_deposit_list.pageOption
                                                      }
                                                  })
                                              }
                                          }}
                                          dataSource={goods_business_deposit_list.autoCompleteOpts.input.dataSource}
                                          onChange={(value) => {

                                            goods_business_deposit_list.autoCompleteOpts.input.value = value;
                                            goods_business_deposit_list.pageOption.search = value;
                                              dispatch({
                                                  type: 'goods_business_deposit_list',
                                                  data: {
                                                      autoCompleteOpts: goods_business_deposit_list.autoCompleteOpts,
                                                      pageOption : goods_business_deposit_list.pageOption 
                                                  }
                                              })
                                          }}
                                          onSearch={(value) => {

                                              //模糊搜索 未完成(本期不做，勿删)
                                              return;

                                              goods_business_deposit_list.autoCompleteOpts.input.dataSource = !value ? [] : [
                                                  value,
                                                  value + value,
                                                  value + value + value,
                                              ];

                                              dispatch({
                                                  type: 'goods_business_deposit_list',
                                                  data: {
                                                      autoCompleteOpts: goods_business_deposit_list.autoCompleteOpts
                                                  }
                                              })


                                          }}
                                          placeholder=""
                                      >

                                      </MxjAutoComplete>
                                  )

                              },
                              {
                                lg: 10,
                                sm: 24,
                                component: (
                                    <div style={{width: '100%'}}>
                                       <MxjLocationCascader onChangeLocation={this.onChangeLocation.bind(this)} locationData={loacationData} /> 
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
                                            style={{width:77,height:32,marginRight: 24}}
                                            onChange={(value)=>{}}
                                            onClick={()=>{
                                                this.showCreateModal()

                                            }}
                                        >
                                            新建
                                        </Button>
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
                                              style={{width:77,height:32,marginRight: 24}}
                                              onChange={(value)=>{}}
                                              onClick={()=>{

                                                  //查询工位列表
                                                  this.getGoodsSpaceList();

                                              }}
                                          >
                                              查询
                                          </Button>
                                      </div>
                                  )

                              },
                              {
                                lg: 2,
                                sm: 12,
                                component: (
                                    <div style={{width: '100%'}}>
                                       <Button icon="down" style={{width : 78}} onClick={this.showSiftModal.bind(this)}>筛选</Button>
                                    </div>
                                )

                              }
                              

                          ]}
                      >

                      </SearchConditons>
                      <MxjSiftColumns visible={this.state.filter_visible} sureFilterOperation={this.sureFilterOperation.bind(this)} filterOperation={this.filterOperation.bind(this)} columns={defaultColumns}  />
                    <MxjTable
                        className={'mxj_table'}

                        //固定列
                        scroll={{ x: 1300 }}

                        pagination={{
                            showQuickJumper: true,
                            showSizeChanger: true,
                            defaultCurrent: 1,
                            total: goods_business_deposit_list.listData.total,
                            //改变每页条数
                            onShowSizeChange: (current, pageSize)=>{
                              goods_business_deposit_list.pageOption.limit = pageSize;
                              dispatch({
                                  type: 'goods_business_deposit_list',
                                  data: {
                                    pageOption: goods_business_deposit_list.pageOption
                                  }
                              })

                              //查询工位列表
                              this.getGoodsBusinessDepositList()

                            }, 
                            onChange: (pageNumber)=>{
                              goods_business_deposit_list.pageOption.page = pageNumber;
                              dispatch({
                                  type: 'goods_business_deposit_list',
                                  data: {
                                    pageOption: goods_business_deposit_list.pageOption
                                  }
                              })

                              //查询业务押金品列表
                              this.getGoodsBusinessDepositList()  
                            }

                        }}
                        rowSelection={this.state.rowSelection}
                        columns={this.state.columns}
                        dataSource={(()=>{
                          return data.map((d,i)=>{
                              d.key = d.code;
                              return d;
                          })
                        })()}

                    />
                    <DepositDetailForm visible={this.state.detail_visible} hideDetailModal={this.hideDetailModal.bind(this)} />
                    <DepositEditForm visible={this.state.edit_visible} hideEditModal={this.hideEditModal.bind(this)} />
                    <DepositCreateForm visible={this.state.create_visible} hideCreateModal={this.hideCreateModal.bind(this)} />
              </ShadowBox>

          </div>
        )
    }

}

var NewRightContent = main_right(GoodsBusinessDepositList,[
    {
        text: '商品管理'
    },
    {
        text: '商品配置管理'
    },
    {
      text: '业务押金品管理',
      key : '/goods/business_deposit/'
  }
])


export default connect(function(state) {
  return {
    common: state.common,
    goods_business_deposit_list : state.goods_business_deposit_list
  };
})(NewRightContent);

