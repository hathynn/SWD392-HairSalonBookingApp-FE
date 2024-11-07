import {
  SolutionOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  DollarCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  LogoutOutlined,
  ScissorOutlined,
  ProductOutlined,
  PullRequestOutlined,
  ShopOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";


export const navDashboardConfig = [
  {
    key: "1",
    icon: <PullRequestOutlined />,
    label: "Booking Request",
  },
  {
    key: "2",
    icon: <UserOutlined style={{ fontSize: "1.4em" }} />,
    label: "Stylist",
  },
  {
    key: "4",
    icon: <ProductOutlined  style={{ fontSize: "1.4em" }} />,
    label: "Combo",
    children: [
      {
        key: "41",
        label: "View all combo",
      },
      {
        key: "42",
        label: "Create a combo",
      },
     
    ],
  },
  {
    key: "3",
    icon: <ScissorOutlined  style={{ fontSize: "1.4em" }} />,
    label: "Service",
  },
  
 
];
export const navDashboardConfigCustomer = [
 
  
];

export const navDashboardConfigAdmin = [
  {
    key: "5",
    icon: <SolutionOutlined />,
    label: "Summary",
  },
  {
    key: "8",
    icon: <TeamOutlined />,
    label: "Users",
  },
  {
    key: "15",
    icon: <TeamOutlined />,
    label: "Salon Members",
  },
  {
    key: "6",
    icon: <ShopOutlined />,
    label: "Salon System",
  },
  {
    key: "14",
    icon: <ShoppingCartOutlined />,
    label: "Service",
  },
];

export const navDashboardConfigStaff = [
  {
    key: "7",
    icon: <CalendarOutlined />,
    label: "Booking Request",
  },
];

export const navDashboardConfigStylist = [
  {
    key: "9",
    icon: <CalendarOutlined />,
    label: "Appoinments",
  },
  // {
  //   key: "10",
  //   icon: <DollarCircleOutlined />,
  //   label: "Salary",
  // },
  // {
  //   key: "11",
  //   icon: <DollarCircleOutlined />,
  //   label: "Feedback",
  // },
  {
    key: "13",
    icon: <CarryOutOutlined />,
    label: "Schedule",
  },
];

export const navpath = {
  1: {
    path: "/dashboard/manager/bookings",
  },
  2: {
    path: "/dashboard/manager/stylist-manage",
  },
  3: {
    path: "/dashboard/manager/service",
  },
  41: {
    path: "/dashboard/manager/view-combo",
  },
  42: {
    path: "/dashboard/manager/add-combo",
  },
  6: {
    path: "/dashboard/admin/salon-manage",
  },
  5: {
    path: "/dashboard/admin",
  },
  14: {
    path: "/dashboard/admin/services-manage",
  },
  15: {
    path: "/dashboard/admin/members-manage",
  },
  8: {
    path: "/dashboard/admin/user-manage",
  },
  7: {
    path: "/dashboard/staff",
  },
  81: {
    path: "/dashboard/salonstaff/view-request",
  },
  83: {
    path: "/dashboard/salonstaff/send-request",
  },
  9: {
    path: "/dashboard/stylist",
  },
  // 10: {
  //   path: "/dashboard/stylist/salary",
  // },
  // 11: {
  //   path: "/dashboard/stylist/feedbacks",
  // },
  12: {
    path: "/dashboard/stylist/schedule",
  },
  13: {
    path: "/dashboard/stylist/register-workshifts",
  },
};

export default navDashboardConfig;
