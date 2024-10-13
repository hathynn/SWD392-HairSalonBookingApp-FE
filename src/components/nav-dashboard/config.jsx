import {
  SolutionOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import { PiTicketLight } from "react-icons/pi";

export const navDashboardConfig = [
  {
    key: "1",
    icon: <ShoppingCartOutlined />,
    label: "Orders",
  },
  {
    key: "2",
    icon: <PiTicketLight style={{ fontSize: "1.4em" }} />,
    label: "Vouchers",
  },
  {
    key: "11",
    icon: <SolutionOutlined style={{ fontSize: "1.4em" }} />,
    label: "Requests",
  },
  {
    key: "14",
    icon: <TeamOutlined />,
    label: "Staff",
    children: [
      {
        key: "141",
        label: "Sale Staff",
      },
      {
        key: "142",
        label: "Delivery Staff",
      },
    ],
  },
];

export const navDashboardConfigAdmin = [

  {
    key: "5",
    icon: <SolutionOutlined />,
    label: "Summary",
  },
  {
    key: "4",
    icon: <TeamOutlined />,
    label: "Users",
  },
  {
    key: "13",
    icon: <ShoppingCartOutlined />,
    label: "Orders",
  },
  
];

export const navDashboardConfigStaff = [
  {
    key: "7",
    icon: <TeamOutlined />,
    label: "Orders",
  },
  {
    key: "8",
    icon: <SolutionOutlined />,
    label: "Requests",
    children: [
      {
        key: "81",
        label: "View request status",
      },
      {
        key: "83",
        label: "Send a request",
      },
    ],
  },
];

export const navDashboardConfigDelivery = [
  {
    key: "9",
    icon: <TeamOutlined />,
    label: "Delivery",
  },
];

export const navpath = {
  1: {
    path: "/dashboard/manager/orders",
  },
  2: {
    path: "/dashboard/manager/voucher",
  },
  3: {
    path: "/dashboard/manager/products",
  },
  4: {
    path: "/dashboard/admin/users",
  },
  5: {
    path: "/dashboard/admin/summary",
  },
  6: {
    path: "/dashboard/admin/transaction",
  },
  7: {
    path: "/dashboard/salestaff/orders",
  },
  81: {
    path: "/dashboard/salestaff/view-inbox",
  },
  82: {
    path: "/dashboard/salestaff/send-mail",
  },
  83: {
    path: "/dashboard/salestaff/send-request",
  },
};

export default navDashboardConfig;
