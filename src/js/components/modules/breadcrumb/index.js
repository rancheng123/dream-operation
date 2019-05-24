import React,{ Component, Fragment } from 'react';
import {Breadcrumb, Icon} from 'antd';
import {Link} from "react-router";

class BreadCrumbView extends Component {
    constructor(props) {
        super(props);
    }
    getBreadCrumbRouter() {
        const {routes} = this.props
        return routes.filter(values => {
            if (values.title && values.path && values.path!== '/') {
                return true
            }
            if (values.onlyShow) {
                return true
            }
            return false
        })
    }
    isJsonString(str) {
        try {
            if (typeof JSON.parse(str) == "object") {
                return true;
            }
        } catch(e) {
        }
        return false;
    }
    setTitle(title) {
        const {location, params} = this.props
        const {query} = location
        if (this.isJsonString(title)) {
            const title_json = JSON.parse(title)
            for (let i in title_json) {
                if (params[i]) {
                    return title_json[i][params[i]]
                }
                if (query[i]) {
                    return title_json[i][query[i]]
                }
            }
            return title
        }
        return title
    }
    getRouterItem(router) {
        const {location} = this.props
        let router_arr = []
        return (
            router.map((values, index) => {
                let path
                router_arr.push(values.path)
                if (values.linkPath) {
                    path = values.linkPath
                } else {
                    if (!values.hiddenLink) {

                        if (index === router.length - 1) {
                            path = `${location.pathname}${location.search}` // 
                        } else {
                            path = '/' + router_arr.join('/') + location.search
                        }
                    }
                }
                return (
                    <Fragment>
                        {
                            !values.onlyShow ? (
                                <Breadcrumb.Item key={index}>
                                    {
                                        !values.hiddenLink ? (
                                            <Link style={{color : index === router.length - 1 ? "#3F7FFF" : ""}} to={path}>
                                                {this.setTitle(values.title)}
                                            </Link>
                                        ): (
                                            <span style={{color : index === router.length - 1 ? "#3F7FFF" : ""}}>
                                    {this.setTitle(values.title)}
                                </span>
                                        )
                                    }

                                </Breadcrumb.Item>
                            ) : null
                        }
                    </Fragment>


                )
            })
        )
    }
    render() {
        const routerData = this.getBreadCrumbRouter()
        return (
            <Fragment>
                <Breadcrumb style={{margin: '16px 0 24px'}}>
                    {
                        this.getRouterItem(routerData)
                    }
                </Breadcrumb>
            </Fragment>
        );
    }
}

export default BreadCrumbView;
