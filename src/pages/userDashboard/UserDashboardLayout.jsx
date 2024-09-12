import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import UserSideBar from "../../components/userDashboardComponents/UserSideBar";
const { Content } = Layout;
function UserDashboardLayout() {
  return (
    <>
      <Layout style={{ backgroundColor: "#874f41;" }}>
        <UserSideBar />
        <Layout>
          <Content
            className="bg-white custom-scrollbar"
            style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default UserDashboardLayout;
