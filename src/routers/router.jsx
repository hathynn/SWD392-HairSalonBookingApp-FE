import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Homepage from "../pages/homepage/Homepage";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Pincode from "../pages/pinCode/Pincode";
import AboutUs from "../pages/aboutUs/AboutUs";
import Profile from "../pages/profile/pages/Profile";
import Sidebar from "../pages/profile/layout/Sidebar";
import Booking from "../pages/booking/Booking";
import Main from "../pages/dashboard/layout/main-dashboard/Main";
import HistoryBooking from "../pages/profile/pages/historyBooking/HistoryBooking";
import BookingManager from "../pages/dashboard/pages/manager/bookingManager/BookingManager";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/user-profile",
        element: <Sidebar />,
      },
      {
        path: "/booking",
        element: <Booking />,
      },
      {
        path: "/history-bookings",
        element: <HistoryBooking />,
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

  //dashboard
  {
    path: "/dashboard",
    element: <Main />,
    children: [
      {
        path: "/dashboard/manager",
        element: <BookingManager/>,
      },
      {
        path: "/dashboard/manager/bookings",
        element: <BookingManager/>,
      },
    ],
  },
]);
