import { Button, Card, Col, ConfigProvider, Row } from "antd";
import React from "react";
import "./Booking.scss";

function ServiceCategory({ personalInfo, setPersonalInfo, onNext }) {
  const handleChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const salons = [
    {
      title: "Combo 1",
      subtitle:
        "Combo gội massage thư giãn, Massage bấm huyệt cổ vai gáy giảm căng thẳng",
      image:
        "https://images.squarespace-cdn.com/content/v1/5b4818cdd274cba3ecbed6f9/1556647673075-QP3E1VHA2Y9388XA8RV9/20190317_ASalon_Interior_001.JPG",
    },
    {
      title: "Combo 2",
      subtitle:
        "Combo chăm sóc da chuyên sâu sáng đều màu da bằng thiết bị công nghệ cao",
      image:
        "https://clayhairsalon.com/wp-content/uploads/2022/06/The-Clay-Way-scaled-1-1536x1025.jpg",
    },
    {
      title: "Combo 1",
      subtitle:
        "Combo gội massage thư giãn, Massage bấm huyệt cổ vai gáy giảm căng thẳng",
      image:
        "https://images.squarespace-cdn.com/content/v1/5b4818cdd274cba3ecbed6f9/1556647673075-QP3E1VHA2Y9388XA8RV9/20190317_ASalon_Interior_001.JPG",
    },
    {
      title: "Combo 2",
      subtitle:
        "Combo chăm sóc da chuyên sâu sáng đều màu da bằng thiết bị công nghệ cao",
      image:
        "https://clayhairsalon.com/wp-content/uploads/2022/06/The-Clay-Way-scaled-1-1536x1025.jpg",
    },
    {
      title: "Combo 3",
      subtitle:
        "Tẩy da chết nhẹ nhàng bằng gel sủi bọt giúp da căng mịn, tươi mới",
      image:
        "https://e7nmeemxs8h.exactdn.com/wp-content/uploads/2023/12/kings-road-home-24.jpg?lossy=1&ssl=1",
    },
    {
      title: "Combo 4",
      subtitle:
        "Tẩy da chết nhẹ nhàng bằng gel sủi bọt giúp da căng mịn, tươi mới",
      image:
        "https://avenuemspa.com/wp-content/uploads/2016/09/main-page-hair-services-link-and-also-photo-on-hair-services-page.jpg",
    },
    {
      title: "Combo 3",
      subtitle:
        "Tẩy da chết nhẹ nhàng bằng gel sủi bọt giúp da căng mịn, tươi mới",
      image:
        "https://e7nmeemxs8h.exactdn.com/wp-content/uploads/2023/12/kings-road-home-24.jpg?lossy=1&ssl=1",
    },
    {
      title: "Combo 4",
      subtitle:
        "Tẩy da chết nhẹ nhàng bằng gel sủi bọt giúp da căng mịn, tươi mới",
      image:
        "https://avenuemspa.com/wp-content/uploads/2016/09/main-page-hair-services-link-and-also-photo-on-hair-services-page.jpg",
    },
  ];

  return (
    <div className="service-container">
      <p className="service-container__title">
        Hair Salon Service &nbsp;
        <span style={{ color: "grey", fontStyle: "italic" }}>
          (Number of service(s): 2)
        </span>
      </p>
      <div className="service-container__scroll">
        <Row gutter={[16, 16]}>
          {salons.map((salon, index) => (
            <Col span={6} key={index}>
              <Card
                cover={
                  <img
                    alt={salon.title}
                    src={salon.image}
                    style={{ borderRadius: "0px", height: "20vh" }}
                  />
                }
                className="service-container__card"
              >
                <div className="service-container__card__content">
                  <p className="service-container__card__content__title">
                    {salon.title}
                  </p>
                  <p className="service-container__card__content__subtitle">
                    {salon.subtitle}
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
                      200,000
                    </Button>
                  </ConfigProvider>
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
                    <Button className="service-container__card__buttons__right">
                      ✓
                    </Button>
                  </ConfigProvider>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default ServiceCategory;
