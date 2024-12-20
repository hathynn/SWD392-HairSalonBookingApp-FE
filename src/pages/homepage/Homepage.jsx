import React from "react";
import "./Homepage.scss";
import { Button, Col, ConfigProvider, Divider, Image, Row, notification } from "antd";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import { useNavigate } from "react-router-dom";

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

function Homepage() {
  const user = useSelector(selectUser);
  const nav = useNavigate();

  const handleClick = () => {
    notification.info({
      message: "Information",
      description: "You need to login first.",
      placement: "topRight",
      duration: 3, // Thời gian thông báo tồn tại
    });
  };
  
  const data = [
    "https://timbarbershop.vn/wp-content/uploads/2023/04/chinh3-1025x1536.jpg",
    "https://timbarbershop.vn/wp-content/uploads/2019/04/hoan-1025x1536.jpg",
    "https://timbarbershop.vn/wp-content/uploads/2019/04/dai-2-1025x1536.jpg",
    "https://timbarbershop.vn/wp-content/uploads/2019/04/hung-1025x1536.jpg",
    "https://timbarbershop.vn/wp-content/uploads/2019/04/kien-1025x1536.jpg",
  ];

  const data2 = [
    "https://timbarbershop.vn/wp-content/uploads/2019/04/DLE8588-scaled.jpg",
    "https://timbarbershop.vn/wp-content/uploads/2023/04/quay.jpg",
    "https://timbarbershop.vn/wp-content/uploads/2022/01/270641397_955658441727761_4328470883924018224_n-1270x715.jpg",
    "https://timbarbershop.vn/wp-content/uploads/2023/04/a-duong-8844-copy-scaled.jpg",
  ];

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: "0",
  };

  const settings2 = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: "0",
  };

  return (
    <div className="homepage">
      <div className="hero">
        <img
          src="https://knockouts.com/bellevue-ne/wp-content/uploads/sites/68/2020/03/knockouts-franchise-locations-header-2020.jpg"
          alt="maverick barber"
          className="hero__img"
        />
        <div className="hero__overlay-text">Maverick Haircuts & Grooming</div>
        {user ? (
          <div className="hero__button">
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
              <Button
                onClick={() => nav("/booking")}
                className="hero__button__buttons"
              >
                Book Now
              </Button>
            </ConfigProvider>
          </div>
        ) : (
          <div className="hero__button">
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
              <Button
                className="hero__button__buttons"
                onClick={handleClick} // Gọi hàm để hiện notification
              >
                Book Now
              </Button>
            </ConfigProvider>
          </div>
        )}
      </div>

      <div className="swiper">
        <p className="swiper__title">Our Services.</p>
        <div style={{ width: "10%", margin: "0 auto" }}>
          <Divider className="custom-horizontal-divider" />
        </div>
        <p className="swiper__content">
          With Maverick Barbershop you will experience professional services
          <br /> in a professional, friendly & intimate space!
        </p>
        <div className="slider-container">
          <Slider {...settings}>
            <div>
              <Image
                width={290}
                height={300}
                src="https://timbarbershop.vn/wp-content/uploads/2019/04/284499850_581120373344750_2981993326988884564_n-404x606.jpg"
                className="slider-image"
                preview={false}
              />
            </div>
            <div>
              <Image
                width={290}
                height={300}
                src="https://timbarbershop.vn/wp-content/uploads/2019/04/DLE8585-404x269.jpg"
                className="slider-image"
                preview={false}
              />
            </div>
            <div>
              <Image
                width={290}
                height={300}
                src="https://timbarbershop.vn/wp-content/uploads/2019/04/04-404x404.jpg"
                className="slider-image"
                preview={false}
              />
            </div>
            <div>
              <Image
                width={290}
                height={300}
                src="https://timbarbershop.vn/wp-content/uploads/2023/04/chinh4.jpg"
                className="slider-image"
                preview={false}
              />
            </div>
          </Slider>
        </div>
      </div>
      <div>
        <Slider {...settings2} className="slider2-container">
          {data2.map((src, index) => (
            <div key={index}>
              <Image
                width={530}
                height={400}
                src={src}
                className="slider2-image"
                preview={false}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div>
        <Row className="member">
          <Col span={2}></Col>
          <Col span={5} className="member__left">
            <p className="member__left__title">
              <span style={{ color: "#96885F" }}>Team </span> member
            </p>
            <div style={{ width: "20%" }}>
              <Divider className="custom-horizontal-divider" />
            </div>
          </Col>
          <Col span={15} className="member__right">
            <div className="slider-container">
              <Slider {...settings}>
                {data.map((src, index) => (
                  <div key={index}>
                    <Image
                      width={300}
                      height={500}
                      src={src}
                      className="slider-image"
                      preview={false}
                      style={{ borderRadius: "20px" }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    </div>
  );
}

export default Homepage;
