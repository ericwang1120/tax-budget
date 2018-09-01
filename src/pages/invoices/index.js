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
    quantity: 10
  },
  {
    id: 2,
    description: "microsoft2",
    rate: "2.5",
    quantity: 10
  }
];

const baseInfo = {
  username: "test",
  companyName: "WINTRADING",
  address: "China",
  date: moment("2015-01-01"),
  dueDate: moment("2015-02-02"),
  isPaid: true
};

class InvoicePage extends React.Component {
  pdfConvert;
  constructor(props) {
    super(props);
    this.state = {
      list: list,
      pdfConvert: <PDFConvert list={list} baseInfo={baseInfo} />,
      baseInfo: baseInfo
    };
    this.deleteHandler = this.deleteHandler.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.createHandler = this.createHandler.bind(this);
    this.clearAllHandler = this.clearAllHandler.bind(this);
    this.updateBaseInfo = this.updateBaseInfo.bind(this);
  }

  refreshPDF() {
    this.setState(prevState => {
      prevState.pdfConvert = null;
      return prevState;
    });
    setTimeout(() => {
      this.setState(prevState => {
        prevState.pdfConvert = <PDFConvert {...prevState} />;
        return prevState;
      });
    }, 100);
  }

  clearAllHandler() {
    this.setState(prevState => {
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
      return prevState;
    });
    this.refreshPDF();
  }

  deleteHandler(id) {
    this.setState(prevState => {
      prevState.list = prevState.list.filter(p => p.id !== id);
      return prevState;
    });
    this.refreshPDF();
  }

  updateBaseInfo(baseInfo) {
    console.log(baseInfo);
    this.setState(prevState => (prevState.baseInfo = baseInfo));
    this.refreshPDF();
  }

  render() {
    return (
      <div>
        <Invoices
          list={this.state.list}
          onDelete={this.deleteHandler}
          onEdit={this.editHandler}
          onCreate={this.createHandler}
          onClearAll={this.clearAllHandler}
          username={this.state.username}
          companyName={this.state.companyName}
          updateBaseInfo={this.updateBaseInfo}
          baseInfo={this.state.baseInfo}
        />
        {this.state.pdfConvert}
      </div>
    );
  }
}

export default InvoicePage;
