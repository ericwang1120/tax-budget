import React, { Component } from "react";
import { Form, Input, Button, Popconfirm, DatePicker } from "antd";
import InvoiceModal from "./InvoiceModal";
import styles from "./TopToolbar.css";

const FormItem = Form.Item;

class TopToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  okHandler = () => {
    const { update } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        update(values);
      }
    });
  };

  render() {
    const { createHandler, clearAllHandler } = this.props;
    const {
      username,
      companyName,
      address,
      date,
      dueDate
    } = this.props.baseInfo;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };

    return (
      <div className={styles.main}>
        <Form onSubmit={this.okHandler}>
          <FormItem {...formItemLayout} label="Company Name">
            {getFieldDecorator("companyName", {
              initialValue: companyName
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="User Name">
            {getFieldDecorator("username", {
              initialValue: username
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Address">
            {getFieldDecorator("address", {
              initialValue: address
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Date">
            {getFieldDecorator("date", {
              initialValue: date
            })(<DatePicker />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Due Date">
            {getFieldDecorator("dueDate", {
              initialValue: dueDate
            })(<DatePicker />)}
          </FormItem>
          <Button type="primary" onClick={this.okHandler}>
            Update
          </Button>
        </Form>
        <div className={styles.actions}>
          <InvoiceModal record={{}} onOk={createHandler}>
            <Button type="primary">Create Record</Button>
          </InvoiceModal>
          <Popconfirm title="Confirm to clear all?" onConfirm={clearAllHandler}>
            <Button type="danger">Clear All</Button>
          </Popconfirm>
        </div>
      </div>
    );
  }
}

export default Form.create()(TopToolbar);
