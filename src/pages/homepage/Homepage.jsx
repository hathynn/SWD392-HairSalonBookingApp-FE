import React from "react";
import "./Homepage.scss";
import Header from "../../components/header/Header";
import "./Homepage.scss";
import { Button, ConfigProvider } from "antd";
function Homepage() {
  return (
    <div>
      <div className="hero">
        <img
          src="https://knockouts.com/bellevue-ne/wp-content/uploads/sites/68/2020/03/knockouts-franchise-locations-header-2020.jpg"
          alt="maverick barber"
          className="hero__img"
        />
        <div className="hero__overlay-text">Maverick Haircuts & Grooming</div>
        <div className="hero__button">
          {" "}
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
            <Button className="hero__button__buttons">Book Now</Button>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
