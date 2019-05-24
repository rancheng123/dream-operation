import React, {Component, PropTypes, Fragment} from 'react';
import {connect} from 'react-redux';
import main_right from '@components/layout/main_right';
import utils from '../../../asset'
import {Icon, Button, Divider} from 'antd';
import MxjTable from '@widget/table_v2/table';
import MxjAutoComplete from '@widget/autoComplete_v2/autoComplete';
import DivItem from '@components/modules/divItem/divItem';
import ShadowBox from '@components/modules/shadowBox/shadowBox';
import Title from '@components/modules/title/title'
import MxjForm from '@widget/form/form'

import SearchConditons from '@modules/searchConditions'
import config from "../../../config";
import fetchData from "@api/fetchData";
import ProvinceCityBuildLocation from '@widget/provinceCityBuildLocation'
import MxjLocationType from '@components/modules/locationType'
import MxjOperationType from '../modules/operationType'
import MxjOperationStatus from '../modules/operationStatus'
import Enable from '@components/modules/enable'
import Delete from '../modules/delete'

import {initState} from './space_location_list_reducer'
import {Link} from "react-router";
import ColumsText from '@modules/columsText'
import StatusTag from '../modules/statusTag'


class Space_location_list extends Component {
    constructor() {
        super();
    }

    componentDidMount() {

        //清空数据
        this.props.dispatch({
            type: 'space_location_list',
            data: initState,
            reset: true,
            callback: ()=>{
                //查询场地列表
                this.searchList()
            }
        })
        //清空数据


    }

    //查询场地列表
    searchList() {
        const {space_location_list, dispatch} = this.props;

        var data = {
            //请求页
            "page": space_location_list.listData.page,
            //每页数量
            "per_page": space_location_list.listData.per_page,
            city_code:space_location_list.city_code,
            building_code:space_location_list.building_code,


            type_id:space_location_list.location_type,

            operation_type_id:space_location_list.operation_type,
            status_id:space_location_list.operation_status,
        }

        data[space_location_list.autoCompleteOpts.select] = space_location_list.autoCompleteOpts.input


        this.props.dispatch({
            type: 'space_location_list',
            data: {
                loading: true
            }
        })

        fetchData({
            method: 'get',
            url: config.api + '/location/locations-list',
            data: data
        }).then((res) => {
            this.props.dispatch({
                type: 'space_location_list',
                data: {
                    loading: false
                }
            })


            if (res.code === 10000) {
                res.data.page = res.data.current_page;
                this.props.dispatch({
                    type: 'space_location_list',
                    data: {
                        listData: res.data
                    }
                })

            }
        })
    }


    render() {
        const {space_location_list, dispatch} = this.props;
        return (
            <div>



                <div>
                    <Title title={'场地数据列表'}/>
                    <ShadowBox>


                        <MxjForm
                            style={{paddingTop: 0, paddingBottom: 0}}
                            renderContent={(mxjFormContext, Form, getFieldDecorator) => {
                                return (
                                    <div>
                                        <SearchConditons
                                            data={[
                                                {
                                                    lg: 8,
                                                    sm: 24,
                                                    component: (
                                                        <MxjAutoComplete
                                                            style={{width: '100%'}}
                                                            value={space_location_list.autoCompleteOpts}
                                                            onChange={(data) => {
                                                                dispatch({
                                                                    type: 'space_location_list',
                                                                    data: {
                                                                        autoCompleteOpts: data
                                                                    }
                                                                })
                                                            }}
                                                            selectOpts={{
                                                                width: 100,
                                                                data: [
                                                                    {
                                                                        value: '场地名称',
                                                                        id: 'name'
                                                                    },
                                                                    {
                                                                        value: '场地编号',
                                                                        id: 'code'
                                                                    },
                                                                    {
                                                                        value: '楼盘名称',
                                                                        id: 'building_name'
                                                                    }
                                                                ]
                                                            }}
                                                            onSearch={(value,callback) => {
                                                                return;
                                                                //模糊搜索 未完成(本期不做，勿删)
                                                                var res =  space_location_list.autoCompleteOpts.dataSource = !value ? [] : [
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
                                                            selectType={['cities','buildings']}
                                                            style={{width: '100%'}}
                                                            value={{
                                                                city_code: space_location_list.city_code,
                                                                building_code: space_location_list.building_code,
                                                            }}
                                                            onChange={(value)=>{
                                                                dispatch({
                                                                    type: 'space_location_list',
                                                                    data: {
                                                                        city_code: value.city_code,
                                                                        building_code: value.building_code,
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

                                                        <MxjLocationType

                                                            style={{width: '100%'}}
                                                            value={space_location_list.location_type}
                                                            onChange={(value) => {
                                                                dispatch({
                                                                    type: 'space_location_list',
                                                                    data: {
                                                                        location_type: value
                                                                    }
                                                                })
                                                            }}
                                                        >

                                                        </MxjLocationType>




                                                    )

                                                },
                                                {
                                                    lg: 4,
                                                    sm: 8,
                                                    component: (

                                                        <MxjOperationType
                                                            style={{width: '100%'}}
                                                            value={space_location_list.operation_type}
                                                            onChange={(value) => {
                                                                dispatch({
                                                                    type: 'space_location_list',
                                                                    data: {
                                                                        operation_type: value
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
                                                            filter={[4]}
                                                            value={space_location_list.operation_status}
                                                            onChange={(value) => {
                                                                dispatch({
                                                                    type: 'space_location_list',
                                                                    data: {
                                                                        operation_status: value
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
                                                                style={{width: 90}}
                                                                type="primary"
                                                                onClick={() => {

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

                                        <Divider style={{margin: 0}}/>

                                        <DivItem>
                                            <Button type="primary"
                                                    style={{width: 90, height: 32, marginRight: 16}}
                                                    icon="plus"
                                                    onClick={() => {
                                                        utils.Router.switchRoute('/space/location/add?' + 'type=new')
                                                    }}
                                            >
                                                新建
                                            </Button>


                                            {/*{(() => {
                                                if (space_location_list.checkedList.length > 0) {
                                                    return (
                                                        <Popconfirm
                                                            title="您确定删除吗?"
                                                            onConfirm={() => {
                                                                this.deleteBuild(space_location_list.checkedList)
                                                            }}
                                                            //onCancel={cancel}
                                                            okText="是"
                                                            cancelText="不"
                                                        >

                                                            <Button
                                                                style={{width: 107, height: 32}}
                                                            >批量删除</Button>
                                                        </Popconfirm>
                                                    )
                                                } else {
                                                    return (
                                                        <Button
                                                            style={{width: 107, height: 32}}
                                                            disabled={true}
                                                        >批量删除</Button>
                                                    )

                                                }
                                            })()}*/}


                                        </DivItem>

                                        {(() => {
                                            var columns = [
                                                {
                                                    title: '场地编号',
                                                    dataIndex: 'code',
                                                    key: 'code',
                                                    width: 100,
                                                    //fixed: 'left',
                                                    render: (text,buildItem) => {
                                                        return (
                                                            <Link to={
                                                                '/space/location/add?code=' +
                                                                buildItem.code +
                                                                '&id='+
                                                                buildItem.id +
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
                                                    render: (status) => {
                                                        return (
                                                            <StatusTag
                                                                status={status}
                                                            />
                                                        )
                                                    },
                                                },
                                                {
                                                    title: '场地名称',
                                                    dataIndex: 'name',
                                                    key: 'name',
                                                    render: (name,buildItem) => {

                                                        return <ColumsText text={buildItem.name + buildItem.floor +'层'} />
                                                    },
                                                },
                                                {
                                                    title: '城市',
                                                    dataIndex: 'city_name',
                                                    key: 'city_name',
                                                },



                                                {
                                                    title: '楼盘名称',
                                                    dataIndex: 'building_name',
                                                    key: 'building_name',
                                                    render: (text,buildItem) => {

                                                        return <ColumsText text={text} />
                                                    },
                                                },
                                                {
                                                    title: '层数',
                                                    dataIndex: 'floor',
                                                    key: 'floor',
                                                },


                                                {
                                                    title: '场地类型',
                                                    dataIndex: 'type_name',
                                                    key: 'type_name',
                                                },
                                                {
                                                    title: '场地属性',
                                                    dataIndex: 'attribute_name',
                                                    key: 'attribute_name',
                                                },


                                                {
                                                    title: '经营方式',
                                                    dataIndex: 'operation_type_name',
                                                    key: 'operation_type_name',
                                                },
                                                {
                                                    title: '场地图状态',
                                                    dataIndex: 'location_map',
                                                    key: 'location_map',
                                                },
                                                {
                                                    title: '开业时间',
                                                    dataIndex: 'open_time',
                                                    key: 'open_time',
                                                },


                                                {
                                                    title: '操作',
                                                    key: 'operation',
                                                    fixed: 'right',
                                                    width: 120,
                                                    render: (buildItem) => {
                                                        return (
                                                            <div>
                                                                          <span style={{marginRight: '15px'}}>
                                                                              <Icon
                                                                                  type="eye"
                                                                                  style={{color: '#0179FF'}}
                                                                                  onClick={() => {
                                                                                      utils.Router.switchRoute(
                                                                                          '/space/location/add?code=' +
                                                                                          buildItem.code +
                                                                                          '&id='+
                                                                                          buildItem.id +
                                                                                          '&type=look'
                                                                                      )
                                                                                  }}
                                                                              />
                                                                          </span>
                                                                <span style={{marginRight: '15px'}}>
                                                                                <Icon
                                                                                    type="edit"
                                                                                    style={{color: '#44D7B6'}}
                                                                                    onClick={() => {
                                                                                        utils.Router.switchRoute('/space/location/add?code=' + buildItem.code + '&id='+ buildItem.id  + '&type=edit')
                                                                                    }}
                                                                                />
                                                                          </span>
                                                                <span style={{marginRight: '15px'}}>

                                                                            <Delete
                                                                                fetchDataFn={()=>{
                                                                                    return {
                                                                                        method: 'post',
                                                                                        url: config.api + '/location/locations-delete/'+ buildItem.id,
                                                                                    }
                                                                                }}
                                                                                onOk={()=>{
                                                                                    //查询场地列表
                                                                                    this.searchList()
                                                                                }}
                                                                            />




                                                                          </span>
                                                            </div>
                                                        )
                                                    },
                                                },
                                                /*{
                                                    title: '是否启用',
                                                    key: 'isEnable',
                                                    fixed: 'right',
                                                    width: 150,
                                                    render: (buildItem) => {
                                                        return (
                                                            <Enable
                                                                checked={buildItem.disabled == 0 ? true : false}
                                                                messageFn={(status)=>{
                                                                    return <p>场地已{status ? '启用' : '停用'}</p>
                                                                }}
                                                                fetchDataFn={ (status)=>{
                                                                    return {
                                                                        method: 'post',
                                                                        url: config.api + '/location/locations-toggle/' + buildItem.id,
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
                                                },*/
                                            ]
                                            return (
                                                <MxjTable
                                                    columns={columns}
                                                    //固定列
                                                    scroll={{x: 1700}}
                                                    className={'mxj-table-page-common'}
                                                    dataSource={space_location_list.listData}
                                                    loading={space_location_list.loading}
                                                    onPaginationChange={(listData)=>{
                                                        dispatch({
                                                            type: 'space_location_list',
                                                            data: {
                                                                listData: listData
                                                            },
                                                            callback: ()=>{
                                                                this.searchList()
                                                            }
                                                        })


                                                    }}
                                                    //checkbox 选中时
                                                    /*onCheckboxSelect={(selectedRowKeys, selectedRows) => {
                                                        dispatch({
                                                            type: 'space_location_list',
                                                            data: {
                                                                checkedList: selectedRows.map((selectedRow, i) => {
                                                                    return selectedRow.id
                                                                })
                                                            }
                                                        })
                                                    }}*/


                                                />
                                            )
                                        })()}
                                    </div>
                                )
                            }}
                        >
                        </MxjForm>

                    </ShadowBox>
                </div>
            </div>
        )
    }

}

// var NewRightContent = main_right(Space_location_list, [
//     {
//         text: '场地管理'
//     },
//     {
//         text: '场地信息管理'
//     },
//     {
//         text: '场地列表'
//     }
// ])


export default connect(function (state) {
    return {
        common: state.common,
        space_location_list: state.space_location_list
    };
})(Space_location_list);

