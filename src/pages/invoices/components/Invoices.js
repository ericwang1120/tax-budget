import React from "react";
import { Input, Table, Popconfirm, Button } from "antd";
import styles from "./Invoices.css";
import InvoiceModal from "./InvoiceModal";

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
    { title: "Name", dataIndex: "name", key: "name" },
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
      <div className={styles.topToolbar}>
        <InvoiceModal record={{}} onOk={createHandler}>
          <Button type="primary">Create Record</Button>
        </InvoiceModal>{" "}
        <div>
          <Input
            className={styles.username}
            defaultValue={username}
            placeholder="User Name"
          />
        </div>
        <div>
          <Input
            className={styles.username}
            placeholder="Company name"
            defaultValue={companyName}
            onPressEnter={e => updateCompanyNameHandler(e.target.value)}
          />
        </div>
        <Popconfirm title="Confirm to clear all?" onConfirm={clearAllHandler}>
          <Button type="danger" className={styles.clearAll}>
            Clear All
          </Button>
        </Popconfirm>
      </div>
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
