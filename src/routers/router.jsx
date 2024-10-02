import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Homepage from "../pages/homepage/Homepage";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Pincode from "../pages/pinCode/Pincode";


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
        element: <Homepage/>,
      },
      
    ],
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/sign-up",
    element: <Register/>,
  },
  {
    path: "/pin-code",
    element: <Pincode/>,
  },
]);
