import React from "react";
import "./Page404.scss";
import { Button, ConfigProvider } from "antd";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import { useNavigate } from "react-router-dom";

function Page404() {
  const user = useSelector(selectUser);
  const nav =useNavigate();

  let homeLink = "/";
  if (user?.Role === "Admin") {
    homeLink = "/dashboard";
  } else if (user?.Role === "Manager") {
    homeLink = "/dashboard/manager";
  } else if (user?.Role === "Customer") {
    homeLink = "/";
  } else if (user?.Role === "SalonStaff") {
    homeLink = "/dashboard/staff";
  }

  return (
    <div className="page404">
      <h1>404</h1>
      <h3>Oops, This Page Not Found!</h3>
      <h4>The link might be corrupted.</h4>
      <p>or the page have been removed.</p>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultColor: "black",
              defaultBg: "#FAA300",
              defaultBorderColor: "#FAA300",
              defaultHoverBorderColor: "black",
              defaultHoverColor: "white",
              defaultHoverBg: "black",
              defaultActiveBg: "#FAA300",
              defaultActiveBorderColor: "#FAA300",
              defaultActiveColor: "black",
            },
          },
        }}
      >
        <Button onClick={() => nav(homeLink)} className="page404__button">Go back</Button>
      </ConfigProvider>
    </div>
  );
}

export default Page404;
