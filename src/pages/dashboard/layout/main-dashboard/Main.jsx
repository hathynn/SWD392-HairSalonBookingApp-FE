import { Layout, Drawer } from "antd";
import "./Main.scss";
import NavDashboard from "../../../../components/nav-dashboard/NavDashboard";
import Header from "../header-dasboard/Header";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { LeftCircleFilled } from "@ant-design/icons";
import SideNav from "../side-nav/SideNav";

const { Content, Sider } = Layout;

function Main({children}) {
  const [isExpand, setIsExpand] = useState(false);
  const [visible, setVisible] = useState(false);

  const openDrawer = () => setVisible(!visible);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");
  return (
    <Layout className="layout-dashboard">
      <Drawer
        title={false}
        placement="left"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key="left"
        width={300}
        className="drawer-sidebar"
        style={{ backgroundColor: "#1f1f1f" }}
      >
        <Layout>
          <SideNav />
        </Layout>
      </Drawer>

      <Sider
        collapsed={isExpand}
        collapsedWidth={90}
        trigger={null}
        width={300}
        style={{
          backgroundColor: "transparent",
          transition: "all 0.5s ease-out",
        }}
        className="sider-primary ant-layout-sider-primary sider-toggle"
      >
        {/* <LeftCircleFilled
          className={`expand-icon ${isExpand ? "rotate" : ""}`}
          onClick={() => setIsExpand(!isExpand)}
        /> */}
        <SideNav style={{ width: "100%" }} />
      </Sider>
      <Layout>
        <Header onPress={openDrawer} name={pathname} subName={pathname} />
        <div className="div-ant" style={{ height: "86vh", overflowY:'scroll' }}>
          <Outlet />
        </div>
      </Layout>
    </Layout>
  );
}

export default Main;
