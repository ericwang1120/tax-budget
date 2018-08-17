import React, { Component } from "react";
import Home from "./pages/home";
import Layout from "./layouts";
import "./App.css";
import { Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Route exact path="/" component={Home} />    
        </Layout>
      </div>
    );
  }
}

export default App;
