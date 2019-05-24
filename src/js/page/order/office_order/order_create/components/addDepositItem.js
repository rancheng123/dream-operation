import React, { Component, PropTypes,Fragment } from 'react';
import {
    Button, Modal, Form, Row, Col, Select, Alert
} from 'antd';
import SelectInputGroup from '../../common/selectInputGroup'
import Bind from 'lodash-decorators/bind';
import Debounce from 'lodash-decorators/debounce';
import MxjTable from '@/js/widget/table/table'
const { Option } = Select;
/**
 * 添加服务商品
 */

export default class AddGoodsItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter_visible: false,
            dataSource: [],
            tableData: [{
                goods_type: '固定工位',
                goods_code: 'CD0000000',
                goods_name: '开发式工位',
                goods_city: '北京',
                goods_location: '朝外们写字中心B座3层',
                goods_tips: '1700',
                goods_number: 2,
                goods_new: '1700',
                goods_total: '1777',
                goods_new_total: '111111'
            },{
                goods_type: '固定工位',
                goods_code: 'CD0000000',
                goods_name: '开发式工位',
                goods_city: '北京',
                goods_location: '朝外们写字中心B座3层',
                goods_tips: '1700',
                goods_number: 2,
                goods_new: '1700',
                goods_total: '1777',
                goods_new_total: '111111'
            },{
                goods_type: '固定工位',
                goods_code: 'CD0000000',
                goods_name: '开发式工位',
                goods_city: '北京',
                goods_location: '朝外们写字中心B座3层',
                goods_tips: '1700',
                goods_number: 2,
                goods_new: '1700',
                goods_total: '1777',
                goods_new_total: '111111'
            },{
                goods_type: '固定工位',
                goods_code: 'CD0000000',
                goods_name: '开发式工位',
                goods_city: '北京',
                goods_location: '朝外们写字中心B座3层',
                goods_tips: '1700',
                goods_number: 2,
                goods_new: '1700',
                goods_total: '1777',
                gooods_new_total: '111111'
            }],
            page: 1,
            per_page: 10,
            checkCellData: []
        }
    }
    @Bind()
    sureFilterOperation() {
        this.props.onChange(this.state.checkCellData)
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
    @Bind()
    @Debounce(400)
    handleSearchAuto(value){
        console.log(value)
        this.setState({
            dataSource: !value ? [] : [
                value,
                value + value,
                value + value + value,
            ],
        });
    }
    renderFormList() {
        const { getFieldDecorator, getFieldsValue } = this.props.form;
        const searchOptions = [{
            value: '1',
            label: '商品名称'
        }, {
            value: '2',
            label: '商品编号'
        }]
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row gutter={16}>
                    <Col span={10}>
                        {/*商品类型*/}
                        <Form.Item className='mxj-margin-bottom-24 mxj-auto-search-inline'>
                            {getFieldDecorator('search_conten', {
                                initialValue: {
                                    selectValue: '1',
                                    autoValue: '111',
                                }
                            })(
                                <SelectInputGroup
                                    handleSearch={this.handleSearchAuto}
                                    options={searchOptions}
                                    dataSource={this.state.dataSource}
                                />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        {/*商品类型*/}
                        <Form.Item className='mxj-margin-bottom-24'>
                            {getFieldDecorator('goods_type', {
                            })(
                                <Select placeholder="请选择商品类型">
                                    <Option value="0">请选择商品类型</Option>
                                    <Option value="gongwei">固定工位</Option>
                                    <Option value="room">房间</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        {/*商品状态*/}
                        <Form.Item className='mxj-margin-bottom-24'>
                            {getFieldDecorator('open_type', {
                            })(
                                <Select placeholder="请选择商品类型">
                                    <Option value="0">全部状态</Option>
                                    <Option value="1">待开发</Option>
                                    <Option value="2">开放中</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        {/*城市*/}
                        <Form.Item className='mxj-margin-bottom-24'>
                            {getFieldDecorator('goods_type', {
                            })(
                                <Select placeholder="请选择商品类型">
                                    <Option value="0">请选择商品类型</Option>
                                    <Option value="gongwei">固定工位</Option>
                                    <Option value="room">房间</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        {/*场地*/}
                        <Form.Item className='mxj-margin-bottom-24'>
                            {getFieldDecorator('goods_type', {
                            })(
                                <Select placeholder="请选择商品类型">
                                    <Option value="0">请选择商品类型</Option>
                                    <Option value="gongwei">固定工位</Option>
                                    <Option value="room">房间</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        )
    }
    /**
     * 表格数据生成
     * @returns {*}
     */
    changeCheckItemData(e) {
        this.setState({
            checkCellData: e
        })
    }
    createTableColums() {
        const that = this
        let columns = [
            {
                title: '商品编号', dataIndex: 'goods_code', key: 'name'
            },
            {
                title: '商品类型', dataIndex: 'goods_type', key: 'age'
            },
            { title: '城市', dataIndex: 'goods_city', key: '1' },
            { title: '场地', dataIndex: 'goods_location', key: '2' },
            { title: '商品名称', dataIndex: 'goods_name', key: '3' },
            { title: '单价', dataIndex: 'goods_total', key: '4' },
            { title: '状态', dataIndex: 'goods_status', key: '5' }
        ];
        return (
            <MxjTable
                className={'mxj_table'}
                //固定列
                scroll={{ x: 1300 }}

                pagination={{
                    showQuickJumper: true,
                    showSizeChanger: true,
                    current: this.state.page,
                    pageSize: this.state.per_page,
                }}

                onCheckboxSelect={(selectedRowKeys, selectedRows)=>{
                    that.changeCheckItemData(selectedRows)
                }}
                columns={columns}
                dataSource={this.state.tableData}

            />
        )
    }
    renderGoodsList() {
        return (
            <Modal title="选择服务商品"
                   className='mxj-model-blur'
                   width='60%'
                   visible={this.state.filter_visible}
                   onOk={this.sureFilterOperation}
                   onCancel={this.onclickFilter}>
                {this.renderFormList()}
                <Alert closable={true} message="如果您搜索的商品显示状态为该时段不可售，则证明该商品在您选择的时间内已被占用" type="error" />
                {this.createTableColums()}
            </Modal>
        )
    }
    render() {
        return(
            <Fragment>
                <Button type="primary" icon="plus" onClick={this.onclickFilter}>选择服务商品</Button>
                {this.renderGoodsList()}

            </Fragment>
        )
    }
}