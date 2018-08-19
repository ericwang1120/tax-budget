import React from "react";
import Loadable from "react-loadable";

const Invoices = Loadable({
  loader: () => import("./components/Invoices"),
  loading: () => <div>Loading</div>
});

const list = [
  {
    description: "microsoft",
    name: "eric",
    rate: "microsoft",
    date: "microsoft",
    quantity: 10
  }
];

export default () => {
  return <Invoices list={list} page={1} total={11} />;
};
