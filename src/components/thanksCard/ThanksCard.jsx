import React from "react";
import "./ThanksCard.scss";
import thankyou from "../../assets/1.png";
import { Button, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
function ThanksCard() {
  const nav = useNavigate();
  return (
    <div className="thankyou-card">
      <img
        src="https://knockouts.com/bellevue-ne/wp-content/uploads/sites/68/2020/03/knockouts-franchise-locations-header-2020.jpg"
        alt="maverick barber"
        className="thankyou-card__header-img"
      />
      <div className="thankyou-card__detail">
        <div className="thankyou-card__detail__img">
          {" "}
          <img src={thankyou} />
        </div>
        <div className="thankyou-card__detail__details">
          <h1>Thank you for your booking!</h1>
          <div className="thankyou-card__detail__details__content">
            <p className="thankyou-card__detail__details__content__upper">
              Your booking has been paid successfully!
            </p>
            <p className="thankyou-card__detail__details__content__lower">
              Check your booking progress in your profile information.
            </p>
          </div>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultColor: "#FAA300",
                  defaultBg: "black",
                  defaultBorderColor: "black",
                  defaultHoverBorderColor: "#FAA300",
                  defaultHoverColor: "black",
                  defaultHoverBg: "#FAA300",
                  defaultActiveBg: "black",
                  defaultActiveBorderColor: "black",
                  defaultActiveColor: "#FAA300",
                },
              },
            }}
          >
            <Button onClick={() => nav("/user-profile/track-booking")} className="thankyou-card__detail__details__button">
              Booking Status
            </Button>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}

export default ThanksCard;
