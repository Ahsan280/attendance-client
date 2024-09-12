import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

import {
  DashboardOutlined,
  UserOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

import useLogout from "../../hooks/useLogout";
function UserMenuList() {
  const { logout } = useLogout();

  const items = [
    {
      key: "/user-dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/manager-dashboard">Dashboard</Link>,
    },

    {
      key: "/user-dashboard/attendance",
      icon: <DatabaseOutlined />,
      label: <Link to="/user-dashboard/attendance">My Attendance</Link>,
    },
    // {
    //   key: "/user-dashboard/all-attendance",
    //   icon: <DatabaseOutlined />,
    //   label: <Link to="/manager-dashboard/all-attendance">Attendance</Link>,
    // },
    {
      key: "/user-dashboard/apply-for-leave",
      icon: <DatabaseOutlined />,
      label: <Link to="/user-dashboard/apply-for-leave">Apply For Leave</Link>,
    },

    {
      key: "/dashboard/logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => {
        logout();
      },
      // Add onClick handler if you want to handle logout logic
    },
  ];

  const location = useLocation();

  return (
    <Menu
      mode="inline"
      className="menu-bar"
      theme="dark"
      items={items}
      selectedKeys={[location.pathname]}
    />
  );
}

export default UserMenuList;
