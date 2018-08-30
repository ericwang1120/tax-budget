import React, { Component } from "react";
import { Form, Input, Button, Popconfirm } from "antd";
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
    const { username, companyName } = this.props.baseInfo;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };

    return (
      <div className={styles.main}>
        <Form onSubmit={this.okHandler}>
          <FormItem {...formItemLayout} label="User Name">
            {getFieldDecorator("username", {
              initialValue: username
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Company Name">
            {getFieldDecorator("companyName", {
              initialValue: companyName
            })(<Input />)}
            <Button type="primary" onClick={this.okHandler}>
              Update
            </Button>
          </FormItem>
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
