import React, { Component } from 'react';

import {
    Row, Col, Modal,Checkbox
  } from 'antd';
const model_wrapper = {
sm: 8,
xs: 12
}
let columns = [];
class MxjSiftColumns extends Component {
    constructor(props) {
        super(props);
        this.state = { filterColum : []};
    }

    /**
     * 筛选框 onChange
     */
    checkModelFilterColum(filterColum) {
        filterColum = filterColum.sort((a,b)=>a.key - b.key)
        this.setState({
            filterColum
        })
    }
    sureFilterOperation(){
        this.props.sureFilterOperation(this.state.filterColum)
    }

    componentWillReceiveProps = (nextProps) => {
        if(columns.length <= 0) columns = nextProps.columns;
    }
    render() {
        return (
            <Modal title="编辑筛选"
                   className='mxj-model-blur'
                   visible={this.props.visible}
                   onOk={this.sureFilterOperation.bind(this)}
                   onCancel={this.props.filterOperation}>
                <Checkbox.Group defaultValue={this.state.filterColum} onChange={this.checkModelFilterColum.bind(this)}>
                    <Row>
                        {columns.map((value => (<Col {...model_wrapper} key={value.key}><Checkbox value={value} >{value.title}</Checkbox></Col>)))}
                    </Row>
                </Checkbox.Group>
            </Modal>
        );
    }
}

export default MxjSiftColumns;