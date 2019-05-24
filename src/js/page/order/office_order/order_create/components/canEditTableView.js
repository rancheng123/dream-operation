import React from 'react';
import {
     Input, InputNumber, Popconfirm, Form, Icon
} from 'antd';
import {Link} from "react-router";
import MxjTable from '@/js/widget/table/table'
import Bind from 'lodash-decorators/bind';
const FormItem = Form.Item;
import {removeArr, changeNumberPriceDiff} from '@/js/asset/common'
import ColumsText from '@modules/columsText'
const EditableContext = React.createContext();
class EditableCell extends React.Component {
    constructor(props) {
        super(props)
    }
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber min={0}/>;
        }
        return <Input />;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps,
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `请输入修改后价格!`,
                                            validator: (rule, value, callback) => {
                                                if (!value) {
                                                    callback('请输入正确价格')
                                                    return;
                                                }
                                                if (value<= 0){
                                                    callback('只能输入非负整数')
                                                    return
                                                }
                                                callback();
                                            },
                                        }],
                                        initialValue: changeNumberPriceDiff(record[dataIndex]),
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}
export default class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingKey: '',
            selectedRowKeys: [],
            filteredValue: {},
            // rowSelection:
            // rowSelection: {
            //     onChange:this.props.rowSelection,
            //     rowSelection: this.props.onSelectRow
            // }
        };
        this.mxjTableView = React.createRef()
    }

    isEditing = record => record.key === this.state.editingKey;
    /**
     *
     * 删除某一行数据
     */
    @Bind()
    deleteOnceList(record) {
        const {data, dispatch} = this.props
        const {goods_list_select_data, goods_list_select} = data
        let selectedRowKeys= this.mxjTableView.current.getSelectedRowKeys()
        goods_list_select_data.map((value, index) => {
            if (record.key === value.key) {
                goods_list_select_data.splice(index, 1)
            }
        })
        selectedRowKeys = removeArr(selectedRowKeys, record.key)
        this.mxjTableView.current.setSelectedRowKeys(selectedRowKeys)
        dispatch({
            type: 'modify_office_order_create',
            data: {
                goods_list_select_data,
                goods_list_select: goods_list_select_data
            }
        })
        // 商品列表删除后，选择服务商品中删除选中项
        this.props.deleteOnceList([record.key])
        this.mxjTableView.current.changeSelectedRowKeys(false, [record.key])
    }
    @Bind()
    getSelectedRowKeys(){
        return this.mxjTableView.current.getSelectedRowKeys()
    }
    deleteMoreList(e) {
        this.mxjTableView.current.setSelectedRowKeys([])
    }
    cancel = () => {
        this.setState({ editingKey: '' });
    };
    /**
     * 不可点击删除
     */
    @Bind()
    getCheckboxProps(record) {
        const {disableSelectRow} = this.props.data
        return {
            disabled: disableSelectRow.indexOf(record.code) > -1
        }
    }
    @Bind()
    save(form, key) {
        form.validateFields(['changed_price'],(error, row) => {
            if (error) {
                return;
            }
            if ('changed_price' in row) {
                row.changed_price = row.changed_price * 100
            }
            const newData = [...this.props.tableData];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.props.onChange(newData)
                this.setState({ editingKey: '' });
            } else {
                newData.push(row);
                this.props.onChange(newData)
                this.setState({ editingKey: '' });
            }
        });
    }
    @Bind()
    edit(key) {
        this.setState({ editingKey: key });
    }
    @Bind()
    renderFooter() {
        return (
            <div className='mxj-edit-table-footer'>押金总计: ¥222222222</div>
        )
    }
    @Bind()
    setFilteredValue (filteredValue) {
        this.setState({
            filteredValue
        })
    }
    @Bind()
    setReduxSelecteRowKeys(e){
        const {dispatch} = this.props
        dispatch({
            type: 'order_create_step_fetch',
            data: {
                canEditTableSelectRowKeys: e
            }
        })
    }
    itemRender(current, type, originalElement){
        return originalElement;
    }
    render() {
        const that = this
        const {filteredValue} = this.state
        const {disableSelectRow} =this.props.data
        const new_columns = [
            {
                title: '商品类型', dataIndex: 'category', key: ' '
            },
            {
                title: '商品编号', dataIndex: 'code', key: 'code',
                filteredValue: filteredValue.code || null,
                onFilter: (value, record) => record.code === value,
                render: (text, record) => {
                    return <Link to={`/goods/${record.place_item_type === 1 ? 'space': 'room'}/detail/${text}`} target='_blank'>{text}</Link>
                }
            },
            { title: '商品名称', dataIndex: 'goods_name', key: 'goods_name',
                filteredValue: filteredValue.goods_name || null,
                onFilter: (value, record) => record.code === value,
                render: (text) => {
                    return <ColumsText text={text} />
                }
            },
            { title: '城市', dataIndex: 'city_name', key: 'city_name',
                filteredValue: filteredValue.city_code || null,
                onFilter: (value, record) => record.city_code === value
            },
            { title: '场地', dataIndex: 'place_name', key: 'place_name' },

            { title: '销售价格', dataIndex: 'pre_price', key: 'pre_price',
                render: (text) => ('¥'+ changeNumberPriceDiff(text) + '/月')
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
            },
            {
                title: '操作',
                key: 'operation',
                fixed: 'right',
                width: 150,
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {
                                disableSelectRow.indexOf(record.code) <0 && (<div>
                                    {editable ? (
                                        <span>
                                  <EditableContext.Consumer>
                                    {form => (
                                        <a
                                            href="javascript:;"
                                            onClick={() => this.save(form, record.key)}
                                            style={{ marginRight: 8 }}
                                        >
                                            <Icon type="check-circle" style={{color: '#0179FF'}} />
                                        </a>
                                    )}
                                  </EditableContext.Consumer>
                                  <Popconfirm
                                      title="取消保存?"
                                      onConfirm={() => this.cancel(record.key)}
                                  >
                                    <a>
                                        <Icon type="close-circle" style={{color: '#0179FF'}} />
                                    </a>
                                  </Popconfirm>
                                </span>
                                    ) : (
                                        <div>
                                            <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)} style={{marginRight:'15px'}}>
                                                <Icon type="edit" style={{color: '#44D7B6'}} />
                                            </a>
                                            <a style={{marginRight:'15px'}} onClick={() => {this.deleteOnceList(record)}}>
                                                <Icon type="delete" style={{color: '#FF7E7E'}} />
                                            </a>
                                        </div>
                                    )}
                                </div>)
                            }

                        </div>
                    )
                },
            }
        ];
        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const columns = new_columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'changed_price' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        return (
            <EditableContext.Provider value={this.props.form}>

                <MxjTable
                    ref={this.mxjTableView}
                    components={components}
                    defaultSelectRowKeys={this.props.orderCreateStateFetch.canEditTableSelectRowKeys}
                    scroll={{ x: 150* columns.length }}
                    // scroll={{ x: 1300 }}
                    className='mxj-edit-table mxj-table-page-common'
                    dataSource={this.props.tableData}
                    columns={columns}
                    loading={this.props.loading}
                    rowClassName="editable-row"
                    onCheckboxSelect={(selectedRowKeys, selectedRows)=>{
                        that.setReduxSelecteRowKeys(selectedRowKeys)
                    }}
                    getCheckboxProps={this.getCheckboxProps}
                    // itemRender={(page, type, ele) => {
                    //
                    // }}

                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: false,
                        showTotal : (total, range) => {
                            return (<p>共{total}条记录  第 <a href="javascript;">{Math.ceil(range[0] / 10)}</a>/{Math.ceil(total / 10)} 页</p>)
                        },
                        total: this.props.tableData.length,
                    }}
                />
            </EditableContext.Provider>
        );
    }
}