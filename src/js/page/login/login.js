import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MxjForm from '@widget/form/form'
import fetchData from "../../api/fetchData";
import utils from "../../asset";
import config from "../../config";
import { Button, Col, Input, Modal, Row, Icon, message } from "antd";
import LoginForm from './form.js';

import UserNameIcon from '../../../image/svg/usename.svg';
import PwIcon from '../../../image/svg/pw.svg';
import Logo from '../../../image/svg/logo.svg';
import './login.scss';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            type: 'text',
            loading: false,
        };
        this.imageBase_w = 50;
        this.imageBase_h = 33;
    }

    componentDidMount() {
        const that = this
        window.addEventListener('resize', that.onWindowResize);
        this.onWindowResize();
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    onWindowResize() {
        var svg_animate = document.getElementById('g_animate');
        var svg_image = document.getElementById('g_image');
        const w = document.body.clientWidth;
        if (w <= 990) { return };
        const h = document.body.clientHeight;
        const base_w = 1920, base_h = 1080;
        const imageBase_w = 50, imageBase_h = 33;
        this.image_w = w * 50 / base_w;
        this.image_h = h * 33 / base_h;
        const x1 = w * 730 / base_w;
        const y1 = h * 563.5 / base_h;
        const x2 = w * 980 / base_w;
        const y2 = h * 717 / base_h;
        const x3 = w * 1100 / base_w;
        const y3 = h * 789 / base_h;
        // const x4 = w * 1320 / base_w;
        // const y4 = h * 929 / base_h;
        const x4 = w * 1280 / base_w;
        const y4 = h * 900 / base_h;

        const x5 = w * 1335 / base_w;//q
        const y5 = h * 940 / base_h;
        const x6 = w * 1350 / base_w;
        const y6 = h * 935 / base_h;

        const x7 = w * 1350 / base_w;
        const y7 = h * 935 / base_h;
        const x8 = w * 1615 / base_w;
        const y8 = h * 785.7 / base_h;
        const x9 = w * 1880 / base_w;
        const y9 = h * 640.5 / base_h;
        const path = `M${x1},${y1} L${x2},${y2} L${x3},${y3}L${x4},${y4} Q${x5},${y5} ${x6},${y6} L${x7},${y7} L${x8},${y8} L${x9},${y9}`;
        // const path = `M${x8},${y8}`;
        svg_animate.setAttribute('path', path);
        svg_image.setAttribute('width', this.image_w);
    }
    render() {
        return (
            <div className={'loginModule'}>
                <svg width="100%" height="100%" style={{ position: 'absolute' }}>
                    <image id='g_image' width='50' xlinkHref={require('@/image/img/light.png')}   >
                        <animateMotion id="g_animate" path="" begin="0" dur="3s" rotate='auto' repeatCount="indefinite" ></animateMotion>
                        <animate attributeName="opacity" values='0.3;1;0;0.01;1;0.3'  keyTimes="0;0.27;0.5;0.55;0.75;1" calcMode='spline' keySplines='.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1'   begin="0s" dur="3s" repeatCount="indefinite" />
                    </image>
                </svg>
                <div className='login-logo'>
                    <Logo />
                </div>
                <div className='login-module-content'>
                    <div className='login-module-content-welcome' style={{ color: '#fff', fontFamily: 'PingFangSC-Light' }}>Hello!</div>
                    <div className='login-module-content-title' style={{ color: '#fff', }}>
                        <span className='login-module-content-title-welcome' style={{ fontFamily: 'PingFangSC-Light' }}>欢迎登录 </span>
                        <span className='login-module-content-title-system' style={{ fontFamily: 'PingFangSC-Semibold', marginLeft: '10px' }}>梦想加运营系统</span>
                    </div>
                    <LoginForm {...this.props} />
                </div>
            </div>
        )
    }

}


export default connect(function (state) {
    return {
        common: state.common
    };
})(Login);