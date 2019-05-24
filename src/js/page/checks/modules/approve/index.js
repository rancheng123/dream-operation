
import React, { Component } from 'react';

import ShadowBox from '@modules/shadowBox/shadowBox';
import { shadowBoxCSS } from '../../common/style';

import {
    Divider, Modal
  } from 'antd';

import joint from 'jointjs';


class ApproveModel extends Component {
    constructor(props) {
        super(props);
        this.jsPlumbInstance = null;
        this.state = {  };
    }
    componentDidUpdate() {

        const graph = new joint.dia.Graph;

        const paper = new joint.dia.Paper({
            el: document.getElementById('myholder'),
            model: graph,
            width: 1200,
            height: 600,
            interactive : false
        });
        const state1 = this.stateShape(0,300,"rect","", "1");
        const state2 = this.stateShape(200,300,"rect","", "2");
        const state3 = this.stateShape(400,200,"rect","#f7a07b", "3");
        const state4 = this.stateShape(400,400,"rect","", "4");
        const state5 = this.stateShape(600,300,"rect","", "5");
        
        //创建连线
        const link1 = this.linkShape(state1, state2, "",{way : true});
        const link2 = this.linkShape(state2, state3, "大于10000",{way : true});
        const link3 = this.linkShape(state2, state4, "小于10000",{way : false});
        const link4 = this.linkShape(state3, state5, "",{way : false});
        const link5 = this.linkShape(state4, state5, "",{way : false});

        graph.addCell(state1);
        graph.addCell(state2);
        graph.addCell(state3);
        graph.addCell(state4);
        graph.addCell(state5);

        graph.addCell(link1);
        graph.addCell(link2);
        graph.addCell(link3);
        graph.addCell(link4);
        graph.addCell(link5);
        //link1.addTo(graph);

    }

    //定义审批流形状
    stateShape(x, y, shape, background, text){
        var cell;
        if(shape==="rect"){
            cell = new joint.shapes.basic.Rect({
                position: { x,y},//坐标
                size: { width: 80, height: 20 },//宽高
                attrs: { 
                    rect: {
                        fill: {
                            type: 'linearGradient',
                            stops: [
                                // { offset: '0%', color: background },//渐变开始
                                // { offset: '100%', color: '#fe8550' }//渐变结束
                                {color : background ? background : '#fff'}
                            ],
                            //attrs: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' }
                        },
                        stroke: background ? background : '#000',//边框颜色
                        'stroke-width': 1//边框大小
                    },
                    text: { text: text } //显示文字
                }
            });
        } 
        return cell;
    }

    //连线
    linkShape(source, target, label,option){
        var link = new joint.shapes.standard.Link({ 
            source: { id: source.id },
            target: { id: target.id },
            labels: option.way ? [{ position: .7, attrs: { text: { text: label || '', 'font-weight': 'bold' } } }] : [],
            router: { name: 'manhattan' },//设置连线弯曲样式 manhattan直角
            attrs: {
                line: {
                    stroke: option.way ? '#000' : '#31303038'
                },
                
     
            }
            // attrs: {
            //     '.connection': {
            //         stroke: '#333333',//连线颜色
            //         //'stroke-width': 2//连线粗细
            //     },
            //     '.marker-target': {
            //         fill: '#333333',//箭头颜色
            //         d: 'M 10 0 L 0 5 L 10 10 z'//箭头样式
            //     }
            // }
        });
        return link;
    }

    render() {
        return (
            <Modal
                width = {1200}
                className='modal_container'
                closable={false}
                destroyOnClose={true}
                visible={this.props.visible}
            >
            11111
                <div id="myholder" style={{height : 600}}></div>
            </Modal>
        );
    }

}


class Approve extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            approveModelVisible : false
         };
    }
    render() {
        const { sellteDetailData } = this.props;
        return (
            <ShadowBox style={shadowBoxCSS.box}>
                <p style={shadowBoxCSS.head}>
                <span className='icon'></span>申请编号 : <em style={shadowBoxCSS.c1}>{sellteDetailData.issues_code}</em>
                <span style={{marginLeft : 80}}>当前状态 : <em style={shadowBoxCSS.c1}>{sellteDetailData.apply_status_text}</em></span>
                <span style={{marginLeft : 80}} >查看审批流</span>
                </p><Divider style={shadowBoxCSS.divider} />
                {/* <MxjSteps style={{marginTop : 25}} items={items} current={1} labelPlacement={'vertical'} /> */}
                <ApproveModel visible={this.state.approveModelVisible} />
            </ShadowBox>
        );
    }
}

export default Approve;