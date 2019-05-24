import React, {Component, PropTypes, Fragment} from 'react';
import MainRight2 from '@components/layout/main_right2';

import {Button, Input, Form, Row, Col, Modal, InputNumber,} from 'antd';
import ShadowBox from '@components/modules/shadowBox/shadowBox';
import Title from '@components/modules/title/title';
import MxjForm from '@widget/form/form'
import fetchData from '@api/fetchData';
import config from "../../../config";
import utils from "../../../asset";

import formRules from '@widget/form/form.rules'
import DetailHeader from '@components/modules/detailHeader'
import ProvinceCityBuildLocation from '@widget/provinceCityBuildLocation'
import DirectionList from '../modules/directionList'
import DetailBox from '@/js/components/modules/detailBox'


class Space_build_add extends Component {
    constructor() {
        super();
        this.state = {
            detailData: {
                province: {},
                city: {},
                district: {}
            }
        }
    }

    componentDidMount() {


        //测试  start
        /*setTimeout(() => {
            this.setState({
                detailData: {
                    "locationCascader": {
                        "province_code": 110101000000,
                        "city_code": 110101000000,
                        "building_code": "SN0001",
                        "location_code": "CNHBBD0080014"
                    },
                    "room_number": "2",
                    "name": "场地名称1",
                    "orientation_id": 1,
                    "gross_area": "100",
                    "rent_area": "100",
                    "sale_stations": 1,
                    "sale_area": "6",
                    "location_code": "CNHBBD0080014"
                }
            })
        }, 1000)*/
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
                url: config.api + '/location/room-detail/' + utils.Url.parseUrl(location.href).params.code,
            }).then((res) => {
                if (res.code === 10000) {
                    this.setState({
                        detailData: res.data
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
                            return '编辑房间'
                        }
                        //新建
                        else if( utils.Url.parseUrl(location.href).params.type == 'new' ) {
                            return '新建房间'
                        }
                        //查看
                        else if( utils.Url.parseUrl(location.href).params.type == 'look' ){
                            return '查看房间'
                        }

                    })()}/>

                    <ShadowBox
                        style={{padding: '24px 32px'}}
                    >


                        <MxjForm
                            style={{paddingTop:0,paddingBottom:0}}
                            onSubmit={(values) => {

                                values.location_code = values.locationCascader.location_code



                                //编辑
                                if (utils.Url.parseUrl(location.href).params.type == 'edit') {
                                    var requestUrl = config.api + '/location/room-update/' + utils.Url.parseUrl(location.href).params.code;
                                }
                                //新建
                                else if(utils.Url.parseUrl(location.href).params.type == 'new'){
                                    var requestUrl = config.api + '/location/room-insert';
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
                                                utils.Router.switchRoute('/space/room/list')
                                            },
                                        });

                                    }
                                })
                            }}

                            renderContent={(mxjFormContext, Form, getFieldDecorator) => {

                                return (
                                    <DetailBox title='基本信息' dividerStyle={{margin: '11px 0 24px'}}>
                                        <div>
                                            <Row
                                                gutter={95}>
                                                <Col className="gutter-row" span={24}>

                                                    <Form.Item label={'选择归属场地'}>
                                                        {getFieldDecorator('locationCascader', {
                                                            validateFirst: true,
                                                            initialValue: {
                                                                province_code: this.state.detailData.province_code,
                                                                city_code: this.state.detailData.city_code,
                                                                building_code: this.state.detailData.building_code,
                                                                location_code: this.state.detailData.location_code,
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

                                                                        if (!value.location_code) {
                                                                            callback('请选择场地');
                                                                            return;
                                                                        }

                                                                        callback();

                                                                    },
                                                                }
                                                            ],
                                                        })(

                                                            <ProvinceCityBuildLocation
                                                                selectType={['provinces','cities','buildings','locations']}
                                                                style={{width: '100%'}}
                                                                disabled={(()=>{
                                                                    if(
                                                                        utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                        utils.Url.parseUrl(location.href).params.type == 'look'
                                                                    ){
                                                                        return true
                                                                    }
                                                                })()}
                                                                filterDisabledLocation

                                                                /*onChange={(obj)=>{

                                                                    if(obj.buildings){
                                                                        // this.getBuildDetail(obj.buildings)
                                                                    }


                                                                    this.setState({
                                                                        locationCascader: obj
                                                                    })



                                                                }}*/
                                                            />
                                                        )}
                                                    </Form.Item>

                                                </Col>
                                            </Row>

                                            {(()=>{
                                                if(
                                                    utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                    utils.Url.parseUrl(location.href).params.type == 'look'
                                                ){
                                                    return (
                                                        <Row gutter={95}>
                                                            <Col className="gutter-row" span={8}>


                                                                <Form.Item
                                                                    label={'房间编号'}


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
                                                        label={'房间号'}


                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('room_number', {
                                                                    validateFirst: true,
                                                                    initialValue: this.state.detailData.room_number,
                                                                    rules: [
                                                                        {
                                                                            required: true
                                                                        },
                                                                        {
                                                                            max: 30
                                                                        },
                                                                        {
                                                                            validator: formRules.ChineseEnglishDigital
                                                                        }

                                                                    ],
                                                                })(
                                                                    <Input
                                                                        placeholder="请输入房间号"
                                                                    />
                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.detailData.room_number
                                                            }

                                                        })()}


                                                    </Form.Item>

                                                </Col>

                                                <Col className="gutter-row" span={8}>

                                                    <Form.Item
                                                        label={'房间名称'}

                                                        extra={(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return ""
                                                            }
                                                        })()}
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
                                                                        placeholder="请填写房号+X人间, 如 A级8人间"
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
                                                        label={'朝向'}

                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('orientation_id', {
                                                                    validateFirst: true,
                                                                    initialValue: this.state.detailData.orientation_id,
                                                                    rules: [
                                                                        {
                                                                            required: true
                                                                        }
                                                                    ],
                                                                })(

                                                                    <DirectionList
                                                                        placeholder="请选择"
                                                                    />

                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.detailData.orientation_name
                                                            }

                                                        })()}
                                                    </Form.Item>

                                                </Col>

                                            </Row>





                                            <Row gutter={95}>
                                                <Col className="gutter-row" span={8}>


                                                    <Form.Item
                                                        label={'建筑面积'}

                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('gross_area', {
                                                                    validateFirst: true,
                                                                    initialValue: this.state.detailData.gross_area,
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
                                                                return this.state.detailData.gross_area
                                                            }

                                                        })()}
                                                    </Form.Item>

                                                </Col>
                                                <Col className="gutter-row" span={8}>


                                                    <Form.Item
                                                        label={'经营面积'}

                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('rent_area', {
                                                                    validateFirst: true,
                                                                    initialValue: this.state.detailData.rent_area,
                                                                    rules: [
                                                                        {
                                                                            required: true
                                                                        },
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
                                                                return this.state.detailData.rent_area
                                                            }

                                                        })()}
                                                    </Form.Item>

                                                </Col>

                                                <Col className="gutter-row" span={8}>


                                                    <Form.Item
                                                        label={'销售工位数'}

                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('sale_stations', {
                                                                    validateFirst: true,
                                                                    initialValue: this.state.detailData.sale_stations,
                                                                    rules: [
                                                                        {
                                                                            required: true
                                                                        },
                                                                        {
                                                                            validator: formRules.Int
                                                                        }

                                                                    ]
                                                                })(
                                                                    <InputNumber
                                                                        style={{width: '100%'}}
                                                                        min={1} max={1000}
                                                                        placeholder={'输入范围1-1000'}
                                                                    />
                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.detailData.sale_stations
                                                            }

                                                        })()}
                                                    </Form.Item>

                                                </Col>


                                            </Row>

                                            <Row gutter={95}>
                                                <Col className="gutter-row" span={8}>


                                                    <Form.Item
                                                        label={'销售面积'}

                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('sale_area', {
                                                                    validateFirst: true,
                                                                    initialValue: this.state.detailData.sale_area,
                                                                    rules: [
                                                                        {
                                                                            required: true
                                                                        },
                                                                        {
                                                                            validator: formRules.Digital
                                                                        },
                                                                        {
                                                                            validator: formRules.PositiveNumber
                                                                        },
                                                                        {
                                                                            floatLength: 2,
                                                                            validator: formRules.Float
                                                                        },
                                                                        {
                                                                            num: 999999999,
                                                                            validator: formRules.NoLargerSomeNum
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
                                                                return this.state.detailData.sale_area
                                                            }

                                                        })()}
                                                    </Form.Item>

                                                </Col>




                                            </Row>





                                            <Row style={{marginTop : 32}}>
                                                <Col span={24} style={{textAlign: 'center'}}>

                                                    {(()=>{
                                                        if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                            utils.Url.parseUrl(location.href).params.type == 'new'
                                                        ){
                                                            return (
                                                                <Button type="primary" htmlType="submit"
                                                                        style={{width: 90, height: 32, marginRight: 16}}>
                                                                    提交
                                                                </Button>
                                                            )
                                                        }else if(
                                                            utils.Url.parseUrl(location.href).params.type == 'look'
                                                        ){
                                                            return (
                                                                <Button type="primary"
                                                                        style={{width: 90, height: 32, marginRight: 16}}
                                                                        onClick={()=>{
                                                                            utils.Router.switchRoute(
                                                                                '/space/room/add?id='+ utils.Url.parseUrl(location.href).params.id +
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
//     text: '房间列表',
//         path: '/space/room/list'
// },
// {
//     text: (()=>{
//         //编辑
//         if (utils.Url.parseUrl(location.href).params.type == 'edit') {
//             return '编辑房间'
//         }
//         //新建
//         else if( utils.Url.parseUrl(location.href).params.type == 'new' ) {
//             return '新建房间'
//         }
//         //查看
//         else if( utils.Url.parseUrl(location.href).params.type == 'look' ){
//             return '查看房间'
//         }
//     })()
// }
// ]}

export default Space_build_add;

