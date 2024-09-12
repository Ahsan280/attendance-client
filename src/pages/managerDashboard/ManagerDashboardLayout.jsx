import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import ManagerSidebar from "../../components/managerDashboardComponents/ManagerSidebar";
const { Content } = Layout;
function ManagerDashboardLayout() {
  return (
    <>
      <Layout style={{ backgroundColor: "#874f41;" }}>
        <ManagerSidebar />
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

export default ManagerDashboardLayout;
