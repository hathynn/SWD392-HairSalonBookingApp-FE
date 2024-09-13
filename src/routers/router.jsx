import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Homepage from "../pages/homepage/Homepage";

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
]);
