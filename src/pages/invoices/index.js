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
    rate: "3.5",
    date: moment("2015-01-01"),
    quantity: 10
  },
  {
    id: 2,
    description: "microsoft2",
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
      list: list,
      pdfConvert: <PDFConvert list={list} />,
      username: "test",
      companyName: "test"
    };
    this.deleteHandler = this.deleteHandler.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.createHandler = this.createHandler.bind(this);
    this.clearAllHandler = this.clearAllHandler.bind(this);
    this.updateCompanyNameHandler = this.updateCompanyNameHandler.bind(this);
    this.updateUsernameHandler = this.updateUsernameHandler.bind(this);
  }

  refreshPDF() {
    setTimeout(() => {
      this.setState(prevState => {
        prevState.pdfConvert = <PDFConvert list={prevState.list} />;
        return prevState;
      });
    }, 100);
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

  updateUsernameHandler(username) {
    this.setState(p => (p.username = username));
  }

  updateCompanyNameHandler(companyName) {
    this.setState(p => (p.companyName = companyName));
  }

  render() {
    this.pdfConvert = (
      <PDFConvert
        list={this.state.list}
        username={this.state.username}
        companyName={this.state.companyName}
      />
    );

    return (
      <div>
        <Invoices
          list={this.state.list}
          onDelete={this.deleteHandler}
          onEdit={this.editHandler}
          onCreate={this.createHandler}
          onClearAll={this.clearAllHandler}
          onUpdateUsername={this.updateUsernameHandler}
          onUpdateCompanyName={this.updateCompanyNameHandler}
          username={this.state.username}
          companyName={this.state.companyName}
        />
        {this.state.pdfConvert}
      </div>
    );
  }
}

export default InvoicePage;
