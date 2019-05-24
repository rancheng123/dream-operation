import './table.scss'
import {Table, Icon, Alert} from 'antd';
import React, {Component} from "react";
import {subSet, removeArr} from '@/js/asset/common'


class MxjTable extends Component{
    constructor(){
        super();
        this.state = {
            timer: null,
            selectedNum: 0,
            selectedRowKeys: []
        }
    }
    componentDidMount() {
        this.setDefaultSelectRowKeys()
    }
    setDefaultSelectRowKeys() {
        const {defaultSelectRowKeys} = this.props
        if (defaultSelectRowKeys) {
            this.setSelectedRowKeys(defaultSelectRowKeys)
        }

    }
    componentWillUnmount() {
        clearTimeout(this.state.timer)
    }
    changeSelectedRowKeys(isAdd=true,keys ) {
        let {selectedRowKeys} = this.state
        if (isAdd) {
            this.setState({
                selectedRowKeys: selectedRowKeys.concat(keys)
            })
        } else {
            selectedRowKeys = subSet(selectedRowKeys, keys)
            this.setState({
                selectedRowKeys
            })
        }
    }

    /**
     * 获取所有的选中状态数据
     * @returns {Array|T[]|string|T[]|*}
     */
    getSelectedRowKeys() {
        return this.state.selectedRowKeys
    }

    /**
     * 设置选中项
     * @param selectedRowKeys
     */
    setSelectedRowKeys(selectedRowKeys = []) {
        this.setState({
            selectedRowKeys
        })
    }

    /**
     * 删除选中项
     * @param deleteKeys
     */
    deleteSelectedRowKeys(deleteKeys = []) {
        console.log('删除选中的数据是：')
        console.log(deleteKeys)
        let {selectedRowKeys} = this.state
        for (let i=0; i< deleteKeys.length; i++) {
            const value = deleteKeys[i]
            selectedRowKeys = removeArr(selectedRowKeys, value)
        }
        this.setSelectedRowKeys(selectedRowKeys)
    }

    render(){
        const { selectedRowKeys } = this.state;

        const { pagination, dataSource, ...restProps } = this.props;
        
        const { data = [] } = dataSource

        const rowSelection = {
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {

                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                //this.state.selectedNum = selectedRowKeys.length;
                this.setState({
                      selectedNum: selectedRowKeys.length,
                    selectedRowKeys
                  })


                //2秒后，提示消失
                /*clearTimeout(this.state.timer)
                this.state.timer = setTimeout(()=>{
                    this.setState({
                        tipShow: false
                    })

                    clearTimeout(this.state.timer)
                    this.state.timer = null;

                },2000)*/


                this.props.onCheckboxSelect && this.props.onCheckboxSelect(selectedRowKeys, selectedRows)
            },
            getCheckboxProps: this.props.getCheckboxProps
        }
        return (
            <div className={'mxj_table_warp'}>
                <Alert  style={{
                    display: this.state.selectedRowKeys.length?'block': 'none',
                    padding: '0 20px',
                    height: 28,
                    lineHeight: '28px',
                    marginBottom: 16
                }} message={
                    <span>
                        <Icon type="exclamation-circle" style={{color: '#0179FF',marginRight: 16}} />
                        已选择
                        <span style={{color: '#0179FF'}}>
                            {this.state.selectedRowKeys.length}
                        </span>
                        项
                    </span>
                } type="info" />

                <Table
                    className={'mxj_table'}

                    //可编辑table part1 start
                    components={{
                        body: {
                            cell:EditableCell,
                        },
                    }}
                    //可编辑table part1  end

                    rowSelection={this.props.onCheckboxSelect ? rowSelection : null}


                    loading={this.props.loading}
                    //数据个数转换入口
                    dataSource={(()=>{
                        return data.map((ele,i)=>{
                            ele.key = i;
                            return ele;
                        })
                    })()}

                    pagination={!this.props.dataSource.total? false : {
                        showQuickJumper: true,
                        showSizeChanger: true,

                        current: parseInt(this.props.dataSource.current_page),
                        total: parseInt(this.props.dataSource.total),
                        pageSize: parseInt(this.props.dataSource.per_page) || 10,

                        //hideOnSinglePage: true,
                        showTotal: total => {
                            // return `总共 ${total} 条`
                            const { current_page, per_page } = dataSource
                            return (
                                <p style={{marginRight: 20}} className={'mxj-table-total-text'}>共{total}条记录 第 <span style={{color: '#0179FF '}}>{current_page}</span>/{Math.ceil(total / per_page)} 页</p>
                            )
                        },


                        //改变每页条数
                        onShowSizeChange: (current, pageSize)=>{
                            this.props.dataSource.per_page = pageSize;
                            this.props.dataSource.page = 1;

                            this.props.onPaginationChange && this.props.onPaginationChange(this.props.dataSource);
                        },

                        //改变页码
                        onChange: (pageNumber)=>{
                            this.props.dataSource.page = pageNumber;

                            this.props.onPaginationChange && this.props.onPaginationChange(this.props.dataSource);
                        },
                    }}

                    {...restProps}
                />
            </div>

        )
    }

}

//可编辑table part2 start
class EditableCell extends React.Component {
    render() {
        return (
            <td>
                {(()=>{
                    if(this.props.edit && this.props.renderEditCell){
                        return this.props.renderEditCell()
                    }else{
                        return this.props.children;
                    }
                })()}
            </td>
        );
    }
}
//可编辑table part2 end


export default MxjTable;

