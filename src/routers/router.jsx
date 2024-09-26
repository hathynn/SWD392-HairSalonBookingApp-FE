import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Homepage from "../pages/homepage/Homepage";
import Login from "../pages/login/login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        {/* <Header /> */}
        <Outlet />
        {/* <Footer /> */}
      </div>
    ),
    children: [
      {
        path: "/",
        element: <Homepage/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/sign-up",
        element: <Homepage/>,
      },
    ],
  },
]);
