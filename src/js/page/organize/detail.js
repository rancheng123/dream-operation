import React,{Component} from 'react';
import { connect } from 'react-redux';

import utils from '../../asset'

import {
    Col, Form, Button, Divider, Modal, Icon
  } from 'antd';
import ShadowBox from '@components/modules/shadowBox/shadowBox';
import Title from '@components/modules/title/title';
import api from '@api/organize'
import './edit.scss'
import Bind from 'lodash-decorators/bind';


class ScanModal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { type,pics={} } = this.props.data;
        return (
            <Modal
                className="scan_modal"
                width={1000}
                closable={false}
                footer={null}
                bodyStyle={{ padding: 0 }}
                visible={this.props.visible}
                centered={true}
                >
                {
                    type == 2 ? (
                        <div className="ct_modal">
                            <span className="close" onClick={this.props.shScanModal}><Icon type="close" style={{color : '#FFF',fontSize : 16}} /></span>
                            <img
                            style={{ width: "50%", height: "50%" }}
                            src={pics.front}
                            />
                            <img
                            style={{ width: "50%", height: "50%" }}
                            src={pics.back}
                            />
                        </div>
                    ) : (
                        <div className="ct_modal">
                            <span className="close" onClick={this.props.shScanModal}><Icon type="close" style={{color : '#FFF',fontSize : 16}} /></span>
                            <img
                            style={{ width: "100%", height: "100%" }}
                            src={pics.front}
                            />
                        </div>
                    )
                }
                
            </Modal>
        );
    }
}




@Form.create()
class organizeEdit extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            visible : false 
         };
    }
    componentDidMount(){
        this.getOrganizeDetail();
    }
    getOrganizeDetail(){
        const { organize_detail,dispatch } = this.props;
        const { id } = this.props.routeParams;
        api.getOrganizeDetail({id}).then(res=>{
            if(res.code != 10000) return;
            // organize_detail.params.type_id = res.data.type_id;
            // organize_detail.params.identity_type = res.data.identity_type;
            if(res.data.picture_urls)
            organize_detail.params.picture_urls = res.data.picture_urls;
            dispatch({
                type : "organize_detail",
                data : {
                    detailData : res.data,
                    params : organize_detail.params
                }
            });
        });
    }

    //显示扫描件
    @Bind()
    shScanModal(){
        const visible = this.state.visible; 
        this.setState({
            visible : !visible
        });
    }
    
    render() {
        const styleCSS = {
            container : {marginBottom : 16,overflow : "hidden"},
            header : {fontSize : '14px',color : 'rgba(0,0,0,1)',marginBottom : 11}
        };
        const { detailData,params } = this.props.organize_detail;
        const { type_id,identity_type } = detailData;
        return (
            <div className="organizeOp">
                <Title title={'组织详情'} />
                <ShadowBox>
                <div style={styleCSS.container}>
                    <p style={styleCSS.header}><span className='icon'></span>组织信息</p>
                    <Divider style={{marginTop : 0}} />
                    <Form>
                        {/* <Col span={8}>
                            <Form.Item
                                label="组织编号"
                            >
                            <span>231232344</span>
                            </Form.Item>
                        </Col> */}
                        <Col span={8}>
                            <Form.Item
                                label="创建时间"
                            >
                            <span>{detailData.created_at}</span>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="创建人"
                            >
                            <span>{detailData.created_by_name}</span>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="创建方式"
                            >
                            <span>{detailData.from_type_name}</span>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                                <Form.Item
                                    label="组织名称"
                                >
                                    <span>{detailData.name}</span>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                            <Form.Item
                                    label="组织简称"
                                >
                                    <span>{detailData.short_name}</span>
                                </Form.Item> 
                            </Col>

                            {/********************* 企业 营业执照 start *********************/}
                            <div style={{display: type_id == 1 ? 'block' : 'none'}}>
                            <Col span={8}>
                                <Form.Item
                                    label="纳税人识别号"
                                    >
                                    <span>{detailData.taxpayer_registration_number}</span>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="营业执照号"
                                    >
                                    <span>{detailData.identity_number}</span>
                                    &ensp;<span style={{textDecoration : 'underline',cursor : 'pointer',color : '#1890ff',fontSize : 12}} onClick={this.shScanModal}>查看扫描件</span>
                                </Form.Item>
                            </Col>
                            {/* <Col span={8}>
                                <Form.Item
                                    label="认证状态"
                                    >
                                    &ensp;<Link style={{textDecoration : 'underline',fontSize : 12,display: this.state.organizeType == 1 ? 'inline-block' : 'none'}}>天眼查认证</Link>
                                </Form.Item>
                            </Col> */}
                            </div>

                                {/********************* 非企业 start *********************/}
                        <div style={{display: type_id == 2 ? 'block' : 'none'}}>
                        {/********************* 身份证 start *********************/}
                        <div style={{display: identity_type == 1 ? 'block' : 'none'}}>
                        <Col span={8}>
                            <Form.Item
                                label="身份证号"
                                >
                                <span>{detailData.identity_number}</span>
                                &ensp;<span style={{textDecoration : 'underline',cursor : 'pointer',color : '#1890ff',fontSize : 12}} 
                                onClick={this.shScanModal}>查看扫描件</span>
                            </Form.Item>
                        </Col>
                        </div>

                        {/*************** 身份证 end ******************/}

                        {/******************** 护照 start ********************/}
                        <div style={{display: identity_type == 2 ? 'block' : 'none'}}>
                        <Col span={8}>
                            <Form.Item
                                label="护照号"
                                >
                                <span>{detailData.identity_number}</span>
                                &ensp;<span style={{textDecoration : 'underline',cursor : 'pointer',color : '#1890ff',fontSize : 12}} onClick={this.shScanModal}>查看扫描件</span>
                            </Form.Item>
                        </Col>
                        </div>

                        {/******************** 护照 end ********************/}

                        {/******************** 港澳通行证 start ********************/}
                        <div style={{display: identity_type == 3 ? 'block' : 'none'}}>
                        <Col span={8}>
                            <Form.Item
                                label="港澳通行证号"
                                >
                                <span>{detailData.identity_number}</span>
                                &ensp;<span style={{textDecoration : 'underline',cursor : 'pointer',color : '#1890ff',fontSize : 12}}>查看扫描件</span>
                            </Form.Item>
                        </Col>
                        </div>

                        {/******************** 港澳通行证 end ********************/}

                        </div>
                        {/* 非企业 end */}

                            <Col span={8}>
                                <Form.Item
                                    label="组织类型"
                                    >
                                    <span>{detailData.type_name}</span>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="LOGO"
                                    >
                                    {
                                        params.picture_urls.logo ? (
                                            <span className="organize_logo" style={{backgroundImage : 'url('+params.picture_urls.logo+')'}}></span>
                                        ) : '暂无图片'
                                    }
                                </Form.Item>
                            </Col>

                    </Form>
                </div>
                {/* 所有人信息 */}
                <div style={styleCSS.container}>
                    <p style={styleCSS.header}><span className='icon'></span>所有人信息</p>
                    <Divider style={{marginTop : 0}} />
                    <Form>
                        <Col span={8}>
                            <Form.Item
                                label="所有人"
                                >
                                <span>{detailData.owner_name}</span>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="用户名"
                                >
                                <span>{detailData.owner_username}</span>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="手机号"
                                >
                                <span>{detailData.owner_mobile}</span>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="邮箱"
                                >
                                <span>{detailData.owner_email}</span>
                            </Form.Item>
                        </Col>

                    </Form> 
                    </div>
                    <div className='flex' style={{width : 78,marginTop : 86}}><Button style={{backgroundColor : '#F7F7F7'}} onClick={e=>utils.Router.switchRoute('/organize/owner/list')} >返回</Button></div>

                    <ScanModal visible={this.state.visible} shScanModal={this.shScanModal} 
                    data={{
                        type : type_id,
                        pics : params.picture_urls
                    }}
                    />
                </ShadowBox>
            </div>
        );
    }
}


export default connect(function(state) {
  return {
    common: state.common,
    organize_detail : state.organize_detail
  };
})(organizeEdit);