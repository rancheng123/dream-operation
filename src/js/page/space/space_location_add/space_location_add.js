import React, {Component, PropTypes, Fragment} from 'react';
import {Select, Button, Input, Form, Row, Col, Modal,} from 'antd';
import ShadowBox from '@components/modules/shadowBox/shadowBox';
import Title from '@components/modules/title/title';
import MxjForm from '@widget/form/form'
import fetchData from '@api/fetchData';
import config from "../../../config";
import utils from "../../../asset";

import formRules from '@widget/form/form.rules'
import './space_location_add.scss'
import MxjLocationType from '@components/modules/locationType'
import MxjDatePicker from '@widget/datePicker'
import DetailHeader from '@components/modules/detailHeader'
import MxjLocationAttribute from '../modules/locationAttribute'
import MxjOperationType from '../modules/operationType'
import ProvinceCityBuildLocation from '@widget/provinceCityBuildLocation'
import MainRight2 from '@components/layout/main_right2';
import DetailBox from '@/js/components/modules/detailBox'



class Space_location_add extends Component {
    constructor() {
        super();
        this.state = {
            buildingData: {
                province: {
                    code: '',
                    name: ''
                },
                city: {
                    code: '',
                    name: ''
                },
                district: {
                    code: '',
                    name: ''
                }
            },


            ownerList: [],
            //场地主体列表
            locationMainList: [],



            //场地详情
            locationData: {},

        }
    }

    componentDidMount() {


        //测试  start
        /*setTimeout(()=>{


            this.setState({
                locationData: {
                    "id": 28,
                    "code": "CNHBBD0080006",
                    "status_id": 1,
                    "status_name": 1,
                    "name": "\u573a\u57303",


                    "building_code": "CNBJBJ004",

                    "floor": "6",
                    "type_id": 1,
                    "type_name": "\u6ce2\u585e\u51ac",
                    "attribute_id": 1,
                    "attribute_name": "\u81ea\u6709\u573a\u5730",
                    "operation_type_id": 1,
                    "operation_type_name": "\u81ea\u8425",

                    "address": "\u4e1c\u4e8c\u73af",
                    "unit": "13",
                    "district_code": null,
                    "district_name": null,
                    "owner_id": undefined,
                    "owner_name": null,
                    "main_id": 1,
                    "main_body_name": "\u5317\u4eac\u68a6\u60f3\u52a0\u60a6\u6e2f\u79d1\u6280\u6709\u9650\u8d23\u4efb\u516c\u53f8",
                    "gross_area": "2000.00",
                    "rent_area": "800.00",
                    "rent_start_time": "2019-03-27 10:39:58",
                    "decoration_start_time": "2019-03-27 10:39:58",
                    "open_time": "2019-03-27 10:39:58",
                    "decoration_company": "123dec213123oration_213123company",
                    "created_by": 1,
                    "created_at": "2019-03-27 10:39:58",
                    "created_by_name": "\u6731\u68a6\u541b"

                }

            })
        },1000)*/

        //测试  end




        //获取业主列表
        fetchData({
            method: 'get',
            url: config.api + '/location/owner-list'
        }).then((res)=>{
            if (res.code === 10000) {
                this.setState({
                    ownerList: res.data.data
                })
            }
        })

        //获取主体列表
        fetchData({
            method: 'get',
            url: config.api + '/location/main-body-list',
            data:{}
        }).then((res)=>{
            if(res.code === 10000){

                this.setState({
                    locationMainList: res.data.data
                })
            }
        })




        if (
            //编辑
            utils.Url.parseUrl(location.href).params.type == 'edit' ||
            //查看
            utils.Url.parseUrl(location.href).params.type == 'look'

        ) {
            //获取场地详情
            fetchData({
                method: 'get',
                url: config.api + '/location/locations-detail/'+ utils.Url.parseUrl(location.href).params.code,
            }).then((res) => {
                if (res.code === 10000) {


                    if(res.data.owner_id == 0){
                        res.data.owner_id = undefined
                    }

                    if(res.data.rent_start_time === null){
                        res.data.rent_start_time = undefined
                    }
                    if(res.data.decoration_start_time === null){
                        res.data.decoration_start_time = undefined
                    }

                    this.setState({
                        locationData: res.data
                    })
                }
            })
        }


    };

    getBuildDetail(code){

        //获取楼盘详情
        fetchData({
            method: 'get',
            url: config.api + '/location/building-detail/' + code,
        }).then((res) => {


            if (res.code === 10000) {

                this.setState({
                    buildingData: res.data
                })

            }
        })

    }




    render() {

        var that = this;

        return (
            <Fragment

            >
                <div className={'space_location_add'}>


                    <Title title={(() => {
                        //编辑
                        if (utils.Url.parseUrl(location.href).params.type == 'edit') {
                            return '编辑场地'
                        }
                        //新建
                        else if( utils.Url.parseUrl(location.href).params.type == 'new' ) {
                            return '新建场地'
                        }
                        //查看
                        else if( utils.Url.parseUrl(location.href).params.type == 'look' ){
                            return '查看场地'
                        }

                    })()}/>

                    <ShadowBox
                        style={{padding: '24px 32px'}}
                    >


                        <MxjForm
                            style={{paddingTop: 0, paddingBottom: 0}}
                            onSubmit={(values) => {

                                values.building_code = values.locationCascader.building_code

                                //编辑
                                if (utils.Url.parseUrl(location.href).params.type == 'edit') {
                                    var requestUrl = config.api + '/location/locations-update/' + utils.Url.parseUrl(location.href).params.id;
                                }
                                //新建
                                else {
                                    var requestUrl = config.api + '/location/locations-insert';
                                }

                                //更新场地
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
                                                utils.Router.switchRoute('/space/location/list')
                                            },
                                        });

                                    }
                                })


                            }}

                            renderContent={(mxjFormContext, Form, getFieldDecorator) => {

                                return (
                                    <DetailBox title='基本信息' dividerStyle={{margin: '11px 0 24px'}}>
                                        <div className={'detail'}>

                                            <Row gutter={95}>
                                                <Col className="gutter-row" span={24}>

                                                    <Form.Item
                                                        label={'请选择楼盘'}

                                                    >
                                                        {getFieldDecorator('locationCascader', {
                                                            validateFirst: true,
                                                            initialValue: {
                                                                province_code: this.state.locationData.province_code,
                                                                city_code: this.state.locationData.city_code,
                                                                building_code: this.state.locationData.building_code,
                                                                location_code: this.state.locationData.location_code,
                                                            },
                                                            rules: [
                                                                {
                                                                    required: true,
                                                                    validator: (rule, value, callback) => {

                                                                        if (!value.province_code) {
                                                                            callback('请选择省份');
                                                                            return;
                                                                        }

                                                                        if (!value.city_code) {
                                                                            callback('请选择城市');
                                                                            return;
                                                                        }

                                                                        if (!value.building_code) {
                                                                            callback('请选择楼盘');
                                                                            return;
                                                                        }

                                                                        callback();

                                                                    },
                                                                }
                                                            ],
                                                        })(


                                                            <ProvinceCityBuildLocation
                                                                selectType={['provinces','cities','buildings']}
                                                                style={{width: '100%'}}
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
                                                                onChange={(obj)=>{


                                                                    if(obj.building_code){
                                                                        this.getBuildDetail(obj.building_code)
                                                                    }


                                                                    this.setState({
                                                                        locationCascader: obj
                                                                    })



                                                                }}
                                                            />
                                                        )}
                                                    </Form.Item>

                                                </Col>

                                            </Row>
                                            {(() => {

                                                if (
                                                    utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                    utils.Url.parseUrl(location.href).params.type == 'look'
                                                ) {
                                                    return (
                                                        <Row gutter={95}>
                                                            <Col className="gutter-row" span={8}>




                                                                <Form.Item
                                                                    label={'场地编号'}

                                                                >
                                                                    {this.state.locationData.code}
                                                                </Form.Item>

                                                            </Col>



                                                            <Col className="gutter-row" span={8}>

                                                                <Form.Item
                                                                    label={'创建时间'}

                                                                >
                                                                    {this.state.locationData.created_at}



                                                                </Form.Item>

                                                            </Col>



                                                            <Col className="gutter-row" span={8}>

                                                                <Form.Item
                                                                    label={'创建人'}

                                                                >
                                                                    {this.state.locationData.created_by_name}


                                                                </Form.Item>

                                                            </Col>

                                                        </Row>
                                                    )
                                                }
                                            })()}




                                            {(() => {
                                                if (this.state.buildingData.province_name) {
                                                    return (
                                                        <Row
                                                            gutter={95}>
                                                            <Col className="gutter-row" span={8}>

                                                                <Form.Item
                                                                    label={'楼盘地址'}

                                                                >
                                                                    <div style={{minWidth: 700}}>
                                                                        {
                                                                            this.state.buildingData.province_name
                                                                        }

                                                                        &nbsp;&nbsp;&nbsp;
                                                                        {
                                                                            this.state.buildingData.city_name
                                                                        }
                                                                        &nbsp;&nbsp;&nbsp;
                                                                        {
                                                                            this.state.buildingData.district_name
                                                                        }
                                                                        &nbsp;&nbsp;&nbsp;
                                                                        {
                                                                            this.state.buildingData.address
                                                                        }
                                                                    </div>

                                                                </Form.Item>

                                                            </Col>

                                                        </Row>
                                                    )
                                                }
                                            })()}


                                            <Row gutter={95}>
                                                <Col className="gutter-row" span={8}>




                                                    <Form.Item
                                                        label={'场地名称'}

                                                    >


                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('name', {
                                                                    validateFirst: true,
                                                                    initialValue: this.state.locationData.name,
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
                                                                        placeholder="请填写场地名称"
                                                                    />
                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.locationData.name
                                                            }

                                                        })()}

                                                    </Form.Item>

                                                </Col>



                                                <Col className="gutter-row" span={8}>

                                                    <Form.Item
                                                        label={'场地所在栋数'}

                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){


                                                                return getFieldDecorator('unit', {
                                                                    validateFirst: true,
                                                                    initialValue: this.state.locationData.unit,
                                                                    rules: [
                                                                        {
                                                                            required: true
                                                                        },
                                                                        {
                                                                            max: 8
                                                                        },
                                                                        {
                                                                            validator: formRules.ChineseEnglishDigital
                                                                        }

                                                                    ],
                                                                })(
                                                                    <Input
                                                                        placeholder="栋&座&期"
                                                                    />
                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.locationData.unit
                                                            }

                                                        })()}



                                                    </Form.Item>

                                                </Col>



                                                <Col className="gutter-row" span={8}>

                                                    <Form.Item
                                                        label={'层数'}

                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){


                                                                return getFieldDecorator('floor', {
                                                                    validateFirst: true,
                                                                    initialValue: this.state.locationData.floor,
                                                                    rules: [
                                                                        {
                                                                            required: true
                                                                        },
                                                                        {
                                                                            max: 5
                                                                        },
                                                                        {
                                                                            validator: formRules.Int
                                                                        }

                                                                    ],
                                                                })(
                                                                    <Input
                                                                        placeholder=""
                                                                    />
                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.locationData.floor
                                                            }

                                                        })()}


                                                    </Form.Item>

                                                </Col>

                                            </Row>


                                            <Row gutter={95}>
                                                <Col className="gutter-row" span={8}>

                                                    <Form.Item
                                                        label={'场地属性'}

                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){


                                                                return getFieldDecorator('attribute_id', {
                                                                    validateFirst: true,
                                                                    initialValue: this.state.locationData.attribute_id,
                                                                    rules: [
                                                                        {
                                                                            required: true
                                                                        }

                                                                    ],
                                                                })(

                                                                    <MxjLocationAttribute
                                                                        style={{width: '100%'}}
                                                                        placeholder="请选择"
                                                                        onChange={(e)=>{


                                                                            mxjFormContext.props.form.setFieldsValue({
                                                                                operation_type_id: undefined
                                                                            })
                                                                        }}
                                                                    />
                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.locationData.attribute_name
                                                            }

                                                        })()}


                                                    </Form.Item>

                                                </Col>



                                                <Col className="gutter-row" span={8}>

                                                    <Form.Item
                                                        label={'经营方式'}


                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){


                                                                return getFieldDecorator('operation_type_id', {
                                                                    validateFirst: true,
                                                                    initialValue: this.state.locationData.operation_type_id,
                                                                    rules: [
                                                                        {
                                                                            required: true
                                                                        }

                                                                    ],
                                                                })(
                                                                    <MxjOperationType
                                                                        disabledArr={[1,2]}
                                                                        style={{width: '100%'}}
                                                                        placeholder="请选择"
                                                                        onChange={(key)=>{

                                                                            // 自营清除业主
                                                                            if(key == 1){
                                                                                this.state.locationData.owner_id = undefined
                                                                            }

                                                                            //自营 隐藏业主名称
                                                                            this.state.locationData.operation_type_id = key;
                                                                            this.setState(this.state)


                                                                        }}

                                                                    />
                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.locationData.operation_type_name
                                                            }

                                                        })()}
                                                    </Form.Item>

                                                </Col>



                                                {(()=>{

                                                    //非自营 显示业主
                                                    if(!(
                                                        that.state.locationData.operation_type_id == 1)
                                                    ){
                                                        return (
                                                            <Col className="gutter-row" span={8}>

                                                                <Form.Item
                                                                    label={'业主名称'}

                                                                >
                                                                    {(()=>{
                                                                        if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                            utils.Url.parseUrl(location.href).params.type == 'new'
                                                                        ){


                                                                            return getFieldDecorator('owner_id', {
                                                                                validateFirst: true,
                                                                                initialValue: this.state.locationData.owner_id,
                                                                                rules: [
                                                                                    {
                                                                                        required: true
                                                                                    }

                                                                                ],
                                                                            })(
                                                                                <Select
                                                                                    placeholder="请选择业主名称"
                                                                                >
                                                                                    {(() => {
                                                                                        return this.state.ownerList.map((owner) => {
                                                                                            return (
                                                                                                <Select.Option
                                                                                                    key={owner.id}
                                                                                                    value={owner.id}
                                                                                                >
                                                                                                    {owner.name}
                                                                                                </Select.Option>
                                                                                            )
                                                                                        })
                                                                                    })()}
                                                                                </Select>
                                                                            )
                                                                        }else if(
                                                                            utils.Url.parseUrl(location.href).params.type == 'look'
                                                                        ){
                                                                            return this.state.locationData.owner_name
                                                                        }

                                                                    })()}


                                                                </Form.Item>


                                                            </Col>
                                                        )
                                                    }
                                                })()}




                                            </Row>



                                            <Row gutter={95}>


                                                <Col className="gutter-row" span={8}>

                                                    <Form.Item
                                                        label={'场地类型'}

                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){


                                                                return getFieldDecorator('type_id', {
                                                                    validateFirst: true,
                                                                    initialValue: this.state.locationData.type_id,
                                                                    rules: [
                                                                        {
                                                                            required: true
                                                                        }

                                                                    ],
                                                                })(
                                                                    <MxjLocationType
                                                                        placeholder="请选择"
                                                                    >

                                                                    </MxjLocationType>
                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.locationData.type_name
                                                            }

                                                        })()}
                                                    </Form.Item>

                                                </Col>



                                                <Col className="gutter-row" span={8}>

                                                    <Form.Item
                                                        label={(
                                                            <span>
                                                        场地建筑面积
                                                    </span>
                                                        )}

                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){


                                                                return getFieldDecorator('gross_area', {
                                                                    initialValue: this.state.locationData.gross_area,
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
                                                                return this.state.locationData.gross_area
                                                            }

                                                        })()}
                                                    </Form.Item>


                                                </Col>


                                                <Col className="gutter-row" span={8}>

                                                    <Form.Item
                                                        label={(
                                                            <span>
                                                        场地租赁面积
                                                    </span>
                                                        )}

                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('rent_area', {
                                                                    initialValue: this.state.locationData.rent_area,
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
                                                                return this.state.locationData.rent_area
                                                            }

                                                        })()}
                                                    </Form.Item>


                                                </Col>


                                            </Row>



                                            <Row gutter={95}>
                                                <Col className="gutter-row" span={8}>

                                                    <Form.Item
                                                        label={'租赁开始时间'}

                                                    >

                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('rent_start_time', {
                                                                    validateFirst: true,
                                                                    initialValue: this.state.locationData.rent_start_time

                                                                })(
                                                                    <MxjDatePicker
                                                                        showTime
                                                                        format="YYYY-MM-DD HH:mm:ss"
                                                                        placeholder="请选择日期和时间"
                                                                        onOk={(value) => {

                                                                        }}
                                                                        style={{width: '100%'}}
                                                                    />
                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.locationData.rent_start_time
                                                            }

                                                        })()}
                                                    </Form.Item>


                                                </Col>



                                                <Col className="gutter-row" span={8}>

                                                    <Form.Item
                                                        label={'施工开始时间'}

                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('decoration_start_time', {
                                                                    validateFirst: true,
                                                                    initialValue: this.state.locationData.decoration_start_time,
                                                                })(
                                                                    <MxjDatePicker
                                                                        showTime
                                                                        format="YYYY-MM-DD HH:mm:ss"
                                                                        placeholder="请选择日期和时间"
                                                                        onOk={(value) => {

                                                                        }}

                                                                        style={{width: '100%'}}
                                                                    />
                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.locationData.decoration_start_time
                                                            }

                                                        })()}


                                                    </Form.Item>

                                                </Col>

                                                <Col className="gutter-row" span={8}>



                                                    <Form.Item
                                                        label={'开业时间'}

                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('open_time', {
                                                                    validateFirst: true,
                                                                    initialValue: this.state.locationData.open_time,
                                                                    rules: [
                                                                        {
                                                                            required: true
                                                                        }

                                                                    ],
                                                                })(
                                                                    <MxjDatePicker
                                                                        showTime
                                                                        format="YYYY-MM-DD HH:mm:ss"
                                                                        placeholder="请选择日期和时间"
                                                                        onOk={(value) => {

                                                                        }}

                                                                        style={{width: '100%'}}
                                                                    />
                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.locationData.open_time
                                                            }

                                                        })()}


                                                    </Form.Item>

                                                </Col>

                                            </Row>


                                            <Row gutter={95}>
                                                <Col className="gutter-row" span={8}>



                                                    <Form.Item
                                                        label={'施工方'}

                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('decoration_company', {
                                                                    initialValue: this.state.locationData.decoration_company,
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
                                                                return this.state.locationData.decoration_company
                                                            }

                                                        })()}


                                                    </Form.Item>

                                                </Col>

                                                <Col className="gutter-row" span={8}>



                                                    <Form.Item
                                                        label={'选择场地主体'}

                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('main_body_id', {
                                                                    validateFirst: true,
                                                                    initialValue: this.state.locationData.main_body_id,
                                                                    rules: [
                                                                        {
                                                                            required: true
                                                                        }
                                                                    ]
                                                                })(
                                                                    <Select
                                                                        dropdownMatchSelectWidth={false}
                                                                        placeholder="请选择"
                                                                    >
                                                                        {(() => {
                                                                            return this.state.locationMainList.map((item) => {
                                                                                return (
                                                                                    <Select.Option
                                                                                        key={item.id}
                                                                                        value={item.id}
                                                                                    >
                                                                                        {item.main_short_name}
                                                                                    </Select.Option>
                                                                                )
                                                                            })
                                                                        })()}


                                                                    </Select>
                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.locationData.main_body_name
                                                            }

                                                        })()}


                                                    </Form.Item>

                                                </Col>

                                            </Row>


                                            <Row style={{marginTop : 32}}>

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
                                                                    onClick={() => {
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

                                                                            utils.Router.switchRoute('/space/location/add?code=' + utils.Url.parseUrl(location.href).params.code + '&id='+ utils.Url.parseUrl(location.href).params.id  + '&type=edit')

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
                                        </div>
                                    </DetailBox>


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
//     text: '场地列表',
//         path: '/space/location/list'
// },
// {
//     text: (()=>{
//         //编辑
//         if (utils.Url.parseUrl(location.href).params.type == 'edit') {
//             return '编辑场地'
//         }
//         //新建
//         else if( utils.Url.parseUrl(location.href).params.type == 'new' ) {
//             return '新建场地'
//         }
//         //查看
//         else if( utils.Url.parseUrl(location.href).params.type == 'look' ){
//             return '查看场地'
//         }
//
//     })()
// }
// ]}
export default Space_location_add;

