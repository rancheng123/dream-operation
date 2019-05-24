import React, { PropTypes } from 'react';
import {
    Form
} from 'antd';
import './form.scss'
import {validateMessages} from './form.rules'

class FormCase extends React.Component {

    onSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(!err){
                this.props.onSubmit && this.props.onSubmit(values)
            }
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form

                className="ant-advanced-search-form mxj-order-common-form"
                onSubmit={this.onSubmit}
                style={this.props.style}
            >
                {this.props.renderContent(this,Form,getFieldDecorator)}
            </Form>
        );
    }
}

const WrappedFormCase = Form.create({
    onFieldsChange(props, changedFields) {

    },
    name: 'advanced_search',
    validateMessages: validateMessages
})(FormCase);
export default WrappedFormCase;