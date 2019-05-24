import React, { Component, Fragment, PropTypes } from 'react'
import {connect} from 'react-redux'
import utils from '../../../asset'

// 引入请求封装工具
import fetchData from '../../../api/fetchData'
// 引入下载文件工具
import downloadText from '../../../asset/download'

// api接口
import { 
    setPrintHandle,
} from '../../../api/contract/contract'


// api接口
import { 
    getTemplateDetail
} from '../../../api/contract/contract'

import {
    Button,
    Card, 
    Modal,
} from 'antd'

// 引入header title组件
import Title from '@/js/components/modules/title/title'
// 引入CarBox组件
import CardBox from '@/js/components/modules/cardBox/cardBox'
// 引入pdfBox 组件 展示pdf
import PDFBox from '../../../components/modules/pdfBox'

// 引入样式
import './contract_template_detail.scss'

class template_detail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {},
            code: '',
            pdfUrl: '',
            visible: false,
            loadingStatus: true,
        }
    }

    updateState = (stateName, stateData) => {
        this.setState({
            [stateName]: stateData
        })
    }

    // * 组件实例化后
    componentDidMount () {
        // 页面渲染完成，调用接口获取数据
        const { params } = this.props
        const _this = this
        this.updateState('loadingStatus', true)
        

        if (params.code) {
            this.updateState('code', params.code)

            // 获取账单-明细数据
            getTemplateDetail(params.code.toString()).then((res) => {        
                if (res != undefined && res.code == 10000) {
                    // 真是数据
                } else {
                    // mock数据
                }

                this.updateState('data', res.data)

                // 如果已经存在pdf了 就不在请求pdf
                if (_this.state.pdfUrl == '') {
                    // 下载pdf源文件
                    fetchData({
                        method : 'get',
                        url : res.data.template_url,
                        responseType : 'blob'
                    }).then(res => {
                        // TODO: 修改此处
                        let src = URL.createObjectURL(res)
                        document.getElementById('templateIframe').src = src + '#toolbar=0'

                        this.updateState('loadingStatus', false)
                    }) 
                }
            })
        }
    }

    downloadFile = (filePath, strFileName, strMimeType) => {

        fetchData({
            method: 'get',
            url: filePath,
        }).then((res)=>{
            console.log(res)
        })

        downloadText(filePath, strFileName, strMimeType)
    }

    /**
     * 点击返回按钮事件
     */
    goBackEvent = () => {
        // utils.Router.switchRoute('/contract/list')
        utils.Router.backRoute()
    }

    /**
     * 成功按钮调用接口
     */
    handleOk = (e) => {
        e.preventDefault()

        let data = this.state.code

        setPrintHandle(data).then((res) => {
            this.updateState('visible', false)
        })
    }
    handleCancel = (e) => {
        e.preventDefault()
        // 隐藏
        this.updateState('visible', false)
    }

    renderFooter = () => {
        return [
            <Button key="back" onClick={this.handleCancel}>取消</Button>,
            <Button key="forward" type="primary" onClick={this.handleOk}>成功</Button>,
        ]
    }
    /**
     * 打印事件
     */
    printEvent = () => {
        document.getElementById('templateIframe').contentWindow.print()

        let data = this.state.code
        setPrintHandle(data).then((res) => {
            console.log('打印成功')
        })
    }

    columns = [
        {
            title: '打印时间',
            dataIndex: 'created_at'
        },
        {
            title: '打印人',
            dataIndex: 'created_by'
        },
    ]

    /**
     * 打印提示框
     */
    paymentConfirm () {
        return (
            <Modal
                destroyOnClose
                title="提示"
                visible={this.state.visible}
                // onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={this.renderFooter()}
                className="payment_form_box"
            >           
                是否打印成功？
            </Modal>
        )
    }

    /**
     * 展示pdf文件
     */
    showPDF () {
        const { loadingStatus } = this.state
        return (
            <PDFBox
                loadingStatus={loadingStatus}
                idName={'templateIframe'} 
            >

            </PDFBox>
        )
    }

    render () {
        const { params } = this.props
        const { code } = params

        return (
            <div className="template_box">
                <Title title={'合同&协议列表详情'} />

                <div className="template_detail_box" style={{ marginTop: '32px' }}>

                    <CardBox title="协议详情">
                        <div className="detail_img_box">
                            <div className="img_content">
                                {this.showPDF()}

                                <div className="img_btn">
                                    <Button type="primary" onClick={() => this.printEvent()}>点击打印</Button>
                                </div>
                            </div>
                        </div>
                    </CardBox>

                    {/* 打印提示框 */}
                    {this.paymentConfirm()}

                    <Card className="button_box" bordered={false}>
                        <Button style={{ marginLeft: '16px' }} onClick={() => this.goBackEvent()}>返回</Button>
                    </Card>
                </div>
            </div>
        )
    }

}


export default connect(function (state) {
    return {
        common: state.common,
        space_build_detail: state.space_build_detail
    }
})(template_detail)