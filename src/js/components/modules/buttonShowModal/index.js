import React, {Component, Fragment} from "react";
import {Button, Modal} from "antd";
import Bind from 'lodash-decorators/bind';
import Debounce from 'lodash-decorators/debounce';
/***
 * 点击按钮弹出弹窗
 * showModalCheck 点击按钮前置条件
 * showModalError 点击按钮检测不通过
 *
 */
export default class ButtonShowModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter_visible: false
        }
    }
    /**
     * 渲染弹窗
     */
    renderGoodsList() {
        const {
            modalTitle,
            modalWidth = '60%',
            modalProps = {
                className: 'mxj-model-blur',
                forceRender: true
            }
        } = this.props
        return (
            <Modal title={modalTitle}
                   width={modalWidth}
                   {...modalProps}
                   visible={this.state.filter_visible}
                   onOk={this.sureFilterOperation}
                   onCancel={this.onclickFilterCancle}>
                {/*渲染弹窗核心数据*/}
                {this.props.modalContent}
            </Modal>
        )
    }
    /**
     * 弹窗确认按钮
     */
    @Debounce(200)
    @Bind()
    sureFilterOperation() {

    }
    /**
     * 弹窗取消按钮
     * */
    @Debounce(200)
    @Bind()
    onclickFilterCancle() {
        this.setState({
            filter_visible: false
        })
    }
    /**
     * 显示弹窗
     * 如果设置按钮执行前置条件，满足则显示modal，不满足则执行不满足回调，
     */
    @Debounce(200)
    @Bind()
    showModal(){
        this.props.showModalCheck ? this.props.showModalCheck((show) => {
            show ? this.setState({
                filter_visible: true
            }) : (this.props.showModalError ? this.props.showModalError() : Modal.error({
                title: '错误操作',
                content: '请检查是否满足执行条件！',
            }));
        }) : this.setState({
            filter_visible: true
        })
    }
    render() {
        const {
            btnTitle,
            btnProps = {
                type: 'primary',
                icon: 'plus'
            }
        } = this.props
        return(
            <Fragment>
                {/*渲染按钮*/}
                <Button {...btnProps} onClick={this.showModal}>{btnTitle}</Button>
                {/*渲染Modal*/}
                {this.renderGoodsList()}
            </Fragment>
        )
    }
}
