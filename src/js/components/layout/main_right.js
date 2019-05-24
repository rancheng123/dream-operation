import React, { PropTypes} from 'react';
import {Link} from 'react-router';
import {
    Breadcrumb,
    Layout,
} from 'antd';
const {Content} = Layout;

import Footer from './footer';

const main_right = (WrappedComponent, BreadcrumbData) => {

    return class extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (
                <Layout style={{padding: '0 24px 24px',minHeight: '100vh'}}>
                    <Breadcrumb style={{margin: '16px 0 24px'}}>
                        {(()=>{
                            return BreadcrumbData.map((ele,i)=>{
                                return (
                                    <Breadcrumb.Item key={ele.text}>
                                        {(()=>{
                                            if(ele.path){
                                                return (
                                                    <Link style={{color : i == BreadcrumbData.length - 1 ? "#3F7FFF" : ""}} to={ele.path}>
                                                        {ele.text}
                                                    </Link>
                                                )
                                            }else{
                                                return (
                                                    <span style={{color : i == BreadcrumbData.length - 1 ? "#3F7FFF" : ""}}>
                                                        {ele.text}
                                                    </span>
                                                )
                                            }
                                        })()}

                                    </Breadcrumb.Item>
                                )
                            })
                        })()}
                    </Breadcrumb>
                    <Content style={{
                        background: '#FBFBFB', padding: 0, margin: 0,
                    }}
                    >
                        <WrappedComponent

                            //接收容器的所有props属性
                            {...this.props}
                        />
                    </Content>
                    <Footer />
                </Layout>
            )
        }
    };
}
export default main_right;