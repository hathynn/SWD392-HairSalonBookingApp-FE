import { createBrowserRouter, Outlet } from "react-router-dom";
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
        path: "/user-profile/",
        element: <Sidebar />, 
        children: [
          {
            path: "profile",
            element: <Profile />, 
          },
          {
            path: "track-booking",
            element: <BookingCustomer />, 
          },
          {
            path: "history-bookings",
            element: <HistoryBooking />, 
          },
        ],
      },
      {
        path: "/thank-you",
        element: <ThanksCard />,
      },
      {
        path: "/booking",
        element: <Booking />,
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
