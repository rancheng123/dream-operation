//多操作下拉级联
import React, { Component } from 'react';
import {
  Select, Col, Row, Button, Icon
} from 'antd';
import { getAddressInfo } from "@api/main";


import "./index.scss";
const Option = Select.Option;
class MxjOperateSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spaceData : [],
            rows : []
          }
        this.defaultData = [];
        this.checks = [];
    }
    componentDidMount() {
        getAddressInfo().then(res=>{
          const rows = [{cityV : '',cityData : res.data.cities ,spaceV : '',spaceData : []}];
          this.defaultData = {cityData : res.data.cities,spaceData : res.data.locations};
          this.setState({
              rows
          });
        }); 
      }
    handleCityChange = (index,value) => {
        let rows = this.state.rows;
        if( value == -1 ) rows[index].cityV = value,rows[index].spaceData = [],this.all_city = true;
        else{
        this.all_city = false;
        rows[index].cityV = this.defaultData.cityData.filter(r=>r.city_code == value)[0].city_code;
        rows[index].spaceData = this.defaultData.spaceData.filter(l=>l.city_code == rows[index].cityV);
        }
        this.setState({
          rows
        });

      }
    handleSpaceChange = (index,value)=>{
        let rows = this.state.rows;
        rows[index].spaceV = value;
        const isAllSpace = value == -1 ? true : false;
        this.checks[index] = {spaceV : value,option : {cityV : rows[index].cityV,isAllSpace}}; 
        this.setState({
            rows
        });
    }
    addRow = ()=>{
    if(this.all_city) return;
    let rows = this.state.rows;
    rows.push({cityData : this.defaultData.cityData,spaceData : []});
    this.setState({
        rows
    });
    }
    deleteRow = index=>{
    let rows = this.state.rows; 
    if(rows.length == 1) return;
    rows.splice(index,1);
    this.setState({
        rows
    });
    }
    //判断是否禁用
    isDisabled = (v,i,type)=>{
        if( type== 'space' && this.checks.find(c=>c.spaceV == v) ) return true;
        if( type== 'city' && this.checks.find(c=> c.option.isAllSpace && c.option.cityV == v) ) return true;
        return false;
    }
    render() {
        const isEdit = (String(this.props.isEdit) == "undefined") || (String(this.props.isEdit) == "true") ? true : false
        let tableCSS = {
            container : {border : '1px solid #E9E9E9',borderRadius: 4,boxSizing : 'content-box'},
            tableHead : {height : 40,paddingLeft : 32,backgroundColor : 'rgba(114,126,139,0.06)',lineHeight : '40px',borderBottom : "1px solid #E9E9E9"},
            tableRow : {padding : '7px 0',paddingLeft : 32,borderBottom : "1px solid #E9E9E9",display: 'flex',alignItems: 'center',},
            selectW : {width : 160},
            btn : {width : 360,margin : '8px auto',height : 32,border : '1px dashed #E9E9E9',color : '#BFBFBF',display : isEdit ? 'block' : 'none'}
        };
        let titleData = ["城市","场地"];
        tableCSS = this.props.tableCSS ? Object.assign(tableCSS,this.props.tableCSS) : tableCSS;
        titleData = this.props.dataSource.titleData ? this.props.dataSource.titleData : titleData;
        
        return (
            <Col className="mxj_operate_select" style={tableCSS.container}>
                <Row style={tableCSS.tableHead}>
                    {
                        titleData.map((t,i)=>{
                            return <Col span={12} key={i}>
                            <span><em className="space_em">*</em>{t}</span>
                            </Col>
                        })
                    }
                </Row>
                {
                    this.state.rows.map((r,index)=>{
                    return (<Row key={index} style={tableCSS.tableRow}>
                
                    <Col span={12}>
                        {isEdit ? (<Select style={tableCSS.selectW} 
                        value = {r.cityV ? r.cityV : "请选择销售城市"}
                        onChange={this.handleCityChange.bind(this,index)} 
                        placeholder="请选择销售城市">
                        <Option value={-1} key={-1}>全部城市</Option>
                        {
                            r.cityData.map((c,i)=>{
                            return <Option value={c.city_code} disabled={this.isDisabled(c.city_code,index,'city')} key={c.city_code}>{c.city_name}</Option>
                            })
                        }
                        
                        </Select>) : (<span>{r.cityV}</span>)}
                    </Col>
                    <Col span={12}>
                        {isEdit ? (<Select style={tableCSS.selectW}
                        value = {r.spaceV ? r.spaceV : "请选择销售场地"}
                        onChange={this.handleSpaceChange.bind(this,index)}
                        placeholder="请选择销售场地">
                        {r.cityV && r.cityV != -1 ? (<Option value={-1} key={-1}>全部场地</Option>) : ('')}
                        {
                            r.spaceData.map((s,i)=>{
                            return <Option disabled={this.isDisabled(s.location_code,index,'space')} value={s.location_code} key={s.location_code}>{s.location_name}</Option>
                            })
                        } 
                    </Select>) : (<span>{r.spaceV}</span>)}
                    </Col>
                    <Col style={{position : "absolute",right : 16}}>
                        <Icon type="delete" onClick={this.deleteRow.bind(this,index)} style={{color : 'red',display : isEdit ? 'block' : 'none'}} />
                    </Col>
                    </Row>)
                    })
                }
                <Row>
                    <Button style={tableCSS.btn} onClick={this.addRow} icon="plus">新增</Button> 
                </Row>
                {this.props.children}
            </Col>
        );
    }
}

export default MxjOperateSelect;

