import React, {Component, Fragment} from "react";
import {Button, Col, Form, Row, Select} from "antd";
import MxjLocationCascaderForm from '@/js/components/modules/locationCascader/formCascader'
import SelectInputSearchType from './selectInputSearchType'
import Bind from 'lodash-decorators/bind';
import Debounce from 'lodash-decorators/debounce';
const Option = Select.Option
/***
 * 点击按钮弹出弹窗
 */
@Form.create()
export default class AddGoodsHeaderForm extends Component {
    constructor(props) {
        super(props)
    }
    /**
     * 获取搜索数据 只单独设置搜索条件，不涉及分页数据，需要在外层设置
     */
    @Debounce(400)
    @Bind()
    handleSubmit() {
        const { getFieldsValue } = this.props.form;
        const member_search = getFieldsValue(['add_googds_auto', 'add_googds_cities', 'add_googds_type']);
        if (!member_search.add_googds_type) {
            return
        }
        const search_params = {
            add_googds_type: member_search.add_googds_type
        }
        if (member_search.add_googds_auto.autoValue) {
            const arrVale = member_search.add_googds_auto.autoValue.split(',')
            search_params.search_field = member_search.add_googds_auto.selectValue
            if (member_search.add_googds_auto.selectValue === 'name') {
                search_params.search = arrVale[0]
            } else if(member_search.add_googds_auto.selectValue === 'code'){
                search_params.search = arrVale[1]
            }
        }
        if (member_search.add_googds_cities.locations) {
            search_params.palce_code = member_search.add_googds_cities.locations
        }
        if (member_search.add_googds_cities.cities) {
            search_params.city_code = member_search.add_googds_cities.cities
        }
        this.props.onSearchSubmit(search_params)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const searchOptions = [{
            value: 'name',
            label: '商品名称'
        }, {
            value: 'code',
            label: '商品编号'
        }]
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row gutter={16}>
                    <Col span={6}>
                        {/*商品状态*/}
                        <Form.Item className='mxj-margin-bottom-16'>
                            {getFieldDecorator('add_googds_type', {
                                initialValue: 0
                            })(
                                <Select placeholder="请选择状态">
                                    <Option value={0}>请选择商品类型</Option>
                                    <Option value={1}>工位</Option>
                                    <Option value={2}>房间</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        {/*商品类型*/}
                        {/*<Form.Item className='mxj-margin-bottom-16 mxj-auto-search-inline'>*/}
                        {/*    {getFieldDecorator('add_googds_auto', {*/}
                        {/*        initialValue: {*/}
                        {/*            selectValue: 'name',*/}
                        {/*            autoValue: '',*/}
                        {/*        }*/}
                        {/*    })(*/}
                        {/*        */}
                        {/*    )}*/}
                        {/*</Form.Item>*/}
                        <SelectInputSearchType
                            form={this.props.form}
                            start_date={this.props.start_date}
                            end_date={this.props.end_date}
                        />
                    </Col>
                    <Col span={12}>
                        {/*城市*/}
                        <Form.Item className='mxj-margin-bottom-16'>
                            {getFieldDecorator('add_googds_cities', {
                                initialValue: {}
                            })(
                                <MxjLocationCascaderForm selectType={['locations', 'cities']} />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        {/*场地*/}
                        <Form.Item className=''>
                            <Button type="primary" icon="search" htmlType="submit">查询</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        )
    }
}
