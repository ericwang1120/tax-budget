import React from "react";
import moment from "moment";
import Loadable from "react-loadable";
import { StyleSheet } from "@react-pdf/renderer";

const Invoices = Loadable({
  loader: () => import("./components/Invoices"),
  loading: () => <div style={styles.loading}>Loading</div>
});

const PDFConvert = Loadable({
  loader: () => import("./components/PDFConvert"),
  loading: () => <div style={styles.loading}>Loading</div>
});

const styles = StyleSheet.create({
  loading: {
    width: "100%"
  }
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
  pdfConvert;

  constructor(props) {
    super(props);
    this.state = {
      list: [...list],
      pdfConvert: <PDFConvert list={list} />
    };
    this.deleteHandler = this.deleteHandler.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.createHandler = this.createHandler.bind(this);
    this.clearAllHandler = this.clearAllHandler.bind(this);
  }

  refreshPDF() {
    setTimeout(() => {
      this.setState(prevState => {
        prevState.pdfConvert = <PDFConvert list={prevState.list} />;
        return prevState;
      });
    }, 1000);
  }

  clearAllHandler() {
    this.setState(prevState => {
      prevState.pdfConvert = null;
      prevState.list = [];
      return prevState;
    });
    this.refreshPDF();
  }

  createHandler(product) {
    this.setState(prevState => {
      const newId =
        prevState.list.length === 0
          ? 1
          : Math.max(...prevState.list.map(p => p.id)) + 1;
      prevState.list = [...prevState.list, { ...product, id: newId }];
      prevState.pdfConvert = null;
      return prevState;
    });
    this.refreshPDF();
  }

  editHandler(product) {
    this.setState(prevState => {
      prevState.list = [
        ...prevState.list.filter(p => p.id !== product.id),
        product
      ];
      prevState.pdfConvert = null;
      return prevState;
    });
    this.refreshPDF();
  }

  deleteHandler(id) {
    this.setState(prevState => {
      prevState.list = prevState.list.filter(p => p.id !== id);
      prevState.pdfConvert = null;
      return prevState;
    });
    this.refreshPDF();
  }

  render() {
    this.pdfConvert = <PDFConvert list={this.state.list} />;

    return (
      <div>
        <Invoices
          list={this.state.list}
          onDelete={this.deleteHandler}
          onEdit={this.editHandler}
          onCreate={this.createHandler}
          onClearAll={this.clearAllHandler}
        />
        {this.state.pdfConvert}
      </div>
    );
  }
}

export default InvoicePage;
