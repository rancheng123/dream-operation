import svg from 'svg.js';
import '../../../../../../node_modules/_svg.draggable.js@2.2.2@svg.draggable.js/dist/svg.draggable'
import 'svg.draggy.js'
import 'svg.panzoom.js'
import 'svg.filter.js'
import 'svg.pathmorphing.js'

import 'svg.resize.js'
import 'svg.select.js'


import React,  {Component} from "react";

import Event from './event'


window.SVG = SVG;

class SvgDome extends Component{
    constructor(){
        super();
        this.draw = null;
        this.currentMousePositon = {
            x: 0,
            y: 0
        }
        this.startMousePosition = {
            x: 0,
            y: 0
        }
        this.rect = null;

    }
    componentDidMount() {

        this.draw = new SVG("svg1").size(800, 900);
        var image = this.draw.image(
            this.props.image,
            800
        )


        //测试  start
        //this.drawHouse()
        //测试  end
    }

    drawRect(){



       // Event.start();







    }

    //标记房间
    drawHouse(){


        this.rect = this.draw.rect().attr({
            fill: 'red',

            //透明度
            'fill-opacity': 0.5,
            stroke: 'yellow',
            'stroke-width': 10
        });



        //鼠标移动
        document.getElementById('svg1').addEventListener('mousedown', (e)=>{



            this.startMousePosition = { x: event.clientX -199, y: event.clientY -88 };

            // 坐标
            this.rect.attr(this.startMousePosition)






            //鼠标移动
            document.getElementById('svg1').addEventListener('mousemove', (e)=>{


                this.currentMousePositon = { x: event.clientX, y: event.clientY };



                // 画一个矩形
                this.rect.size(
                    this.currentMousePositon.x - this.startMousePosition.x  -199,
                    this.currentMousePositon.y - this.startMousePosition.y  -88
                );

            }, false);


            //鼠标抬起
            document.getElementById('svg1').addEventListener('mouseup', (e)=>{

            }, false);


        }, false);













        /*var group = this.draw.group();
        this.opt = {
            "color":"#bbb",
            "borderColor":"#333",
            "activeColor":"#73C800",
            "id":null,
            "path":null,
            "name":"room"
        }

        var rect = group.rect();

        window.rect = rect;

        rect.resize({
            constraint: {
                minWidth:20,
                minHeight:20
            }
        })

        rect.draggable({
                minX: 0,
                minY: 0,
                maxX: 1000,
                maxY: 700,
            });


        group.attr('class', `space-graphs-svg space-graphs-svg__abc`);



        rect.on('mouseover', (event: any) => {
           // this.fire('mouseover', this, this.data, this.graph.bbox());
        });

        rect.on('mouseout', () => {
            //this.fire('mouseout');
        });



        rect.on('dragstart', () => {

        });

        rect.on('dragmove', (event: any) => {

        });

        rect.on('dragend', () => {

        });

        rect.on('resizing', () => {

        });

        // 用于被注入数据
        rect.on('dragover', (event: any) => {

        });

        rect.on('drop', (event: any) => {

        });


*/




    }

    spaceStudy(){


        //开始画
        this.group = this.draw.group();
        this.graph = this.group.rect();

        //鼠标抬起
            //取消选中
            handleSwitchDraw



        //选中
        this.graph.selectize({
            points: ['r', 'rb', 'b'],
            pointSize: 4,
            rotationPoint: false,
        });

    }

    render(){
        return (
            <div>
                <div onClick={this.drawHouse.bind(this)}>
                    标记房间
                </div>

                <svg style={{border: ' 1px solid green'}}  id={'svg1'}></svg>
            </div>
        )
    }

}


export default SvgDome;