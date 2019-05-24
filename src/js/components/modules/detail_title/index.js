
import React, { Component, PropTypes } from 'react';
import './index.scss'
class DetailTitle extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {
            title = '',
            logo,
            content,
            logoWidth = 20,
            logoHeight = 20
        } = this.props
        return (
            <div className='detail-title-box'>
                {logo && <div className='logo' style={{width: logoWidth, height: logoHeight}}>{logo}</div>}
                <div className='main'>
                    <div className='row'>
                        <h1 className='title'>{title}</h1>
                        {/*{action && <div className={styles.action}>{action}</div>}*/}
                    </div>
                    {/*<div className={styles.row}>*/}
                        {/*{content && <div className={styles.content}>{content}</div>}*/}
                        {/*{extraContent && <div className={styles.extraContent}>{extraContent}</div>}*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }
}
export default DetailTitle