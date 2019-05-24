import React,{Component} from "react";
import utils from ".";
import config from "../config";
import fetchData from '../api/fetchData';
import moment from 'moment';
import {connect} from "react-redux";
import validator from 'validator'
var isDegug = location.href.match(config.debug.window);


// 强制开启调试模式  start
isDegug = true
// 强制开启调试模式  end

if(isDegug){

    window.utils = utils;

    window.config = config;
    window.fetchData = fetchData;
    window.moment =moment;
    window.validator = validator;


};





//此组件只用做调试
export const Test = connect(function (state) {
    window.space_location_add =  state.space_location_add;
    window.space_location_detail =  state.space_location_detail;
    window.space_location_list =  state.space_location_list;
    window.space_build_add =  state.space_build_add;
    window.space_station_list =  state.space_station_list;
    window.space_station_add =  state.space_station_add;


    return {};
})(class extends Component{
    constructor(){
        super()
    }
    render() {
        return (<React.Fragment></React.Fragment>)
    }
});