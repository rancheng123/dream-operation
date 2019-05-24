import React, {Component, PropTypes, Fragment} from 'react';
import MainRight2 from '@components/layout/main_right2';

import { Button, Input, Form, Row, Col, Modal} from 'antd';
import ShadowBox from '@components/modules/shadowBox/shadowBox';
import Title from '@components/modules/title/title';

import MxjForm from '@widget/form/form'
import fetchData from '@api/fetchData';
import config from "../../../config";
import utils from "../../../asset";
import MxjTable from '@widget/table_v2/table';
import DetailBox from '@/js/components/modules/detailBox';

import './space_main_add.scss';


class Space_build_add extends Component {
    constructor() {
        super();
        this.state = {
            detailData: {

            },
            listData: {
                data: []
            }
        }
    }

    searchList(){
        fetchData({
            method: 'get',
            url:config.api + '/location/location-main-body-list/' + utils.Url.parseUrl(location.href).params.id,
            data: {
                //请求页
                "page": this.state.listData.page,
                //每页数量
                "per_page": this.state.listData.per_page,
            }
        }).then((res) => {
            if (res.code === 10000) {
                this.setState({
                    listData: res.data
                })
            }
        })
    }

    componentDidMount() {
        //获取详情
        fetchData({
            method: 'get',
            url: config.api + '/location/main-body-detail/' + utils.Url.parseUrl(location.href).params.id
        }).then((res) => {
            if (res.code === 10000) {
                this.setState({
                    detailData: res.data
                })
            }
        })


        this.searchList()



    };
    render() {


        return (

            <Fragment

            >
                <div className={'space_build_add space_main_add'}>

                    <Title title={(()=>{
                        if(utils.Url.parseUrl(location.href).params.type == 'edit'){
                            return '编辑主体基本信息'
                        }else if(utils.Url.parseUrl(location.href).params.type == 'look'){
                            return '查看主体基本信息'
                        }

                    })()}/>



                    <ShadowBox
                        style={{padding: '24px 32px'}}
                    >
                        <DetailBox title='主体基础信息' dividerStyle={{margin: '11px 0 24px'}}>

                            <Row gutter={95}>
                                <Col className="gutter-row" span={8}>
                                    <Form.Item
                                        label={'主体编号'}

                                    >
                                        {this.state.detailData.code}
                                    </Form.Item>

                                </Col>

                                <Col className="gutter-row" span={8}>
                                    <Form.Item
                                        label={'主体名称'}


                                    >
                                        {this.state.detailData.name}
                                    </Form.Item>

                                </Col>



                                <Col className="gutter-row" span={8}>

                                    <Form.Item
                                        label={'统一信用代码'}

                                    >
                                        {this.state.detailData.credit_code}
                                    </Form.Item>

                                </Col>


                            </Row>

                            <Row gutter={95}>

                                <Col className="gutter-row" span={8}>

                                    <Form.Item
                                        label={'主体简称'}

                                    >
                                        {this.state.detailData.main_short_name}
                                    </Form.Item>

                                </Col>

                            </Row>


                        </DetailBox>
                    </ShadowBox>




                    <ShadowBox
                        style={{padding: 32}}
                    >


                        <MxjForm
                            style={{paddingTop:0,paddingBottom:0}}
                            onSubmit={(values) => {

                                for(var name in values){
                                    var id = name.split('{--}')[0];
                                    var item = this.state.listData.data.filter((item)=>{
                                        return item.id == id
                                    })[0]

                                    var key = name.split('{--}')[1]
                                    item[key] = values[name];

                                }


                                this.state.listData.data.forEach((item)=>{
                                    item.main_id = Number(utils.Url.parseUrl(location.href).params.id);
                                })



                                //编辑
                                if (utils.Url.parseUrl(location.href).params.type == 'edit') {
                                    var requestUrl = config.api + '/location/location-main-body-update';

                                    //更新场地
                                    fetchData({
                                        method: 'post',
                                        url: requestUrl,
                                        data: this.state.listData.data,
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
                                                    utils.Router.switchRoute('/space/main/list')
                                                },
                                            });

                                        }
                                    })

                                }


                            }}

                            renderContent={(mxjFormContext, Form, getFieldDecorator) => {

                                return (
                                    <div>





                                        <DetailBox title='下辖场地信息' dividerStyle={{margin: '11px 0 31px'}}>
                                            <MxjTable
                                                className={'mxj-table-page-common'}
                                                scroll={{ x: 1300 }}
                                                columns={(()=>{
                                                    return [
                                                        {
                                                            title: ' 城市',
                                                            dataIndex: 'city_name',
                                                            key: 'city_name',
                                                            width: 150,
                                                            //fixed: 'left',
                                                        },
                                                        {
                                                            title: '场地名称',
                                                            dataIndex: 'location_name',
                                                            key: 'location_name',
                                                            width: 250,
                                                        },
                                                        {
                                                            title: '银行名称',
                                                            dataIndex: 'bank_name',
                                                            key: 'bank_name',
                                                            width: 250,
                                                            onCell: (record)=> {
                                                                return {
                                                                    edit:utils.Url.parseUrl(location.href).params.type == 'edit' ? true: false,
                                                                    renderEditCell: ()=>{
                                                                        return (
                                                                            <Form.Item style={{marginBottom: 0}}>
                                                                                {getFieldDecorator(record.id+ '{--}' + 'bank_name', {
                                                                                    rules: [{
                                                                                        required: true
                                                                                    },{
                                                                                        max: 50
                                                                                    }],
                                                                                    initialValue: record.bank_name,
                                                                                })(
                                                                                    <Input />
                                                                                )}
                                                                            </Form.Item>
                                                                        )
                                                                    }
                                                                }
                                                            },
                                                        },

                                                        {
                                                            title: '账户名称',
                                                            dataIndex: 'account_name',
                                                            key: 'account_name',
                                                            width: 250,
                                                            onCell: (record)=> {
                                                                return {
                                                                    edit: utils.Url.parseUrl(location.href).params.type == 'edit' ? true: false,
                                                                    renderEditCell: ()=>{
                                                                        return (
                                                                            <Form.Item style={{marginBottom: 0}}>
                                                                                {getFieldDecorator(record.id+ '{--}' + 'account_name', {
                                                                                    rules: [{
                                                                                        required: true,
                                                                                    },{
                                                                                        max: 50
                                                                                    }],
                                                                                    initialValue: record.account_name,
                                                                                })(
                                                                                    <Input />
                                                                                )}
                                                                            </Form.Item>
                                                                        )
                                                                    }
                                                                }
                                                            },

                                                        },
                                                        {
                                                            title: '银行账号',
                                                            dataIndex: 'bank_account',
                                                            key: 'bank_account',
                                                            width: 250,
                                                            onCell: (record)=> {
                                                                return {
                                                                    edit: utils.Url.parseUrl(location.href).params.type == 'edit' ? true: false,
                                                                    renderEditCell: ()=>{
                                                                        return (
                                                                            <Form.Item style={{marginBottom: 0}}>
                                                                                {getFieldDecorator(record.id+ '{--}' + 'bank_account', {
                                                                                    rules: [{
                                                                                        required: true,
                                                                                    },{
                                                                                        max: 50
                                                                                    }],
                                                                                    initialValue: record.bank_account,
                                                                                })(
                                                                                    <Input />
                                                                                )}
                                                                            </Form.Item>
                                                                        )
                                                                    }
                                                                }
                                                            },



                                                        },
                                                        {
                                                            title: '银行地址',
                                                            dataIndex: 'bank_address',
                                                            key: 'bank_address',
                                                            width: 250,
                                                            onCell: (record)=> {
                                                                return {
                                                                    edit: utils.Url.parseUrl(location.href).params.type == 'edit' ? true: false,
                                                                    renderEditCell: ()=>{
                                                                        return (
                                                                            <Form.Item style={{marginBottom: 0}}>
                                                                                {getFieldDecorator(record.id+ '{--}' + 'bank_address', {
                                                                                    rules: [{
                                                                                        required: true,
                                                                                    },{
                                                                                        max: 50
                                                                                    }],
                                                                                    initialValue: record.bank_address,
                                                                                })(
                                                                                    <Input />
                                                                                )}
                                                                            </Form.Item>
                                                                        )
                                                                    }
                                                                }
                                                            },
                                                        },

                                                    ]
                                                })()}
                                                onPaginationChange={(listData)=>{
                                                    this.setState({
                                                        listData: listData
                                                    })
                                                    //查询楼盘列表
                                                    this.searchList()

                                                }}
                                                dataSource={this.state.listData}

                                            />
                                        </DetailBox>





                                        {(()=>{
                                            if(utils.Url.parseUrl(location.href).params.type == 'edit'){
                                                return (
                                                    <Row style={{marginTop: 32}}>
                                                        <Col span={24} style={{textAlign: 'center'}}>
                                                            <Button type="primary" htmlType="submit"
                                                                    style={{width: 90, height: 32, marginRight: 16}}>提交</Button>
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

                                                            >取消</Button>
                                                        </Col>
                                                    </Row>
                                                )
                                            }else{
                                                return (
                                                    <Row style={{marginTop: 32}}>
                                                        <Col span={24} style={{textAlign: 'center'}}>

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

                                                            >返回</Button>
                                                        </Col>
                                                    </Row>
                                                )
                                            }
                                        })()}

                                    </div>
                                )
                            }}
                        >
                        </MxjForm>


                    </ShadowBox>



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
//     text: '主体列表',
//         path: '/space/main/list'
// },
// {
//     text: (()=>{
//         if(utils.Url.parseUrl(location.href).params.type == 'edit'){
//             return '编辑主体'
//         }else if(utils.Url.parseUrl(location.href).params.type == 'look'){
//             return '查看主体'
//         }
//
//     })()
// }
// ]}


export default Space_build_add;

