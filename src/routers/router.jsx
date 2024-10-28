import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Homepage from "../pages/homepage/Homepage";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Pincode from "../pages/pinCode/Pincode";
import AboutUs from "../pages/aboutUs/AboutUs";
import Sidebar from "../pages/profile/layout/Sidebar";
import Main from "../pages/dashboard/layout/main-dashboard/Main";
import HistoryBooking from "../pages/profile/pages/historyBooking/HistoryBooking";
import BookingManager from "../pages/dashboard/pages/manager/bookingManager/BookingManager";
import Page404 from "../pages/page404/Page404";
import ThanksCard from "../components/thanksCard/ThanksCard";
import BookingCustomer from "../pages/profile/pages/bookingCustomer/BookingCustomer";
import Profile from "../pages/profile/pages/profile/Profile";
import ResetPassword from "../pages/resetPassword/ResetPassword";
import Booking from "../pages/booking/Booking";
import VerifyMail from "../pages/resetPassword/VerifyMail";
import ViewService from "../pages/dashboard/pages/manager/serviceManager/viewService/ViewService";
import AddCombo from "../pages/dashboard/pages/manager/comboManager/addCombo/AddCombo";
import ViewCombo from "../pages/dashboard/pages/manager/comboManager/viewCombo/ViewCombo";
import StylistManager from "../pages/dashboard/pages/manager/stylistManager/StylistManager";
import SalonAdmin from "../pages/dashboard/pages/admin/salonAdmin/SalonAdmin";
import RegisterWorkshifts from "../pages/dashboard/pages/stylist/register-workshift/RegisterWorkshifts";
import BookingAssigned from "../pages/dashboard/pages/stylist/booking-applied/BookingAssigned";
import BookingStaff from "../pages/dashboard/pages/staff/bookingStaff/BookingStaff";
import { selectUser } from "../redux/features/counterSlice";
import { useSelector } from "react-redux";
import ScrollToTop from "../components/ScrollToTop";
import { message } from "antd";

const ProtectedRouteAuth = ({ children }) => {
  const user = useSelector(selectUser);
  if (!user) {
   message.error("You need to login first!!");
    return <Navigate to="/login" replace />;
  }
  return children;
};

const ProtectedRouteCustomer = ({ children }) => {
  const user = useSelector(selectUser);
  if (
    user?.Role === "Admin" ||
    user?.Role === "Salon Manager" ||
    user?.Role === "Salon Staff" ||
    user?.Role === "Stylist"
  ) {
    message.error("You do not have permission to access this page.");
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

const ProtectedDashboard = ({ children }) => {
  const user = useSelector(selectUser);
  console.log(user);

  const validRoles = ["Admin", "Salon Manager", "Salon Staff", "Stylist"];

  if (!validRoles.includes(user?.Role)) {
    return <Navigate to="*" replace />;
  }

  return children;
};

const ProtectedRouteAdmin = ({ children }) => {
  const user = useSelector(selectUser);
  if (user?.Role !== "Admin") {
    message.error("You do not have permission to access this page.");
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

const ProtectedRouteManager = ({ children }) => {
  const user = useSelector(selectUser);
  if (user?.Role !== "Salon Manager") {
    message.error("You do not have permission to access this page.");
    return <Navigate to="/dashboard/manager/bookings" replace />;
  }
  return children;
};

const ProtectedRouteSalonStaff = ({ children }) => {
  const user = useSelector(selectUser);
  if (user?.Role !== "Salon Staff") {
    message.error("You do not have permission to access this page.");
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

const ProtectedRouteStylist = ({ children }) => {
  const user = useSelector(selectUser);
  if (user?.Role !== "Stylist") {
    message.error("You do not have permission to access this page.");
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <ScrollToTop />
        <Header />
        <Outlet />
        <Footer />
      </div>
    ),
    children: [
      {
        path: "/",
        element: (
          <ProtectedRouteCustomer>
            <Homepage />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: "/about-us",
        element: (
          <ProtectedRouteCustomer>
            {" "}
            <AboutUs />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: "/user-profile/",
        element: <Sidebar />,
        children: [
          {
            path: "profile",
            element: (
              <ProtectedRouteCustomer>
                <Profile />
              </ProtectedRouteCustomer>
            ),
          },
          {
            path: "track-booking",
            element: (
              <ProtectedRouteCustomer>
                <BookingCustomer />
              </ProtectedRouteCustomer>
            ),
          },
          {
            path: "history-bookings",
            element: (
              <ProtectedRouteCustomer>
                <HistoryBooking />
              </ProtectedRouteCustomer>
            ),
          },
        ],
      },
      {
        path: "/thank-you",
        element: (
          <ProtectedRouteCustomer>
            <ThanksCard />
          </ProtectedRouteCustomer>
        ),
      },
      {
        path: "/booking",
        element: (
          <ProtectedRouteCustomer>
            <Booking />
          </ProtectedRouteCustomer>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Register />,
  },
  {
    path: "/pin-code",
    element: <Pincode />,
  },
  {
    path: "/recovery-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-mail",
    element: <VerifyMail />,
  },
  {
    path: "*",
    element: <Page404 />,
  },

  //dashboard
  {
    path: "/dashboard",
    element: (
      <ProtectedDashboard>
        <Main />
      </ProtectedDashboard>
    ),
    children: [
      //manager
      {
        path: "/dashboard/manager",
        element: (
          <ProtectedRouteManager>
            <BookingManager />
          </ProtectedRouteManager>
        ),
      },
      {
        path: "/dashboard/manager/bookings",
        element: (
          <ProtectedRouteManager>
            <BookingManager />
          </ProtectedRouteManager>
        ),
      },

      {
        path: "/dashboard/manager/service",
        element: (
          <ProtectedRouteManager>
            <ViewService />
          </ProtectedRouteManager>
        ),
      },
      {
        path: "/dashboard/manager/add-combo",
        element: (
          <ProtectedRouteManager>
            <AddCombo />
          </ProtectedRouteManager>
        ),
      },
      {
        path: "/dashboard/manager/view-combo",
        element: (
          <ProtectedRouteManager>
            <ViewCombo />
          </ProtectedRouteManager>
        ),
      },
      {
        path: "/dashboard/manager/stylist-manage",
        element: (
          <ProtectedRouteManager>
            <StylistManager />
          </ProtectedRouteManager>
        ),
      },

      //admin
      {
        path: "/dashboard/admin/salon-manage",
        element: (
          <ProtectedRouteAdmin>
            <SalonAdmin />
          </ProtectedRouteAdmin>
        ),
      },

      //stylist
      {
        path: "/dashboard/stylist",
        element: (
          <ProtectedRouteStylist>
            <BookingAssigned />
          </ProtectedRouteStylist>
        ),
      },
      {
        path: "/dashboard/stylist/register-workshifts",
        element: (
          <ProtectedRouteStylist>
            <RegisterWorkshifts />
          </ProtectedRouteStylist>
        ),
      },

      //staff
      {
        path: "/dashboard/staff",
        element: (
          <ProtectedRouteSalonStaff>
            <BookingStaff />
          </ProtectedRouteSalonStaff>
        ),
      },
    ],
  },
]);
