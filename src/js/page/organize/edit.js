import React,{Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';

import utils from '../../asset'
import formRules from '@widget/form/form.rules'
import {
    Row, Col, Form, Select, Icon, Input, Button, Divider, Upload, message
  } from 'antd';
import ShadowBox from '@components/modules/shadowBox/shadowBox';
import SuccessModel from '@/js/components/modules/statusModel/success'

import Title from '@components/modules/title/title';
import Bind from 'lodash-decorators/bind';
import Debounce from 'lodash-decorators/debounce';

import api from '@api/organize'
import './edit.scss'
const {Option} = Select;

@Form.create()
class organizeEdit extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showSuccess: false
         };
    }
    
    componentDidMount(){
        this.getOrganizeTypeList();
        this.getOrganizeDetail();
    }
    componentWillUnmount(){
        const { organize_detail,dispatch } = this.props;
        const { params } = organize_detail;
        params.picture_urls = {
            front : '',
            back : '',
            logo : ''
        };
        dispatch({
            type : 'organize_detail',
            data : {
                params
            }
        });
    }

    //组织类型更改
    handleOrganeizeChange = value=>{
        const { organize_detail,dispatch } = this.props;
        organize_detail.params.type_id = value; 
        dispatch({
            type : 'organize_detail',
            data : {
                params : organize_detail.params
            }
        });

    }
    //证件类型更改
    handleIdentityChange = value=>{
        const { organize_detail,dispatch } = this.props;
        const { picture_urls } = organize_detail.params;
        picture_urls.front = '';
        picture_urls.back = '';
        organize_detail.params.identity_type = value; 
        dispatch({
            type : 'organize_detail',
            data : {
                params : organize_detail.params
            }
        });

    }
    //判断正面
    @Bind()
    hasfront(rule, value, callback){
        const { organize_detail } = this.props;
        const { picture_urls } = organize_detail.params;
        setTimeout(() => {
            if(!picture_urls.front){
                callback('请上传证件正面');
                return;
            }
            callback();
        }, 1000);
    }
    //判断反面
    @Bind()
    hasback(rule, value, callback){
        const { organize_detail } = this.props;
        const { picture_urls } = organize_detail.params;
        setTimeout(() => {
            if(!picture_urls.back){
                callback('请上传证件反面');
                return;
            }
            callback();
        }, 1000);
    }
    //上传证件
    uploadCredentials = (content)=>{
        const { organize_detail,dispatch,form } = this.props;
        const { picture_urls } = organize_detail.params 
        const reader = new FileReader();
        reader.readAsDataURL(content.file);
        reader.onload = function(){
            if(content.filename == 'logo'){
                if(content.file.size / 1024 / 1024 > 1){message.error('请上传小于1M的图片'); return;} 
                picture_urls.logo = this.result;
            }
            else if(content.filename == 'front' || (!picture_urls.front && content.filename != 'back')){
                if(content.file.size / 1024 / 1024 > 5) {message.error('请上传小于5M的图片'); return;} 
                picture_urls.front = this.result;
            }else{
                if(content.file.size / 1024 / 1024 > 5) {message.error('请上传小于5M的图片'); return;} 
                picture_urls.back = this.result;  
            }
            dispatch({
                type : 'organize_detail',
                data : {
                    params : organize_detail.params
                }   
            });
        }
    }
    //判断上传图片大小
    // @Bind()
    // isSizeOut(f,fs){
    //         const { form } = this.props;  
    //         if(f.size / 1024 / 1024 > 1){
    //             form.validateFields(err=>{
    //                 form.setFields({
    //                     logo: {
    //                       value: f.size,
    //                       errors: [new Error('上传大于1M')],
    //                     },
    //                 });
    //             });
                
    //             return false;
    //         }
    //         return true;
    // }
    //更改搜索条件(所有人)
    @Bind()
    @Debounce(500) 
    changekeyword(keywords){
        const { organize_detail,dispatch } = this.props; 
        const { ownerList } = organize_detail;
        ownerList.pageOption.keywords = keywords;
        dispatch({
            type: 'organize_detail',
            data: {
                ownerList
            }
        })
            this.getOwnerSearch();
        
    }
    //更改所有人
    @Bind()
     changeowner(v){
        console.log(v);
        const { organize_detail,dispatch } = this.props; 
        const { params } = organize_detail;
        params.owner_id = v; 
        dispatch({
            type: 'organize_detail',
            data: {
                params
            }
        });
     }
    //获取组织相关类型列表
    getOrganizeTypeList(){
        const { dispatch } = this.props;
        api.getOrganizeTypeList().then(res=>{
            dispatch({
                type: 'organize_detail',
                data: {
                    organizeTypeList: res.data
                }
            })
          }); 
    }
    //获取某个组织详情
    getOrganizeDetail(){
        const { organize_detail,dispatch } = this.props;
        const { id } = this.props.routeParams;
        const { ownerList } = organize_detail; 
        api.getOrganizeDetail({id}).then(res=>{
            if(res.code != 10000) return;
            const {
                type_id,name,short_name,
                identity_type,identity_number,
                taxpayer_registration_number,owner_id,picture_urls
            } = res.data;
            organize_detail.params = Object.assign(organize_detail.params,{type_id,name,short_name,
                                      identity_type,identity_number,
                                      taxpayer_registration_number,owner_id 
                                    });
            
            if(picture_urls)
            organize_detail.params.picture_urls = picture_urls;
            ownerList.pageOption.user_id = owner_id; 
            dispatch({
                type : "organize_detail",
                data : {
                    detailData : res.data,
                    params : organize_detail.params
                }
            });
            this.getOwnerSearch();
        });
    }
    //获取所有人列表
    getOwnerSearch(){
        const { organize_detail,dispatch } = this.props;
        const { ownerList } = organize_detail;
        api.getOwnerSearch(ownerList.pageOption).then(res=>{
            if(res.code != 10000) return;
            ownerList.data = res.data.data;
            dispatch({
                type : "organize_detail",
                data : {
                    ownerList
                }
            });
        });
    }
    //保存
    @Bind()
    save(){
        const { organize_detail,form } = this.props;
        const { id } = this.props.routeParams;
        const { params } = organize_detail;
        form.validateFieldsAndScroll({first : true},(err,values)=>{
            if(err) return;
            const {name,short_name,taxpayer_registration_number,identity_number} = values;
            const data = Object.assign(params,{name,short_name,taxpayer_registration_number,identity_number});
            data.id = id;
            if(!data.picture_urls.back) delete data.picture_urls.back;
            if(!data.picture_urls.logo) delete data.picture_urls.logo; 
            console.log(data);
            api.updateOrganize(data).then(res=>{
                if(res.code != 10000) {
                    message.error(res.message);
                    return;
                }
                this.setState({
                    showSuccess : true
                });
            });
            
        //    if('idcard' in values && !values.idcard && !params.picture_urls.front) return;
        //    else if('icard' in values && !values.icard && (!params.picture_urls.front || !params.picture_urls.back)) return;
        //    const formValue = form.getFieldsValue();
        //     console.log(formValue);  
        // //    api.updateOrganize().then(res=>{
            
        // //    });
        });

    }

    @Bind()
    @Debounce(400)
    showSuccessView() {
        this.setState({
            showSuccess: false
        })
        utils.Router.switchRoute('/organize/owner/list');

    }

    //重置
    @Bind()
    restForm(){
        const { form } = this.props;
        form.resetFields();
    }

    render() {
        const styleCSS = {
            container : {marginBottom : 56,overflow : "hidden"},
            header : {fontSize : '14px',color : 'rgba(0,0,0,1)',marginBottom : 11}
        };
        const { getFieldDecorator } = this.props.form;
        const uploadCSS = {fontSize : 12,color : "#bfbfbf",marginLeft : 8};
        const slect_menu_css = {marginLeft : 32};
        const { detailData,organizeTypeList,params,ownerList } = this.props.organize_detail;
        const { picture_urls } = params; 
        const { data } = ownerList;
        return (
            <div className="organizeOp">
                <Title title={'编辑组织'} />
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
                    </Form>
                    {/* 填写组织信息 */}
                    <Form style={{marginTop : 24}}>
                        <Row>
                            <Col span={8}>
                                <Form.Item
                                    label="组织类型"
                                >
                                {getFieldDecorator('type_id', {
                                    initialValue : detailData.type_id,
                                    rules : [
                                        {required: true, message: '请选择组织类型'}
                                    ]
                                })(
                                    <Select 
                                    style={{width : 180}}
                                    onSelect = {this.handleOrganeizeChange}
                                    >
                                        {
                                           organizeTypeList.org_type.map(o=>{
                                               return <Option key={o.key} value={o.key}>{o.value}</Option>
                                           }) 
                                        }
                                    </Select>
                                )}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="组织名称"
                                >
                                {getFieldDecorator('name', {
                                    validateFirst : true,
                                    initialValue : detailData.name,
                                    rules: [
                                        { required: true, message: '请输入组织名称' },
                                        { validator : formRules.ChineseEnglishDigital },
                                        { max : 50, message : '只能输入最多50个字符' }
                                ],
                                })(
                                    <Input style={{width : 180}} />
                                    
                                )}
                                &ensp;<Link style={{textDecoration : 'underline',fontSize : 12,display: params.type_id == 1 ? 'none' : 'none'}}>天眼查认证</Link>
                                </Form.Item>
                                
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="组织简称"
                                >
                                {getFieldDecorator('short_name', {
                                    validateFirst : true,
                                    initialValue : detailData.short_name,
                                    rules: [
                                        { required: true, message: '请输入组织名称' },
                                        { validator : formRules.ChineseEnglishDigital},
                                        { max : 50, message : '只能输入最多50个字符' }
                                ],
                                })(
                                    <Input style={{width : 180}} />
                                    
                                )}
                                </Form.Item>
                            </Col>
                        </Row>
                        
                        {/********************* 企业 营业执照 start *********************/}
                        {
                        params.type_id == 1 ? 
                        (<div>
                        <Row style={{marginTop : 16}}>
                            <Col span={8}>
                                <Form.Item
                                    label="营业执照号"
                                    >
                                    {getFieldDecorator('identity_number', {
                                        validateFirst : true,
                                        initialValue : detailData.identity_number,
                                        rules: [
                                            { required: true, message: '请输入营业执照' },
                                            { validator : formRules.EnglishDigital },
                                            { max : 50, message : '只能输入最多50个字符' }
                                    ],
                                    })(
                                        <Input style={{width : 180}} />
                                        
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="纳税人识别号"
                                    >
                                    {getFieldDecorator('taxpayer_registration_number', {
                                        validateFirst : true,
                                        initialValue : detailData.taxpayer_registration_number,
                                        rules: [
                                            { required: true, message: '请输入营业执照' },
                                            { validator : formRules.EnglishDigital },
                                            { max : 50, message : '只能输入最多50个字符' }
                                    ],
                                    })(
                                        <Input style={{width : 180}} />
                                        
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{marginTop : 16}}>
                        <Col span={24}>
                        <Form.Item
                        label="营业执照扫描件"
                        >
                        {getFieldDecorator('idcard', {
                            initialValue : picture_urls.front, 
                            rules: [
                                { required: true, message: '请上传营业执照扫描件' }
                            ]
                        })(
                            <Col span={24}>
                            <Upload 
                            name="front" listType="picture"
                            customRequest={this.uploadCredentials}
                            showUploadList={false}
                            >
                            <Button className="upload_btn">
                                <Icon type="upload" />上传图片
                            </Button>
                            <span style={uploadCSS}>请上传png/jpg格式的图片，大小不超过5M</span>
                            </Upload>
                            <Row>
                            <Upload name="front"
                            customRequest={this.uploadCredentials}
                            showUploadList={false} 
                            listType="picture">
                                    {
                                        picture_urls.front ? 
                                        (<span className="img_css" style={{backgroundImage : "url("+picture_urls.front+")"}}></span>)
                                        :
                                        (
                                        <div className="upload_box">
                                            <Icon type="plus" />
                                        <div className="ant-upload-text">上传<br />营业执照扫描件</div>
                                        </div>)
                                    } 
                                    
                                
                            </Upload>
                            </Row>
                            </Col>
                            
                        )}
                        
                        </Form.Item>
                        </Col>
                        </Row>
                        </div>
                        /********************* 营业执照 end *********************/
                        ) : (
                        /********************* 非企业 start *********************/
                        <div style={{marginTop : 16}}>
                            <Row>
                                <Form.Item
                                    label="证件类型"
                                >
                                {getFieldDecorator('identity_type', {
                                    validateFirst : true,
                                    initialValue : detailData.identity_type,
                                    rules: [
                                        { required: true, message: '请选择证件类型' }
                                    ],
                                })(
                                    <Select 
                                    style={{width : 180}}
                                    onSelect={this.handleIdentityChange}
                                    >
                                        {
                                           organizeTypeList.identity_type.map(o=>{
                                               return <Option key={o.key} value={o.key}>{o.value}</Option>
                                           }) 
                                        }
                                    </Select>
                                )}
                                </Form.Item>
                            </Row>

                            {/********************* 身份证 start *********************/}
                            {
                            params.identity_type == 1 ?
                            (
                            <div style={{marginTop : 16}}>
                            <Row>
                                <Form.Item
                                    label="身份证号"
                                    >
                                    {getFieldDecorator('identity_number', {
                                        validateFirst : true,
                                        initialValue : detailData.identity_number,
                                        rules: [
                                            { required: true, message: '请输入身份证号' },
                                            { validator : formRules.EnglishDigital },
                                            { max : 50, message : '只能输入最多50个字符' }
                                        ]
                                    })(
                                        <Input style={{width : 180}} />
                                        
                                    )}
                                </Form.Item>
                            </Row>
                            <Row style={{marginTop : 16}}>
                                <Col span={24}>
                                <Form.Item
                                label="身份证扫描件"
                                >
                                {getFieldDecorator('icard', {
                                    initialValue : picture_urls.front, 
                                    rules: [
                                        { required: true, message: '请上传正反面身份证扫描件' },
                                        { validator : this.hasfront },
                                        { validator : this.hasback }
                                    ], 
                                })(
                                    <Col span={24}>
                                    <Upload name="btn" 
                                    listType="picture"
                                    showUploadList={false} 
                                    disabled={picture_urls.front && picture_urls.back ? true : false }
                                    customRequest={this.uploadCredentials}
                                    >
                                    <Button className="upload_btn">
                                        <Icon type="upload" />上传图片
                                    </Button>
                                    <span style={uploadCSS}>请上传png/jpg格式的图片，身份证正反面，每张大小不超过5M</span>
                                    </Upload>
                                    <Row>
                                    <Upload name="front" 
                                    showUploadList={false}
                                    customRequest={this.uploadCredentials}
                                    listType="picture">
                                    {
                                        picture_urls.front ? 
                                        (<span className="img_css" style={{backgroundImage : "url("+picture_urls.front+")"}}></span>)
                                        :
                                        (
                                        <div className="upload_box">
                                            <Icon type="plus" />
                                            <div className="ant-upload-text">上传<br />身份证正面</div>
                                        </div>
                                        )
                                    }
                                    </Upload>
                                    <Upload name="back"
                                    showUploadList={false}
                                    customRequest={this.uploadCredentials}
                                     listType="picture">
                                    {
                                        picture_urls.back ? 
                                        (<span className="img_css" style={{marginLeft : 32,backgroundImage : "url("+picture_urls.back+")"}}></span>)
                                        :
                                        (
                                        <div className="upload_box" style={{marginLeft : 32}}>
                                            <Icon type="plus" />
                                            <div className="ant-upload-text">上传<br />身份证反面</div>
                                        </div>
                                        )
                                        }
                                        
                                    </Upload>
                                    </Row>
                                    </Col>
                                )}
                                </Form.Item>
                                </Col>
                                </Row>
                                <Row>
                                <Form.Item className="double_upload">
                                    
                                </Form.Item>
                            </Row>
                            </div>

                            /*************** 身份证 end ******************/
                                ) : ''
                            }
                            

                            {/******************** 护照 start ********************/}
                            {
                            params.identity_type == 2 ? 
                            (
                                <div style={{marginTop : 16}}>
                                <Row>
                                    <Form.Item
                                        label="护照号"
                                        >
                                        {getFieldDecorator('identity_number', {
                                            validateFirst : true,
                                            initialValue : detailData.identity_number,
                                            rules: [
                                                { required: true, message: '请输入护照号' },
                                                { validator : formRules.EnglishDigital },
                                                { max : 50, message : '只能输入最多50个字符' }
                                            ],
                                        })(
                                            <Input style={{width : 180}} />
                                            
                                        )}
                                    </Form.Item>
                                </Row>
                                <Row style={{marginTop : 16}}>
                                    <Col span={24}>
                                    <Form.Item
                                    label="护照扫描件"
                                    >
                                    {getFieldDecorator('icard', {
                                        initialValue : picture_urls.front, 
                                        rules: [
                                            { required: true, message: '请上传正反面护照扫描件' },
                                            { validator : this.hasfront },
                                            { validator : this.hasback }
                                        ], 
                                    })( 
                                        <Col span={24}>
                                        <Upload name="btn" 
                                        showUploadList={false} 
                                        disabled={picture_urls.front && picture_urls.back ? true : false }
                                        customRequest={this.uploadCredentials}
                                        listType="picture">
                                        <Button className="upload_btn">
                                            <Icon type="upload" />上传图片
                                        </Button>
                                        <span style={uploadCSS}>请上传png/jpg格式的图片，护照正反面，每张大小不超过5M</span>
                                        </Upload>
                                        <Row>
                                        <Upload name="front" 
                                        showUploadList={false}
                                        customRequest={this.uploadCredentials}
                                        listType="picture">
                                        {
                                            picture_urls.front ? 
                                            (<span className="img_css" style={{backgroundImage : "url("+picture_urls.front+")"}}></span>)
                                            :
                                            (
                                            <div className="upload_box">
                                                <Icon type="plus" />
                                                <div className="ant-upload-text">上传<br />护照正面</div>
                                            </div>
                                            )
                                        }
                                        </Upload>
                                        <Upload name="back"
                                        showUploadList={false}
                                        customRequest={this.uploadCredentials}
                                         listType="picture">
                                        {
                                            picture_urls.back ? 
                                            (<span className="img_css" style={{marginLeft : 32,backgroundImage : "url("+picture_urls.back+")"}}></span>)
                                            :
                                            (
                                            <div className="upload_box" style={{marginLeft : 32}}>
                                                <Icon type="plus" />
                                                <div className="ant-upload-text">上传<br />护照反面</div>
                                            </div>
                                            )
                                            }
                                            
                                        </Upload>
                                        </Row>
                                        </Col>
                                    )}
                                    </Form.Item>
                                    </Col>
                                    </Row>
                                </div>
    
                                /******************** 护照 end ********************/
                            ) : ''
                            }
                            

                            {/******************** 港澳通行证 start ********************/}
                            {
                            params.identity_type == 3 ?
                            (
                            <div style={{marginTop : 16}}>
                            <Row>
                                <Form.Item
                                    label="港澳通行证"
                                    >
                                    {getFieldDecorator('identity_number', {
                                        validateFirst : true,
                                        initialValue : detailData.identity_number,
                                        rules: [
                                            { required: true, message: '请输入港澳通行证' },
                                            { validator : formRules.EnglishDigital },
                                            { max : 50, message : '只能输入最多50个字符' }
                                        ],
                                    })(
                                        <Input style={{width : 180}} />
                                        
                                    )}
                                </Form.Item>
                            </Row>
                            <Row style={{marginTop : 16}}>
                                <Col span={24}>
                                <Form.Item
                                label="港澳通行证扫描件"
                                >
                                {getFieldDecorator('icard', {
                                    initialValue : picture_urls.front, 
                                    rules: [
                                        { required: true, message: '请上传正反面港澳通行证扫描件' },
                                        { validator : this.hasfront },
                                        { validator : this.hasback }
                                    ],
                                })(
                                    <Col>
                                    <Upload name="btn"
                                    showUploadList={false} 
                                    disabled={picture_urls.front && picture_urls.back ? true : false }
                                    customRequest={this.uploadCredentials}
                                    listType="picture">
                                    <Button className="upload_btn">
                                        <Icon type="upload" />上传图片
                                    </Button>
                                    <span style={uploadCSS}>请上传png/jpg格式的图片，港澳通行证正反面，每张大小不超过5M</span>
                                    </Upload>
                                    <Row>
                                    <Upload name="front" 
                                    showUploadList={false}
                                    customRequest={this.uploadCredentials}
                                    listType="picture">
                                    {
                                        picture_urls.front ? 
                                        (<span className="img_css" style={{backgroundImage : "url("+picture_urls.front+")"}}></span>)
                                        :
                                        (
                                        <div className="upload_box">
                                            <Icon type="plus" />
                                            <div className="ant-upload-text">上传<br />港澳通行证正面</div>
                                        </div>
                                        )
                                    }
                                    </Upload>
                                    <Upload name="back"
                                    showUploadList={false}
                                    customRequest={this.uploadCredentials}
                                     listType="picture">
                                    {
                                        picture_urls.back ? 
                                        (<span className="img_css" style={{marginLeft : 32,backgroundImage : "url("+picture_urls.back+")"}}></span>)
                                        :
                                        (
                                        <div className="upload_box" style={{marginLeft : 32}}>
                                            <Icon type="plus" />
                                            <div className="ant-upload-text">上传<br />港澳通行证反面</div>
                                        </div>
                                        )
                                        }
                                        
                                    </Upload>
                                    </Row>
                                    </Col>
                                    
                                )}
                                
                                </Form.Item>
                                </Col>
                                </Row>
                            </div>

                            /******************** 港澳通行证 end ********************/
                                ) : ''
                            }
                            

                        </div>

                        /* 非企业 end */
                        )
                        }
                        

                       
                        <Row style={{marginTop : 16,marginLeft : 14}}>
                        <Col span={24}>
                        <Form.Item
                        label="组织LOGO文件"
                        >
                        {getFieldDecorator('logo', {
                                rules: [
                                    //{validator : this.isSizeOut}
                                ],
                            })(
                            <Upload name="logo"
                            showUploadList={false}
                            customRequest={this.uploadCredentials}
                            listType="picture">
                            <Button className="upload_btn">
                                <Icon type="upload" />上传图片
                            </Button>
                            <span style={uploadCSS}>请上传png/jpg格式的图片，大小不超过1M</span>
                            </Upload>
                            )}
                            <Row>
                            <Upload name="logo" 
                            showUploadList={false}
                            customRequest={this.uploadCredentials}
                            listType="picture">
                            {
                                picture_urls.logo ? 
                                (<span className="img_css" style={{backgroundImage : "url("+picture_urls.logo+")"}}></span>)
                                :
                                (
                                <div className="upload_box">
                                <Icon type="plus" />
                                    <div className="ant-upload-text">上传<br />组织logo</div>
                                </div>
                                )
                            }
                                
                                
                            </Upload>
                            </Row>
                        </Form.Item>
                        </Col>
                        </Row>
                        <Row style={{marginTop : 48}}>
                            <Form.Item
                                    label="绑定所有人"
                                >
                                {getFieldDecorator('sales_price', {
                                    validateFirst : true,
                                    initialValue : params.owner_id,
                                    rules: [
                                        { required: true, message: '请绑定所有人' }
                                ],
                                })(
                                    <Select 
                                    showSearch
                                    style={{width : 700}}
                                    filterOption={false}
                                    defaultActiveFirstOption={false}
                                    onSearch={this.changekeyword}
                                    onChange={this.changeowner}
                                    placeholder="请绑定所有人"
                                    >
                                    {
                                        data.map(m=>{
                                            return <Option key={m.id} value={m.id}><span>用户名: {m.username}</span><span style={slect_menu_css}>手机号: {m.mobile}</span><span style={slect_menu_css}>邮箱: {m.email}</span></Option> 
                                        })
                                    }
                                    </Select>
                                )}
                            </Form.Item>
                        </Row>
                    </Form>

                    <div className='flex' style={{width : 172,marginTop : 86}}><Button style={{width : 78,backgroundColor : '#FFF'}} onClick={e=>utils.Router.switchRoute('/organize/owner/list')} >取消</Button>
                    {/* <Button style={{backgroundColor : '#E9E9E9'}} onClick={this.restForm}>重置</Button> */}
                    <Button type="primary" style={{width : 78}} onClick={this.save}>保存</Button></div>
                    <SuccessModel onclickFilter={this.showSuccessView} filter_visible={this.state.showSuccess} title={'组织保存成功'} content={'组织保存成功'}></SuccessModel>
                </div>
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