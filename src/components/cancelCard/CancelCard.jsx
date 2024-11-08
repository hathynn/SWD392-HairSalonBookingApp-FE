import React, { useEffect } from "react";
import "./CancelCard.scss";
import thankyou from "../../assets/1.png";
import { Button, ConfigProvider, message } from "antd";
import { useNavigate } from "react-router-dom";
import { CloseCircleTwoTone } from "@ant-design/icons";
import api from "../../config/axios";
function CancelCard() {
  const nav = useNavigate();

  const paymentId = localStorage.getItem("paymentId"); 

  
    const updatePaymentStatus = async () => {
      console.log(paymentId)
      if (paymentId) {
        try {
          const response = await api.put(`/Payments/update-payment/${paymentId}?PaymentStatus=Cancel`);
          
          if (response.status === 200 && response.data.error === 0) {
            message.success("Payment status updated successfully!");
            localStorage.removeItem("paymentId");
          } else {
            message.error("Failed to update payment status.");
          }
        } catch (error) {
          message.error("An error occurred while updating payment status.");
          console.error("API Error:", error);
        }
      }
    };

    useEffect(() => {
      updatePaymentStatus();
    }, []);

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
