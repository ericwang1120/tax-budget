import React from "react";
import Loadable from "react-loadable";

const Invoices = Loadable({
  loader: () => import("./components/Invoices"),
  loading: () => <div>Loading</div>
});

export default () => {
  return <Invoices page="1" total="11" />;
};
