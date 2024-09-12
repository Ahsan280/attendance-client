import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Sider } = Layout;
import React, { useState } from "react";

import UserMenuList from "./UserMenuList";
function UserSideBar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider collapsed={collapsed} collapsible trigger={null} className="sidebar">
      <div className="logo">
        <Button
          type="text"
          className="logo-icon"
          style={{ color: "white" }}
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        />
      </div>

      <UserMenuList />
    </Sider>
  );
}

export default UserSideBar;
