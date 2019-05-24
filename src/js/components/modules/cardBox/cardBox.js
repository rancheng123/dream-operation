import React, { Component, PropTypes, createContext } from 'react';
import { connect } from 'react-redux';

import MiddleContext from '@/js/components/modules/context/middleContext'
import CardHeader from '../cardHeader/cardHeader'
import CardContent from './cardContent'

import {
    Card
} from 'antd'

import './cardBox.scss'

const cardBox = {}

// Stateless Component
const CardBox = ({ children, ...restProps }) => (
    <div className="card_box_modle">
        <Card bordered={false} className='card_box' style={cardBox}>
            <MiddleContext.Consumer>
                {value => (
                    // 子组件封装
                    <CardHeader 
                        { ...value }
                        { ...restProps }
                        value={{value}}
                    ></CardHeader>
                )}
            </MiddleContext.Consumer>
            
            {/* 如果标签内部有children */}
            {children ? (
                // 包装children内部内容
                <CardContent>{children}</CardContent>
            ) : null}
        </Card>
    </div>
)

export default connect(function (state) {
    return {
        common: state.common,
        home: state.home
    }
})(CardBox)