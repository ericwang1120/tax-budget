import React, { Component } from "react";
import Home from "./pages/home";
import Layout from "./layouts";
import "./App.css";
import "antd/dist/antd.css";
import { Route } from "react-router-dom";
import Invoices from "./pages/invoices";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/invoices" component={Invoices} />
        </Layout>
      </div>
    );
  }
}

export default App;
