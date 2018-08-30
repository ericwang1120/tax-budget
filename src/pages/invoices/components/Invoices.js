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
  updateBaseInfo,
  baseInfo
}) {
  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: text => <a href="">{text}</a>
    },
    { title: "Rate", dataIndex: "rate", key: "rate" },
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
        update={updateBaseInfo}
        baseInfo={baseInfo}
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
