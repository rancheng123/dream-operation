import React, { PropTypes} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router';
import {
    Breadcrumb,
    Layout,
    Spin,
} from 'antd';
import BreadCrumbView from '@modules/breadcrumb'
import Footer from './footer';

const {Content} = Layout;

@connect(({ common }) => ({
    common
}))

class MainRight2 extends React.Component {
    constructor(props) {
        super(props)
    }


    loadingDom () {
        const { common, dispatch } = this.props
        // 更改loadingStatus的状态
        // dispatch({
        //     type: 'modifyCommonData',
        //     data: {
        //         loadingStatus: true
        //     }
        // })

        if (common.loadingStatus) {
            return (
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.05)',
                    borderRadius: '4px',
                    zIndex: '999999',
                    // display: 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                }}
                >
                    <div style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                    }}
                    >
                        <Spin tip="Loading..."/>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }

    render () {
        return (
            <Layout className={this.props.className}  style={{minHeight: '100vh', padding: '0 24px 24px'}}>
                <Breadcrumb style={{margin: '16px 0 24px'}}>
                    {(()=>{
                        return this.props.breadcrumbData.map((ele,i)=>{
                            return (
                                <Breadcrumb.Item key={ele.text}>
                                    {(()=>{
                                        if(ele.path){
                                            return (
                                                <Link style={{color : i == this.props.breadcrumbData.length - 1 ? "#3F7FFF" : ""}} to={ele.path}>
                                                    {ele.text}
                                                </Link>
                                            )
                                        }else{
                                            return (
                                                <span style={{color : i == this.props.breadcrumbData.length - 1 ? "#3F7FFF" : ""}}>
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
                <BreadCrumbView {...this.props}></BreadCrumbView>
                <Content id="main_right_content" style={{
                    padding: 0, margin: 0,
                    position: 'relative',
                }}
                >

                    {this.loadingDom()}

                    {this.props.children}
                    {/*<WrappedComponent

                        //接收容器的所有props属性
                        {...this.props}
                    />*/}
                </Content>
                <Footer></Footer>
            </Layout>
        )
    }
};
export default MainRight2;
