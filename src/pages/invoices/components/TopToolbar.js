import React, { Component } from "react";
import { Form, Input, Button, Popconfirm } from "antd";
import InvoiceModal from "./InvoiceModal";

const FormItem = Form.Item;

class TopToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

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
    const {
      createHandler,
      clearAllHandler,
      username,
      companyName
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };

    return (
      <Form onSubmit={this.okHandler}>
        <FormItem {...formItemLayout} label="User Name">
          {getFieldDecorator("username", {
            initialValue: username
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Company Name">
          {getFieldDecorator("username", {
            initialValue: companyName
          })(<Input />)}
        </FormItem>
        <InvoiceModal record={{}} onOk={createHandler}>
          <Button type="primary">Create Record</Button>
        </InvoiceModal>
        <Popconfirm title="Confirm to clear all?" onConfirm={clearAllHandler}>
          <Button type="danger">Clear All</Button>
        </Popconfirm>
      </Form>
    );
  }
}

export default Form.create()(TopToolbar);
