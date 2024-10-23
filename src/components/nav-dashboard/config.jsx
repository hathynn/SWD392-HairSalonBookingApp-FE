import {
  SolutionOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  DollarCircleOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";


export const navDashboardConfig = [
  {
    key: "1",
    icon: <CalendarOutlined />,
    label: "Bookings",
  },
  {
    key: "2",
    icon: <UserOutlined style={{ fontSize: "1.4em" }} />,
    label: "Stylist",
  },
  {
    key: "11",
    icon: <DollarCircleOutlined style={{ fontSize: "1.4em" }} />,
    label: "Revenue",
  },
];
export const navDashboardConfigCustomer = [
  {
    key: "1",
    icon: <CalendarOutlined />,
    label: "Request Bookings",
  },
  {
    key: "2",
    icon: <UserOutlined style={{ fontSize: "1.4em" }} />,
    label: "Stylist",
  },
  
  {
    key: "3",
    icon: <DollarCircleOutlined style={{ fontSize: "1.4em" }} />,
    label: "Services",
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
    label: "Services",
  },
  
];

export const navDashboardConfigStaff = [
  {
    key: "7",
    icon: <CalendarOutlined />,
    label: "Bookings",
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

export const navDashboardConfigStylist = [
  {
    key: "9",
    icon: <CalendarOutlined />,
    label: "Bookings",
  },
  {
    key: "10",
    icon: <DollarCircleOutlined />,
    label: "Salary",
  },
  {
    key: "11",
    icon: <DollarCircleOutlined />,
    label: "Feedbacks",
  },
];

export const navpath = {
  1: {
    path: "/dashboard/manager/bookings",
  },
  2: {
    path: "/dashboard/manager/stylists",
  },
  3: {
    path: "/dashboard/manager/revenue",
  },
  4: {
    path: "/dashboard/admin/users",
  },
  5: {
    path: "/dashboard/admin/summary",
  },
  6: {
    path: "/dashboard/admin/services",
  },
  7: {
    path: "/dashboard/salonstaff/bookings",
  },
  81: {
    path: "/dashboard/salonstaff/view-request",
  },
  83: {
    path: "/dashboard/salonstaff/send-request",
  },
  9: {
    path: "/dashboard/stylist/bookings",
  },
  10: {
    path: "/dashboard/stylist/salary",
  },
  11: {
    path: "/dashboard/stylist/feedbacks",
  },
};

export default navDashboardConfig;
