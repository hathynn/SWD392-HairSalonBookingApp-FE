import React from "react";
import Logo from "../logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { Button, ConfigProvider, Flex } from "antd";
import logo from "../../assets/logo.png";
import logo2 from "../../assets/logo3.png";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../redux/features/counterSlice";

function Header() {
  const nav = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const logOut = () => {
    setCustomer(null);
    localStorage.removeItem("Customer");
    nav("/");
  };
  console.log(user);

  return (
    <div>
      {user ? (
        <div className="header">
          <Flex justify="space-between" className="header__item">
            <Link to="/">
              <img className="header__item__logo" src={logo2} />
            </Link>
            <Flex className="header__item__menu">
              <p onClick={() => nav("/")}>Home</p>
              <p onClick={() => nav("/booking")}>Booking</p>
              <p onClick={() => nav("/about-us")}>About us</p>
            </Flex>
            <Flex className="header__item__profile">
              <p onClick={() => nav("/user-profile/profile")}>Profile</p>
              <p
                onClick={() => {
                  localStorage.removeItem("token");
                  dispatch(logout());
                  nav("/");
                }}
              >
                Logout
              </p>
            </Flex>
          </Flex>
        </div>
      ) : (
        <div className="header">
          <Flex justify="space-between" className="header__item">
            <Link to="/">
              <img className="header__item__logo" src={logo2} />
            </Link>
            <Flex className="header__item__menu">
              <p onClick={() => nav("/")}>Home</p>
              <p onClick={() => nav("/services")}>Services</p>
              <p onClick={() => nav("/about-us")}>About us</p>
            </Flex>
            <Flex className="header__item__button">
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      defaultColor: "rgb(190, 190, 190)",
                      defaultBg: "none",
                      defaultBorderColor: "rgb(190, 190, 190)",
                      defaultHoverBorderColor: "white",
                      defaultHoverColor: "white",
                      defaultHoverBg: "none",
                      defaultActiveBg: "none",
                      defaultActiveBorderColor: "black",
                      defaultActiveColor: "white",
                    },
                  },
                }}
              >
                <Link to="/login">
                  <Button className="header__item__button__left">Login</Button>
                </Link>
              </ConfigProvider>
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      defaultColor: "black",
                      defaultBg: "rgb(190, 190, 190)",
                      defaultBorderColor: "rgb(190, 190, 190)",
                      defaultHoverBorderColor: "white",
                      defaultHoverColor: "black",
                      defaultHoverBg: "white",
                      defaultActiveBg: "none",
                      defaultActiveBorderColor: "black",
                      defaultActiveColor: "white",
                    },
                  },
                }}
              >
                <Link to="/sign-up">
                  <Button className="header__item__button__right">
                    Sign Up
                  </Button>
                </Link>
              </ConfigProvider>
            </Flex>
          </Flex>
        </div>
      )}
    </div>
  );
}

export default Header;
