import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames'

//导入样式 start
import './reactDome.scss'
//导入样式 end



class ReactDemo extends Component{
    constructor(){
        super();
    }
    componentWillMount(){

        //在此处初始化状态
        this.state={
            area: '请选择',
            items: ['hello', 'world', 'click', 'me']
        }
    }

    componentDidMount(){

    };
    componentWillUnmount(){

    };

    getList(ev){

        //当前元素
        ev.target


        //修改某个组件状态  start
        this.state.title = 'bbbbb';
        this.setState(this.state)
        //修改某个组件状态  end


        //循环 start
        var ordersHTML = [1,2].map(function(ele,i){
            // 必须加key
            return (
                <div key={i}>{ele.text}</div>
            )
        });
        //循环 end

        //切换路由 start
        if(0){
            //动态切换
            Utils.switchRoute('/productList')

            //静态切换
           // <Link to="/module2">toModule2</Link>
        }
        //切换路由 end









        //数据通讯  start
        Utils.requestData({
            url: config.mock_baseUrl + 'api/module1/test_search1',
            method: 'get',
            data: {
                a: 1,
                b: 2
            },
            callback: function(data){


            }
        });
        Utils.requestData({
            url: config.mock_baseUrl + 'api/module1/test_search2',
            method: 'POST',
            data: {
                a: 1,
                b: 2
            },
            callback: function(data){

            }
        });
        //数据通讯  end


    }


    handleRemove(i) {
        var newItems = this.state.items;
        newItems.splice(i, 1);
        this.setState({items: newItems});
    }

    render(){



        var items = this.state.items.map(function(item, i) {
            return (
                <div key={item} className="red"
                     onClick={this.handleRemove.bind(this, i)}>
                    {item}
                </div>
            );
        }.bind(this));

        return (
            <div className="module1">

                {items}

                <div className="webpackCacheTest webpackCacheTest3">
                    webpackCacheTest
                </div>


                <Link to="/home/a">/home/a</Link>

                <div className="testCss">

                    {/*css3  start*/}
                    <div className="css3Test"></div>
                    {/*css3  end*/}


                    {/*img  start*/}
                    <img src={require("../../../image/temp/2.jpg")} className="imgTagTest" alt="22222222"/>
                    <div className="backgroundUrlTest"></div>
                    {/*img  end*/}


                    {/*字体  start*/}
                    <div className="testFonts">
                        字体测试
                        dsfdsa
                    </div>
                    <div className="testWeiruan">
                        微软雅黑
                    </div>
                    {/*字体  end*/}

                </div>



                <span onClick={this.getList.bind(this)}>
                    请求数据
                </span>

                {/*多个class名字*/}
                <span className={classNames({
                    "k_getCash": true,
                    "red11": 1
                })}
                      onClick={this.changeData}
                >提现</span>


                {/* ref */}
                <div ref="11"></div>


            </div>
        )
    }

}

export default ReactDemo;
