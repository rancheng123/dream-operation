import React, { Component, Fragment } from 'react';
import Bind from 'lodash-decorators/bind';
import { Select, Row, Col} from 'antd';
const Option = Select.Option;
import {cityBuildingLocationInit} from '../../../asset/common'
import './formCascader.scss'
const type_length = {
    'city': 1,
    'building': 2,
    'location': 3
}

// 引入获取城市、楼盘、场地的接口
import {
    getAddressInfo
} from '../../../api/main/index'

export default class MxjLocationCascaderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loacationData: {},
            provinceData: null,
            cityPropertySiteData: null,
            buildingData: null,
            locationData: null
        };
    }
    componentWillMount() {
        let data = {}
        const that = this
        getAddressInfo(data).then((res) => {
            console.log(res)
            if (res.code == 10000) {
                // 更新locationData数据
                that.updateLocationData(res.data)

                that.setMainData()
            }


        })
    }

    updateLocationData = (loacationData) => {
        this.setState({
            loacationData: loacationData
        })
    }

    setMainData() {
        const {selectType} = this.props
        const {loacationData} = this.state
        const province = selectType.includes('province')
        const cities = selectType.includes('cities')
        const buildings = selectType.includes('buildings')
        const locations = selectType.includes('locations')
        // 初始化省份 provinceData
        if (province) {
            this.setState({
                provinceData: loacationData.province
            })
            return
        }
        if (cities) {
            this.setState({
                cityPropertySiteData: loacationData.cities
            })
            return
        }
        if (buildings) {
            this.setState({
                buildingData: loacationData.buildings
            })
            return
        }
        if (locations) {
            this.setState({
                locationData: loacationData.locations
            })
            return
        }
    }
    // 设置联动菜单子菜单
    setOtherValue(type, value, obj) {
        let { selectType,  onChange} = this.props
        obj[type] = value
        const {loacationData, buildingData, locationData} = this.state
        const province = selectType.includes('province')
        const cities = selectType.includes('cities')
        const buildings = selectType.includes('buildings')
        const locations = selectType.includes('locations')
        if (type === 'province') {
           if (cities) {
               delete obj['c']
               if (buildings) {
                   this.setState({
                       buildingData: []
                   })
                   delete obj['buildings']
               }
               if (locations) {
                   this.setState({
                       locationData: []
                   })
                   delete obj['locations']
               }
               if (value === '') {
                   this.setState({
                       cityPropertySiteData: []
                   })
               } else {
                   let city_data = []
                   loacationData.cities.forEach(value1 => {
                       if (value1.province_code === value) {
                           city_data.push(value1)
                       }
                   })
                   this.setState({
                       cityPropertySiteData: city_data
                   })
               }
           } else{
               if (buildings) {
                   delete obj['buildings']
                   if (locations) {
                       this.setState({
                           locationData: []
                       })
                       delete obj['locations']
                   }
                   if (value === '') {
                       this.setState({
                           buildingData: []
                       })
                   } else {
                       let buildings_data = []
                       loacationData.buildings.forEach(value1 => {
                           if (value1.province_code === value) {
                               buildings_data.push(value1)
                           }
                       })
                       this.setState({
                           buildingData: buildings_data
                       })
                   }
               } else {
                   if (locations) {
                       delete obj['locations']
                       if (value === '') {
                           this.setState({
                               locationData: []
                           })
                       } else {
                           let locationData_data = []
                           loacationData.locations.forEach(value1 => {
                               if (value1.province_code === value) {
                                   locationData_data.push(value1)
                               }
                           })
                           this.setState({
                               locationData: locationData_data
                           })
                       }
                   }
               }
           }
        } else if (type === 'cities') {
            if (buildings) {
                delete obj['buildings']
                if (locations) {
                    this.setState({
                        locationData: []
                    })
                    delete obj['locations']
                }
                if (value === '') {
                    this.setState({
                        buildingData: []
                    })
                } else {
                    let building_data = []
                    loacationData.buildings.forEach(value1 => {
                        if (value1.city_code === value) {
                            building_data.push(value1)
                        }
                    })
                    this.setState({
                        buildingData: building_data
                    })
                }
            } else {
                if (locations) {
                    delete obj['locations']
                    if (value === '') {
                        this.setState({
                            locationData: []
                        })
                    } else {
                        let locationData_data = []
                        loacationData.locations.forEach(value1 => {
                            if (value1.city_code === value) {
                                locationData_data.push(value1)
                            }
                        })
                        this.setState({
                            locationData: locationData_data
                        })
                    }
                }
            }
        } else if (type === 'buildings') {
            if (locations) {
                delete obj['locations']
                if (value === '') {
                    this.setState({
                        locationData: []
                    })
                } else {
                    let locationData_data = []
                    loacationData.locations.forEach(value1 => {
                        if (value1.building_code === value) {
                            locationData_data.push(value1)
                        }
                    })
                    this.setState({
                        locationData: locationData_data
                    })
                }
            }
        }
        onChange(obj)
    }
    @Bind()
    handleChange(val, type) {
        let { value} = this.props
        this.setOtherValue(type, val, value)
    }
    renderProvince() {
        const length = 24 / this.props.selectType.length
        return (
            <Col lg={length} sm={length} xs={length} className='mxj-height-43'>
                <Select allowClear value={this.props.value['province']} placeholder="请选择" style={{ width: '100%' }} onChange={e => {
                    this.handleChange(e, 'province')
                }} className='mxj-margin-bottom-24'>
                    <Option value=''>全部省份</Option>
                    { this.state.provinceData && this.state.provinceData.map((value,index) => <Option value={value.province_code} key={value.province_code}>{value.province_name}</Option> )}
                </Select>
            </Col>
        )
    }
    renderCity() {
        const length = 24 / this.props.selectType.length
        return (
            <Col lg={length} sm={length} xs={length} className='mxj-height-43'>
                <Select allowClear value={this.props.value['cities']} placeholder="全部城市" style={{ width: '100%' }} onChange={e => {
                    this.handleChange(e, 'cities')
                }} className='mxj-margin-bottom-24'>
                    <Option value=''>全部城市</Option>
                    { this.state.cityPropertySiteData && this.state.cityPropertySiteData.map((value,index) => <Option value={value.city_code} key={value.city_code}>{value.city_name}</Option> )}
                </Select>
            </Col>
        )
    }
    renderBuilding() {
        const length = 24 / this.props.selectType.length
        return (
            <Col lg={length} sm={length} xs={length} className='mxj-height-43'>
                <Select allowClear value={this.props.value['buildings']} placeholder="全部楼盘" style={{ width: '100%' }} className='mxj-margin-bottom-24' onChange={e => this.handleChange(e, 'buildings')}>
                    <Option value=''>全部楼盘</Option>
                    { this.state.buildingData && this.state.buildingData.map((value,index) => <Option value={value.building_code} key={value.building_code}>{value.building_name}</Option> )}
                </Select>
            </Col>
        )
    }
    renderLocation() {
        const length = 24 / this.props.selectType.length
        return(
            <Col lg={length} sm={length} xs={length} className='mxj-height-43'>
                <Select allowClear value={this.props.value['locations']} placeholder="全部场地" style={{ width: '100%' }} onChange={e => this.handleChange(e, 'locations')}>
                    <Option value=''>全部场地</Option>
                    { this.state.locationData && this.state.locationData.map((value,index) => <Option value={value.location_code} key={value.location_code}>{value.location_name}</Option> )}
                </Select>
            </Col>
        )
    }
    render() {
        return (
            <div className='mxj-location-cascader-form' style={this.props.style}>
                <Row gutter={16}>
                    {this.props.selectType.includes('province') && this.renderProvince()}
                    {this.props.selectType.includes('cities') && this.renderCity()}
                    {this.props.selectType.includes('buildings') && this.renderBuilding()}
                    {this.props.selectType.includes('locations') && this.renderLocation()}
                    {/*{this.renderCity()}*/}
                    {/*{this.renderBuilding()}*/}
                    {/*{this.renderLocation()}*/}
                </Row>
            </div>
        );
    }
}