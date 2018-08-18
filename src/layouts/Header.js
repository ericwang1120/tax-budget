import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import React from "react";

function Header() {
  return (
    <Menu mode="horizontal" theme="dark">
      <Menu.Item key="/">
        <Link to="/home">
          <Icon type="home" />
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key="/invoices">
        <Link to="/invoices">
          <Icon type="bars" />
          Invoices
        </Link>
      </Menu.Item>
      <Menu.Item key="/404">
        <Icon type="frown-circle" />
        404
      </Menu.Item>
    </Menu>
  );
}

export default Header;
