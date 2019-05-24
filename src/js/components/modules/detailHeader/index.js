import {Component} from "react";
import React from "react";
import {Col, Divider, Row, Form} from 'antd';

/**
 * 标签处理
 */
class DetailHeader extends Component{
    constructor(props){
        super(props)
    }
    render() {
        return (
            <React.Fragment>
                <Row gutter={10}>
                    <Col className="gutter-row" span={14}
                         style={{height: 30}}
                    >
                        <Form.Item label={this.props.opts.code.key}>
                            <span style={{color:'#36DCB6',fontSize: 18}}>
                                {this.props.opts.code.value}
                            </span>
                        </Form.Item>
                    </Col>

                    {(()=>{
                        if(this.props.opts.time){
                            return (
                                <Col className="gutter-row" span={6}
                                     style={{height: 30}}
                                >
                                    <Form.Item label={'创建时间'}>
                                        <span style={{color:'#BFBFBF',fontSize: 14}}>
                                            {this.props.opts.time.value}
                                        </span>
                                    </Form.Item>
                                </Col>
                            )
                        }
                    })()}
                    {(()=>{
                        if(this.props.opts.person){
                            return (
                                <Col className="gutter-row"
                                     span={4}
                                     style={{height: 30}}
                                >
                                    <Form.Item
                                        label={'创建人'}
                                    >
                                        <span style={{color:'#BFBFBF',fontSize: 14}}>
                                            {this.props.opts.person.value}
                                        </span>
                                    </Form.Item>
                                </Col>
                            )
                        }
                    })()}




                </Row>

                <Divider style={{marginBottom: 20}}/>
            </React.Fragment>

        )
    }
}
export default DetailHeader