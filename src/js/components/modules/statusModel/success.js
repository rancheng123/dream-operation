import React, { Component } from 'react';

import {
    Modal, Button, Icon
} from 'antd';
class SuccessModel extends Component {
    constructor(props) {
        super(props);
    }
    footerView() {
        return(
            <Button onClick={this.props.onclickFilter}>关闭</Button>
        )
    }
    render() {
        return (
            <Modal title={this.props.title}
                   {...this.props.modal}
                   width={520}
                   footer={this.footerView()}
                   className='mxj-model-blur'
                   onCancel={this.props.onclickFilter}
                   visible={this.props.filter_visible}>
                <div style={{textAlign: 'center'}}>
                    <Icon type="check-circle" theme="filled" style={{fontSize: 80, color: '#36DCB6', margin: '48px auto 16px'}} />
                </div>
                <div style={{textAlign: 'center', marginBottom: 60}}><span>{this.props.content || '订单创建成功'}</span></div>
            </Modal>
        );
    }
}

export default SuccessModel;
