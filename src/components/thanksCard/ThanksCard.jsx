import React, { useEffect } from "react";
import "./ThanksCard.scss";
import thankyou from "../../assets/1.png";
import { Button, ConfigProvider, message } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";

function ThanksCard() {
  const nav = useNavigate();
  
  const paymentId = localStorage.getItem("paymentId"); 

  useEffect(() => {
    const updatePaymentStatus = async () => {
      if (paymentId) {
        try {
          const response = await api.put(`/Payments/update-payment/${paymentId}?PaymentStatus=Paid`);
          
          if (response.status === 200 && response.data.error === 0) {
            message.success("Payment status updated successfully!");
            localStorage.removeItem("paymentId");
          } else {
            message.success("Payment status updated successfully!");
          }
        } catch (error) {
          message.error("An error occurred while updating payment status.");
          console.error("API Error:", error);
        }
      }
    };

    
    updatePaymentStatus();
  }, []);
  return (
    <div className="thankyou-card">
      <img
        src="https://knockouts.com/bellevue-ne/wp-content/uploads/sites/68/2020/03/knockouts-franchise-locations-header-2020.jpg"
        alt="maverick barber"
        className="thankyou-card__header-img"
      />
      <div className="thankyou-card__detail">
        <div className="thankyou-card__detail__img">
          <img src={thankyou} alt="thank you" />
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
            <Button
              onClick={() => nav("/user-profile/track-booking")}
              className="thankyou-card__detail__details__button"
            >
              Booking Status
            </Button>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}

export default ThanksCard;
