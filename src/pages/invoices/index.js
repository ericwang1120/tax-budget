import React, { Component } from "react";
import moment from "moment";
import Loadable from "react-loadable";
import { StyleSheet } from "@react-pdf/renderer";

const Invoices = Loadable({
  loader: () => import("./components/Invoices"),
  loading: () => <div>Loading</div>
});

const PDFConvert = Loadable({
  loader: () => import("./components/PDFConvert"),
  loading: () => <div>Loading</div>
});

const list = [
  {
    id: 1,
    description: "microsoft",
    name: "eric",
    rate: "3.5",
    date: moment("2015-01-01"),
    quantity: 10
  },
  {
    id: 2,
    description: "microsoft2",
    name: "eric2",
    rate: "2.5",
    date: moment("2015-01-01"),
    quantity: 10
  }
];

class InvoicePage extends React.Component {
  render() {
    return (
      <div>
        <Invoices list={list} page={1} total={11} />
        <PDFConvert list={list} />
      </div>
    );
  }
}

export default InvoicePage;
