import React, {Component, PropTypes, Fragment} from 'react';
import MainRight2 from '@components/layout/main_right2';

import { Button, Input, Form, Row, Col, Modal} from 'antd';
import ShadowBox from '@components/modules/shadowBox/shadowBox';
import Title from '@components/modules/title/title';

import MxjForm from '@widget/form/form'
import fetchData from '@api/fetchData';
import config from "../../../config";
import utils from "../../../asset";

import formRules from '@widget/form/form.rules'
import DetailBox from '@/js/components/modules/detailBox'
import OwnerType from '../modules/ownerType'
import MxjTable from '@widget/table/table';
import StatusTag from '../modules/statusTag'



class Space_build_add extends Component {
    constructor() {
        super();
        this.state = {
            detailData: {},
            labelCol:{span: 8},
            wrapperCol:{span: 16},
            locationList:[]
        }
    }

    componentDidMount() {


        //测试  start
        /*setTimeout(()=>{
            this.setState({
                detailData: {
                    "name":"业主名称1","type_id":1
                }
            })

        },2000)*/
        //测试  end




        if (
            //编辑
            utils.Url.parseUrl(location.href).params.type == 'edit' ||
            //查看
            utils.Url.parseUrl(location.href).params.type == 'look'

        ) {
            //获取详情
            fetchData({
                method: 'get',
                url: config.api + '/location/owner-detail/' + utils.Url.parseUrl(location.href).params.id,
            }).then((res) => {

                if (res.code === 10000) {
                    this.setState({
                        detailData: res.data
                    })
                }
            })



            fetchData({
                method: 'get',
                url: config.api + '/location/locations-list',
                data: {
                    'owner_id': utils.Url.parseUrl(location.href).params.id
                }
            }).then((res) => {
                if (res.code === 10000) {
                    this.setState({
                        locationList: res.data.data
                    })
                }
            })
        }

    };

    render() {


        return (

            <Fragment

            >
                <div className={'space_build_add'}>

                    <Title title={(()=>{
                        //编辑
                        if (utils.Url.parseUrl(location.href).params.type == 'edit') {
                            return '编辑业主基本信息'
                        }
                        //新建
                        else if( utils.Url.parseUrl(location.href).params.type == 'new' ) {
                            return '新建业主基本信息'
                        }
                        //查看
                        else if( utils.Url.parseUrl(location.href).params.type == 'look' ){
                            return '查看业主基本信息'
                        }
                    })()}/>

                    <ShadowBox
                        style={{padding: '24px 32px'}}
                    >


                        <MxjForm
                            style={{paddingTop:0,paddingBottom:0}}
                            onSubmit={(values) => {

                                values.type_id = Number(values.type_id);


                                //编辑
                                if (utils.Url.parseUrl(location.href).params.type == 'edit') {
                                    var requestUrl = config.api + '/location/owner-update/'+ utils.Url.parseUrl(location.href).params.id;
                                }
                                //新建
                                else if( utils.Url.parseUrl(location.href).params.type == 'new' ) {
                                    var requestUrl = config.api + '/location/owner-insert';
                                }

                                //更新
                                fetchData({
                                    method: 'post',
                                    url: requestUrl,
                                    data: values,
                                    once: true,
                                }).then((res) => {
                                    if (res.code === 10000) {
                                        Modal.info({
                                            title: '提示',
                                            content: (
                                                <div>
                                                    <p>成功</p>
                                                </div>
                                            ),
                                            onOk() {
                                                utils.Router.switchRoute('/space/owner/list')
                                            },
                                        });

                                    }
                                })
                            }}

                            renderContent={(mxjFormContext, Form, getFieldDecorator) => {

                                return (
                                    <div>
                                        <DetailBox title='业主基础信息' dividerStyle={{margin: '11px 0 24px'}}>

                                            {(()=>{
                                                if(
                                                    utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                    utils.Url.parseUrl(location.href).params.type == 'look'
                                                ){
                                                    return (
                                                        <Row gutter={95}>
                                                            <Col className="gutter-row" span={8}>
                                                                <Form.Item
                                                                    label={'业主编号'}

                                                                >
                                                                    {this.state.detailData.code}
                                                                </Form.Item>

                                                            </Col>

                                                            <Col className="gutter-row" span={8}>

                                                                <Form.Item
                                                                    label={'创建时间'}

                                                                >
                                                                    {this.state.detailData.created_at}
                                                                </Form.Item>

                                                            </Col>
                                                            <Col className="gutter-row" span={8}>

                                                                <Form.Item
                                                                    label={'创建人'}

                                                                >
                                                                    {this.state.detailData.created_by_name}
                                                                </Form.Item>

                                                            </Col>

                                                        </Row>
                                                    )
                                                }
                                            })()}




                                            <Row gutter={95}>
                                                <Col className="gutter-row" span={8}>
                                                    <Form.Item
                                                        label={'业主名称'}


                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('name', {
                                                                    validateFirst: true,
                                                                    initialValue: this.state.detailData.name,
                                                                    rules: [
                                                                        {
                                                                            required: true
                                                                        },
                                                                        {
                                                                            max: 50
                                                                        },
                                                                        {
                                                                            validator: formRules.ChineseEnglishDigital
                                                                        }

                                                                    ],
                                                                })(
                                                                    <Input
                                                                        placeholder="请输入业主名称"
                                                                    />
                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.detailData.name
                                                            }

                                                        })()}

                                                    </Form.Item>

                                                </Col>



                                                <Col className="gutter-row" span={8}>

                                                    <Form.Item
                                                        label={'业主类型'}

                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('type_id', {
                                                                    validateFirst: true,
                                                                    initialValue: this.state.detailData.type_id,
                                                                    rules: [
                                                                        {
                                                                            required: true
                                                                        }
                                                                    ],
                                                                })(

                                                                    <OwnerType
                                                                        placeholder="请选择"
                                                                    >

                                                                    </OwnerType>

                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.detailData.type_name
                                                            }

                                                        })()}

                                                    </Form.Item>

                                                </Col>

                                            </Row>


                                        </DetailBox>



                                        <Row style={{marginTop : 32}}>
                                            <Col span={24} style={{textAlign: 'center'}}>
                                                {(()=>{
                                                    if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                        utils.Url.parseUrl(location.href).params.type == 'new'
                                                    ){
                                                        return (
                                                            <Button type="primary" htmlType="submit"
                                                                    style={{width: 90, height: 32, marginRight: 16}}>提交</Button>
                                                        )
                                                    }else if(
                                                        utils.Url.parseUrl(location.href).params.type == 'look'
                                                    ){
                                                        return (
                                                            <Button type="primary"
                                                                    style={{width: 90, height: 32, marginRight: 16}}
                                                                    onClick={()=>{
                                                                        utils.Router.switchRoute(
                                                                            '/space/owner/add?id='+ utils.Url.parseUrl(location.href).params.id +
                                                                            '&code=' + utils.Url.parseUrl(location.href).params.code +
                                                                            '&type=edit'
                                                                        )
                                                                    }}
                                                            >
                                                                编辑
                                                            </Button>
                                                        )
                                                    }

                                                })()}



                                                <Button
                                                    style={{
                                                        width: 90,
                                                        height: 32,
                                                        marginRight: 16,
                                                        background: '#E9E9E9'
                                                    }}
                                                    onClick={()=>{
                                                        utils.Router.backRoute()
                                                    }}
                                                >
                                                    {(()=>{
                                                        if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                            utils.Url.parseUrl(location.href).params.type == 'new'
                                                        ){
                                                            return '取消'
                                                        }else if(
                                                            utils.Url.parseUrl(location.href).params.type == 'look'
                                                        ){
                                                            return '返回'
                                                        }

                                                    })()}

                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                )
                            }}
                        >
                        </MxjForm>


                    </ShadowBox>


                    {(()=>{
                        if( utils.Url.parseUrl(location.href).params.type == 'look'){
                            return (
                                <ShadowBox style={{marginTop: 32}}>

                                    <DetailBox title='下辖场地信息' dividerStyle={{margin: '11px 0 31px'}}>


                                        <MxjTable
                                            className={'mxj-table-page-common'}

                                            columns={(()=>{
                                                return [
                                                    {
                                                        title: ' 场地编号',
                                                        dataIndex: 'code',
                                                        key: 'code',
                                                        width: 150,
                                                        //fixed: 'left',
                                                    },
                                                    {
                                                        title: '场地名称',
                                                        dataIndex: 'name',
                                                        key: 'name',
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
                                                        title: '当前状态',
                                                        dataIndex: 'status_name',
                                                        key: 'status_name',
                                                        fixed: 'right',
                                                        width: 100,
                                                        render: (location_status) => {

                                                            return (
                                                                <StatusTag
                                                                    status={location_status}
                                                                />
                                                            )

                                                        },
                                                    },
                                                ]
                                            })()}
                                            pagination={false}
                                            dataSource={this.state.locationList}

                                        />

                                    </DetailBox>

                                </ShadowBox>
                            )
                        }

                    })()}



                </div>
            </Fragment>
        )
    }

}


// breadcrumbData={[
//         {
//             text: '场地管理'
//         },
// {
//     text: '场地信息管理'
// },
// {
//     text: '业主列表',
//         path: '/space/owner/list'
// },
// {
//     text: (()=>{
//         //编辑
//         if (utils.Url.parseUrl(location.href).params.type == 'edit') {
//             return '编辑业主'
//         }
//         //新建
//         else if( utils.Url.parseUrl(location.href).params.type == 'new' ) {
//             return '新建业主'
//         }
//         //查看
//         else if( utils.Url.parseUrl(location.href).params.type == 'look' ){
//             return '查看业主'
//         }
//     })()
// }
// ]}


export default Space_build_add;

