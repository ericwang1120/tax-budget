import React from "react";
import Loadable from "react-loadable";

const Invoices = Loadable({
  loader: () => import("./components/Invoices"),
  loading: () => <div>Loading</div>
});

const list = [
  {
    id: 1,
    description: "microsoft",
    name: "eric",
    rate: "microsoft",
    date: "microsoft",
    quantity: 10
  },
  {
    id: 2,
    description: "microsoft2",
    name: "eric2",
    rate: "microsoft2",
    date: "microsoft2",
    quantity: 10
  }
];

export default () => {
  return <Invoices list={list} page={1} total={11} />;
};
