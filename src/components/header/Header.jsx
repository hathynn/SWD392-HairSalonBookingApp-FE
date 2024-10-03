import React from "react";
import Logo from "../logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { Button, ConfigProvider, Flex } from "antd";
import logo from "../../assets/logo.png";
import logo2 from "../../assets/logo3.png";
import "./Header.scss";

function Header() {
  const nav = useNavigate();
  return (
    <div className="header">
      <Flex justify="space-between" className="header__item">
        <Link to="/">
          <img className="header__item__logo" src={logo2} />
        </Link>
        <Flex className="header__item__menu">
          <p>Home</p>
          <p>Booking</p>
          <p>Service</p>
         
        </Flex>
        <Flex className="header__item__button">
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultColor:'rgb(190, 190, 190)',
                    defaultBg: "none",
                    defaultBorderColor:'rgb(190, 190, 190)',
                    defaultHoverBorderColor: "white",
                    defaultHoverColor: "white",
                    defaultHoverBg:'none',
                    defaultActiveBg: "none",
                    defaultActiveBorderColor: "black",
                    defaultActiveColor: "white",
                   
                  },
                },
              }}
            >
              <Link to="/login">
                <Button className="header__item__button__left">
                  Login
                </Button>
              </Link>
            </ConfigProvider>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultColor:'black',
                    defaultBg: "rgb(190, 190, 190)",
                    defaultBorderColor:'rgb(190, 190, 190)',
                    defaultHoverBorderColor: "white",
                    defaultHoverColor: "black",
                    defaultHoverBg:'white',
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
  );
}

export default Header;
