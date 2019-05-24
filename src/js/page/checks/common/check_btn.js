
import React, { Component,Fragment } from 'react';
import {Link} from 'react-router';

import {
    Button, Modal, Row, Icon,Form, Input, message
  } from 'antd';

import utils from "../../../asset";

import { checkOp } from '@api/checks';

import TipYellow from '@svg/tip_yellow.svg';

import { isWaitOrApply } from './global';

import './check_btn.scss'
import Bind from 'lodash-decorators/bind';


const { TextArea } = Input;


@Form.create()
class RefuseModal extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                width = {416}
                className='modal_container'
                closable={false}
                destroyOnClose={true}
                visible={this.props.visible}
                onOk={()=>this.props.checkOption(this.props.type)}
                onCancel={this.props.hideRefuseModal}
                >
                <Row type={'flex'} align={'middle'} style={{marginBottom : 21}}><Icon component={TipYellow} style={{ fontSize : 24 }} /><span style={{color :'#2C2D31',marginLeft : 16}}>确认要退回这条审核申请吗？</span></Row>
                <Form hideRequiredMark={true}>
                    <Form.Item>
                        {getFieldDecorator('remark',{
                            rules : [
                                {required : true,message : '请填写拒绝理由！'}
                            ]
                        })(
                            <TextArea style={{height : 75,maxHeight: 75,overFlow : 'auto'}} />
                        )
                        }        
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

@Form.create()
class SuccessModal extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                width = {416}
                className='modal_container'
                closable={false}
                destroyOnClose={true}
                visible={this.props.visible}
                onOk={()=>this.props.checkOption(this.props.type)}
                onCancel={this.props.hideSuccessModal}
                >
                <Row type={'flex'} align={'middle'} style={{marginBottom : 21}}><Icon component={TipYellow} style={{ fontSize : 24 }} /><span style={{color :'#2C2D31',marginLeft : 16}}>确认要通过这条审核申请吗？</span></Row>
                <Form hideRequiredMark={true}>
                    <Form.Item>
                        {getFieldDecorator('remark',{
                            rules : [
                                {required : true,message : '请填写通过理由！'}
                            ]
                        })(
                            <TextArea style={{height : 75,maxHeight: 75,overFlow : 'auto'}} />
                        )
                        }        
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

class CheckBtn extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            refuseVisible : false,
            successVisible : false
         };
    }

    @Bind()
    showRefuseModal(){
        this.setState({
            refuseVisible : true
        });
    }
    @Bind()
    hideRefuseModal(){
        this.setState({
            refuseVisible : false
        });
    }

    @Bind()
    showSuccessModal(){
        this.setState({
            successVisible : true
        });
    }
    @Bind()
    hideSuccessModal(){
        this.setState({
            successVisible : false
        });
    }
    //跳转到当前审核项列表
    @Bind()
    hrefList(){
        // const type_code = new URL(window.location).searchParams.get('type_code');
        // utils.Router.switchRoute('/checks/wait/order?type_code='+type_code)
        utils.Router.backRoute();
    }
    checkOption(type){
        this.form.validateFields(res=>{
            if(res) return;
            const remark = this.form.getFieldsValue(['remark']);
            checkOp({type,step_assignee_id : this.step_assignee_id,remark}).then(res=>{
                if(res.code != 10000) {
                    message.error(res.message);
                    return;
                };
                type == 0 ? this.hideRefuseModal() : this.hideSuccessModal();
                this.hrefList();
            });
        });
    }
    render() {
        return (
                <div className='check_btn_container' style={{width : isWaitOrApply() ? 266 : 78}}>
                    <Button className='check_btn btn1' onClick={this.hrefList}>返回</Button>
                    {
                        isWaitOrApply() ? (
                            <Fragment>
                                <Button className='check_btn btn2' onClick={this.showRefuseModal}>拒绝</Button>
                                {/* <Button className='check_btn btn3'>退回</Button> */}
                                <Button className='check_btn btn4' onClick={this.showSuccessModal}>通过</Button>
                            </Fragment>
                        ) : ''
                    }
                    <RefuseModal 
                    visible={this.state.refuseVisible}
                    type={0} step_assignee_id={this.props.step_assignee_id}
                    hideRefuseModal={this.hideRefuseModal}
                    hrefList = {this.hrefList}
                    checkOption={this.checkOption}
                    />

                    <SuccessModal 
                    visible={this.state.successVisible}
                    type={1} step_assignee_id={this.props.step_assignee_id}
                    hideSuccessModal={this.hideSuccessModal}
                    hrefList = {this.hrefList}
                    checkOption={this.checkOption}
                    />
                </div>
        );
    }
}

export default CheckBtn;