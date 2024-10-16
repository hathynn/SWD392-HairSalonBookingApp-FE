import React, { useState } from "react";
import {
  CalendarOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import Profile from "../pages/Profile";
import "./Sidebar.scss"; // Import the SCSS file

const { Sider, Content } = Layout;

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="profile-page">
      <img
        src="https://knockouts.com/bellevue-ne/wp-content/uploads/sites/68/2020/03/knockouts-franchise-locations-header-2020.jpg"
        alt="maverick barber"
        className="profile-page__header-img"
      />
      <div className="profile-page__header-text">Profile.</div>
      <div
        style={{
       
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Layout
          style={{ backgroundColor: "white", padding: "10vh 10vw" }}
        >
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{ backgroundColor: "white" }}
          >
            <div className="demo-logo-vertical" />
            <Menu
              
              mode="inline"
              defaultSelectedKeys={["1"]}
              className="menu-sidebar"
              items={[
                {
                  key: "1",
                  icon: <UserOutlined />,
                  label: "Profile",
                },
                {
                  key: "2",
                  icon: <CalendarOutlined />,
                  label: "Bookings",
                },
                
              ]}
            />
            <Menu
              
              mode="inline"
              defaultSelectedKeys={["1"]}
              className="menu2-sidebar"
              items={[
                
                {
                  key: "1",
                  icon: <LogoutOutlined />,
                  label: "Logout",
                },
              ]}
            />
          </Sider>
          <Layout style={{ backgroundColor: "white" }}>
       
            <Content className="custom-content">
              <Profile />
            </Content>
          </Layout>
        </Layout>
      </div>
    </div>
  );
}

export default Sidebar;
