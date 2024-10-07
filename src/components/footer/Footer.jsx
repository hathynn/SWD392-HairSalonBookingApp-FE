import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { Button, ConfigProvider, Flex } from "antd";
import "./Footer.scss";

function Footer() {
  return (
    <div>
      <Flex justify="space-between" className="footer">
        <Link to="/">
          <img className="footer__logo" src={logo} />
        </Link>
        <div className="footer__item">
          <h4 className="footer__item__title">Menu</h4>
          <p className="footer__item__content ">About</p>
          <p className="footer__item__content ">Booking</p>
          <p className="footer__item__content ">Service</p>
        </div>
        <div className="footer__item">
          <h4 className="footer__item__title">Location</h4>
          <p className="footer__item__content">L1: 34 Street C, District A</p>
          <p className="footer__item__content">L2: 4 Street B, District B</p>
          <p className="footer__item__content">L3: 34 Street H, District J</p>
        </div>
        <div className="footer__item">
          <h4 className="footer__item__title">Operational</h4>
          <p className="footer__item__content">Mon-Fri:8:00AM - 9:00PM</p>
          <p className="footer__item__content">Sat-Sun:8:00AM - 4:00PM</p>
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
            <Button className="footer__item__button">Book now</Button>
          </ConfigProvider>
        </div>
      </Flex>
      <p
        style={{
          fontFamily: "Gantari",
          display: "flex",
          justifyContent: "flex-end",
          fontSize: "0.9em",
          paddingRight: "4em",
          marginTop: "4em",
          marginBottom:"1em",
          fontWeight:'bolder'
        }}
      >
        © 2024, Maverick Barber Shop.
      </p>
    </div>
  );
}

export default Footer;
