import React, {Component, Fragment} from "react";
import {Button, Col, Form, Row, Select} from "antd";
import {Link} from "react-router";
import MxjTable from '@/js/widget/table_v2/table'
/***
 * 添加商品，显示操作表格
 */
export default class GoodsTableOperation extends Component {
    constructor(props) {
        super(props)
        this.state={
            table_fetching: false
        }
    }

    render() {
        const {goods_list_redux} = this.props
        let columns = [
            {
                title: '商品编号', dataIndex: 'code', key: 'code', width: 150,
                render: (text, record) => {
                    return <Link to={`/goods/${record.type_code === 1 ? 'space': 'room'}/detail/${text}`} target='_blank'>{text}</Link>
                }
            },
            {
                title: '商品类型', dataIndex: 'category', key: 'category', width: 150
            },
            { title: '城市', dataIndex: 'city_name', key: 'city_name', width: 150 },
            { title: '场地', dataIndex: 'place_name', key: 'place_name', width: 150 },
            { title: '商品名称', dataIndex: 'goods_name', key: 'goods_name', width: 150,
                render: (text) => {
                    return <ColumsText text={text} />
                }
            },
            { title: '单价', dataIndex: 'sales_price', key: 'sales_price', width: 150,
                render: (text) => {
                    return (<span>¥{text}/月</span>)
                }
            },
            // { title: '状态', dataIndex: 'goods_status_str', key: 'goods_status_code', width: 150
            // },
        ];
        return (
            <MxjTable
                className={' mxj-table-page-common'}
                //固定列
                scroll={{ x: 100* columns.length }}
                // defaultSelectRowKeys={this.props.addGoodsItemSelectRowKeys}
                loading={this.state.table_fetching}
                rowKey={(e) => e.code}
                // onCheckboxSelect={(selectedRowKeys, selectedRows)=>{
                //     that.changeCheckItemData(selectedRows)
                //     that.setReduxSelecteRowKeys(selectedRowKeys)
                // }}
                // getCheckboxProps={this.getCheckboxProps}
                columns={columns}
                dataSource={goods_list_redux}
            />
        )
    }
}
