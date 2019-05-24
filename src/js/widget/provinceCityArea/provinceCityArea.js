import React, { Component, PropTypes } from 'react';
import {Input, Select} from 'antd';
import utils from "../../asset";

const Option = Select.Option;




class ProvinceCityArea extends Component {
    constructor(props) {
        super(props);


        this.state = {
            provinceData: utils.Storage.get('provinceData') || [],
            citys: [],
            districts: []
        }
    }
    componentDidMount() {


        /*if(!(this.state.provinceData && this.state.provinceData.length)){
            fetchData({
                method: 'get',
                url: config.api + '/location/available-provinces-cities-districts',
                data: {}
            }).then((res) => {

                utils.Storage.set('provinceData',res.data);

                this.setState({
                    provinceData: utils.Storage.get('provinceData')
                })
            })
        }
*/

        fetchData({
            method: 'get',
            url: config.api + '/location/available-provinces-cities-districts',
            data: {}
        }).then((res) => {

            utils.Storage.set('provinceData',res.data);

            this.setState({
                provinceData: utils.Storage.get('provinceData')
            })
        })


    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.value && nextProps.value.province_code){
            this.setState({
                citys : this.getChildsByCode(nextProps.value.province_code, this.state.provinceData),
                districts : []
            },()=>{

                if(nextProps.value && nextProps.value.city_code){
                    this.setState({
                        districts : this.getChildsByCode(nextProps.value.city_code, this.state.citys)
                    })
                };

            })
        };


    }

    getChildsByCode(code, array) {
        const re = array.find((item) => {
            return item.district_code == code;
        });
        return re && Object.freeze(re.cities || re.districts) || [];
    }

    render() {
        var that = this;

        return (
            <div style={{minWidth: 800}}>
                <Select
                    disabled={this.props.disabled}
                    value={this.props.value.province_code || '请选择省份'}
                    style={{ width: '20%',height: 32 ,marginRight:8}}
                    onChange={(province_code) => {
                        this.props.onChange({
                            province_code: province_code,
                            city_code: '',
                            district_code: '',
                            address: '',
                        })
                    }}
                >
                    {(()=>{
                        console.log(this.state.provinceData.length)
                    })()}
                    {this.state.provinceData.map((province)=>{
                        return (
                            <Option
                                key={province.district_code}
                                value={province.district_code}
                            >
                                {province.district_name}
                            </Option>
                        )
                    })}
                </Select>



                <Select
                    disabled={this.props.disabled}
                    style={{ width: '20%',height: 32,marginRight:8}}
                    value={this.props.value.city_code || '请选择城市'}
                    onChange={(city_code)=>{
                        this.props.onChange({
                            province_code: this.props.value.province_code,
                            city_code: city_code,
                            district_code: '',
                            address: '',
                        })
                    }}
                >
                    {this.state.citys.map((city)=>{
                        return (
                            <Option
                                key={city.district_code}
                                value={city.district_code}
                            >
                                {city.district_name}
                            </Option>
                        )
                    })}
                </Select>



                <Select
                    disabled={this.props.disabled}
                    style={{ width: '20%',height: 32 ,marginRight:8}}
                    value={this.props.value.district_code || '请选择区县'}
                    onChange={(district_code)=>{
                        this.props.onChange({
                            province_code: this.props.value.province_code,
                            city_code: this.props.value.city_code,
                            district_code: district_code,
                            address: '',
                        })
                    }}
                >
                    {this.state.districts.map((area)=>{
                        return (
                            <Option
                                key={area.district_code}
                                value={area.district_code}
                            >
                                {area.district_name}
                            </Option>
                        )
                    })}
                </Select>


                <Input
                    disabled={this.props.disabled}
                    style={{ width: '33%',height: 32 ,marginRight:8}}
                    value={this.props.value.address}
                    placeholder="请填写详细地址"
                    onChange={(e)=>{
                        this.props.onChange({
                            province_code: this.props.value.province_code,
                            city_code: this.props.value.city_code,
                            district_code: this.props.value.district_code,
                            address: e.target.value,
                        })
                    }}
                />


            </div>
        );
    }
}
export default ProvinceCityArea;