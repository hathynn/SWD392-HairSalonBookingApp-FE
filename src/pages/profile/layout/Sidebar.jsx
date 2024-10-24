import React, { useState } from "react";
import {
  CalendarOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux"; 
import "./Sidebar.scss"; 
import { logout } from "../../../redux/features/counterSlice";

const { Sider, Content } = Layout;

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = (e) => {
    console.log("Clicked menu key:", e.key);
    if (e.key === "logout") {
      console.log("Logging out...");
      localStorage.removeItem("token");
      dispatch(logout());
      navigate("/");
    } else {
      navigate(`/user-profile/${e.key}`);
    }
  };
  

  return (
    <div className="profile-page">
      <img
        src="https://knockouts.com/bellevue-ne/wp-content/uploads/sites/68/2020/03/knockouts-franchise-locations-header-2020.jpg"
        alt="maverick barber"
        className="profile-page__header-img"
      />
      <div className="profile-page__header-text">Profile.</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Layout style={{ backgroundColor: "white", padding: "10vh 10vw" }}>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{ backgroundColor: "white" }}
          >
            <div className="demo-logo-vertical" />
            <Menu
              mode="inline"
              className="menu-sidebar"
              onClick={handleMenuClick}
              items={[
                {
                  key: "profile",
                  icon: <UserOutlined />,
                  label: "Profile",
                },
                {
                  key: "track-booking",
                  icon: <CalendarOutlined />,
                  label: "Bookings",
                },
                {
                  key: "history-bookings",
                  icon: <CalendarOutlined />,
                  label: "History",
                },
              ]}
            />
            <Menu
              mode="inline"
              className="menu2-sidebar"
              onClick={handleMenuClick}
              items={[
                {
                  key: "logout", // Cập nhật key là "logout"
                  icon: <LogoutOutlined />,
                  label: "Logout",
                },
              ]}
            />
          </Sider>
          <Layout style={{ backgroundColor: "white" }}>
            <Content className="custom-content">
              <Outlet /> 
            </Content>
          </Layout>
        </Layout>
      </div>
    </div>
  );
}

export default Sidebar;
