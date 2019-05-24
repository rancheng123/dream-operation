import React, {Component, Fragment} from "react";
import ButtonShowModal from '@modules/buttonShowModal'
import AddGoodsHeaderForm from './addGoodsHeaderForm'
import GoodsTableOperation from './goodsTableOperation'
import Bind from 'lodash-decorators/bind';
import Debounce from 'lodash-decorators/debounce';
import { getGoodsStatiionInfoList, getGoodsRoomInfoList} from '@api/order'
/***
 * 添加商品入口
 */
export default class AddGoodsMainOperation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search_form: null,
            goods_list_redux: {
                per_page: 10,
                page: 1
            }
        }
    }

    /**
     * 接受search form 的数据 并触发相应数据更新
     * @param value
     */
    @Bind()
    async onSearchSubmit(value) {
        this.setState({
            search_form: value
        })
        await this.getAllGoods()
    }

    /**
     * 获取数据
     *
     */
    async getAllGoods() {
        const {goods_list_redux} = this.state
        const search_form = Object.assign(this.state.search_form, this.props.exctalValue)
        search_form.page = goods_list_redux.page
        search_form.per_page = goods_list_redux.per_page
        let getGoodsFunc
        if (search_form.add_googds_type === 2) {
            // 房间
            getGoodsFunc = await getGoodsRoomInfoList(search_form)
        } else {
            // 工位
            getGoodsFunc = await getGoodsStatiionInfoList(search_form)
        }
        if (getGoodsFunc.code === 10000) {
            getGoodsFunc.data.data = getGoodsFunc.data.list
            this.setState({
                goods_list_redux: getGoodsFunc.data
            })
        }
    }

    /**
     * exctalValue 额外添加的搜索数据
     * @returns {*}
     */
    render() {
        const goods_list_redux = this.state.goods_list_redux
        return (
            <ButtonShowModal
                btnTitle='选择服务商品'
                modalTitle='选择服务商品'
                modalContent={<Fragment>
                    <AddGoodsHeaderForm {...this.props} onSearchSubmit={this.onSearchSubmit}/>
                    <GoodsTableOperation
                        {...this.props}
                        goods_list_redux
                    />
                </Fragment>}
            />
        )
    }
}
