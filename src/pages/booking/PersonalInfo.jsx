import {
  GlobalOutlined,
  LeftOutlined,
  PhoneOutlined,
  RightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, ConfigProvider, Input } from "antd";
import React from "react";
import "./Booking.scss";
import Slider from "react-slick/lib/slider";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <RightOutlined
      className={className}
      style={{ ...style, fontSize: "30px", color: "#96885F" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <LeftOutlined
      className={className}
      style={{ ...style, fontSize: "30px", color: "#96885F" }}
      onClick={onClick}
    />
  );
}

function PersonalInfo({ personalInfo, setPersonalInfo, onNext }) {
  const handleChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const settings = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: "0",
  };

  return (
    <div className="personalInfo">
      <p>Customer Information</p>
      <div className="personalInfo__input">
        <Input
          size="middle"
          placeholder="Customer name"
          prefix={<UserOutlined />}
        />
        <Input
          size="middle"
          placeholder="Customer phone number"
          prefix={<PhoneOutlined />}
        />
      </div>
      <div>
        <p style={{ marginTop: "1em" }}>Salon Location</p>
        <Input
          size="middle"
          placeholder="Hair Salon Address"
          prefix={<GlobalOutlined />}
        />
        <div className="slider-container">
          <Slider {...settings}>
            <div>
              <Card
                cover={
                  <img
                    alt="example"
                    src="https://images.squarespace-cdn.com/content/v1/5b4818cdd274cba3ecbed6f9/1556647673075-QP3E1VHA2Y9388XA8RV9/20190317_ASalon_Interior_001.JPG"
                  />
                }
                className="personalInfo__card"
              >
                <p className="personalInfo__card__title">Hair Salon 1</p>
                <p className="personalInfo__card__subtitle">
                  Location: 1 ABC Street, District H
                </p>
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
                  <Button>Choose this place</Button>
                </ConfigProvider>
              </Card>
            </div>
            <div>
              <Card
                cover={
                  <img
                    alt="example"
                    src="https://clayhairsalon.com/wp-content/uploads/2022/06/The-Clay-Way-scaled-1-1536x1025.jpg"
                  />
                }
                className="personalInfo__card"
              >
                <p className="personalInfo__card__title">Hair Salon 1</p>
                <p className="personalInfo__card__subtitle">
                  Location: 1 ABC Street, District H
                </p>
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
                  <Button>Choose this place</Button>
                </ConfigProvider>
              </Card>
            </div>
            <div>
              <Card
                cover={
                  <img
                    alt="example"
                    src="https://e7nmeemxs8h.exactdn.com/wp-content/uploads/2023/12/kings-road-home-24.jpg?lossy=1&ssl=1"
                  />
                }
                className="personalInfo__card"
              >
                <p className="personalInfo__card__title">Hair Salon 1</p>
                <p className="personalInfo__card__subtitle">
                  Location: 1 ABC Street, District H
                </p>
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
                  <Button>Choose this place</Button>
                </ConfigProvider>
              </Card>
            </div>
            <div>
              <Card
                cover={
                  <img
                    alt="example"
                    src=" https://avenuemspa.com/wp-content/uploads/2016/09/main-page-hair-services-link-and-also-photo-on-hair-services-page.jpg"
                  />
                }
                className="personalInfo__card"
              >
                <p className="personalInfo__card__title">Hair Salon 1</p>
                <p className="personalInfo__card__subtitle">
                  Location: 1 ABC Street, District H
                </p>
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
                  <Button>Choose this place</Button>
                </ConfigProvider>
              </Card>
            </div>
          </Slider>
        </div>
      </div>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <Button className="next-button" style={{ marginTop: "0.6em" }}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default PersonalInfo;
