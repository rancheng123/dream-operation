import React, { Component, Fragment } from 'react';

import { Select} from 'antd';
const Option = Select.Option;
class MxjLocationCascader extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            oldData : {},
            selectProps : [],
            locationData : {},
            index : 0,
        };
    }
    componentWillReceiveProps = (nextProps) => {
        let sd = [];
        nextProps.locationData.selectProps.map((s,i)=>{
            sd[i] = s.placeholder;
        }); 
        this.setState({
            oldData : nextProps.locationData.data, 
            selectProps : nextProps.locationData.selectProps, 
            locationData : nextProps.locationData.data,
            oldSd : sd,
            sd
        });
    }
    onChangeLocation = locationCode => {
        let {oldData,selectProps} = this.state;
        if(String(locationCode).indexOf('@') == -1){
            this.setState({
             index : 0,
             locationData : oldData,
             sd : this.state.oldSd
            }); 
            this.props.onChangeLocation("");
            return ;
        }
        let [id,cityCode] = locationCode.split("@");
        
        let newData = this.getLocationByCityCode(selectProps,oldData,cityCode);
        this.getLocationCode(selectProps,newData,locationCode);  
    }
    //通过城市code 获取到该城市下的数据
    getLocationByCityCode(selectProps,oldData,cityCode){
        let newData = {};
        for(var i = 0;i<selectProps.length;i++){
            for(var j = 0;j<oldData[selectProps[i].labelName].length;j++){
                if(oldData[selectProps[i].labelName][j].city_code == cityCode){
                    if(newData[selectProps[i].labelName] instanceof Array )
                    newData[selectProps[i].labelName].push(oldData[selectProps[i].labelName][j]);
                    else{
                        newData[selectProps[i].labelName] = new Array(oldData[selectProps[i].labelName][j])
                    } 
                }
            }
        }
        console.log(newData);

        this.setState({
             locationData : newData
        }); 
        return newData; 
    }
    //获取当前选中的城市、楼盘、场地
    getLocationCode(selectProps,newData,locationCode){
        //获取到当前选中的项
        let [id,cityCode] = locationCode.split("@");
        let sd = [];
        for(var i = selectProps.length-1;i>=1;i--){
            let isSearch = false,selectLabel = "";
            for(var j = 0;j<newData[selectProps[i].labelName].length;j++){

                if(newData[selectProps[i].labelName][j][selectProps[i].codeName] == id){
                    isSearch = true;
                    break;
                }
            }
            if(isSearch) sd[i] = locationCode;
            else sd[i] = newData[selectProps[i].labelName][0][selectProps[i].codeName]+"@"+cityCode;
        } 
        sd[i] = cityCode+"@"+cityCode; 
        this.setState({
            sd
       });
       let codes = [];
       sd.map(v=>{
            var code = v.split("@")[0];
            codes.push(code);
        });
      console.log(codes);
       this.props.onChangeLocation(codes);
    }
    render() {
        if(!this.state.locationData) return null;
        return (
            <Fragment>
                {
                    
                    this.state.selectProps.map((s,i)=>{
                        return (<Select 
                            key = {i}
                        onChange={this.onChangeLocation.bind(this)}
                        style={{width : 113,marginLeft : '16px'}}
                        placeholder={s.placeholder}
                        value={this.state.sd[i]}
                        >
                        <Option key={i} value={i}>{s.placeholder}</Option>
                        {
                            this.state.locationData[s.labelName].map((d,i)=>{
                                let v = d[s.codeName]+"@"+d['city_code'];
                                return (<Option value={v} key={i}>{d[s.locationName]}</Option>)
                            })
                        }
                        </Select>)
                    
                    })
                }
            </Fragment>
        );
    }
}

export default MxjLocationCascader;