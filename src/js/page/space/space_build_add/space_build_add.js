import React, {Component, PropTypes, Fragment} from 'react';
import MainRight2 from '@components/layout/main_right2';
import { Button, Input, Form, Row, Col, Modal, Divider} from 'antd';
import ShadowBox from '@components/modules/shadowBox/shadowBox';
import Title from '@components/modules/title/title';
import ProvinceCityArea from '@widget/provinceCityArea/provinceCityArea'
import MxjForm from '@widget/form/form'
import fetchData from '@api/fetchData';
import config from "../../../config";
import utils from "../../../asset";
import formRules from '@widget/form/form.rules'
import './space_build_add.scss'
import DetailHeader from '@components/modules/detailHeader'
import MxjTable from '@widget/table_v2/table';

import StatusTag from '../modules/statusTag'
import LevelList from '../modules/levelList'
import DetailBox from '@/js/components/modules/detailBox'



class Space_build_add extends Component {
    constructor() {
        super();
        this.state = {
            province: {},
            city: {},
            district: {},

            levels: [],
            locationData: {
                data: []
            },
            detailData: {}
        }

    }
    componentDidMount() {





        //测试 start
        // aaaaaaaaa

        /*setTimeout(() => {
            this.setState({
                "level": "2",
                "developer": "楼盘开发商1",
                "gross_area": "100",
                "electric_fee": "100",
                "management_company": "物业公司1",
                "property_fee": "100",
                "water_fee": "100",
                "parking_info": "11",
                "停车费标准": "100",

                "province_code": 130000000000,



                "city_code": 130600000000,
                "city_name": "保定",
                "district_code": 130602000000,
                "district_name": null,
                "address": "happyStreet",


            })
        }, 2000)
*/
        //测试 end




        if (
            //编辑
            utils.Url.parseUrl(location.href).params.type == 'edit' ||
            //查看
            utils.Url.parseUrl(location.href).params.type == 'look'

        ) {
            //获取楼盘详情
            fetchData({
                method: 'get',
                url: config.api + '/location/building-detail/' + utils.Url.parseUrl(location.href).params.code,
                data: {}
            }).then((res) => {
                if (res.code === 10000) {
                    this.setState(res.data)


                }
            })
        }


        if(utils.Url.parseUrl(location.href).params.type == 'look'){
            //获取场地列表(根据楼盘)
            fetchData({
                method: 'get',
                url: config.api + '/location/locations-list',
                data: {
                    building_code: utils.Url.parseUrl(location.href).params.code
                }
            }).then((res) => {
                if (res.code === 10000) {
                    this.setState({
                        locationData: res.data
                    })

                }
            })
        }

    };

    render() {

        return (

            <Fragment>
                <div className={'space_build_add'}>

                    <Title title={(()=>{
                        //编辑
                        if (utils.Url.parseUrl(location.href).params.type == 'edit') {
                            return '编辑楼盘'
                        }
                        //新建
                        else if( utils.Url.parseUrl(location.href).params.type == 'new' ) {
                            return '新建楼盘'
                        }
                        //查看
                        else if( utils.Url.parseUrl(location.href).params.type == 'look' ){
                            return '查看楼盘'
                        }
                    })()}/>

                    <ShadowBox
                        style={{padding: '24px 32px'}}
                    >


                        <MxjForm
                            style={{paddingTop:0,paddingBottom:0}}
                            onSubmit={(values) => {

                                values.province_code = values.buildAdress.province_code;
                                values.city_code = values.buildAdress.city_code;
                                values.district_code = values.buildAdress.district_code;
                                values.address = values.buildAdress.address;


                                //编辑
                                if (utils.Url.parseUrl(location.href).params.type == 'edit') {
                                    var requestUrl = config.api + '/location/building-update/' + utils.Url.parseUrl(location.href).params.id ;
                                }
                                //新建
                                else if( utils.Url.parseUrl(location.href).params.type == 'new' ) {
                                    var requestUrl = config.api + '/location/building-insert';
                                }





                                //更新楼盘
                                fetchData({
                                    method: 'post' ,
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
                                                utils.Router.switchRoute('/space/build/list')
                                            },
                                        });

                                    }
                                })
                            }}

                            renderContent={(mxjFormContext, Form, getFieldDecorator) => {

                                return (



                                    <div>


                                        <DetailBox title='楼盘基本信息' dividerStyle={{margin: '11px 0 24px'}}>
                                            {(()=>{
                                                if (
                                                    utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                    utils.Url.parseUrl(location.href).params.type == 'look'
                                                ) {
                                                    return (
                                                        <Row gutter={95}>
                                                            <Col className="gutter-row" span={8}>
                                                                <Form.Item

                                                                    label={'楼盘编号'}
                                                                >
                                                                    {this.state.code}
                                                                </Form.Item>
                                                            </Col>
                                                            <Col className="gutter-row" span={8}>
                                                                <Form.Item

                                                                    label={'创建时间'}
                                                                >
                                                                    {this.state.created_at}
                                                                </Form.Item>
                                                            </Col>
                                                            <Col className="gutter-row" span={8}>
                                                                <Form.Item

                                                                    label={'创建人'}
                                                                >
                                                                    {this.state.created_by_name}
                                                                </Form.Item>
                                                            </Col>


                                                        </Row>
                                                    )
                                                }
                                            })()}

                                            <Row
                                                gutter={95}>
                                                <Col className="gutter-row" span={8}>
                                                    <Form.Item
                                                        label={'楼盘地址'}
                                                    >
                                                        {getFieldDecorator('buildAdress', {
                                                            initialValue: {
                                                                province_code: this.state.province_code,
                                                                city_code: this.state.city_code,
                                                                district_code: this.state.district_code,
                                                                address: this.state.address
                                                            },
                                                            rules: [{
                                                                required: true,
                                                                validator: (rule, value, callback) => {

                                                                    if (!value) {
                                                                        callback('请选择省份');
                                                                        return;
                                                                    }

                                                                    if (!value.province_code) {
                                                                        callback('请选择省份');
                                                                        return;
                                                                    }

                                                                    if (!value.city_code) {
                                                                        callback('请选择城市');
                                                                        return;
                                                                    }

                                                                    if (!value.district_code) {
                                                                        callback('请选择区县');
                                                                        return;
                                                                    }
                                                                    if (!value.address) {
                                                                        callback('请填写详细地址');
                                                                        return;
                                                                    }
                                                                    if(value.address){
                                                                        if (!/^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/.test(value.address)) {
                                                                            callback('详细地址只能包含中文，英文和数字');
                                                                            return;
                                                                        }
                                                                        if (value.address.length > 50) {
                                                                            callback('详细地址不能超过 50 个字符');
                                                                            return;
                                                                        }
                                                                    }

                                                                    callback();

                                                                },
                                                            }]
                                                        })(
                                                            <ProvinceCityArea
                                                                disabled={(()=>{
                                                                    if(
                                                                        utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                        utils.Url.parseUrl(location.href).params.type == 'look'
                                                                    ){
                                                                        return true
                                                                    }else{
                                                                        return false
                                                                    }
                                                                })()}
                                                                //数据转换 出口
                                                                onChange={(data) => {
                                                                    this.setState({
                                                                        province_code: data.province_code,
                                                                        city_code: data.city_code,
                                                                        district_code: data.district_code,
                                                                        address: data.address
                                                                    })
                                                                }}
                                                            >
                                                            </ProvinceCityArea>
                                                        )}
                                                    </Form.Item>

                                                </Col>
                                            </Row>







                                            <Row gutter={95} style={{marginBottom:40 }}>
                                                <Col className="gutter-row" span={8}>

                                                    <Form.Item

                                                        label={'楼盘名称'}

                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('name', {
                                                                    validateFirst: true,
                                                                    initialValue: this.state.name,
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
                                                                        placeholder="请填写楼盘名称"
                                                                    />
                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.name
                                                            }

                                                        })()}


                                                    </Form.Item>

                                                </Col>

                                                <Col className="gutter-row" span={8}>

                                                    <Form.Item
                                                        label={'等级'}

                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('level', {
                                                                    initialValue: this.state.level
                                                                })(

                                                                    <LevelList
                                                                        placeholder="请选择"
                                                                    />
                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.level_name
                                                            }

                                                        })()}
                                                    </Form.Item>

                                                </Col>
                                            </Row>




                                            <Row gutter={95}>
                                                <Col className="gutter-row" span={8}>

                                                    <Form.Item
                                                        label={'楼盘开发商'}

                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('developer', {
                                                                    initialValue: this.state.developer,
                                                                    validateFirst: true,
                                                                    rules: [
                                                                        {
                                                                            max: 50
                                                                        },
                                                                        {
                                                                            validator: formRules.ChineseEnglishDigital
                                                                        }
                                                                    ]
                                                                })(
                                                                    <Input
                                                                        placeholder="请填写楼盘开发商全称"
                                                                    />
                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.developer
                                                            }

                                                        })()}
                                                    </Form.Item>

                                                </Col>


                                                <Col className="gutter-row" span={8}>

                                                    <Form.Item
                                                        label={'楼盘建筑面积'}

                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('gross_area', {
                                                                    initialValue: this.state.gross_area,
                                                                    validateFirst: true,
                                                                    rules: [
                                                                        {
                                                                            validator: formRules.Digital
                                                                        },
                                                                        {
                                                                            num: 999999999,
                                                                            validator: formRules.NoLargerSomeNum
                                                                        },
                                                                        {
                                                                            floatLength: 2,
                                                                            validator: formRules.Float
                                                                        },

                                                                    ]
                                                                })(
                                                                    <Input
                                                                        suffix={'m²'}
                                                                        placeholder=""
                                                                    />
                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.gross_area
                                                            }

                                                        })()}
                                                    </Form.Item>

                                                </Col>


                                                <Col className="gutter-row" span={8}>

                                                    <Form.Item
                                                        label={'电费标准'}


                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('electric_fee', {
                                                                    initialValue: this.state.electric_fee,
                                                                    validateFirst: true,
                                                                    rules: [
                                                                        {
                                                                            validator: formRules.Digital
                                                                        },
                                                                        {
                                                                            num: 999999999,
                                                                            validator: formRules.NoLargerSomeNum
                                                                        },
                                                                        {
                                                                            floatLength: 2,
                                                                            validator: formRules.Float
                                                                        },
                                                                    ]
                                                                })(
                                                                    <Input
                                                                        suffix={'元/度'}
                                                                        placeholder=""
                                                                    />
                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.electric_fee
                                                            }

                                                        })()}
                                                    </Form.Item>

                                                </Col>


                                            </Row>

                                            <Row gutter={95}>
                                                <Col className="gutter-row" span={8}>

                                                    <Form.Item

                                                        label={'物业公司'}>
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('management_company', {
                                                                    initialValue: this.state.management_company,
                                                                    validateFirst: true,
                                                                    rules: [
                                                                        {
                                                                            max: 50
                                                                        },
                                                                        {
                                                                            validator: formRules.ChineseEnglishDigital
                                                                        }
                                                                    ]
                                                                })(
                                                                    <Input
                                                                        placeholder="请填写物业公司全称"
                                                                    />
                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.management_company
                                                            }

                                                        })()}
                                                    </Form.Item>

                                                </Col>

                                                <Col className="gutter-row" span={8}>

                                                    <Form.Item

                                                        label={'物业费标准'}>
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('property_fee', {
                                                                    initialValue: this.state.property_fee,
                                                                    validateFirst: true,
                                                                    rules: [
                                                                        {
                                                                            validator: formRules.Digital
                                                                        },
                                                                        {
                                                                            num: 999999999,
                                                                            validator: formRules.NoLargerSomeNum
                                                                        },
                                                                        {
                                                                            floatLength: 2,
                                                                            validator: formRules.Float
                                                                        },
                                                                    ]
                                                                })(
                                                                    <Input
                                                                        suffix={'m²/月'}
                                                                        placeholder=""
                                                                    />
                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.property_fee
                                                            }

                                                        })()}
                                                    </Form.Item>

                                                </Col>

                                                <Col className="gutter-row" span={8}>

                                                    <Form.Item

                                                        label={'水费标准'}>
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('water_fee', {
                                                                    initialValue: this.state.water_fee,
                                                                    validateFirst: true,
                                                                    rules: [
                                                                        {
                                                                            validator: formRules.Digital
                                                                        },
                                                                        {
                                                                            num: 999999999,
                                                                            validator: formRules.NoLargerSomeNum
                                                                        },
                                                                        {
                                                                            floatLength: 2,
                                                                            validator: formRules.Float
                                                                        },
                                                                    ]
                                                                })(
                                                                    <Input
                                                                        suffix={'元/吨'}
                                                                        placeholder=""
                                                                    />
                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.water_fee
                                                            }

                                                        })()}

                                                    </Form.Item>

                                                </Col>


                                            </Row>


                                            <Row gutter={95} style={{marginBottom: 32}}>
                                                <Col className="gutter-row" span={8}>

                                                    <Form.Item

                                                        label={'停车场信息'}>
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('parking_info', {
                                                                    initialValue: this.state.parking_info,
                                                                    validateFirst: true,
                                                                    rules: [
                                                                        {
                                                                            max: 50
                                                                        },
                                                                        {
                                                                            validator: formRules.ChineseEnglishDigital
                                                                        }
                                                                    ]
                                                                })(
                                                                    <Input
                                                                        placeholder=""
                                                                    />
                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.parking_info
                                                            }

                                                        })()}
                                                    </Form.Item>

                                                </Col>

                                                <Col className="gutter-row" span={8}>

                                                    <Form.Item

                                                        label={'停车费标准'}>
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('parking_fee', {
                                                                    initialValue: this.state.parking_fee,
                                                                    validateFirst: true,
                                                                    rules: [
                                                                        {
                                                                            validator: formRules.Digital
                                                                        },
                                                                        {
                                                                            num: 999999999,
                                                                            validator: formRules.NoLargerSomeNum
                                                                        },
                                                                        {
                                                                            floatLength: 2,
                                                                            validator: formRules.Float
                                                                        },
                                                                    ]
                                                                })(
                                                                    <Input
                                                                        placeholder=""
                                                                    />
                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.parking_fee
                                                            }

                                                        })()}


                                                    </Form.Item>

                                                </Col>


                                            </Row>


                                            <Row>
                                                {(()=>{
                                                    if(
                                                        utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                        utils.Url.parseUrl(location.href).params.type == 'new'
                                                    ){
                                                        return (
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
                                                        )
                                                    }else if(utils.Url.parseUrl(location.href).params.type == 'look'){
                                                        return (
                                                            <Col span={24} style={{textAlign: 'center'}}>
                                                                <Button type="primary"
                                                                        style={{width: 90, height: 32, marginRight: 16}}
                                                                        onClick={()=>{

                                                                            utils.Router.switchRoute('/space/build/add?code=' + utils.Url.parseUrl(location.href).params.code + '&id='+ utils.Url.parseUrl(location.href).params.id  + '&type=edit')

                                                                        }}
                                                                >
                                                                    编辑
                                                                </Button>
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
                                                        )
                                                    }

                                                })()}

                                            </Row>
                                        </DetailBox>







                                    </div>
                                )
                            }}
                        >
                        </MxjForm>


                    </ShadowBox>


                    {(()=>{
                        if(
                            utils.Url.parseUrl(location.href).params.type == 'look'
                        ){
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
                                                        width: 100,
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
                                            //数据个数转换入口
                                            dataSource={this.state.locationData}

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
//     text: '楼盘列表',
//         path: '/space/build/list'
// },
// {
//     text: (()=>{
//         //编辑
//         if (utils.Url.parseUrl(location.href).params.type == 'edit') {
//             return '编辑楼盘'
//         }
//         //新建
//         else if( utils.Url.parseUrl(location.href).params.type == 'new' ) {
//             return '新建楼盘'
//         }
//         //查看
//         else if( utils.Url.parseUrl(location.href).params.type == 'look' ){
//             return '查看楼盘'
//         }
//     })()
// }
// ]}

export default Space_build_add;

