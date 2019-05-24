import React,{Component} from 'react';
import { connect } from 'react-redux';


import utils from '../../../asset'

import {
    Row, Col, Form, Select, Icon, Input, Button, Checkbox, Divider
  } from 'antd';

import Title from '../../../components/modules/title/title';

import '../edit.scss'

const Option = Select.Option;
class FormBaseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const base_info = this.props.base_info;
        return (
            <Form className="goods_info_form">
                <Row className="mb16">
                    <Col span={8} xs={24} sm={24} md={8}>
                    <Form.Item
                            label='房间编码'
                            labelAlign='left'
                            >
                        <span>{base_info.code}</span>
                    </Form.Item>
                    </Col>
                    <Col span={10} xs={24} sm={24} md={10}>
                    <Form.Item
                            label='商品名称（工位名称）'
                            labelAlign='left'
                            >
                    <span>{base_info.goods_name}</span>
                    </Form.Item>
                    </Col>
                    <Col span={6} xs={24} sm={24} md={6}>
                    <Form.Item
                            label='商品单位（工位单位）'
                            labelAlign='left'
                            >
                    <span>{base_info.unit}</span>
                    </Form.Item>
                    </Col>
                </Row>
                <Row className="mb16">
                    <Col span={8} xs={24} sm={24} md={8}>
                    <Form.Item
                            label='创建时间'
                            labelAlign='left'
                            >
                        <span>{base_info.create_time}</span>
                    </Form.Item>
                    </Col>
                    <Col span={10} xs={24} sm={24} md={10}>
                    <Form.Item
                            label='业务性质'
                            labelAlign='left'
                            >
                        <span>{base_info.business_type}</span>
                    </Form.Item> 
                    </Col>
                    <Col span={6} xs={24} sm={24} md={6}>
                    <Form.Item
                            label='上架状态'
                            labelAlign='left'
                            >
                    <span style={{color : base_info.status_code == 2 ? '#36DCB6' : '#FF5555'}} className="medium_600" >{base_info.status_str}</span>
                    </Form.Item>
                    </Col>
                </Row>
                <Row className="mb16">
                    <Col span={8} xs={24} sm={24} md={8}>
                    <Form.Item
                            label='建筑面积'
                            labelAlign='left'
                            >
                        <span>{base_info.gross_area}</span>
                    </Form.Item>
                    </Col>
                    <Col span={10} xs={24} sm={24} md={10}>
                    <Form.Item
                            label='经营面积'
                            labelAlign='left'
                            >
                        <span>{base_info.rent_area}</span>
                    </Form.Item> 
                    </Col>
                    <Col span={6} xs={24} sm={24} md={6}>
                    <Form.Item
                            label='销售面积'
                            labelAlign='left'
                            >
                        <span>{base_info.sale_area}</span>
                    </Form.Item>
                    </Col>
                </Row>
                <Row className="mb16">
                    <Col span={8} xs={24} sm={24} md={8}>
                    <Form.Item
                        label='销售工位数'
                        labelAlign='left'
                        >
                        <span>{base_info.sale_stations}</span>
                    </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }
}
const WrappedFormBaseInfo = Form.create({name : 'Form_base_info'})(FormBaseInfo);

class FormSaleInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const sales_info = this.props.sales_info;
        return (
            <Form>
                <Row className="mb16">
                    <Col span={8} xs={24} sm={24} md={8}>
                        <Form.Item
                            label='出售城市'
                            labelAlign='left'
                            >
                            <span>{sales_info.city_name}</span>
                        </Form.Item>
                    </Col>
                    <Col span={10} xs={24} sm={24} md={10}>
                        <Form.Item
                            label='出售场地'
                            labelAlign='left'
                            >
                            <span>{sales_info.place_name}</span>
                        </Form.Item>

                    </Col>
                    <Col span={6} xs={24} sm={24} md={6}>
                        <Form.Item
                                label='出售单位'
                                labelAlign='left'
                                >
                            <span>{sales_info.sales_unit}</span>
                        </Form.Item>
                    </Col>
                </Row>
                <Row className="mb16">
                    <Col span={8} xs={24} sm={24} md={8}>
                    <Form.Item
                            label='库存量'
                            labelAlign='left'
                            >
                        <span>1</span>
                    </Form.Item>

                    </Col>
                    <Col span={10} xs={24} sm={24} md={10}>
                    <Form.Item
                            label='起购量'
                            labelAlign='left'
                            >
                        <span>1</span>
                    </Form.Item>
                    </Col>
                    {/* <Col span={6} xs={24} sm={24} md={6}>
                    <Form.Item
                                label='可售对象'
                                labelAlign='left'
                                >
                        <Checkbox value="A" disabled defaultChecked>企业</Checkbox>
                        <Checkbox value="B" disabled defaultChecked>非企业</Checkbox>
                    </Form.Item>
                    </Col> */}
                </Row>
                <Row className="mb16">
                    <Col span={8} xs={24} sm={24} md={8}>
                    <Form.Item
                            label='成本价'
                            labelAlign='left'
                            >
                            <span>¥{sales_info.cost_price}</span>
                    </Form.Item>
                    </Col>
                    <Col span={10} xs={24} sm={24} md={10}>
                    <Form.Item
                            label='底价'
                            labelAlign='left'
                            >
                        <span>¥{sales_info.base_price}</span>
                    </Form.Item>
                    </Col>
                    <Col span={6} xs={24} sm={24} md={6}>
                    <Form.Item
                            label='售价'
                            labelAlign='left'
                            >
                        <span>¥{sales_info.sales_price}</span>
                    </Form.Item>
                    </Col>
                </Row>
                {/* <Row className="mb16">
                    <Col span={8} xs={24} sm={24} md={8}>
                    <Form.Item
                            label='默认税率'
                            labelAlign='left'
                            >
                            
                    <span>{sales_info.tax_rate ? sales_info.tax_rate +"%" : ""}</span>
                    </Form.Item>
                    </Col>
                    <Col span={10} xs={24} sm={24} md={10}>
                    <Form.Item
                            label='默认税率方'
                            labelAlign='left'
                            >
                        <span>{sales_info.tax_payee}</span>
                    </Form.Item> 
                    </Col>
                    <Col span={6} xs={24} sm={24} md={6}>
                    <Form.Item
                            label='是否配送'
                            labelAlign='left'
                            >
                        <span>{sales_info.express_mode}</span>
                    </Form.Item>
                    </Col>
                </Row>
                <Row className='mb16'>
                        <Form.Item
                        label='支付方式'
                        labelAlign='left'
                        >
                                <Checkbox value="A" disabled defaultChecked>微信</Checkbox>
                                <Checkbox value="B" disabled defaultChecked>支付宝</Checkbox>
                                <Checkbox value="B" disabled defaultChecked>线下汇款</Checkbox>
                        </Form.Item>
                </Row>
                <Row className='mb16'>
                    <Form.Item
                    label='付款方式'
                    labelAlign='left'
                    >
                            <Checkbox value="A" disabled defaultChecked>分期付款</Checkbox>
                            <Checkbox value="B" disabled defaultChecked>一次性支付</Checkbox>
                    </Form.Item>
                </Row> */}
            </Form>
        );
    }
}
const WrappedFormSaleInfo = Form.create({name : 'Form_sale_info'})(FormSaleInfo);

class FormConfigInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="goods_info_form">
                <Row className="mb16">
                <Col span={8} xs={24} sm={24} md={8}>
                <Form.Item
                        label='支持开具合同&协议'
                        labelAlign='left'
                        >
                    <span>是</span>
                </Form.Item>
                </Col>
                <Col span={10} xs={24} sm={24} md={10}>
                <Form.Item
                        label='允许发送优惠券'
                        labelAlign='left'
                        >
                <span>否</span>
                </Form.Item>
                </Col>
                <Col span={6} xs={24} sm={24} md={6}>
                <Form.Item
                        label='允许兑换码支付'
                        labelAlign='left'
                        >
                <span>否</span> 
                </Form.Item>
                </Col>
                </Row>
                <Row className="mb16">
                <Col span={8} xs={24} sm={24} md={8}>
                <Form.Item
                        label='提供发票服务'
                        labelAlign='left'
                        >
                    <span>是</span>
                </Form.Item>
                </Col>
                <Col span={10} xs={24} sm={24} md={10}>
                <Form.Item
                        label='优惠券使用规则'
                        labelAlign='left'
                        >
                    <span>仅办公服务订单可用</span>
                </Form.Item>
                </Col>
                </Row>
            </Form>
        );
    }
}
const WrappedFormConfigInfo = Form.create({name : 'Form_config_info'})(FormConfigInfo);


class GoodsSpaceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            th : '查看房间办公服务商品',
            baseInfoForm : "",
            saleInfoForm : "",
            configInfoForm : ""
         };
    }
    // 生命周期
    componentDidMount() {
        // 清除 start
        componentStore.set(this);
        this.getGoodsDetailByCode();
        // 清除 end
      }
      componentWillUnmount() {
 
      }
      getGoodsDetailByCode(){
        const {dispatch} = this.props;
        const {code} = this.props.routeParams;
        //根据商品编号获取商品详情
            fetchData({
              method : 'get',
              url : config.api + '/goods/room/'+code,
              data : {}
          }).then((res)=>{
  
              if(res.code === 10000){
                    dispatch({
                        type: 'goods_detail',
                        data: {
                            detailData: res.data
                        }
                    })
  
              }
          })
      }
      switchRoute(){
        const {code} = this.props.routeParams;
            utils.Router.switchRoute('/goods/manage/room/edit/'+code)
    }
    render() {
        const {goods_detail} = this.props;
        const styleCSS = {
            container : {marginBottom : 48,overflow : "hidden"},
            header : {fontSize : '14px',color : 'rgba(0,0,0,1)',marginBottom : 11},
            

        };
        let { base_info={},sales_info={} } = goods_detail.detailData; 
        return (
            <div>
                <Title title={this.state.th} />
                <div className='goods_info'>
                <div style={styleCSS.container}>
                    <p style={styleCSS.header}><span className='icon'></span>商品基础信息</p>
                    <Divider style={{marginTop : 0}} />
                    <WrappedFormBaseInfo wrappedComponentRef={(form) => this.state.baseInfoForm = form} base_info={base_info} />
                </div>
                <div style={styleCSS.container}>
                    <p style={styleCSS.header}><span className='icon'></span>商品销售信息</p>
                    <Divider style={{marginTop : 0}} />
                    <WrappedFormSaleInfo wrappedComponentRef={(form) => this.state.saleInfoForm = form} sales_info={sales_info} />
                </div>
                {/* <div style={styleCSS.container}>
                    <p style={styleCSS.header}><span className='icon'></span>商品配置信息</p>
                    <Divider style={{marginTop : 0}} />
                    <WrappedFormConfigInfo wrappedComponentRef={(form) => this.state.configInfoForm = form} sales_info={sales_info} />
                </div> */}
                <div className='flex' style={{width : 172}}><Button type="primary" onClick={this.switchRoute.bind(this)}>编辑</Button><Button style={{backgroundColor : '#E9E9E9'}} onClick={()=>{utils.Router.switchRoute('/goods/manage/room/list/')}}>返回</Button></div>
            </div>
            </div>
        );
    }
}


export default connect(function(state) {
  return {
    common: state.common,
    goods_detail : state.goods_detail
  };
})(GoodsSpaceDetail);