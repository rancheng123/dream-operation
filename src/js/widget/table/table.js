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
    componentWillUnmount(){
        this.setState({
            selectedRowKeys: []
        })
    }
    // componentWillReceiveProps(nextProps){
    //     console.log('nextProps'+nextProps)
    //     console.log(nextProps)
    //     this.setDefaultSelectRowKeys()
    // }
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

        const { pagination,showPaination=true, ...restProps } = this.props;

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
                    loading={this.props.loading}
                    //可编辑table part1 start
                    components={{
                        body: {
                            cell:EditableCell,
                        },
                    }}
                    //可编辑table part1  end

                    rowSelection={this.props.onCheckboxSelect ? rowSelection : null}

                    
                    pagination={ showPaination ? {
                        showQuickJumper: true,
                        showSizeChanger: true,
                        //hideOnSinglePage: true,
                        showTotal: total => {
                            return `总共 ${total} 条`
                        },
                        ...pagination
                    } : false}

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

