import {Form, Input, Icon, Button, Modal, InputNumber, Select} from 'antd';
import React, {Component, Fragment} from "react";
import { connect } from 'react-redux';
import { cancelOrder} from "../order_create/utils";
import { changeNumberPriceDiff, changeNumberPriceAdd} from '@/js/asset/common'
import DetailBox from '@/js/components/modules/detailBox'
import Bind from 'lodash-decorators/bind';
import MxjTable from '@/js/widget/table/table'
import utils from '@/js/asset/index'
const { TextArea } = Input;
import ColumsText from '@modules/columsText'
const Option = Select.Option;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};
const formItemLayout_in = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
let index_num = 0
@connect(({ orderDetailCloseState }) => ({
    orderDetailCloseState
}))
@Form.create()
export default class OrderOfficeCloseStep extends Component{
    constructor(){
        super();
        this.state = {
            filter_visible: false,
        }
    }
    componentDidMount() {
        const {dispatch, params} = this.props
        const {current, success_step_1} = this.props.orderDetailCloseState
        if (current<1) {
            dispatch({
                type: 'order_office_close',
                data: {
                    current: 1
                }
            })
        }
        if (!success_step_1){
            dispatch({
                type: 'order_office_close',
                data: {
                    current: 0
                }
            })
            if (params.type ==='add' || params.type === 'minus') {
                utils.Router.switchRoute(`/order/office/${this.props.params.sourceType}/alteration/${params.type}/${params.id}/basic`)
            } else {
                utils.Router.switchRoute(`/order/office/${this.props.params.sourceType}/alteration/${params.type}/${params.id}/step1`)
            }
        }
    }

    /**
     * 扣款
     */
    @Bind()
    showRefunds(){
        const {dispatch} = this.props
        const {deduct_list, modal_form} = this.props.orderDetailCloseState
        this.setState({
            filter_visible: true
        })
        modal_form.entry_type = deduct_list.refund[0].id
        dispatch({
            type: 'order_office_close',
            data: {
                modal_type: 'refunds',
                modal_form,
                entry_type_content: deduct_list.refund[0] && deduct_list.refund[0].detail
            }
        })
    }
    @Bind()
    showDeductions() {
        const {dispatch} = this.props
        const {deduct_list, modal_form} = this.props.orderDetailCloseState
        this.setState({
            filter_visible: true
        })
        modal_form.entry_type = deduct_list.deduct[0].id
        dispatch({
            type: 'order_office_close',
            data: {
                modal_type: 'deductions',
                modal_form,
                entry_type_content: deduct_list.deduct[0] && deduct_list.deduct[0].detail
            }
        })
    }
    @Bind()
    sureFilterOperation(){
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

            }
        })
    }
    @Bind()
    onclickFilterCancle(){
        this.setState({
            filter_visible: false
        })
    }
    @Bind()
    okBtnOperation(first_options) {
        const {dispatch} = this.props
        const {create_value, entry_type_content, modal_type, editFormValue} = this.props.orderDetailCloseState
        const that = this
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let table_td = values
                table_td.price = changeNumberPriceAdd(table_td.price)
                table_td.single_price = '-'
                table_td.num = '-'
                first_options.forEach(value => {
                    if (value.id === values.entry_type) {
                        table_td.entry_name = value.name
                    }
                })
                entry_type_content.forEach(value => {
                    if (value.code === values.entry_type_content) {
                        table_td.entry_type_name = value.name
                    }
                })
                table_td.key = index_num++
                if (editFormValue) {
                    if (editFormValue[2] === 'refunds') {
                        create_value.refunds.splice(editFormValue[1], 1, table_td)
                    } else {
                        create_value.deductions.splice(editFormValue[1], 1, table_td)
                    }

                } else {
                    // 判断弹窗类型
                    if (modal_type === 'refunds') {
                        create_value.refunds.push(table_td)
                    } else {
                        create_value.deductions.push(table_td)
                    }
                }


                dispatch({
                    type: 'order_office_close',
                    data: {
                        create_value,
                        modal_form: {
                            "entry_type": 1,
                            "entry_type_content": null,
                            "price": null,
                            "remark": null
                        },
                        editFormValue: null
                    }
                })
                that.setState({
                    filter_visible: false
                })
            }
        })
    }
    // 渲染扣款新建
    @Bind()
    renderKoukuanModal() {
        const {modal_form, deduct_list, detail, create_value, modal_type, refunds_other_num, deductions_other_num, entry_type_content} = this.props.orderDetailCloseState
        if (!detail) {return null}
        const {getFieldValue, getFieldDecorator} = this.props.form
        let title = '扣款'
        let first_options = []
        if (modal_type === 'refunds') {
            title = '退款'
            first_options = deduct_list.refund
        } else {
            title = '扣款'
            first_options = deduct_list.deduct
        }
        const amount = modal_type === 'refunds' ? deductions_other_num : refunds_other_num
        const that = this
        return (
            <Modal title="添加扣款项"
                   className='mxj-model-blur'
                   width={510}
                   destroyOnClose={true}
                   visible={this.state.filter_visible}
                   onOk={() => {
                       that.okBtnOperation(first_options)
                   }}
                   onCancel={this.onclickFilterCancle}>
                <Form {...formItemLayout}>
                    <Form.Item
                        label={`${title}类型`}
                        className='mxj-margin-bottom-16'
                    >
                        {getFieldDecorator('entry_type', {
                            rules: [
                                { required: true, message: '请选择类型!' },
                            ],
                            initialValue: modal_form.entry_type,
                        })(
                            <Select placeholder="请选择类型" onChange={this.changeSelectEntryType}>
                                {first_options && first_options.map(value => <Option value={value.id} key={value.id}>{value.name}</Option>)}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        label={`${title}内容`}
                        className='mxj-margin-bottom-16'
                    >
                        {getFieldDecorator('entry_type_content', {
                            rules: [
                                { required: true, message: '请选择内容!' },
                            ],
                            initialValue: modal_form.entry_type_content,
                        })(
                            <Select placeholder="请选择类型">
                                {entry_type_content && entry_type_content.map(value => (<Option value={value.code} key={value.code}>{value.name}</Option>))}
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item
                        label={`${title}明细`}
                    >
                        <Form.Item
                            label={`${title}总金额`}
                            {...formItemLayout_in}
                            className='mxj-margin-bottom-16'
                        >
                            {getFieldDecorator('price', {
                                rules: [
                                    { required: true, message: '请输入金额!' },
                                ],
                                initialValue: changeNumberPriceDiff(modal_form.price),
                            })(
                                <InputNumber min={0}></InputNumber>
                            )}
                        </Form.Item>
                        <Form.Item
                            label={`${title}备注`}
                            {...formItemLayout_in}
                            className='mxj-margin-bottom-16'
                        >
                            {getFieldDecorator('remark', {
                                rules: [
                                    {
                                        required: true,
                                        validator: (rule, value, callback) => {
                                            if (!value){
                                                callback('请输入变更原因')
                                                return
                                            }
                                            if (value.length>=300){
                                                callback('请输入小于300个字符')
                                                return
                                            }
                                            callback();
                                        },
                                    },
                                ],
                                initialValue: modal_form.remark,
                            })(
                                <TextArea rows={4}></TextArea>
                            )}
                        </Form.Item>
                    </Form.Item>

                </Form>
            </Modal>
        )
    }

    /**
     * 删除
     * @param text
     * @param record
     * @param index
     * @param type
     */
    @Bind()
    editRowValueaSplic(text, record, index, type){
        const {create_value} = this.props.orderDetailCloseState
        const {dispatch} = this.props
        if (type === 'refunds') {
            create_value.refunds.splice(index, 1)
        } else {
            create_value.deductions.splice(index, 1)
        }
        dispatch({
            type: 'order_office_close',
            data: {
                create_value
            }
        })
    }

    /**
     * 编辑某一行数据
     * @param record
     * @param index
     * @param type
     */
    @Bind()
    editRowValue(record, index, type) {
        const {dispatch} = this.props
        dispatch({
            type: 'order_office_close',
            data: {
                modal_form: {
                    "entry_type": record.entry_type,
                    "entry_type_content": record.entry_type_content,
                    "price": record.price,
                    "remark": record.remark
                },
                modal_type: type,
                editFormValue: [record, index, type]
            }
        })
        this.setState({
            filter_visible: true
        })
    }

    /**
     * 重置当前页数据
     */
    @Bind()
    resetForm() {
        const {dispatch, orderDetailCloseState} = this.props
        const {create_value} = orderDetailCloseState
        create_value.refunds = []
        create_value.deductions = []
        dispatch({
            type: 'order_office_close',
            data: {
                create_value
            }
        })
    }

    /**
     * 保存 下一步
     */
    @Bind()
    handleSubmit() {
        const {dispatch, params} = this.props
        dispatch({
            type: 'order_office_close',
            data: {
                success_step_2: true,
                current: 2
            }
        })
        utils.Router.switchRoute(`/order/office/${this.props.params.sourceType}/alteration/${params.type}/${params.id}/step3`)
    }
    render(){
        const that = this
        const {orderDetailCloseState, params} = this.props
        const {getFieldDecorator} = this.props.form
        const {detail, create_value,deposite_current, charge_current } = orderDetailCloseState
        const title_layout_left = {
            xs: { span: 24 },
            sm: { span: 14 },
        }
        const title_layout_right = {
            xs: { span: 24 },
            sm: { span: 10 },
        }
        const new_columes = [
            { title: '扣款类型', dataIndex: 'entry_name', key: 'entry_name'},
            { title: '扣款内容', dataIndex: 'entry_type_name', key: 'entry_type_name' },
            {
                title: '扣款总金额', dataIndex: 'price', key: 'price',
                render: text => `¥${changeNumberPriceDiff(text)}`
            },
            { title: '扣款单价', dataIndex: 'single_price', key: 'single_price',},
            { title: '扣款数量', dataIndex: 'num', key: 'num'},
            { title: '扣款备注', dataIndex: 'remark', key: 'remark',
                render: (text) => {
                    return <ColumsText text={text} />
                }
            },
            {
                title: '操作',
                fixed: 'right',
                key: 'operation',
                width: 100,
                render: (text, record, index) => {
                    return (
                        <div className='mxj-order-list-operation'>
                            <span style={{marginRight:'15px'}} onClick={() => {
                                that.editRowValue(record, index, 'deductions')
                            }}>
                                <Icon type="edit" style={{color: '#44D7B6'}} />
                            </span>
                            <span style={{marginRight:'15px'}} onClick={() => {
                                that.editRowValueaSplic(text, record, index, 'deductions')
                            }}>
                                <Icon type="delete" style={{color: '#FF7E7E'}} />
                            </span>
                        </div>
                    )
                },
            }
        ]
        const new_columes1 = [
            { title: '退款类型', dataIndex: 'entry_name', key: 'entry_name'},
            { title: '退款内容', dataIndex: 'entry_type_name', key: 'entry_type_name'},
            { title: '退款总金额', dataIndex: 'price', key: 'price',
                render: text => `¥${changeNumberPriceDiff(text)}`
            },
            { title: '退款单价', dataIndex: 'single_price', key: 'single_price'},
            { title: '退款数量', dataIndex: 'num', key: 'num'},
            { title: '退款备注', dataIndex: 'remark', key: 'remark' },
            {
                title: '操作',
                fixed: 'right',
                key: 'operation',
                width: 100,
                render: (text, record, index) => {
                    return (
                        <div className='mxj-order-list-operation'>
                            <span style={{marginRight:'15px'}} onClick={() => {
                                that.editRowValue(record, index, 'refunds')
                            }}>
                                <Icon type="edit" style={{color: '#44D7B6'}} />
                            </span>
                            <span style={{marginRight:'15px'}} onClick={() => {
                                that.editRowValueaSplic(text, record, index, 'refunds')
                            }}>
                                <Icon type="delete" style={{color: '#FF7E7E'}} />
                            </span>
                        </div>
                    )
                },
            }
        ]
        return (
            <div className={'mxj-order-close-step1'}>
                {
                    detail && (
                        <Fragment>
                            <DetailBox showDivider={true} mainStyle={{marginBottom: 37}} logo={true} dividerStyle={{margin: '11px 0 32px'}} title={'确认扣款项目'}>
                                <div className='mxj-koukuan-content'>
                                    <div className='mxj-koukuan-left'>
                                        <div>
                                            <span className='mxj-koukuan-title'>当前押金金额：</span>
                                            <span className='mxj-error-color'>¥{changeNumberPriceDiff(detail.residual_deposit)}</span>
                                        </div>
                                        <div style={{marginLeft: 32}}>
                                            <span className='mxj-koukuan-title'>当前租金金额：</span>
                                            <span className='mxj-error-color'>¥{changeNumberPriceDiff(detail.residual_rent)}</span>
                                        </div>
                                    </div>
                                    <div className='mxj-koukuan-right'>
                                        <Button type="primary" icon="plus" onClick={this.showDeductions}>新增扣款项</Button>
                                    </div>
                                </div>
                                <MxjTable
                                    className={'mxj-table-page-common'}
                                    //固定列
                                    scroll={{ x: 150* (new_columes.length - 1) }}
                                    showPaination={false}
                                    columns={new_columes}
                                    dataSource={create_value.deductions}
                                />
                                <div className='mxj-float-right mxj-error-color' style={{paddingRight: 76, height: 50, lineHeight: '50px'}}>
                                    <span>扣款小计：¥
                                        {
                                            (() => {
                                                let sum = 0
                                                create_value.deductions.map(value => {
                                                    sum+=value.price
                                                })
                                                return changeNumberPriceDiff(sum)
                                            })()
                                        }
                                    </span>
                                </div>
                            </DetailBox>
                            {this.renderKoukuanModal()}
                            <DetailBox showDivider={true} mainStyle={{marginBottom: 37}} logo={true} dividerStyle={{margin: '11px 0 32px'}} title={'确认退款信息'}>
                                <div className='mxj-koukuan-content'>
                                    <div className='mxj-koukuan-left'>
                                        <div>
                                            <span className='mxj-koukuan-title'>当前押金金额：</span>
                                            <span className='mxj-error-color'>¥{changeNumberPriceDiff(detail.residual_deposit)}</span>
                                        </div>
                                        <div style={{marginLeft: 32}}>
                                            <span className='mxj-koukuan-title'>当前租金金额：</span>
                                            <span className='mxj-error-color'>¥{changeNumberPriceDiff(detail.residual_rent)}</span>
                                        </div>
                                    </div>
                                    <div className='mxj-koukuan-right'>
                                        <Button type="primary" icon="plus" disabled={this.props.params.type === 'minus'} onClick={this.showRefunds}>新增退款项</Button>
                                    </div>
                                </div>
                                <MxjTable
                                    className={'mxj-table-page-common'}
                                    //固定列
                                    scroll={{ x: 150* (new_columes1.length - 1) }}
                                    showPaination={false}
                                    columns={new_columes1}
                                    dataSource={create_value.refunds}
                                />
                                <div className='mxj-float-right mxj-error-color' style={{paddingRight: 76, height: 50, lineHeight: '50px'}}>
                                    <span>扣款小计：¥
                                        {
                                            (() => {
                                                let sum = 0
                                                create_value.refunds.map(value => {
                                                    sum+=value.price
                                                })
                                                return changeNumberPriceDiff(sum)
                                            })()
                                        }
                                    </span>
                                </div>
                            </DetailBox>
                            {this.renderKoukuanModal()}
                            <div className='mxj-flex-center mxj-margin-top-40'>
                                <Button className='mxj-margin-right-16' onClick={() => {
                                    cancelOrder()
                                }}>取消</Button>
                                <Button className='mxj-f7f7f7-bg mxj-margin-right-16' onClick={this.resetForm}>重置</Button>
                                <Button className='mxj-margin-right-16' type="primary" onClick={() => {
                                    utils.Router.backRoute()
                                }} ghost>上一步</Button>
                                <Button className='mxj-margin-right-16' type="primary" onClick={this.handleSubmit}>下一步</Button>
                            </div>
                        </Fragment>
                    )
                }

            </div>

        )
    }
}

