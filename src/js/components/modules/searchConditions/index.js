import { Row, Col, Button, Form} from 'antd';
import React,{Component} from "react";
import './index.scss'


class SearchConditions extends Component{
    constructor(){
        super();
    }

    render(){
        const gutter = this.props.gutter ? gutter : 16;
        return (
            <Row
                gutter={gutter}
            >
                {(()=>{
                    return this.props.data.map((item,i)=>{
                        return (
                            <Col key={i} lg={item.lg} sm={item.sm} xs={24}>
                                <div style={{height: typeof this.props.height != 'undefined'? this.props.height : 50}}>

                                    {item.component}

                                </div>

                            </Col>
                        )
                    })
                })()}


            </Row>

        )
    }
}
export default SearchConditions;





/*

使用Dome
   注意事项： 每个component 组件 都要有  style={{width: '100%'}}  保证自适应


 <SearchConditons
    data={[

        {
            lg: 4,
            sm: 8,
            component: (
                <Select
                    style={{width: '100%'}}
                    defaultValue="全部运营状态"
                    onChange={(value)=>{
                        dispatch({
                            type: 'space_location_list',
                            data: {
                                operation_status: value
                            }
                        })
                    }}
                >
                    <Select.Option
                        key={1}
                        value={1}
                    >
                        {1}
                    </Select.Option>
                    <Select.Option
                        key={2}
                        value={2}
                    >
                        {2}
                    </Select.Option>
                </Select>
            )

        },
        {
            lg: 4,
            sm: 8,
            component: (
                <div  style={{width: '100%',textAlign: 'right'}}>
                    <Button
                        style={{width:90}}
                        type="primary"
                        onChange={(value)=>{}}
                        onClick={()=>{

                            //查询楼盘列表
                            this.searchBuildList()

                        }}
                    >
                        查询
                    </Button>
                </div>

            )

        }

    ]}
>

</SearchConditons>


*/

