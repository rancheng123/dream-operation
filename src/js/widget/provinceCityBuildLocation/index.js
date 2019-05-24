import React, { Component, PropTypes } from 'react';
import {Input, Row, Select} from 'antd';
import utils from "../../asset";

const Option = Select.Option;

import {
    getAddressInfo
} from '@api/main/index'

import './index.scss'
import fetchData from "../../api/fetchData";
import config from "../../config";


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                province: [],
                buildings: [],
                cities: [],
                locations: [],
            },

            //筛选后的结果
            province: [],
            cities: [],
            buildings: [],
            locations: [],

            province_code: '',
            city_code: '',
            building_code: '',
            location_code: '',

            itemWidth:''
        }
    }
    componentDidMount() {


        /*if(!utils.Storage.get('aaaaa')){

            getAddressInfo({}).then((res) => {
                utils.Storage.set('aaaaa',res.data);
                this.setState({
                    data: res.data,
                })
            })

        }else{
            this.setState({
                data: utils.Storage.get('aaaaa')
            })
        }*/


        if(!this.props.selectType.includes('locations')){
            var url= config.api + '/location/available-provinces-cities-buildings'
        }else{
            var url= config.api + '/location/available-provinces-cities-buildings-locations'
        }

        fetchData({
            method: 'get',
            url: url,
            data: {
                disabled: this.props.filterDisabledLocation ? '0' : ''
            }
        }).then((res) => {

            if(res.code == 10000 && res.data){
                this.setState({
                    data: res.data,
                },()=>{


                    if(this.props.selectType.includes('provinces') ){
                        this.setState({
                            province: this.state.data.province
                        })
                    }else{
                        if(this.props.selectType.includes('cities') ){
                            this.setState({
                                cities: this.state.data.cities
                            })
                        }
                    }
                })
            }


        })





    }


    componentWillReceiveProps(nextProps, nextContext) {

        if(nextProps.value && nextProps.value.province_code){
            this.setState({
                cities : this.getChildsByCode(nextProps.value.province_code,'province_code', this.state.data.cities),
                buildings: [],
                locations : [],

            })
        };

        if(nextProps.value && nextProps.value.city_code){
            this.setState({
                buildings : this.getChildsByCode(nextProps.value.city_code,'city_code', this.state.data.buildings),
                locations : [],
            })
        };


        if(nextProps.value && nextProps.value.building_code){

            if(this.state.data.locations && this.state.data.locations.length){
                var locations = this.getChildsByCode(nextProps.value.building_code,'building_code', this.state.data.locations);
            }else{
                var locations = []
            }

            this.setState({
                locations : locations,
            })
        };




        if(this.props.selectType.includes('provinces')){
            //倒推逻辑  start
            //只有location_code
            if(
                nextProps.value &&
                nextProps.value.location_code &&
                this.state.data.locations &&
                this.state.data.locations.length
            ){


                if(
                    !(nextProps.value.province_code &&
                        nextProps.value.city_code &&
                        nextProps.value.building_code)
                ){
                    var filteredLocation = this.state.data.locations.filter((item) => {
                        return item.location_code === nextProps.value.location_code;
                    })[0];


                    this.props.onChange({
                        province_code: filteredLocation.province_code,
                        city_code: filteredLocation.city_code,
                        building_code: filteredLocation.building_code,
                        location_code: filteredLocation.location_code,
                    })
                }
            }else{

                //倒推逻辑  start
                //只有 building_code
                if(
                    nextProps.value &&
                    nextProps.value.building_code &&
                    this.state.data.buildings &&
                    this.state.data.buildings.length
                ){

                    if(
                        !(nextProps.value.province_code &&
                            nextProps.value.city_code)
                    ){
                        var filteredBuilding = this.state.data.buildings.filter((item) => {
                            return item.building_code === nextProps.value.building_code;
                        })[0];


                        if(filteredBuilding){
                            this.props.onChange({
                                province_code: filteredBuilding.province_code,
                                city_code: filteredBuilding.city_code,
                                building_code: filteredBuilding.building_code,
                                location_code: '',
                            })
                        }else{
                            console.error('没有找到对应的楼盘')
                        }
                    }
                }

            }
        }








        //倒推逻辑  start
        //只有location_code
        /*if(
            nextProps.value &&
            !nextProps.value.province_code &&
            !nextProps.value.city_code &&
            !nextProps.value.building_code &&


            nextProps.value.location_code &&

            this.state.data.locations && this.state.data.locations.length
        ){

            var filteredLocation = this.state.data.locations.filter((item) => {
                return item.location_code === nextProps.value.location_code;
            })[0];


            this.props.onChange({
                province_code: filteredLocation.province_code,
                city_code: filteredLocation.city_code,
                building_code: filteredLocation.building_code,
                location_code: filteredLocation.location_code,
            })
        };*/

        //只有 building_code
        /*if(nextProps.value &&
            !nextProps.value.province_code &&
            !nextProps.value.city_code &&
            nextProps.value.building_code &&
            !nextProps.value.location_code &&

            this.state.data.buildings && this.state.data.buildings.length
        )
        {


            var filteredBuilding = this.state.data.buildings.filter((item) => {
                return item.building_code === nextProps.value.building_code;
            })[0];


            if(filteredBuilding){
                this.props.onChange({
                    province_code: filteredBuilding.province_code,
                    city_code: filteredBuilding.city_code,
                    building_code: filteredBuilding.building_code,
                    location_code: '',
                })
            }else{
                console.error('没有找到对应的楼盘')
            }



        }*/

        //倒推逻辑  end
    }


    // 根据父级code获取对应节点
     getChildsByCode( number , key, array) {
        const re = array.filter((item) => {
            return item[key] === number;
        });
        return re;
    }

    renderProvince(){
        return (
            <Select
                allowClear
                disabled={this.props.disabled}
                value={this.props.value.province_code || '请选择省份'}
                style={{
                    //width: this.state.itemWidth,
                    height: 32 ,
                    marginRight:8
                }}
                onChange={(province_code) => {
                    this.setState({
                        province_code: province_code,
                        city_code: '',
                        building_code: '',
                        location_code: '',
                    },()=>{
                        this.props.onChange({
                            province_code: this.state.province_code,
                            city_code: this.state.city_code,
                            building_code: this.state.building_code,
                            location_code: this.state.location_code,
                        })
                    })
                }}
            >

                {this.state.province.map((province)=>{
                    return (
                        <Option
                            key={province.province_code}
                            value={province.province_code}
                        >
                            {province.province_name}
                        </Option>
                    )
                })}
            </Select>
        )
    }

    renderBuilding() {
        return (
            <Select
                allowClear
                disabled={this.props.disabled}
                style={{
                    //width: this.state.itemWidth,
                    height: 32 ,
                    marginRight:8
                }}
                value={this.props.value.building_code || '请选择楼盘'}
                onChange={(building_code)=>{

                    this.setState({
                        building_code: building_code,
                        location_code: '',
                    },()=>{
                        this.props.onChange({
                            province_code: this.state.province_code,
                            city_code: this.state.city_code,
                            building_code: this.state.building_code,
                            location_code: this.state.location_code,
                        })
                    })
                }}
            >


                {this.state.buildings.map((building)=>{
                    return (
                        <Option
                            key={building.building_code}
                            value={building.building_code}
                        >
                            {building.building_name}
                        </Option>
                    )
                })}
            </Select>
        )

    }
    renderLocation(){
        return (
            <Select
                allowClear
                disabled={this.props.disabled}
                style={{
                    //width: this.state.itemWidth,
                    height: 32 ,
                    marginRight:8
                }}
                value={this.props.value.location_code || '请选择场地'}
                onChange={(location_code)=>{

                    this.setState({
                        location_code: location_code,
                    },()=>{

                        //测试 start
                        //this.state.location_code = 'CNHBBD0080014'
                        //测试 end


                        this.props.onChange({
                            province_code: this.state.province_code,
                            city_code: this.state.city_code,
                            building_code: this.state.building_code,
                            location_code: this.state.location_code,
                        })
                    })
                }}
            >


                {this.state.locations.map((location)=>{
                    return (
                        <Option
                            key={location.location_code}
                            value={location.location_code}
                        >
                            {location.location_name}
                        </Option>
                    )
                })}
            </Select>
        )
    }

    render() {

        return (
            <span className={'provinceCityBuildLocationWrap'}>
                {this.props.selectType.includes('provinces') && this.renderProvince()}

                <Select
                    allowClear
                    disabled={this.props.disabled}
                    style={{
                        //width: this.state.itemWidth,
                        height: 32,
                        marginRight:8
                    }}
                    value={this.props.value.city_code || '请选择城市'}
                    onChange={(city_code)=>{
                        this.setState({
                            city_code: city_code,
                            building_code: '',
                            location_code: '',
                        },()=>{
                            this.props.onChange({
                                province_code: this.state.province_code,
                                city_code: this.state.city_code,
                                building_code: this.state.building_code,
                                location_code: this.state.location_code,
                            })
                        })
                    }}
                >


                    {this.state.cities.map((city)=>{
                        return (
                            <Option
                                key={city.city_code}
                                value={city.city_code}
                            >
                                {city.city_name}
                            </Option>
                        )
                    })}
                </Select>




                {this.props.selectType.includes('buildings') && this.renderBuilding()}





                {this.props.selectType.includes('locations') && this.renderLocation()}

            </span>
        );
    }
}
export default Index;