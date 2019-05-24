import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import MainRight2 from '../../../components/layout/main_right2'

import utils from '../../../asset'
import fetchData from '../../../api/fetchData'
import config from '../../../config'
// 引入 金币 单位转换 组件
import {intToFloat} from '../../../asset/intToFloat'


// api接口
import { 
    getDepositFormDetails,
    setDepositPrint,
} from '../../../api/financial/deposit'

import {
    Card,
    Button,
    // Timeline,
    // Icon,
    Modal,
    Skeleton,
    // Row,
    // Col
} from 'antd'

// const { Meta } = Card

// 引入header title组件
import Title from '@/js/components/modules/title/title'
// 引入CarBox组件
import CardBox from '@/js/components/modules/cardBox/cardBox'
// 引入折叠盒子 组件
import FoldBox from '@/js/components/modules/foldBox'
// 引入tableDetails组件
import TableDetails from '@/js/components/modules/tableDetails/index'
// 引入时间线list 组件
import TimeLineList from '../../../components/modules/timeLineList'
// 引入pdfBox 组件 展示pdf
import PDFBox from '../../../components/modules/pdfBox'
// 引入descriptionList组件
import DescriptionList from '@/js/components/modules/descriptionList'
const { Description } = DescriptionList

// const TimelineItem = Timeline.Item
// const confirm = Modal.confirm

// 引入样式
import './deposit_form_details.scss'    

class deposit_form_details extends Component {
    constructor (props) {
        super(props)
        
        this.state = {
            data: {},
            code: '',
            visible: false,
            detailList: [],
            printList: [],
            pdfUrl: '',
            loadingStatus: true,
        }
    }

    updateState = (stateName, stateData) => {
        this.setState({
            [stateName]: stateData,
        })
    }

    // *组件实例化完成后
    componentDidMount () {
        // 页面渲染完成，调用接口获取数据
        const { params } = this.props

        if (params.code) {
            let data = params.code.toString()

            this.updateState('code', params.code)

            this.requireDetailInfo(data)
        }
    }
    componentWillUnmount() {
        this.setState = () => {
            return
        }
    }

    requireDetailInfo (data, callbackFun) {
        const _this = this
        // 打开loading效果
        _this.setState({
            loadingStatus: true
        })
        // 获取账单-明细数据
        getDepositFormDetails(data).then((res) => {
            if (res != undefined && res.code == 10000) {
                // 为数组增加key
                res.data.details.map((item, i) => {
                    item['key'] = i
                    return item
                })

                fetchData({
                    method : 'get',
                    url : config.api + '/finance/deposit-receipt-pdf/' + data,
                    responseType : 'blob'
                }).then(res => {
                    let src = URL.createObjectURL(res)
                    document.getElementById('depositIframe').src = src + '#toolbar=0'

                    // 执行callback方法
                    if (callbackFun != undefined && typeof(callbackFun) == 'function') {
                        // 执行callback
                        callbackFun()
                    } else {
                        _this.setState({
                            loadingStatus: false
                        })
                    }
                })
            } else {
                // mock数据
            }

            // 将数据保存到 state 中
            this.updateState('data', res.data)
            this.updateState('detailList', res.data.details)
            this.updateState('printList', res.data.print_logs)
        })
    }

    /**
     * 返回押金记录列表页
     */
    goBackEvent = () => {
        // utils.Router.switchRoute('/financial/deposit/form/list')
        utils.Router.backRoute()
    }

    /**
     * 打印事件
     */
    printEvent = () => {
        const { code } = this.state
        const { dispatch } = this.props
        const _this = this
        dispatch({
            type: 'modifyCommonData',
            data: {
                loadingStatus: true
            }
        })

        let data = code
        setDepositPrint(data).then((res) => {
            let fun = () => {
                let iframeDom = document.getElementById('depositIframe')
                if (iframeDom.attachEvent) {
                    console.log(1)
                    iframeDom.attachEvent('onload', () => {
                        // dispatch({
                        //     type: 'modifyCommonData',
                        //     data: {
                        //         loadingStatus: false
                        //     }
                        // })
                        iframeDom.contentWindow.print()
                    })
                } else {
                    console.log(2)
                    iframeDom.onload = () => {
                        console.log('onload')
                        // iframe加载完成后要进行的操作
                        // iframeDom.addEventListener('contextmenu', event => event.preventDefault())
                        dispatch({
                            type: 'modifyCommonData',
                            data: {
                                loadingStatus: false
                            }
                        })
                        _this.setState({
                            loadingStatus: false
                        })
                        iframeDom.contentWindow.print()
                    }
                }
            }
            // 重新请求数据
            this.requireDetailInfo(data, fun)
        })
    }

    /**
     * 成功按钮调用接口
     */
    handleOk = (e) => {
        e.preventDefault()

        let data = this.state.code
        setDepositPrint(data).then((res) => {
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
            <Button key="forward" type="primary" loading={this.state.visible} onClick={this.handleOk}>成功</Button>,
        ]
    }
    /**
     * 打印提示框
     */
    paymentConfirm () {

        return (
            <Modal
                destroyOnClose
                title="线下付款"
                visible={this.state.visible}
                // onOk={this.handleOk}
                closable={false}
                onCancel={this.handleCancel}
                footer={this.renderFooter()}
                className="payment_form_box"
            >           
                是否打印成功？
            </Modal>
        )
    }


    // 押金记录列表目录
    columns = [
        {
            title: '押金详细编码',
            dataIndex: 'detail_code',
        },
        {
            title: '押金详细',
            dataIndex: 'detail_content',
        },
        {
            title: '单价',
            dataIndex: 'unit_price',
            render: val => `￥ ${ intToFloat(val) }`
        },
        {
            title: '数量',
            dataIndex: 'number'
        },
        {
            title: '押金额',
            dataIndex: 'amount',
            render: val => `￥ ${ intToFloat(val) }`
        }
    ]

    render () {
        const { data = {}, detailList = [], printList = [], loadingStatus } = this.state

        const topMenu = [
            {
                text: '财务管理'
            },
            {
                text: '押金管理'
            },
            {
                text: '押金记录详情',
                // path: '/financial/invoice/manage'
                path: `/financial/deposit/record/details${this.state.code}`
            }
        ]

        // 时间线list 组件参数
        const titles = {
            headerTitle: '生成校验码',
            titleList: [
                '状  态',
                '操作人',
            ]
        }
        // 时间线list 组件参数
        const keys = {
            headerKey: 'check_code',
            keyList: [
                'check_status_name',
                'printed_by_name'
            ]
        }

        return (
            <MainRight2 breadcrumbData={topMenu}>
                <div className="deposit_form_details_box">
                    <Title title="押金单详情"></Title>

                    <div className="deposit_form_content_box">
                        <CardBox title="押金单详情">
                            <TableDetails
                                rowKey="key"
                                pagination={false}
                                size="middle"
                                scroll={{ x: 1000 }}
                                dataSource={detailList}
                                columns={this.columns}
                                loading={loadingStatus}
                            >
                                <Skeleton loading={loadingStatus} active paragraph={{ rows: 3 }}>
                                    <DescriptionList size="large" title="" style={{ margin: '24px 0px' }}>
                                        <Description term="押金单编号">{data == undefined ?  null : data.deposit_receipt_code}</Description>
                                        <Description term="用户名称">{data == undefined ?  null : data.member_id_name}</Description>
                                        <Description term="生成时间">{data == undefined ?  null : data.created_at}</Description>
                                        <Description term="城市">
                                            {   
                                                data.city_name != undefined && data.city_name.length > 0 ?
                                                    data.city_name.map((item, i) => {
                                                        return <div key={i}>{item}</div>
                                                    })
                                                    : null
                                            }
                                        </Description>
                                        <Description term="场地">
                                            {
                                                data.location_name != undefined && data.location_name.length > 0 ?
                                                    data.location_name.map((item, i) => {
                                                        return <div key={i}>{item}</div>
                                                    })
                                                    : null
                                            }
                                        </Description>
                                        {/* 无此参数 */}
                                        <Description term="押金单位主体">{data == undefined ?  null : data.main_body_id_name}</Description>
                                        <Description term="押金单状态">{data == undefined ?  null : data.deposit_receipt_status_name}</Description>
                                        <Description term="押金单总额">￥{data == undefined ?  null : intToFloat(data.amount)}</Description>
                                        <Description term="押金单来源">{data == undefined ?  null : data.source_type_name}</Description>
                                        <Description term="订单号">{data == undefined ?  null : data.order_code}</Description>
                                        {/* 无此参数 */}
                                        <Description term="打印次数">{data == undefined ?  null : data.print_count}</Description>
                                        {/* 无此参数 */}
                                        {/* <Description term="失效来源">{data == undefined ?  null : data.deposit_status}</Description> */}
                                    </DescriptionList>
                                </Skeleton>
                            </TableDetails>

                            <PDFBox
                                loadingStatus={loadingStatus}
                                idName={'depositIframe'}
                            >
                            </PDFBox>

                            <FoldBox headerTitle="打印历史" showArrow={true}>

                                <TimeLineList listData={printList} titles={titles} keys={keys} status="check_status"></TimeLineList>

                            </FoldBox>
                            
                            {/* 打印提示框 */}
                            {this.paymentConfirm()}

                            <Card bordered={false}  className="button_box">
                                <Button style={{ marginRight: '16px' }} type="primary" onClick={() => this.printEvent()}>打印</Button>
                                <Button onClick={() => this.goBackEvent()}>返回</Button>
                            </Card>
                        </CardBox>
                    </div>
                </div>
            </MainRight2>
        )
    }
}

export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    }
})(deposit_form_details)