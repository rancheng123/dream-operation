import React,{ Component, Fragment } from 'react';
import {Icon, Form, Row, Col, AutoComplete, Button, InputNumber} from 'antd';
import MxjTable from '@/js/widget/table/table'
import TitleSvg from '@svg/title.svg'
import SelectInputGroup from '../common/selectInputGroup'
import Debounce from 'lodash-decorators/debounce';
import AddGoodsItem from "./components/step01";
const EditableContext = React.createContext();
const FormItem = Form.Item;
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
export default class RemoveAddGoodsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }
    }
    renderOption(item) {
        return (
            <AutoComplete.Option key={item.code} text={item.goods_name}>
                {item.goods_name}
            </AutoComplete.Option>
        );
    }
    render() {
        const { getFieldDecorator, getFieldsValue, getFieldValue } = this.props.form;
        const searchOptions = [{
            value: '1',
            label: '商品编号'
        }, {
            value: '2',
            label: '商品名称'
        }]
        const {dataSource} = this.state
        const {showSearch = true, showAddGoodsBtn = true, showMoreSelect=true} = this.props
        const new_columns = [
            {
                title: '商品类型', dataIndex: 'category', key: 'category'
            },
            {
                title: '商品编号', dataIndex: 'code', key: 'code',
                filteredValue: filteredValue.code || null,
                onFilter: (value, record) => record.code === value
            },
            { title: '商品名称', dataIndex: 'goods_name', key: 'goods_name',
                filteredValue: filteredValue.goods_name || null,
                onFilter: (value, record) => record.code === value
            },
            { title: '城市', dataIndex: 'city_name', key: 'city_name',
                filteredValue: filteredValue.city_code || null,
                onFilter: (value, record) => record.city_code === value
            },
            { title: '场地', dataIndex: 'place_name', key: 'place_name' },

            { title: '销售价格', dataIndex: 'pre_price', key: 'pre_price',
                render: (text, record) => ('¥'+ record.pre_price + '/月')
            },
            { title: '数量', dataIndex: 'num', key: 'num',
            },
            { title: '修改商品单价', dataIndex: 'changed_price', key: 'changed_price', editable: true,
                render: (text, record) => ('¥'+ record.changed_price + '/月')
            },
            { title: '原商品总价', dataIndex: 'total_number', key: 'total_number',
                render: (text, record) => ('¥'+ record.pre_price * record.num + '/月')
            },
            { title: '修改后商品总价', dataIndex: 'new_price_new', key: 'new_price_new',
                render: (text, record) => ('¥'+ record.changed_price * record.num + '/月')
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
                                    <a style={{marginRight:'15px'}} onClick={() => {this.deleteOnceList(record)}}>
                                        <Icon type="delete" style={{color: '#FF7E7E'}} />
                                    </a>
                                </div>
                            )}
                        </div>
                    )
                },
            }
        ];
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
            <Fragment>
                {
                    showSearch && (
                        <Form onSubmit={this.handleSubmit} layout='inline'>
                            <Row gutter={32}>
                                <Col sm={24} xs={24} lg={20} className='mxj-form-location' style={{display: 'flex'}}>
                                    {/*组织用户选择*/}
                                    <Form.Item className='mxj-auto-search-inline mxj-margin-bottom-16' style={{width: '100%'}}>
                                        {getFieldDecorator('member_search', {
                                            initialValue: {
                                                selectValue: '1',
                                                autoValue: '',
                                            }
                                        })(
                                            <SelectInputGroup
                                                autoCom
                                                style={{width: '100%', maxWidth: 350}}
                                                placeholder={'请选择商品编号或商品名称'}
                                                options={searchOptions}
                                                dataSource={dataSource.map(this.renderOption)}
                                            />
                                        )}
                                        <Button type="primary" style={{marginLeft: 16}}>
                                            查询
                                        </Button>
                                        <Button style={{marginLeft: 16}}>
                                            重置
                                        </Button>
                                    </Form.Item>
                                </Col>
                                {
                                    showAddGoodsBtn && (
                                        <Col xs={24} sm={24} lg={4}>
                                            <Form.Item>
                                                <Button type="primary" icon="plus">选择服务商品</Button>
                                            </Form.Item>
                                        </Col>
                                    )
                                }
                            </Row>
                        </Form>
                    )
                }
                {
                    showMoreSelect && (
                        <Row style={{marginBottom: 16, marginTop: 16}}>
                            <Col>
                                <Button>批量删除</Button>
                                {/*<Button style={{marginLeft: 9}}>批量改价</Button>*/}
                            </Col>
                        </Row>
                    )
                }
                <EditableContext.Provider value={this.props.form}>

                    <MxjTable
                        ref='mxjTableView'
                        components={components}
                        // defaultSelectRowKeys={this.props.orderCreateStateFetch.canEditTableSelectRowKeys}
                        bordered
                        // scroll={{ x: 1300 }}
                        className={'mxj-edit-table'}
                        dataSource={this.props.tableData}
                        columns={columns}
                        loading={this.props.loading}
                        rowClassName="editable-row"
                        onCheckboxSelect={(selectedRowKeys, selectedRows)=>{
                            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                            // that.setReduxSelecteRowKeys(selectedRowKeys)
                        }}
                        pagination={{
                            showQuickJumper: true,
                            showSizeChanger: true,
                            total: this.props.tableData.length || 0
                        }}
                    />
                </EditableContext.Provider>
            </Fragment>
        );
    }
}

