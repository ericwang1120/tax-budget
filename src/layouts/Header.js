import { Menu, Icon } from "antd";
import React from "react";

function Header() {
  return (
    <Menu mode="horizontal" theme="dark">
      <Menu.Item key="/">
        <Icon type="home" />
        Home
      </Menu.Item>
      <Menu.Item key="/users">
        <Icon type="bars" />
        Users
      </Menu.Item>
      <Menu.Item key="/404">
        <Icon type="frown-circle" />
        404
      </Menu.Item>
    </Menu>
  );
}

export default Header;
