import React, { Component, PropTypes } from 'react';

import { Layout } from 'antd';
import Main_left from './main_left'
import menuList from "./menu";



const main = (opts) => {
    return class extends Component{
        constructor(props){
            super(props);
        }
        render(){
            var that = this;

            return (
                <Layout>

                    {/*左侧导航  start*/}
                    <Main_left
                        $id = "main_left"
                        data={menuList}
                    ></Main_left>
                    {/*左侧导航  end*/}

                    {/*右侧内容  start*/}
                    {that.props.children}
                    {/*右侧内容  end*/}
                </Layout>

            )
        }
    }
}
export default main;