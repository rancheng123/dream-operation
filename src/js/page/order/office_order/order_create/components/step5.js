import React, { Component, PropTypes, Fragment } from 'react';
import { connect } from 'react-redux';
import Bind from 'lodash-decorators/bind';
import {Form, Input, Select, Spin, Row, Col, Button, Divider} from 'antd'
import TableDiversified from '@/js/components/modules/tableDiversified/index'
const Option = Select.Option;
import DetailBox from '@/js/components/modules/detailBox/index'
import './index4.scss'
import utils from '@/js/asset/index'
const { TextArea } = Input;
class OrderOfficeStep01 extends Component{
    constructor(props){
        super(props);

    }

    render(){

        return (
            <div className='step05'>

            </div>
        )
    }

}
export default OrderOfficeStep01

