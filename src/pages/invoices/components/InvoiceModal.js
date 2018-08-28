import React, { Component } from "react";
import { Modal, Form, Input, DatePicker, InputNumber } from "antd";

const FormItem = Form.Item;

class InvoiceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  showModelHandler = e => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk({ ...values, id: this.props.record.id });
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { description, name, rate, date, quantity } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          title="Edit User"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="Description">
              {getFieldDecorator("description", {
                initialValue: description
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Name">
              {getFieldDecorator("name", {
                initialValue: name
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Rate">
              {getFieldDecorator("rate", {
                initialValue: rate
              })(<InputNumber />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Date">
              {getFieldDecorator("date", {
                initialValue: date
              })(<DatePicker />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Quantity">
              {getFieldDecorator("quantity", {
                initialValue: quantity
              })(<InputNumber precision={0} />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(InvoiceModal);
