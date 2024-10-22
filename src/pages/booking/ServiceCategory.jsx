import { Button, Card, Col, ConfigProvider, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import "./Booking.scss";
import Logo from "../../assets/logo2.png";
import api from "../../config/axios";

function ServiceCategory({ personalInfo, setPersonalInfo, onNext }) {
  const [comboServices, setComboServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]); // Track selected services

  const handleChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

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

  // Handle service selection
  const handleSelectService = (service) => {
    const isAlreadySelected = selectedServices.find(
      (selected) => selected.id === service.id
    );

    if (isAlreadySelected) {
      // If service is already selected, remove it
      setSelectedServices((prev) =>
        prev.filter((selected) => selected.id !== service.id)
      );
    } else {
      // Otherwise, add it to the selected services
      setSelectedServices((prev) => [...prev, service]);
    }
  };

  return (
    <div className="service-container">
      <p className="service-container__title">
        Hair Salon Service &nbsp;
        <span style={{ color: "grey", fontStyle: "italic" }}>
          (Number of service(s): {comboServices.length})
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
                      style={{ borderRadius: "0px", height: "20vh" }}
                    />
                  }
                  className="service-container__card"
                >
                  <div className="service-container__card__content">
                    <p className="service-container__card__content__title">
                      {service.comboServiceName}
                    </p>
                    <p className="service-container__card__content__subtitle">
                      Price: {service.price}$
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
                      <Button className="service-container__card__buttons__left">
                        {service.price}$
                      </Button>
                    </ConfigProvider>
                    <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            defaultColor: "black",
                            defaultBg: selectedServices.some(
                              (s) => s.id === service.id
                            )
                              ? "#000"
                              : "#FAA300", // Change button color based on selection
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
                          backgroundColor: selectedServices.some(
                            (s) => s.id === service.id
                          )
                            ? "black"
                            : "#FAA300",
                          color: selectedServices.some(
                            (s) => s.id === service.id
                          )
                            ? "white"
                            : "black",
                          borrderColor: selectedServices.some(
                            (s) => s.id === service.id
                          )
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
            <p>No services available</p>
          )}
        </Row>
      </div>
    </div>
  );
}

export default ServiceCategory;
