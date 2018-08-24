import React from "react";
import { Table, Pagination } from "antd";
import { PAGE_SIZE } from "../constants";
import styles from "./Invoices.css";
import InvoiceModal from './InvoiceModal';

function Invoices({ list: dataSource, total, page: current }) {
  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: text => <a href="">{text}</a>
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate"
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date"
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity"
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <InvoiceModal record={record}>
            <a>Edit</a>
          </InvoiceModal>
          <a href="">Delete</a>
        </span>
      ),
    },
  ];
  return (
    <div className={styles.normal}>
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
        />
      </div>
    </div>
  );
}

export default Invoices;
