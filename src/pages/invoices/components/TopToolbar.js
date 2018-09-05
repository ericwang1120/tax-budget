import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  Popconfirm,
  DatePicker,
  Switch,
  Row,
  Col,
  InputNumber
} from "antd";
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

  clearAllIncludingForm = () => {
    this.props.clearAllHandler();
    this.props.form.setFieldsValue({
      username: "",
      address: "",
      invoiceNo: this.props.form.getFieldValue("invoiceNo") + 1
    });
    this.okHandler();
  };

  render() {
    const { createHandler } = this.props;
    const {
      username,
      companyName,
      address,
      date,
      dueDate,
      isPaid,
      gstNo,
      invoiceNo
    } = this.props.baseInfo;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.main}>
        <Form
          className={styles.baseInfoForm}
          onSubmit={this.okHandler}
          layout="vertical"
        >
          <Row gutter={24}>
            <Col span={8} style={{ textAlign: "left" }}>
              <FormItem label="Company Name">
                {getFieldDecorator("companyName", {
                  initialValue: companyName
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8} style={{ textAlign: "left" }}>
              <FormItem label="GST No.">
                {getFieldDecorator("gstNo", {
                  initialValue: gstNo
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8} style={{ textAlign: "left" }}>
              <FormItem label="Invoice No.">
                {getFieldDecorator("invoiceNo", {
                  initialValue: invoiceNo
                })(<InputNumber />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8} style={{ textAlign: "left" }}>
              <FormItem label="User Name">
                {getFieldDecorator("username", {
                  initialValue: username
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={16} style={{ textAlign: "left" }}>
              <FormItem label="Address">
                {getFieldDecorator("address", {
                  initialValue: address
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8} style={{ textAlign: "left" }}>
              <FormItem label="Date">
                {getFieldDecorator("date", {
                  initialValue: date
                })(<DatePicker />)}
              </FormItem>
            </Col>
            <Col span={8} style={{ textAlign: "left" }}>
              <FormItem label="Due Date">
                {getFieldDecorator("dueDate", {
                  initialValue: dueDate
                })(<DatePicker />)}
              </FormItem>
            </Col>
            <Col span={8} style={{ textAlign: "left" }}>
              <FormItem label="Is Paid">
                {getFieldDecorator("isPaid", {
                  initialValue: isPaid,
                  valuePropName: "checked"
                })(<Switch />)}
              </FormItem>
            </Col>
          </Row>
          <Button type="primary" onClick={this.okHandler}>
            Update
          </Button>
        </Form>
        <div className={styles.actions}>
          <InvoiceModal record={{}} onOk={createHandler}>
            <Button type="primary">Create Record</Button>
          </InvoiceModal>
          <Popconfirm
            title="Confirm to clear all?"
            onConfirm={this.clearAllIncludingForm}
          >
            <Button type="danger">Clear All</Button>
          </Popconfirm>
        </div>
      </div>
    );
  }
}

export default Form.create()(TopToolbar);
