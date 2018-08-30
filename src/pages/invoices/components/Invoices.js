import React from "react";
import { Table, Popconfirm } from "antd";
import styles from "./Invoices.css";
import InvoiceModal from "./InvoiceModal";
import TopToolbar from "./TopToolbar";

function Invoices({
  list: dataSource,
  onDelete: deleteHandler,
  onEdit: editHandler,
  onCreate: createHandler,
  onClearAll: clearAllHandler,
  onUpdateUsername: updateUsernameHandler,
  onUpdateCompanyName: updateCompanyNameHandler,
  username,
  companyName
}) {
  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: text => <a href="">{text}</a>
    },
    { title: "Rate", dataIndex: "rate", key: "rate" },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: text => text.format("YYYY/MM/DD")
    },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    {
      title: "Operation",
      key: "operation",
      render: (text, record) => (
        <span className={styles.operation}>
          <InvoiceModal record={record} onOk={editHandler}>
            <a>Edit</a>
          </InvoiceModal>
          <Popconfirm
            title="Confirm to delete?"
            onConfirm={deleteHandler.bind(null, record.id)}
          >
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      )
    }
  ];
  return (
    <div>
      <TopToolbar
        createHandler={createHandler}
        clearAllHandler={clearAllHandler}
      />
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={record => record.id}
        pagination={false}
      />
    </div>
  );
}

export default Invoices;
