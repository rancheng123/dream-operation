
import {DatePicker} from 'antd';
import React, {Component} from "react";
import moment from 'moment';


function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}

class MxjDatePicker extends Component{
    constructor(){
        super();
    }

    render(){
        return (
            <DatePicker

                {...this.props}


                value={(()=>{

                    if(this.props.value){
                        if( this.props.value == '0000-00-00 00:00:00'){
                            var value = undefined
                        }else{
                            var value = moment(this.props.value)
                        }
                    }else{
                        var value = undefined
                    }


                    return value
                })()}
                onChange={(value) => {

                    this.props.onChange(value?value.format('YYYY-MM-DD HH:mm:ss'): undefined)

                }}

               disabledDate={(current) => {
                   var currentDate = moment()
                   var newDate = currentDate.subtract(1, 'days'/*格式*/)
                   return current && current < newDate.endOf('day');
                }}


                disabledTime={(selecteDate)=>{


                   var currentDate = moment();

                   if(selecteDate){
                       //选择日期 大于 当前日期， 时分秒 不限制
                       if( selecteDate.date() >  currentDate.date()){
                           var disabledHours = [];
                           var disabledMinutes = [];
                           var disabledSeconds = [];
                       }
                       //选择日期 等于 当前日期， 时分秒 限制
                       else{

                           var disabledHours = range(0, currentDate.hour());

                           //选择小时
                           //选择小时 大于 当前小时， 分秒 不限制
                           if( selecteDate.hour() > currentDate.hour() ){
                               var disabledMinutes = [];
                               var disabledSeconds = [];
                           }
                           //选择小时 等于 当前小时  限制分钟
                           else{

                               var disabledMinutes = range(0, currentDate.minute());


                               //选择分钟 大于 当前分钟， 秒 不限制
                               if( selecteDate.minute() > currentDate.minute() ){
                                   var disabledSeconds = [];
                               }
                               //选择分钟 等于 当前分钟， 秒 限制
                               else{

                                   var disabledSeconds = range(0, currentDate.second());
                               }

                           }
                       }
                   }else{
                       var disabledHours = range(0, currentDate.hour());
                       var disabledMinutes = range(0, currentDate.minute());
                       var disabledSeconds = range(0, currentDate.second());
                   }


                   return {
                       disabledHours: () => disabledHours,
                       disabledMinutes: () => disabledMinutes,
                       disabledSeconds: () => [],
                   };




               }}


            />
        )
    }

}
export default MxjDatePicker;

