import { Button, Card, Col, ConfigProvider, message, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import "./Booking.scss";
import Logo from "../../assets/logo2.png";
import api from "../../config/axios";
import { LoadingOutlined } from "@ant-design/icons";

function ServiceCategory({ selectedService, setSelectedService, onNext }) {
  const [comboServices, setComboServices] = useState([]);

  const getComboServices = async () => {
    try {
      const response = await api.get("Combo/getAll-comboServices");
      const data = response.data.data;
      setComboServices(data);
    } catch (error) {
      message.error("Failed to fetch combo services");
    }
  };

  useEffect(() => {
    getComboServices();
  }, []);

  const handleSelectService = (service) => {
    setSelectedService(service); // Only allow one service to be selected
  };

  return (
    <div className="service-container">
      <p className="service-container__title">
        Hair Salon Service &nbsp;
        <span style={{ color: "grey", fontStyle: "italic" }}>
          (Selected service:{" "}
          {selectedService ? selectedService.comboServiceName : "None"})
        </span>
      </p>
      <div className="service-container__scroll">
        <Row gutter={[16, 16]}>
          {comboServices.length > 0 ? (
            comboServices.map((service) => (
              <Col span={6} key={service.id}>
                <Card
                  cover={
                    <img
                      alt={service.comboServiceName}
                      src={service.image || Logo}
                      style={{
                        borderRadius: "0px",
                        height: "20vh",
                        objectFit: "cover",
                      }}
                    />
                  }
                  className="service-container__card"
                >
                  <div className="service-container__card__content">
                    <p className="service-container__card__content__title">
                      {service.comboServiceName}
                    </p>
                    <p className="service-container__card__content__subtitle">
                      {service.comboDetails
                        .map((detail) => detail.content)
                        .join(" - ")}
                    </p>
                  </div>

                  <div className="service-container__card__buttons">
                    <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            defaultColor: "black",
                            defaultBg: "none",
                            defaultBorderColor: "#FAA300",
                            defaultHoverBorderColor: "#FAA300",
                            defaultHoverColor: "black",
                            defaultHoverBg: "white",
                            defaultActiveBg: "white",
                            defaultActiveBorderColor: "#FAA300",
                            defaultActiveColor: "black",
                          },
                        },
                      }}
                    >
                      <Button className="service-container__card__buttons__left">
                        {service.price} VND
                      </Button>
                    </ConfigProvider>
                    <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            defaultColor: "black",
                            defaultBg:
                              selectedService &&
                              selectedService.id === service.id
                                ? "#000"
                                : "#FAA300",
                            defaultBorderColor: "#FAA300",
                            defaultHoverBorderColor: "#FAA300",
                            defaultHoverColor: "white",
                            defaultHoverBg: "black",
                            defaultActiveBg: "#FAA300",
                            defaultActiveBorderColor: "#FAA300",
                            defaultActiveColor: "black",
                          },
                        },
                      }}
                    >
                      <Button
                        className="service-container__card__buttons__right"
                        style={{
                          backgroundColor:
                            selectedService && selectedService.id === service.id
                              ? "black"
                              : "#FAA300",
                          color:
                            selectedService && selectedService.id === service.id
                              ? "white"
                              : "black",
                          borderColor:
                            selectedService && selectedService.id === service.id
                              ? "black"
                              : "#FAA300",
                        }}
                        onClick={() => handleSelectService(service)}
                      >
                        ✓
                      </Button>
                    </ConfigProvider>
                  </div>
                </Card>
              </Col>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                margin: "5em 0",
              }}
            >
              <Spin
                style={{ marginTop: "10em" }}
                indicator={<LoadingOutlined spin />}
                size="large"
              />
            </div>
          )}
        </Row>
      </div>
    </div>
  );
}

export default ServiceCategory;
