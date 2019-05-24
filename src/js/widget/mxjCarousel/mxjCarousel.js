import {Carousel, Icon} from "antd";
import React, {Component} from "react";
import './mxjCarousel.scss'

class SupperCarousel extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        window.carousel = this;
    }

    render() {
        var that = this;
        return (
            <div style={{position: 'relative'}}>
                <Icon type="left-circle"
                      className={'mxjCarousel-left-icon'}

                      onClick={()=>{
                          that.refs.carousel.next()
                      }}
                />


                <Icon type="right-circle"
                      className={'mxjCarousel-right-icon'}
                      onClick={()=>{
                          that.refs.carousel.prev()
                      }}
                />
                <Carousel ref={'carousel'} afterChange={(a, b, c)=>{
                    console.log(a, b, c);
                }}>
                    <div><h3>1</h3></div>
                    <div><h3>2</h3></div>
                    <div><h3>3</h3></div>
                    <div><h3>4</h3></div>
                </Carousel>
            </div>

        )
    }

}

export default SupperCarousel;

