import React, { Component, PropTypes,Fragment } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import utils from '../../asset'
import ShadowBox from '@components/modules/shadowBox/shadowBox';
import Title from '@components/modules/title/title';
import MxjTable from '@widget/table/table';

import SearchConditons from '@modules/searchConditions';

import MxjAutoComplete from '@widget/autoComplete/autoComplete';

import api from '@api/organize'

import {
  Icon, Button, Divider, Select,Input
} from 'antd';

import './list.scss'
import Bind from 'lodash-decorators/bind';

const {Option} = Select;
const {Search} = Input;
class OrganizeList extends Component{
    constructor(){
        super();
        this.state = { 
          th : '组织列表',
          columns : [
            // {
            //   title: '组织编号', dataIndex: 'id', key: 'id',
            //   render: (text,record) => {
            //     return (
            //         <Link to={"/goods/space/detail/"+record.id}>{text}</Link>
            //     )
            //   }
            // },
            { title: '创建时间', dataIndex: 'created_at', key: 'created_at' },
            { title: '组织名称', dataIndex: 'name', key: 'name' },
            { title: '组织类型', dataIndex: 'type_name', key: 'type_name' },
            { title: '所有人', dataIndex: 'owner_name', key: 'owner_name' },
            { title: '联系方式', dataIndex: 'owner_mobile', key: 'owner_mobile' },
            {
                title: '操作',
                key: 'op',
                // fixed : 'right',
                render: (text,record) => {
                    return (
                        <div>
                            <span style={{marginRight:'15px'}}>
                                <Link to={"/organize/owner/detail/"+record.id}><Icon type="eye" style={{color: '#0179FF' }}/></Link>
                            </span>
                            <span style={{marginRight:'15px'}}>
                                <Link to={"/organize/owner/edit/"+record.id}><Icon type="edit" style={{color: '#44D7B6'}} /></Link>
                            </span>
                        </div>
                    )
                }
            }
          ]
        };
    }
    onSearch = keyword =>{
      console.log(1111,keyword);
    }

    // 生命周期
    componentDidMount() {
        this.getOrganizeTypeList();
      this.getOrganizeList();
    }
    componentWillUnmount() {
      const {dispatch} = this.props;
      dispatch({
        type : 'organize_list',
        reset : true,
        data : {
        }
      }); 
    }
    //获取组织相关类型列表
    getOrganizeTypeList(){
        const {dispatch} = this.props;
        api.getOrganizeTypeList().then(res=>{
            dispatch({
                type: 'organize_list',
                data: {
                  organizeTypeList: res.data
                }
            })
          }); 
    }
    
    //获取组织列表
    getOrganizeList(){
      const {organize_list,dispatch} = this.props;
        dispatch({  
            type: 'organize_list',
            data: {
                loading : true
            }
        });
      //获取组织列表
      api.getOrganizeList(organize_list.pageOption).then(res=>{
        dispatch({
                  
            type: 'organize_list',
            data: {
                listData: res.data,
                loading : false
            }
        });
      });
    }

    getOrganizeName = e =>{
        const {organize_list,dispatch} = this.props;
        organize_list.pageOption.name = e.target.value; 
        dispatch({
            type : "organize_list",
            data : {
                pageOption : organize_list.pageOption
            }
        });
    }
    @Bind()
    changeOrganizeType(value){
        const {organize_list,dispatch} = this.props;
        const { pageOption } = organize_list;
        pageOption.type_id = value;
        dispatch({
          type : 'organize_list',
          data : {
            pageOption
          } 
        });
    }
    render(){
        const {organize_list,dispatch} = this.props;
        const { data } = organize_list.listData;
        const {org_type} = organize_list.organizeTypeList;
        return (
          <div className='orgin_container'>
            <Title title={this.state.th } />
            <ShadowBox> 
              <SearchConditons
                            height = "32px"
                            data={[
                              
                                {
                                    lg: 7,
                                    sm: 24,
                                    component: (
                                        <Search
                                        placeholder="请输入组织名称"
                                        onChange={this.getOrganizeName}
                                        />
                                      //   <MxjAutoComplete
                                      //       style={{width: '100%'}}
                                      //       value={organize_list.autoCompleteOpts.input.value}
                                      //       selectOpts={{
                                      //           value:organize_list.autoCompleteOpts.select.id,
                                      //           width: 100,
                                      //           data: organize_list.autoCompleteOpts.select.data,
                                      //           onChange: (id)=>{

                                      //             organize_list.autoCompleteOpts.select.id = id;
                                      //             organize_list.pageOption.search_field = id;

                                      //               dispatch({
                                      //                   type: 'organize_list',
                                      //                   data: {
                                      //                       autoCompleteOpts: organize_list.autoCompleteOpts,
                                      //                       pageOption : organize_list.pageOption
                                      //                   }
                                      //               })
                                      //           }
                                      //       }}
                                      //       dataSource={organize_list.autoCompleteOpts.input.dataSource}
                                      //       onChange={(value) => {

                                      //         organize_list.autoCompleteOpts.input.value = value;
                                      //         organize_list.pageOption.search = value;
                                      //           dispatch({
                                      //               type: 'organize_list',
                                      //               data: {
                                      //                   autoCompleteOpts: organize_list.autoCompleteOpts,
                                      //                   pageOption : organize_list.pageOption 
                                      //               }
                                      //           })
                                      //       }}
                                      //       onSearch={(value) => {

                                      //           //模糊搜索 未完成(本期不做，勿删)
                                      //           return;

                                      //           organize_list.autoCompleteOpts.input.dataSource = !value ? [] : [
                                      //               value,
                                      //               value + value,
                                      //               value + value + value,
                                      //           ];

                                      //           dispatch({
                                      //               type: 'organize_list',
                                      //               data: {
                                      //                   autoCompleteOpts: organize_list.autoCompleteOpts
                                      //               }
                                      //           })


                                      //       }}
                                      //       placeholder=""
                                      //   >

                                      //   </MxjAutoComplete>
                                    )

                                },
                                {
                                  lg: 4,
                                  sm: 24,
                                  component: (
                                      <div style={{width: '100%'}}>
                                        <Select placeholder="组织类型"
                                        onChange={this.changeOrganizeType}
                                        style={{display: 'block'}}>
                                        <Option value={''}>全部</Option>
                                            {
                                              org_type.map(o=>{
                                                  return <Option key={o.key} value={o.key}>{o.value}</Option>
                                              })
                                            }
                                        </Select>
                                      </div>
                                  )

                                },
                                {
                                    lg: 2,
                                    sm: 12,
                                    component: (
                                        <div style={{width: '100%'}}
                                        >
                                            <Button
                                                type="primary"

                                                style={{width:77,marginRight: 24}}
                                                onChange={(value)=>{}}
                                                onClick={()=>{

                                                    //查询工位列表
                                                    this.getOrganizeList();

                                                }}
                                            >
                                                查询
                                            </Button>
                                        </div>
                                    )

                                },
                                {
                                  lg: 3,
                                  sm: 12,
                                  component: (
                                      <div style={{width: '100%'}}>
                                      </div>
                                  )

                                }
                                

                            ]}
                        >

                        </SearchConditons>
                <Divider style={{margin : '16px 0'}} />
                <SearchConditons
                            height = "32px"
                            data={[
                                {
                                    lg: 24,
                                    sm: 24,
                                    component: (
                                        <div style={{width: '100%'}}
                                        >
                                            <Button
                                                type="primary"
                                                icon="plus"
                                                style={{width:77}}
                                                onChange={(value)=>{}}
                                                onClick={()=>{

                                                  utils.Router.switchRoute('/organize/owner/create')

                                                }}
                                            >
                                                新建
                                            </Button>
                                        </div>
                                    )

                                }
                                

                            ]}
                        >

                        </SearchConditons>
                <MxjTable
                      className='mxj_table mxj-table-page-common'
                      style={{marginTop : 16}}
                      //固定列
                      scroll={{ x: '100%' }}
                      loading={organize_list.loading}
                      pagination={{
                          showQuickJumper: true,
                          showSizeChanger: true,
                          defaultCurrent: 1,
                          pageSize : organize_list.pageOption.per_page,
                          total: organize_list.listData.total,
                          //改变每页条数
                          onShowSizeChange: (current, pageSize)=>{
                            organize_list.pageOption.per_page = pageSize;
                            dispatch({
                                type: 'organize_list',
                                data: {
                                  pageOption: organize_list.pageOption
                                }
                            })

                            //查询工位列表
                            this.getOrganizeList()

                        },

                        //改变页码
                        onChange: (pageNumber)=>{

                          organize_list.pageOption.page = pageNumber;
                            dispatch({
                                type: 'organize_list',
                                data: {
                                  pageOption: organize_list.pageOption
                                }
                            })

                            //查询工位列表
                            this.getOrganizeList()


                        }
                          

                      }}
                      //checkbox 选中时
                      // onCheckboxSelect={(selectedRowKeys, selectedRows)=>{

                      //   dispatch({
                      //       type: 'organize_list',
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
                            d.key = d.id;
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
    organize_list: state.organize_list
  };
})(OrganizeList);

