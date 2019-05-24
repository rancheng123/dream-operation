import {Component} from "react";
import React from "react";
import Bind from 'lodash-decorators/bind';
import Debounce from 'lodash-decorators/debounce';
import {
    AutoComplete, Form
} from 'antd/lib/index';
import SelectInputGroup from "./selectInputGroup";
import { getGoodsStatiionInfoList, getGoodsRoomInfoList} from '@api/order'
/**
 * 下拉
 */
export default class SelectInputSearchType extends Component{
    constructor(props){
        super(props)
        this.state = {
            paySettingsArr: []
        }
    }

    /**
     * 渲染自动补全功能
     * @param item
     * @returns {*}
     */
    renderOption(item) {
        return (
            <AutoComplete.Option key={item.value} text={item.label}>
                {item.label}
            </AutoComplete.Option>
        );
    }

    /**
     * 根据类型，获取不同商品类型的数据
     */
    async getGoodsInfoList(type, query = {}) {
        if (type === 1) {
            return await getGoodsStatiionInfoList(query)
        } else if (type === 2) {
            return await getGoodsRoomInfoList(query)
        } else {
            return false
        }
    }

    /**
     * 搜索场地及商品列表
     */
    @Debounce(400)
    @Bind()
    async handleSearchAuto(e){
        const { getFieldValue } = this.props.form;
        const add_googds_type = getFieldValue('add_googds_type');
        const member_search = getFieldValue('add_googds_auto');
        const search_parmas = {
            search_field: member_search.selectValue,
            search: e,
            start_at: this.props.start_date,
            end_at: this.props.end_date,
        }
        const result = await this.getGoodsInfoList(add_googds_type, search_parmas)
        let list = []
        if (result && result.code === 10000) {
            list = result.data.list.map(value => {
                return {
                    value: [value.goods_name, value.code],
                    label: member_search.selectValue === 'name'? value.goods_name: value.code
                }
            })
            this.setState({
                paySettingsArr: list
            })
        } else {
            this.setState({
                paySettingsArr: []
            })
        }
    }

    render() {
        const searchOptions = [{
            value: 'name',
            label: '商品名称'
        }, {
            value: 'code',
            label: '商品编号'
        }]
        const {getFieldDecorator} = this.props.form
        return (
            <Form.Item className='mxj-margin-bottom-16 mxj-auto-search-inline'>
                {getFieldDecorator('add_googds_auto', {
                    initialValue: {
                        selectValue: 'name',
                        autoValue: '',
                    }
                })(
                    <SelectInputGroup
                        handleSearch={this.handleSearchAuto}
                        options={searchOptions}
                        dataSource={this.state.paySettingsArr.map(this.renderOption)}
                    />
                )}
            </Form.Item>
        )
    }
}