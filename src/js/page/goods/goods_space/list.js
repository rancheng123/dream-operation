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
  Icon, 
  Button, Switch, Tag
} from 'antd';

import '../list.scss'

class GoodsSpaceList extends Component{
    constructor(){
        super();
        this.state = { 
          th : '工位办公服务商品数据列表',
          filter_visible : false,
          status_code : 1,
          
          columns : [
            {
              title: '商品编号', dataIndex: 'code', key: 'code',
              render: (text,record) => {
                return (
                    <Link to={"/goods/manage/space/detail/"+record.code} style={{textDecoration : 'underline'}}>{text}</Link>
                )
              }
            },

            {
              // <Icon style={{right : -24,cursor : 'pointer'}} type="filter" theme="filled" />
                title: <span style={{position : 'relative'}}>上架状态</span>,dataIndex: 'status_str', key: 'status_str',
                filterIcon : filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
                render: (text,record) => {
                  return (
                      <div>
                          <Tag style={{color : record.status_code == 2 ? '#36DCB6' : '#FF5555',border: record.status_code == 2 ? '1px solid #36DCB6' : '1px solid #FF5555',borderRadius: 2,backgroundColor : 'transparent'}}>{text}</Tag>
                      </div>
                  )
                }


            },
            // {
            //   title: <span style={{position : 'relative'}}>商品状态</span>,dataIndex: 'goods_status_str', key: 'goods_status_str',
            //   filterIcon : filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
            //   render: (text,record) => {
            //     return (
            //       <div>
            //         <span><em className="goods_status_cricle" style={{backgroundColor : this.getGoodsStatusByCode(record.goods_status_code)}}></em>{text}</span>
            //       </div>
            //     )
            //   }


            // },
            { title: '商品名称', dataIndex: 'goods_name', key: 'goods_name'},
            { title: '单位', dataIndex: 'unit', key: 'unit' },
            { title: '城市', dataIndex: 'city_name', key: 'city_name'},
            { title: '场地名称', dataIndex: 'place_name', key: 'place_name'},
            { title: '层数', dataIndex: 'floor', key: 'floor' },
            { title: '售价', dataIndex: 'sales_price', key: 'sales_price'},
            { title: '销售单位', dataIndex: 'sales_unit', key: 'sales_unit'},
            {
                title: '操作',
                key: 'op',
                // fixed : 'right',
                render: (text,record) => {
                    return (
                        <div>
                            <span style={{marginRight:'15px'}}>
                                <Link to={"/goods/manage/space/detail/"+record.code}><Icon type="eye" style={{color: '#0179FF' }}/></Link>
                            </span>
                            <span style={{marginRight:'15px'}}>
                                <Link to={"/goods/manage/space/edit/"+record.code}><Icon type="edit" style={{color: '#44D7B6'}} /></Link>
                            </span>
                            <span style={{marginRight:'15px'}}>
                                {/* <Switch checkedChildren="下" unCheckedChildren="上" onChange={this.changeSwitch.bind(this,record)} defaultChecked={record.status_code == 1 ? false : true} disabled={(record.goods_status_code == 1) || (record.goods_status_code == 2) ? false : true } /> */}
                                <Enable
                                  checkedChildren="下" unCheckedChildren="上"
                                  checked={record.status_code == 1 ? false : true}
                                  messageFn={(status)=>{
                                      return <p>商品已{status ? '上架' : '下架'}</p>
                                  }}
                                  fetchDataFn={(status)=>{
                                    let url = config.api + '/goods/station/online/'+record.code;
                                    if(!status) {
                                      url = config.api + '/goods/station/offline/'+record.code;
                                    }
                                      return {
                                          method: 'put',
                                          url,
                                          data: {}
                                      }
                                  }}
                                  onOk={()=>{
                                    this.getGoodsSpaceList();
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
        return "#FFC400";
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
      this.getGoodsSpaceList();
      this.getLocations(); 
      // const {dispatch} = this.props;
      // dispatch({
      //   type : 'goods_space_list',
      //   data : initState,
      //   callback : ()=>{
      //     this.getGoodsSpaceList();
      //     this.getLocations();
      //   }
      // }); 
    }
    componentWillUnmount() {
      const {dispatch} = this.props;
      dispatch({
        type : 'goods_space_list',
        reset : true,
        data : {
        }
      }); 
      
    }
    //获取工位列表
    getGoodsSpaceList(){
      const {goods_space_list,dispatch} = this.props;

      dispatch({         
        type: 'goods_space_list',
        data: {
            loading : true
        }
      });
      //获取工位列表
          fetchData({
            method : 'get',
            url : config.api + '/goods/station',
            data : goods_space_list.pageOption
        }).then((res)=>{

            if(res.code === 10000){
                dispatch({
                  
                    type: 'goods_space_list',
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
    //   let {goods_space_list,dispatch} = this.props; 
    //   goods_space_list.pageOption.city_code = locations[0];
    //   goods_space_list.pageOption.building_code = locations[1];
    //   goods_space_list.pageOption.place_code = locations[2];
    //   dispatch({
    //     type : "goods_space_list",
    //     data : {
    //       pageOption : goods_space_list.pageOption 
    //     }
    //   });
    // }
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
       
        const {goods_space_list,dispatch} = this.props;
        const {list : data} = goods_space_list.listData;
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
                                          value={goods_space_list.autoCompleteOpts.input.value}
                                          selectOpts={{
                                              value:goods_space_list.autoCompleteOpts.select.id,
                                              width: 100,
                                              data: goods_space_list.autoCompleteOpts.select.data,
                                              onChange: (id)=>{

                                                goods_space_list.autoCompleteOpts.select.id = id;
                                                goods_space_list.pageOption.search_field = id;

                                                  dispatch({
                                                      type: 'goods_space_list',
                                                      data: {
                                                          autoCompleteOpts: goods_space_list.autoCompleteOpts,
                                                          pageOption : goods_space_list.pageOption
                                                      }
                                                  })
                                              }
                                          }}
                                          dataSource={goods_space_list.autoCompleteOpts.input.dataSource}
                                          onChange={(value) => {

                                            goods_space_list.autoCompleteOpts.input.value = value;
                                            goods_space_list.pageOption.search = value;
                                              dispatch({
                                                  type: 'goods_space_list',
                                                  data: {
                                                      autoCompleteOpts: goods_space_list.autoCompleteOpts,
                                                      pageOption : goods_space_list.pageOption 
                                                  }
                                              })
                                          }}
                                          onSearch={(value) => {

                                              //模糊搜索 未完成(本期不做，勿删)
                                              return;

                                              goods_space_list.autoCompleteOpts.input.dataSource = !value ? [] : [
                                                  value,
                                                  value + value,
                                                  value + value + value,
                                              ];

                                              dispatch({
                                                  type: 'goods_space_list',
                                                  data: {
                                                      autoCompleteOpts: goods_space_list.autoCompleteOpts
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
                                        value={goods_space_list.locationCascader} 
                                        selectType={['locations', 'cities', 'buildings']}
                                        onChange={(values)=>{
                                          goods_space_list.pageOption.city_code = values.cities;
                                          goods_space_list.pageOption.building_code = values.buildings;
                                          goods_space_list.pageOption.place_code = values.locations;
                                          dispatch({
                                            type: 'goods_space_list',
                                            data: {
                                              locationCascader: values,
                                              pageOption : goods_space_list.pageOption 
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
                                                  this.getGoodsSpaceList();

                                              }}
                                          >
                                              查询
                                          </Button>
                                      </div>
                                  )

                              }
                              // ,
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

              {/* <MxjSiftColumns visible={this.state.filter_visible} sureFilterOperation={this.sureFilterOperation.bind(this)} filterOperation={this.filterOperation.bind(this)} columns={defaultColumns}  /> */}
              <MxjTable
                    className='mxj_table mxj-table-page-common'

                    //固定列
                    scroll={{ x: '100%' }}
                    loading={goods_space_list.loading}
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        pageSize : goods_space_list.pageOption.per_page,
                        current: goods_space_list.pageOption.page,
                        total: goods_space_list.listData.total,
                        //改变每页条数
                        onShowSizeChange: (current, pageSize)=>{
                          goods_space_list.pageOption.per_page = pageSize;
                          goods_space_list.pageOption.page = 1;
                          dispatch({
                              type: 'goods_space_list',
                              data: {
                                pageOption: goods_space_list.pageOption
                              }
                          })

                          //查询工位列表
                          this.getGoodsSpaceList()

                      },

                      //改变页码
                      onChange: (pageNumber)=>{

                        goods_space_list.pageOption.page = pageNumber;
                          dispatch({
                              type: 'goods_space_list',
                              data: {
                                pageOption: goods_space_list.pageOption
                              }
                          })

                          //查询工位列表
                          this.getGoodsSpaceList()


                      }
                        

                    }}
                    //checkbox 选中时
                    // onCheckboxSelect={(selectedRowKeys, selectedRows)=>{

                    //   dispatch({
                    //       type: 'goods_space_list',
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
    goods_space_list: state.goods_space_list
  };
})(GoodsSpaceList);

