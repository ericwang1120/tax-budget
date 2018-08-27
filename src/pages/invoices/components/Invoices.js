import React from "react";
import { Table, Pagination, Popconfirm } from "antd";
import { PAGE_SIZE } from "../constants";
import styles from "./Invoices.css";
import InvoiceModal from "./InvoiceModal";

function Invoices({
  list: dataSource,
  total,
  page: current,
  onDelete: deleteHandler
}) {
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
      key: "date",
      render: text => text.format("YYYY/MM/DD")
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity"
    },
    {
      title: "Operation",
      key: "operation",
      render: (text, record) => (
        <span className={styles.operation}>
          <InvoiceModal record={record}>
            <a>Edit</a>
          </InvoiceModal>
          <Popconfirm
            title="Confirm to delete?"
            onConfirm={deleteHandler.bind(null, record.id)}
          >
            <a href="">Delete</a>
          </Popconfirm>{" "}
        </span>
      )
    }
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
