import {Table, Icon, Alert} from 'antd';
import React, {Component, Fragment} from "react";
import MxjTable from '@/js/widget/table/table'
import ColumsText from '@modules/columsText'
import {Link} from "react-router";
import {changeNumberPriceDiff} from '@/js/asset/common'
export class GoodsTableOnlyShow extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        const new_columes = [
            {
                title: '商品类型', dataIndex: 'category', key: 'category'
            },
            {
                title: '商品编号', dataIndex: 'code', key: 'code',
                render: (text, record) => {
                    return <Link to={`/goods/${record.place_item_type === 1 ? 'space': 'room'}/detail/${text}`} target='_blank'>{text}</Link>
                }
            },
            { title: '商品名称', dataIndex: 'goods_name', key: 'goods_name',
                render: (text) => {
                    return <ColumsText text={text} />
                }
            },
            { title: '城市', dataIndex: 'city_name', key: 'city_name',
            },
            { title: '场地', dataIndex: 'place_name', key: 'place_name' },

            { title: '销售价格', dataIndex: 'pre_price', key: 'pre_price',
                render: (text, record) => ('¥'+ changeNumberPriceDiff(record.pre_price) + '/月')
            },
            { title: '数量', dataIndex: 'num', key: 'num',
            },
            { title: '修改商品单价', dataIndex: 'changed_price', key: 'changed_price', editable: true,
                render: (text, record) => ('¥'+ changeNumberPriceDiff(record.changed_price) + '/月')
            },
            { title: '原商品总价', dataIndex: 'total_number', key: 'total_number',
                render: (text, record) => ('¥'+ changeNumberPriceDiff(record.pre_price * record.num) + '/月')
            },
            { title: '修改后商品总价', dataIndex: 'new_price_new', key: 'new_price_new',
                render: (text, record) => ('¥'+ changeNumberPriceDiff(record.changed_price * record.num) + '/月')
            }
        ];
        const {tableValue, showOperation = false} = this.props
        if (showOperation) {
            new_columes.push({
                title: '操作',
                key: 'operation',
                fixed: 'right',
                width: 150,
                render: (text, record, index) => {
                    return (
                        <div>
                            <a style={{marginRight:'15px'}} onClick={() => {
                                this.props.deleteOnceList(index)
                            }}>
                                <Icon type="delete" style={{color: '#FF7E7E'}} />
                            </a>
                        </div>
                    )
                },
            })
        }
        return (
            <Fragment>
                <MxjTable
                    className={'mxj-table-page-common'}
                    //固定列
                    scroll={{ x: 150* new_columes.length }}
                    showPaination={this.props.showPaination}
                    showPaination={false}
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        hideOnSinglePage: false,
                        total: tableValue.length || 0,
                    }}
                    columns={new_columes}
                    dataSource={tableValue || []}
                />
                <div className='mxj-float-right mxj-error-color' style={{paddingRight: 76, height: 50, lineHeight: '50px'}}>
                    <span>已选商品原总价汇总：
                        <span className='mxj-error-color'>¥{
                            tableValue.length? changeNumberPriceDiff(tableValue.map(value => Number(value.pre_price) * value.num).reduce((pre, val) => {
                                return pre+ val
                            })): 0
                        }</span>
                    </span>
                    <span style={{marginLeft: 32}}>已选商品修改后总价汇总：
                        <span className='mxj-error-color'>¥{
                            tableValue.length ? changeNumberPriceDiff(tableValue.map(value => Number(value.changed_price) * value.num).reduce((pre, val) => {
                                return pre+ val
                            })): 0
                        }</span>
                    </span>
                </div>
            </Fragment>

        );
    }
}
export class GoodsTablePriceShow extends React.Component {
    constructor(props){
        super(props)
    }
    setColums() {
        switch (this.props.type) {
            case 'goods':
                return [
                    {
                        title: '费用类型',
                        dataIndex: 'money_type_val',
                        key: 'money_type_val',
                        width: '20%'
                    },
                    {
                        title: '费用内容',
                        dataIndex: 'place_item_type',
                        key: 'place_item_type',
                        width: '20%',
                        render: text => {
                            if (text === 1) {
                                return ('固定工位办公服务费')
                            }else if(text === 2) {
                                return ('房间办公服务费')
                            }
                        }
                    },
                    {
                        title: '成交数量',
                        dataIndex: 'number',
                        width: '20%',
                        key: 'number',
                    },
                    {
                        title: '服务期',
                        dataIndex: 'diff_service_date',
                        width: '20%',
                        key: 'diff_service_date',
                        render: () => this.props.time
                    },
                    {
                        title: '成交金额',
                        dataIndex: 'amount',
                        key: 'amount',
                        width: '20%',
                        render: text => `¥${changeNumberPriceDiff(text)}`
                    }
                ]
            case 'deposit':
                return [
                    {
                        title: '费用类型',
                        dataIndex: 'money_type_val',
                        width: '20%',
                        key: 'money_type_val',
                    },
                    {
                        title: '费用内容',
                        width: '20%',
                        dataIndex: 'money_content_val',
                        key: 'money_content_val',

                    },
                    {
                        title: '押付数量',
                        width: '20%',
                        dataIndex: 'number',
                        key: 'number',
                    },
                    {
                        title: '押付单价',
                        width: '20%',
                        dataIndex: 'price',
                        key: 'price',
                        render: text => `-`
                    },
                    {
                        title: '押付金额',
                        width: '20%',
                        dataIndex: 'amount',
                        key: 'amount',
                        render: text => `¥${changeNumberPriceDiff(text)}`
                    }
                ]
            case 'other':
                return [
                    {
                        title: '费用类型',
                        dataIndex: 'type',
                        key: 'type',
                        width: '20%',
                        render: text => {
                            return '其他'
                        }
                    },
                    {
                        title: '费用内容',
                        width: '20%',
                        dataIndex: 'content',
                        key: 'content',

                    },
                    {
                        title: '',
                        dataIndex: 'number1',
                        width: '20%',
                        key: 'number1',
                        render: text => ``
                    },
                    {
                        title: '',
                        dataIndex: 'price1',
                        width: '20%',
                        key: 'price1',
                        render: text => ``
                    },
                    {
                        title: '金额',
                        width: '20%',
                        dataIndex: 'price',
                        key: 'price',
                        render: text => `¥${changeNumberPriceDiff(text)}`
                    }
                ]
        }
    }
    setFooter() {
        const {tableValue} = this.props
        switch (this.props.type) {
            case 'goods':
                return tableValue.length? tableValue.map(value => Number(value.amount)).reduce((pre, val) => {
                    return pre+ val
                }): 0
            case 'deposit':
                return tableValue.length? tableValue.map(value => Number(value.amount)).reduce((pre, val) => {
                    return pre+ val
                }): 0
            case 'other':
                return tableValue.length? tableValue.map(value => Number(value.price)).reduce((pre, val) => {
                    return pre+ val
                }): 0
        }
    }
    render() {
        const {time, tableValue} = this.props
        const columns = this.setColums()
        return (
            <Fragment>
                <MxjTable
                    style={this.props.style}
                    className={'mxj-table-page-common'}
                    //固定列
                    rowKey={(record, index) => {
                        return index
                    }}
                    scroll={{ x: 150* columns.length }}
                    showPaination={false}
                    columns={columns}
                    dataSource={tableValue || []}

                />
                <div className='mxj-float-right mxj-error-color' style={{paddingRight: 76, height: 50, lineHeight: '50px'}}>
                    <span>小计：
                        <span className=''>¥{
                            changeNumberPriceDiff(this.setFooter())
                        }</span>
                    </span>
                </div>
            </Fragment>

        );
    }
}
