import React, {Component, PropTypes, Fragment} from 'react';
import { Button, Input, Form, Row, Col, Modal, InputNumber} from 'antd';
import ShadowBox from '@components/modules/shadowBox/shadowBox';
import Title from '@components/modules/title/title';
import MxjForm from '@widget/form/form'
import fetchData from '@api/fetchData';
import config from "../../../config";
import utils from "../../../asset";
import './space_station_add.scss'
import DetailHeader from '@components/modules/detailHeader'
import ProvinceCityBuildLocation from '@widget/provinceCityBuildLocation'
import StationType from '../modules/stationType';
import MainRight2 from '@components/layout/main_right2';
import DetailBox from '@/js/components/modules/detailBox'

class Space_station_add extends Component {
    constructor() {
        super();
        this.state = {
            detailData: {}
        }
    }

    componentDidMount() {

        if (
            //编辑
            utils.Url.parseUrl(location.href).params.type == 'edit' ||
            //查看
            utils.Url.parseUrl(location.href).params.type == 'look'

        ) {
            //获取楼盘详情
            fetchData({
                method: 'get',
                url: config.api + '/location/station-detail/' + utils.Url.parseUrl(location.href).params.code,
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
            <Fragment>

                <div className={'space_station_add'}>

                    <Title title={(()=>{
                        //编辑
                        if (utils.Url.parseUrl(location.href).params.type == 'edit') {
                            return '编辑工位基本信息'
                        }
                        //新建
                        else if( utils.Url.parseUrl(location.href).params.type == 'new' ) {
                            return '新建工位基本信息'
                        }
                        //查看
                        else if( utils.Url.parseUrl(location.href).params.type == 'look' ){
                            return '查看工位基本信息'
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
                                    var requestUrl = config.api + '/location/station-update/' + utils.Url.parseUrl(location.href).params.id;
                                }
                                //新建
                                else if(utils.Url.parseUrl(location.href).params.type == 'new') {
                                    var requestUrl = config.api + '/location/station-insert';
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
                                                utils.Router.switchRoute('/space/station/list')
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
                                                                onChange={(obj)=>{
                                                                    this.state.detailData.province_code = obj.province_code;
                                                                    this.state.detailData.city_code = obj.city_code;
                                                                    this.state.detailData.building_code = obj.building_code;
                                                                    this.state.detailData.location_code = obj.location_code;


                                                                    this.setState(this.state)



                                                                }}
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
                                                                    label={'工位编号'}

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





                                            <Row gutter={95} style={{marginBottom:32 }}>
                                                <Col className="gutter-row" span={8}>

                                                    <Form.Item
                                                        label={'工位类型'}

                                                    >
                                                        {(()=>{
                                                            if(utils.Url.parseUrl(location.href).params.type == 'edit' ||
                                                                utils.Url.parseUrl(location.href).params.type == 'new'
                                                            ){
                                                                return getFieldDecorator('type_id', {
                                                                    initialValue: this.state.detailData.type_id,
                                                                    rules: [
                                                                        {
                                                                            required: true
                                                                        }
                                                                    ],
                                                                })(

                                                                    <StationType
                                                                        placeholder="请选择"
                                                                        onChange={(value)=>{
                                                                            //固定工位
                                                                            if(value == 1){
                                                                                mxjFormContext.props.form.setFieldsValue({
                                                                                    name: '开放式工位'
                                                                                })
                                                                            }
                                                                            //流动工位
                                                                            else if(value == 2){
                                                                                mxjFormContext.props.form.setFieldsValue({
                                                                                    name: '流动工位'
                                                                                })
                                                                            }
                                                                        }}
                                                                    />

                                                                )
                                                            }else if(
                                                                utils.Url.parseUrl(location.href).params.type == 'look'
                                                            ){
                                                                return this.state.detailData.type_name
                                                            }

                                                        })()}
                                                    </Form.Item>

                                                </Col>



                                                <Col className="gutter-row" span={8}>
                                                    <Form.Item
                                                        label={'工位名称'}

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
                                                                            max: 30
                                                                        }

                                                                    ],
                                                                })(
                                                                    <Input
                                                                        placeholder="请填写工位名称"
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


                                                {(()=>{
                                                    //创建 才有工位数量
                                                    if(utils.Url.parseUrl(location.href).params.type == 'new'){
                                                        return (
                                                            <Col className="gutter-row" span={8}>

                                                                <Form.Item
                                                                    label={'工位数量'}

                                                                >
                                                                    {getFieldDecorator('station_num', {
                                                                        initialValue: this.state.detailData.station_num,
                                                                        rules: [
                                                                            {
                                                                                required: true
                                                                            }
                                                                        ],
                                                                    })(
                                                                        <InputNumber
                                                                            style={{width: '100%'}}
                                                                            min={1} max={1000}
                                                                            placeholder={'输入范围1-1000'}
                                                                        />
                                                                    )}
                                                                </Form.Item>

                                                            </Col>
                                                        )
                                                    }
                                                })()}
                                            </Row>





                                            <Row>
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
                                                                                '/space/station/add?id='+ utils.Url.parseUrl(location.href).params.id +
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
// breadcrumbData={
//     [
//         {
//             text: '场地管理'
//         },
//         {
//             text: '场地信息管理'
//         },
//         {
//             text: '工位列表',
//             path: '/space/station/list'
//         },
//         {
//             text: (()=>{
//                 //编辑
//                 if (utils.Url.parseUrl(location.href).params.type == 'edit') {
//                     return '编辑工位'
//                 }
//                 //新建
//                 else if( utils.Url.parseUrl(location.href).params.type == 'new' ) {
//                     return '新建工位'
//                 }
//                 //查看
//                 else if( utils.Url.parseUrl(location.href).params.type == 'look' ){
//                     return '查看工位'
//                 }
//             })()
//         }
//     ]
// }
export default Space_station_add;

