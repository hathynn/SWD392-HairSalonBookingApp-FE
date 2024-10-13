import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Layout, Drawer, Affix, Card } from "antd";
import SideNav from "../side-nav/SideNav";
import Header from "../header-dasboard/Header";
import "./Main.scss";
import { LeftCircleFilled, LeftCircleTwoTone } from "@ant-design/icons";
import { AiOutlineLogout } from "react-icons/ai";

const { Content, Sider } = Layout;

function Main({ children }) {
  const [isExpand, setIsExpand] = useState(false);
  const [visible, setVisible] = useState(false);

 

  return (
    <Layout className="layout-dashboard">
     
    </Layout>
  );
}

export default Main;
