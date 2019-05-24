import React, { Component, Fragment, PropTypes } from 'react'
import {connect} from 'react-redux'
import utils from '../../../asset'
// 引入请求封装工具
import fetchData from '../../../api/fetchData'
import config from '../../../config'

// 引入下载文件工具
import downloadText from '../../../asset/download'
// 引入属性title组件
import Attribute from '@/js/components/modules/attribute/index'
// 引入时间线list 组件
import TimeLineList from '../../../components/modules/timeLineList'
// 引入tableDetails组件
import TableDetails from '@/js/components/modules/tableDetails/index'
// 引入pdfBox 组件 展示pdf
import PDFBox from '../../../components/modules/pdfBox'


// api接口
import { 
    getContractDetail,
    setPrintHandle,
    getInstanceCheck,
} from '../../../api/contract/contract'

import {
    Button,
    Card,
    Row, 
    Col, 
    Modal,
    Steps,
    Upload,
    Skeleton,
} from 'antd'

// 引入header title组件
import Title from '@/js/components/modules/title/title'
// 引入CarBox组件
import CardBox from '@/js/components/modules/cardBox/cardBox'
// 引入折叠盒子 组件
import FoldBox from '@/js/components/modules/foldBox'
// 引入descriptionList组件
import DescriptionList from '@/js/components/modules/descriptionList'

const { Description } = DescriptionList
const { Step } = Steps

// 引入样式
import './contract_detail.scss'
import { setTimeout } from 'timers';

class Contract_detail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {},
            code: '',
            visible: false,
            pdfUrl: '',
            formData: [],
            fileList: [],
            loadingStatus: true,
        }
    }

    updateState = (stateName, stateData) => {
        this.setState({
            [stateName]: stateData,
        })
    }

    // * 组件实例化后
    componentDidMount () {
        // 页面渲染完成，调用接口获取数据
        const { params } = this.props

        if (params.code) {
            this.updateState('code', params.code)

            this.requestDetailInfo(params.code.toString(), true)
        }
    }
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }

    requestDetailInfo (data, isPrintStatus) {
        const _this = this

        this.updateState('loadingStatus', true)
        // 获取账单-明细数据
        getContractDetail(data).then((res) => {        
            if (res != undefined && res.code == 10000) {
                // 真是数据
            } else {
                // mock数据
            }

            // 将数据保存到 state 中
            this.updateState('data', res.data)

            // 如果已经存在pdf了 就不在请求pdf
            if (isPrintStatus != undefined && isPrintStatus) {
                // 下载pdf源文件
                fetchData({
                    method : 'get',
                    url : res.data.instance_pdf_url,
                    responseType : 'blob'
                }).then(res => {
                    // TODO: 修改此处
                    let src = URL.createObjectURL(res)
                    document.getElementById('depositIframe').src = src + '#toolbar=0'

                    _this.updateState('pdfUrl', src)
                    _this.updateState('loadingStatus', false)
                })                
            } else {
                this.updateState('loadingStatus', false)
            }
        })
    }

    /**
     * 下载pdf文件
     */
    downloadFile = (filePath, strFileName, strMimeType) => {

        fetchData({
            method: 'get',
            url: filePath,
            responseType : 'blob'
        }).then((res) => {
            downloadText(res, strFileName, strMimeType)
        })
    }

    /**
     * 点击返回按钮事件
     */
    goBackEvent = () => {
        // utils.Router.switchRoute('/contract/list')
        utils.Router.backRoute()
    }

    /**
     * 点击审核按钮事件
     */
    goCheckEvent = () => {
        const { dispatch } = this.props
        dispatch({
            type: 'modifyCommonData',
            data: {
                loadingStatus: true
            }
        })

        let data = this.state.code
        getInstanceCheck(data).then((res) => {
            if (res.code == 10000) {
                // TODO: 处理刷新页面
                if (data) {
                    this.requestDetailInfo(data)

                    dispatch({
                        type: 'modifyCommonData',
                        data: {
                            loadingStatus: false
                        }
                    })
                }
            }
        })
    }
    
    /**
     * 点击上传按钮事件
     */
    goUploadEvent = () => {
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
        const { params } = this.props
    
        document.getElementById('depositIframe').contentWindow.print()

        let { code } = this.state

        setPrintHandle(code).then((res) => {
            this.updateState('visible', false)

            // 重新请求页面刷新数据
            this.requestDetailInfo(params.code.toString())
        })
    }

    printDocument (win) {
        console.log(win.print)
        if (typeof win.print == 'undefined') {
            setTimeout(function () {
                printDocument(win)
            }, 1000)
        } else {
            var x = win
            x.print()
        }
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
     * 下载pdf文件
     */
    showPDF () {
        const { loadingStatus } = this.state
        return (
            <PDFBox
                loadingStatus={loadingStatus}
                idName={'depositIframe'} 
            >

            </PDFBox>
        )
    }

    render () {
        const _this = this
        const { params } = this.props
        const { code } = params
        const { data = {}, pdfUrl, loadingStatus } = this.state
        let { info = {}, process = [], print_histroy= [], operation_histroy = [], instance_pdf_url } = data
        const token = utils.Cookies.get('token')

        if (print_histroy.length > 0) {
            print_histroy.map((item, i) => {
                item['key'] = i
                return item
            })
        }

        let stepArray = process

        // 时间线list 组件参数
        const titles = {
            titleList: [
                '状  态',
                '操作人',
            ]
        }
        // 时间线list 组件参数
        const keys = {
            keyList: [
                'desc',
                'created_by'
            ]
        }

        let propsData = {
            name: 'signed_attachment',
            action: config.api + '/contract/instance-upload/' + code,
            headers: {
                Authorization: 'Bearer ' + token,
            },
            onChange({ file, fileList }) {

                if (file.status !== 'uploading') {
                    // TODO: 调用刷新详情页面的接口

                    // 重新请求页面刷新数据
                    _this.requestDetailInfo(params.code.toString(), true)
                }
            }
        }

        return (
            <div className="contract_box">
                <Title title={'合同&协议列表详情'} />

                <div className="contract_detail_box">
                    {/* TODO: 后期提取做组件 */}
                    <Card bordered={false} style={{ marginBottom: '0', padding: '0 16px 0 16px' }}>
                        <Skeleton loading={loadingStatus} active paragraph={{ rows: 0 }}>
                            <Row gutter={ 16 }>
                                <Col xl={5} lg={10} sm={16} className="contract_col">
                                    <div className="col1_title_box">
                                        <div className="title_rectangle"></div>
                                        <div className="title_name">
                                            申请编号: <span className="title_data">{info == undefined ?  null : info.code}</span>
                                        </div>
                                    </div>
                                </Col>

                                <Attribute title="当前状态" xl={5} lg={10} sm={16}>{info == undefined ?  null : info.status_str}</Attribute>
                            </Row>
                        </Skeleton>
                        
                        <div className="button_line"></div>

                        <Card bordered={false}>
                            <div style={{ padding: '20px' }}>
                                <Steps labelPlacement={'vertical'} current={ stepArray != undefined ? stepArray.length : null}>
                                    <Step title="生成协议" description={ stepArray != undefined && stepArray.length > 0 ? stepArray[0].created_by : '' }></Step>
                                    <Step title="盖章完成，上传电子版" description={ stepArray != undefined && stepArray.length > 1 ? stepArray[1].created_by : '' }></Step>
                                    <Step title="审核" description={ stepArray != undefined && stepArray.length > 2 ? stepArray[2].created_by : ''  }></Step>
                                    <Step title="完成"></Step>
                                </Steps>
                            </div>
                        </Card>
                    </Card>
                </div>

                <div className="contract_detail_box" style={{ marginTop: '32px' }}>
                    <CardBox title="合同&协议信息">
                        <Skeleton loading={loadingStatus} active paragraph={{ rows: 3 }}>
                            <DescriptionList size="large" title="" style={{ margin: '24px 14px' }}>
                                <Description term="协议编号">{info == undefined ?  null : info.code}</Description>
                                <Description term="协议名称">{info == undefined ?  null : info.name}</Description>
                                <Description term="协议类型">{info == undefined ?  null : info.type_str}</Description>
                                <Description term="城市">{info == undefined ?  null : info.city_name}</Description>
                                <Description term="场地">{info == undefined ?  null : info.place_name}</Description>
                                <Description term="签署方"><span className="sign_box">{info == undefined ?  null : info.sign_part}</span></Description>
                                <Description term="签约主体"><span className="sign_box">{info == undefined ?  null : info.organization_name}</span></Description>
                                <Description term="协议来源">{info == undefined ?  null : info.source_type_str}</Description>
                                <Description term="来源编号">{info == undefined ?  null : info.source_code}</Description>
                                <Description term="协议状态"><span className="sign_type_box">{info == undefined ?  null : info.status_str}</span></Description>
                                <Description term="附件">
                                    <a ref="download" onClick={() => this.downloadFile(instance_pdf_url, '合同模板.pdf', 'application/pdf')}>{info == undefined ?  null : info.attachment_name}</a>
                                </Description>
                            </DescriptionList>
                        </Skeleton>
                    </CardBox>

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

                    <div style={{ padding: '0px 38px', backgroundColor: '#ffffff' }}>
                        <FoldBox headerTitle="打印历史" showArrow={true}>
                            <div style={{ marginTop: '24px' }}>
                                <TableDetails
                                    rowKey="key"
                                    pagination={false}
                                    size="middle"
                                    scroll={{ x: 1000 }}
                                    dataSource={print_histroy}
                                    columns={this.columns}
                                    loading={loadingStatus}
                                >
                                </TableDetails>
                            </div>
                        </FoldBox>
                    </div>

                    <div style={{ padding: '32px 38px 0 38px', backgroundColor: '#ffffff' }}>
                        <FoldBox headerTitle="历史记录" showArrow={true}>
                            <TimeLineList listData={operation_histroy} titles={titles} keys={keys} status=""></TimeLineList>
                        </FoldBox>
                    </div>

                    {/* 打印提示框 */}
                    {this.paymentConfirm()}

                    <Card className="button_box" bordered={false}>
                        <Button style={{ marginLeft: '16px' }} onClick={() => this.goBackEvent()}>返回</Button>
                        {
                            info != undefined && ( info.status_str == '已生效' || info.status_str == '待签署' ) ? 
                                <Button style={{ marginLeft: '16px' }} onClick={() => this.goCheckEvent()} type="primary">审核</Button>
                                : null
                        }

                        {
                            info != undefined && info.status_str == '待上传' ?
                                <Upload {...propsData}>
                                    <Button style={{ marginLeft: '16px' }} onClick={() => this.goUploadEvent()} type="primary">上传</Button>
                                </Upload>
                                : null
                        }  
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
})(Contract_detail)




