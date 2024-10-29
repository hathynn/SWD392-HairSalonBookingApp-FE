import React from "react";
import "./CancelCard.scss";
import thankyou from "../../assets/1.png";
import { Button, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
import { CloseCircleTwoTone } from "@ant-design/icons";
function CancelCard() {
  const nav = useNavigate();
  return (
    <div className="cancel-card">
      <img
        src="https://knockouts.com/bellevue-ne/wp-content/uploads/sites/68/2020/03/knockouts-franchise-locations-header-2020.jpg"
        alt="maverick barber"
        className="cancel-card__header-img"
      />
      <div className="cancel-card__detail">
       
        <CloseCircleTwoTone  twoToneColor="#F95454" className="cancel-card__detail__img"/>
        
        <div className="cancel-card__detail__details">
          <h1>Your payment was cancelled!</h1>
          <div className="cancel-card__detail__details__content">
            <p className="cancel-card__detail__details__content__upper">
            Your payment has been successfully cancelled. You can try again later <br/> or contact support if you have any issues.
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
            <Button onClick={() => nav("/")} className="cancel-card__detail__details__button">
              Go back to homepage
            </Button>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}

export default CancelCard;
