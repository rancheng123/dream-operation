/*
SVG (矢量图形)

    官网： https://svgjs.com/docs/2.7/plugins/svg-easing-js/

    特点： 可伸缩

    优点： 各种实用插件
          统一的API
          可以绑定事件，包括触摸事件
          支持不透明蒙版
          动态渐变



   未读完的链接  http://www.cnblogs.com/tianma3798/p/6591673.html
*/




import React, { Component, PropTypes } from 'react';
import { Provider , connect } from 'react-redux';


import SVG from 'svg.js'
window.SVG = SVG;

import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';

const { Content } = Layout;

class Order_a extends Component{
    constructor(){
        super();
    }
    componentDidMount() {



        // 浏览器是否支持
        SVG.supported



        // svg 元素

            //创建svg
            var draw = SVG('svg1')
                //设置画布宽高
                .size(800, 500)
                .size('100%', '100%')




            // 生成一个子svg元素
                var nested = draw.nested()
                var group = nested.group();
                var rect = draw.rect(100, 100).fill('#f09');
                group.add(rect);
                var doc = rect.doc().ellipse(50, 100).move(50, 50);
                //element.parent() 获取父节点或筛选父节点



            // 给svg 设置属性（直接给svg 不能设置属性）
            var box =draw.viewbox({
                x: 100,
                y: 100,
                width: 297,
                height: 210,

            })

            box.zoom


        //矩形
                // 画一个矩形
                var rect = draw.rect(100, 100);
                // 坐标
                rect.attr('x', 50).attr('y', 50);

                // 批量设置属性
                rect.attr({
                    fill: 'red',

                    //透明度
                    'fill-opacity': 0.5,
                    stroke: 'yellow',
                    'stroke-width': 10
                });
                //删除属性
                //rect.attr('fill', null);

                rect.fill('bule');


                // //指定填充背景图
                rect.fill(draw.image(
                    'http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg',
                    '100%',
                    '100%'
                ));


                //描边
                rect.stroke({ color: '#f06', opacity: 0.6, width: 20 });


                //重置大小
                rect.width(200);
                rect.height(200);


                // 移动
                rect.x(50).y(50);
                rect.cx(50).cy(50);
                rect.dx(50).dy(50);

                rect.move(100, 100);

                // 设置圆角
                rect.radius(20);


                // 添加class
                rect.addClass('rect');

                //设置ID
                rect.id('rect');









                // 获取真实dom
                var node = rect.native();
                // 获取真实dom 对应的对象
                var rect2 = node.instance;
                console.info(node);







                //获取属性的值
                var x = rect.attr('x');
                console.info(x);
                var attributes = rect.attr();
                console.info(attributes);


                window.rect = rect;



        // 动画
            rect.animate(1000).fill('#f90');


                //动画方式组件
                    import '../../../../../../node_modules/_svg.easing.js@2.0.0@svg.easing.js/dist/svg.easing'

                    rect.animate(500, 'bounce').move(300, 300)

        // 圆形
                var circle = draw.circle(100, 100).fill('#f06');
                circle.attr({ cx: 100, cy: 150 });
                circle.cx(100).cy(100);

                circle.dmove(100, 100); //相对当前位置,目前的位置上再次移动
                circle.move(100, 100);//相对父节点左上角

                //设置半径
                circle.radius(30, 50);


                console.info(circle.x());
                console.info(circle.cx());

                window.circle = circle;


        // 多边形

                //1.折线
                        //使用数组点
                        var polyline = draw.polyline([
                            [0, 0],
                            [100, 50],
                            [50, 100]
                        ]);

                        polyline.fill(null).stroke({
                            width: 2,
                            color: 'red'
                        });



                        //获取节点数组,返回 SVG.PoineArray
                        var array1 = polyline.array();
                        console.info(array1);




                        //修改折线,
                        polyline.plot([
                            [20, 0],
                            [100, 0],
                            [100, 100],
                            [20, 100],
                            [0, 50]
                        ]);


                        //使用动画
                        polyline.animate(1000).plot([
                            [50, 150],
                            [100, 200]
                        ]);




                //2. 多边形



                        var polygin = draw.polygon('80,80 100,50 50,100, 300,300')
                            .fill('none')
                            .stroke({ width: 1 })


                        //获取点数组 SVG.PointArray
                        var array1 = polygin.array();
                        console.info(array1);


                        //修改当前多边形
                        polygin.plot([
                            [0,0], [100,50], [50,100], [150,50], [200,50]
                        ]);

                        //动画修改多边形
                        polygin.animate(1000).plot([
                            [0, 0],
                            [100, 50],
                            [50, 100],
                            [150, 50],
                            [200, 50]
                        ]);





        //图像


            //原尺寸
             draw.image(
                 'http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg'
             )

            //原尺寸等比缩放
            var image = draw.image(
                'http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg',

                //设置image元素宽高
                200,
                300
            )

            // 加载成功时
                .loaded(function (loader) {
                    console.info(loader);
                    draw.animate(300).size(loader.width, loader.height);
                });;

            image.stroke({
                width: 2,
                color: 'blue'
            })
            //重置 image元素宽高
                .size(800, 500);



            //修改图片内容
            image.load('http://img0.imgtn.bdimg.com/it/u=3220681365,3634029949&fm=26&gp=0.jpg');






        // 椭圆
            var ellipse = draw.ellipse(100, 50);
            ellipse.fill('blue');




        // 蒙层mask

            // 使用蒙层的元素
            var maskEle = draw.rect(200, 200).move(20, 20).fill('blue');

            // 蒙层内部元素( 覆盖物设置,mask的颜色会在原有颜色的基础上混合)
            var maskInnerEle1 = draw.ellipse(80, 40).move(10, 10).fill('yellow');
            var maskInnerEle2 = draw.circle(80).center(70, 70).fill('red');




            var mask = draw.mask()
                .add(maskInnerEle1)
                .add(maskInnerEle2);


            maskEle.maskWith(mask);


            //绑定事件
            maskEle.on('mouseover', function () {
                this.animate(300, '<>').fill('greenyellow');
            });
            maskEle.on('mouseout', function () {
                this.animate(300, '<>').fill('purple');
            });


            //删除蒙层
            mask2.remove();





            //获取mask对象
            var mask2 = maskEle.masker;

            // 蒙层无法设置颜色 ？？？？？？？？？
            mask2.fill('red');


        //生产一个自定义标签(看不见的元素)
            var element = draw.element('rancheng', SVG.Parent);// <symbol id="SvgjsSymbol1008">测试标签</symbol>
            element.words('测试标签');

        // 线
        var line = draw.line(200, 200, 300, 250);
        line.stroke('blue')

        // marker1
            var marker1 = draw.marker(10, 10, function (add) {
                add.rect(20, 20);
            });


            var line = draw.line(0, 0, 200, 150);
            line.stroke('blue').move(20, 20);
            //添加到直线
            line.marker('start', marker1);


            // 更新标记
            marker1.update(function (add) {
                add.circle(10).fill('#f09');
            });












        // 图案

            // 设置图案
            var pattern = draw.pattern(20, 20, function (add) {
                add.rect(20, 20).fill('#f06');
                add.rect(10, 10);
                add.rect(10, 10).move(10, 10);
            });

            //获取url的标识对象,returns 'url(#SvgjsPattern1234)'
            var urlObj = pattern.fill();




            var circle = draw.circle(100);
            circle.move(100, 100)

                .fill(pattern);





        // 裁切

            var fatherEle=draw.rect(200,200);
            var childEle1=draw.ellipse(80,40).move(10,10);
            var childEle2=draw.text('SVG.JS').move(10,10).font({size:36});



            var clip=draw.clip().add(childEle1).add(childEle2);


            // 委托书（李永帅   开庭报纸）



            //clipWith() 将裁剪绑定到图形
            fatherEle.clipWith(clip);

            //获取clipPath对象 不生效？？？？？？
            fatherEle.clipper.move(80, 10);
            //删除clipPath对象
            clip.remove()
            //清除指定图形的裁剪
            fatherEle.unclip();




        // 渐变
            var gradient = draw.gradient('linear', function (stop) {
                stop.at({ offset: 0, color: '#000' });
                stop.at({ offset: 1, color: '#fff' });
            })
            var ellipse = draw.ellipse(80, 40).move(10, 10).fill({ color: gradient });




        // 路线



            /*
                M = moveto
                L = lineto
                H = horizontal lineto
                V = vertical lineto

                //曲线（弯线）必须有3组坐标点，如C 200 300 300  200 400 300
                C = curveto
                S = smooth curveto
                Q = quadratic Bézier curve
                T = smooth quadratic Bézier curveto
                A = elliptical Arc
                Z = closepath

            */
            var path = draw.path('M 100 200 C 200 100 300  0 400 100 C 500 200 600 300 700 200 C 800 100 900 100 900 100');
            path.fill('none').move(20, 20).stroke({ width: 1, color: '#ccc' });

            //获取数组点 SVG.PathArray
            var array1 = path.array();
            console.info(array1);


            //获取路径的长度
            var length = path.length(); //949.8208618164062
            console.info(length);
            //返回指定路径位置的点,返回SVG.Point
            var point = path.pointAt(105);
            console.info(point);
            //修改路径的位置
            path.plot('M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80');
            //使用动画,对于path的动画，只有相邻的两个状态的点数相同
            //也就是只有路径具有相同的命令（M、C、S等，才会有效果
            path.animate(1000)
                .plot('M10 80 C 40 150, 65 150, 95 80 S 150 10, 180 80')
                .loop(true, true);



            //标记
                    path.marker('start', 10, 10, function (add) {
                        add.circle(10).fill('#f06');
                    });
                    path.marker('mid', 10, 10, function (add) {
                        add.rect(5, 10).cx(5).fill('#ccc');
                    });
                    path.marker('end',20,20,function(add){
                        add.circle(6).center(4,5);
                        add.circle(6).center(4,15);
                        add.circle(6).center(12,10);
                        this.fill('#0f9');
                    })













        // use（元素的引用(复制一个元素)）

            // 是否显示

                //1. 直接显示
                var rect = draw.rect(100, 100).fill('#f09');

                //2. defs  声明但不显示
                var rect = draw.defs().rect(100, 100).fill('#f09');



            //use 直接copy 一个副本（相同的引用，rectCoper 和 rect 指向同一元素）
            var rectCoper = draw.use(rect);

            // 源元素 和 副本元素 一起执行相同操作

                rectCoper.move(100, 100);
                rect.animate(1000).fill('#f90');



















        // 写字
            var txt1 = draw.text(function (add) {
                add.tspan('第一行').addClass('words').newLine();
                add.tspan('第二行').addClass('words').newLine();
            });
            txt1.move(50, 50)


            // 设置字体大小
            .font({ size: 36 })



        // 链接
            var link = draw.link('http://www.gongjuji.net/');
            var rect = link.rect(100, 100);

            //动态修改链接
            link.to('http://apple.com');


            // 不明白 ？？？
            link.show('replace');
            //打开一个新窗口
            link.target('_blank');




            //为现有对象创建链接
            rect.linkTo('http://www.gongjuji.net/');
            //创建链接获取link对象
            rect.linkTo(function (link) {
                link.to('http://www.gongjuji.net/').target('_blank')
            });



        // 组
            var group1 = draw.group();
            group1.add(txt1);
            group1.rect(100, 100).fill('purple').attr({
                x: 100,
                y: 100
            })
            group1.rect(100, 100).fill('purple')

            //请注意g 元素 没有x,y 属性
            group1.attr({
                x: 100,
                y: 100
            })




        // 获取元素
            // 根据标签 获取元素
            var rect = SVG.get('rect');

            //  根据class 获取元素
            SVG.select('rect.my-class');

            group1.select('.words');


            var children = draw.children();
            console.log(children)

            //获取元素（按索引 ）
            draw.get(1)

            //获取索引（指定元素的）
            draw.index(draw.get(1))


            //获取svg 根节点
            rect.doc()

            //获取父元素
                rect.parent()
                rect.parent('.test')

        // 判断

            // 是否有某个元素
                // draw.has(second)



        //清空子节点

            //清除所有
            draw.clear();

            //清除某个元素
            draw.removeElement(polygon2)


        // 循环所有元素
        draw.each(function (i, children) {

            console.info(i); //当前索引
            console.info(children) //当前children引用

            //当前元素
            this.fill('green');
        });







        // 拖拽

            import 'svg.draggy.js'


            //不限制
            rect.draggy();
            //限制
            rect.draggy({
                minX: 0,
                minY: 0,
                maxX: 300,
                maxY: 300
            });

            // 限制2
            rect.draggy(function(x, y) {
                return { x: x < 1000, y: y < 100 };
            });


            // 停止拖动
            rect.fixed();



            rect.on('beforedrag', function(event) {
                // Do something

            });
            rect.on('dragstart', function(event) {
                // Do something

            });
            rect.on('dragmove', function(event) {
                console.log('x  y')
                console.log(event.detail.delta.x,event.detail.delta.y)
                console.log('movedX  movedY')
                console.log(event.detail.delta.movedX,event.detail.delta.movedY)
            });



        //可以resize (但是为什么是黑色？？？？？？？)

            import 'svg.resize.js'
            import 'svg.select.js'


            draw.rect(50,50)
                .fill({
                    color:'white'
                })
                .selectize()
                .resize()



        //放大缩小
            import 'svg.panzoom.js'


            draw.panZoom({
                zoomMin: 0.5,
                zoomMax: 20
            })


            // 整体放大svg
            draw.zoom(3,{x: 0,y: 0});




        //滤镜

            //  https://www.javascriptcn.com/read-38214.html
            import 'svg.filter.js'


            var image = draw.image(
                'http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg',

                //设置image元素宽高
                200,
                300
            )

             image.filter(function(add) {
                 add.gaussianBlur(30)
             })

             image.filter(function(add) {
                 add.colorMatrix('matrix', [ 1.0, 0,   0,   0,   0
                     , 0,   0.2, 0,   0,   0
                     , 0,   0,   0.2, 0,   0
                     , 0,   0,   0,   1.0, 0 ])
             })



            image.filter(function(add) {
                add.componentTransfer({
                    rgb: { type: 'linear', slope: 1.5, intercept: 0.2 }
                })
            })




    }

    render(){
        return (
          <div>
              <svg className={'svg1'} id={'svg1'}></svg>
          </div>
        )
    }

}
export default connect(function(state) {
  return {
    common: state.common,
    home: state.home
  };
})(Order_a);

