import {Component, Fragment} from "react";
import React from "react";
import Bind from 'lodash-decorators/bind';
import {
    Button, Modal, Checkbox, Row, Col
} from 'antd';

/**
 * 列表页筛选操作-流程封装
 */
export default class FilterTableByOperation extends Component{
    constructor(props){
        super(props)
        this.state = {
            filter_visible: false,
            value: []
        }
    }
    componentDidMount() {
        this.setState({
            value: this.props.defaultValue
        })
    }
    /**
     * 生成筛选model
     * @returns {*}
     */
    renderModel () {
        const model_wrapper = {
            sm: 8,
            xs: 12
        }
        return (
            <Modal title="编辑筛选"
                   {...this.props.modal}
                   className='mxj-model-blur'
                   visible={this.state.filter_visible}
                   onOk={this.sureFilterOperation}
                   onCancel={this.onclickFilter}>
                <Checkbox.Group {...this.props.checkbox} defaultValue={this.props.defaultValue || null} onChange={this.checkModelFilterColum.bind(this)}>
                    <Row>
                        {this.props.filter_options.map((value => (<Col {...model_wrapper} key={value.value} style={{marginBottom: 16}}><Checkbox disabled={value.disabled} value={value.value} >{value.label}</Checkbox></Col>)))}
                    </Row>
                </Checkbox.Group>
            </Modal>
        )
    }
    /**
     * 筛选框 onChange
     */
    @Bind()
    checkModelFilterColum(e) {
        this.setState({
            value: e
        })
    }

    /**
     * 确认
     */
    @Bind()
    sureFilterOperation() {
        const {value} = this.state
        this.props.makeSuerOperation(value)
        this.onclickFilter()
    }

    /**
     * 显示/隐藏model
     */
    @Bind()
    onclickFilter() {
        this.setState({
            filter_visible: !this.state.filter_visible
        })
    }

    render() {
        return (
            <Fragment>
                <Button style={this.props.style} icon='down' onClick={this.onclickFilter} {...this.props.button}>筛选</Button>
                {this.renderModel()}
            </Fragment>
        )
    }
}