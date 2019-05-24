import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import fetchData from '../../../api/fetchData'
import config from '../../../config'

import {
    Card,
    Spin
} from 'antd'

import './index.scss'

const PDFBox = ({loadingStatus, apiUrl, code, idName}) => {
    // document.getElementById(idName).getElementsByTagName('body').addEventListener('contextmenu', event => event.preventDefault())
    
    if (apiUrl != undefined && code != undefined && code != '' ) {
        const url = config.api + apiUrl + code
        fetchData({
            method : 'get',
            url : url,
            responseType : 'blob'
        }).then(res => {
            let src = URL.createObjectURL(res)
            // #toolbar=0 是禁用 pdf 展示的时候 顶部的 按钮的
            document.getElementById(idName).src = src + '#toolbar=0'
            // 禁用鼠标右键功能
            // document.addEventListener('contextmenu', event => event.preventDefault())

            // document.getElementById(idName).src = src
            // document.querySelector('.pdf_loading').style.display = 'none'
        })
    }


    return (
        <div className="pdf_box">
            <Card bordered={false}
                style={{ padding: '40px 110px' }}
            >
                <div className="printBox">
                    <iframe id={idName} className="iframeDiv" width="100%" height="560px"></iframe>

                    {
                        loadingStatus ? 
                            <div style={{
                                    position: 'absolute',
                                    top: '0',
                                    left: '0',
                                    width: '100%',
                                    height: '100%',
                                    zIndex: '9999',
                                    textAlign: 'center',
                                    background: 'rgba(0,0,0,0.05)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Spin tip="Loading..."/>
                            </div>  :
                            null
                    }
                </div>
            </Card>
        </div>
    )
}

export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    }
})(PDFBox)