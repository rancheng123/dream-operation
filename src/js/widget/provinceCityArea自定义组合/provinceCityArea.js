import React, { Component, PropTypes } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

import provinceData from './data';
// test  start
window.provinceData =provinceData;
// test  end


class ProvinceCityArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            citys: [],
            areas: []
        }
    }
    componentDidMount() {
        window.aa = this;
    }

    componentWillReceiveProps(nextProps, nextContext) {

        if(nextProps.data.currentProvince && nextProps.data.currentProvince.area_code){
            this.state.citys = this.getChildsByCode(nextProps.data.currentProvince.area_code, provinceData)
        };

        if(nextProps.data.currentCity && nextProps.data.currentCity.area_code){
            this.state.areas = this.getChildsByCode(nextProps.data.currentCity.area_code, this.state.citys)
        };


        this.setState(this.state)
    }


    getChildsByCode(code, array) {
        const re = array.find((item) => {
            return item.area_code == code;
        });
        return re && Object.freeze(re.cell) || [];
    }

    renderProvince(){
        var that = this;
        return (
            <Select
                // defaultValue={provinceData[0].area_name}
                value={this.props.data.currentProvince.area_name || '请选择省份'}
                style={{ width: 182,height: 32 ,marginRight:8}}
                onChange={function(provinceCode,selectedItem){

                    var province = provinceData.filter((province,i)=>{
                        return province.area_code == provinceCode
                    })[0]


                    that.props.onChange({
                        currentProvince: {
                            area_code: province.area_code,
                            area_name: province.area_name
                        },
                        currentCity : {},
                        currentArea: {},
                    })


                }}
            >
                {provinceData.map((province)=>{
                    return (
                        <Option key={province.area_code}>
                            {province.area_name}
                        </Option>
                    )
                })}
            </Select>
        )
    }

    renderCity(){
        var that = this;
        return (
            <Select
                style={{ width: 182,height: 32,marginRight:8}}
                value={this.props.data.currentCity.area_name || '请选择城市'}
                onChange={(cityCode,selectedItem)=>{


                    var city = this.state.citys.filter((city,i)=>{
                        return city.area_code == cityCode
                    })[0]


                    that.props.onChange({
                        currentProvince: that.props.data.currentProvince,
                        currentCity : {
                            area_code: city.area_code,
                            area_name: city.area_name
                        },
                        currentArea: {},
                    })


                }}
            >
                {this.state.citys.map((city)=>{
                    return (
                        <Option key={city.area_code}>
                            {city.area_name}
                        </Option>
                    )
                })}
            </Select>
        )
    }

    renderArea(){
        var that = this;
        return (
            <Select
                style={{ width: 182,height: 32 ,marginRight:8}}
                value={this.props.data.currentArea.area_name || '请选择区县'}
                onChange={(areaCode,selectedItem)=>{


                    var area = this.state.areas.filter((area,i)=>{
                        return area.area_code == areaCode
                    })[0]


                    that.props.onChange({
                        currentProvince: that.props.data.currentProvince,
                        currentCity : that.props.data.currentCity,
                        currentArea: {
                            area_code: area.area_code,
                            area_name: area.area_name
                        },
                    })


                }}
            >
                {this.state.areas.map((area)=>{
                    return (
                        <Option key={area.area_code}>
                            {area.area_name}
                        </Option>
                    )
                })}
            </Select>
        )
    }



    render() {
        var that = this;
        return (
            <div>
                {this.props.wrapProvince(this)}
            </div>
        );
    }
}
export default ProvinceCityArea;


//使用

/*


<Row
                                    //栅格间隔
                                    gutter={16}>


                                    <ProvinceCityArea
                                        data={this.props.space_build_add.provinceCityArea}
                                        onChange={(data)=>{
                                            componentStore.getById('/space/build/add').props.dispatch({
                                                type: 'modify_space_build_add',
                                                data: {
                                                    provinceCityArea: data
                                                }
                                            })
                                        }}
                                        wrapProvince={(context)=>{
                                            return (
                                                <span>
                                                        <Col className="gutter-row" span={6}>
                                                            <Form.Item
                                                                label={'楼盘地址'}
                                                                labelCol= {{span: 7}}
                                                            >
                                                                {getFieldDecorator('province',{
                                                                    valuePropName: 'selected',

                                                                    //校验规则
                                                                    rules: [
                                                                        { required: true, message: '请选择楼盘' }
                                                                    ],
                                                                })(
                                                                    context.renderProvince()
                                                                )}
                                                            </Form.Item>

                                                        </Col>

                                                        <Col className="gutter-row" span={4}>
                                                            <Form.Item
                                                                label={''}
                                                                labelCol= {{span: 1}}
                                                            >
                                                                {getFieldDecorator('city',{
                                                                    valuePropName: 'selected',

                                                                    //校验规则
                                                                    rules: [
                                                                        { required: true, message: '请选择楼盘' }
                                                                    ],
                                                                })(
                                                                    context.renderCity()
                                                                )}
                                                            </Form.Item>

                                                        </Col>

                                                        <Col className="gutter-row" span={4}>
                                                            <Form.Item
                                                                label={''}
                                                                labelCol= {{span: 9}}
                                                            >
                                                                {getFieldDecorator('area',{
                                                                    valuePropName: 'selected',

                                                                    //校验规则
                                                                    rules: [
                                                                        { required: true, message: '请选择楼盘' }
                                                                    ],
                                                                })(
                                                                    context.renderArea()
                                                                )}
                                                            </Form.Item>

                                                        </Col>

                                                        <Col className="gutter-row" span={6}>

                                                            <Form.Item label={''}>
                                                                {getFieldDecorator('field-2', {
                                                                    rules: [{
                                                                        required: true,
                                                                        message: 'Input something!',
                                                                    }],
                                                                })(
                                                                    <Input
                                                                        placeholder="请填写详细地址"
                                                                    />
                                                                )}
                                                            </Form.Item>

                                                        </Col>

                                                    </span>


                                            )

                                        }}


                                    >
                                    </ProvinceCityArea>


                                </Row>
*/