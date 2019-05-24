import React, { Component, PropTypes,Fragment } from 'react';
import {
    Table, Input, InputNumber, Popconfirm, Form, Icon
} from 'antd';
const FormItem = Form.Item;
const EditableContext = React.createContext();
class EditableCell extends React.Component {
    constructor(props) {
        super(props)
    }
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
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
                                            message: `Please Input ${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
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
            selectedRowKeys: []
        };
        this.columns = [
            {
                title: '扣款类型', width: 100, dataIndex: 'goods_type', key: 'name'
            },
            {
                title: '扣款内容', width: 100, dataIndex: 'goods_code', key: 'age'
            },
            { title: '单价', dataIndex: 'goods_name', key: '1' },
            { title: '数量', dataIndex: 'goods_city', key: '2' },
            { title: '金额', dataIndex: 'goods_location', key: '3' },
            { title: '备注', dataIndex: 'goods_tips', key: '4' },
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
                            {editable ? (
                                <span>
                                  <EditableContext.Consumer>
                                    {form => (
                                        <a
                                            href="javascript:;"
                                            onClick={() => this.save(form, record.key)}
                                            style={{ marginRight: 8 }}
                                        >
                                            Save
                                        </a>
                                    )}
                                  </EditableContext.Consumer>
                                  <Popconfirm
                                      title="Sure to cancel?"
                                      onConfirm={() => this.cancel(record.key)}
                                  >
                                    <a>Cancel</a>
                                  </Popconfirm>
                                </span>
                            ) : (
                                <div>
                                    <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)} style={{marginRight:'15px'}}>
                                        <Icon type="edit" style={{color: '#44D7B6'}} />
                                    </a>
                                    <a style={{marginRight:'15px'}}>
                                        <Icon type="delete" style={{color: '#FF7E7E'}} />
                                    </a>
                                </div>
                            )}
                            {/*<span style={{marginRight:'15px'}}>*/}
                            {/*<Icon type="eye" style={{color: '#0179FF' }}/>*/}
                            {/*</span>*/}
                            {/*<span style={{marginRight:'15px'}}>*/}
                                {/*<Icon type="edit" style={{color: '#44D7B6'}} />*/}
                            {/*</span>*/}
                            {/*<span style={{marginRight:'15px'}}>*/}
                                {/*<Icon type="delete" style={{color: '#FF7E7E'}} />*/}
                            {/*</span>*/}
                        </div>
                    )
                },
            }
        ];
    }

    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, key) {
        form.validateFields(['goods_new'],(error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.props.tableData];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                console.log(item)
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                console.log(newData )
                this.props.onChange(newData)
                this.setState({ editingKey: '' });
            } else {
                newData.push(row);
                this.props.onChange(newData)
                this.setState({ editingKey: '' });
            }
        });
    }
    rowSelection = {
        onChange: this.props.rowSelection
    }
    edit(key) {
        this.setState({ editingKey: key });
    }
    renderFooter() {
        return (
            <div className='mxj-edit-table-footer'>押金总计: ¥222222222</div>
        )
    }
    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        return (
            <EditableContext.Provider value={this.props.form}>
                <Table
                    components={components}
                    bordered
                    className={'mxj-edit-table'}
                    dataSource={this.props.tableData}
                    columns={columns}
                    rowSelection= {this.rowSelection}
                    rowClassName="editable-row"
                    footer={ () => this.renderFooter()}
                />
            </EditableContext.Provider>
        );
    }
}