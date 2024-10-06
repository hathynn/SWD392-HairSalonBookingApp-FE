import { Col, Divider, Image, Row } from "antd";
import React from "react";
import "./AboutUs.scss";
import Slider from "react-slick/lib/slider";
import { RightOutlined } from "@ant-design/icons";

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

function AboutUs() {
  const data = [
    "https://timbarbershop.vn/wp-content/uploads/2023/04/chinh3-1025x1536.jpg",
    "https://timbarbershop.vn/wp-content/uploads/2019/04/hoan-1025x1536.jpg",
    "https://timbarbershop.vn/wp-content/uploads/2019/04/dai-2-1025x1536.jpg",
    "https://timbarbershop.vn/wp-content/uploads/2019/04/hung-1025x1536.jpg",
    "https://timbarbershop.vn/wp-content/uploads/2019/04/kien-1025x1536.jpg",
  ];

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: null,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: "0",
  };

  return (
    <div>
      <div className="about-us">
        <img
          src="https://knockouts.com/bellevue-ne/wp-content/uploads/sites/68/2020/03/knockouts-franchise-locations-header-2020.jpg"
          alt="maverick barber"
          className="about-us__img"
        />
      </div>
      <div className="about-us__text">About Our Team.</div>
      <div>
        <Row className="about-us__why">
          <Col span={4}></Col>
          <Col span={9} className="about-us__why__left">
            <p className="about-us__why__left__title">
              <span style={{ color: "#96885F" }}>Why </span> Us?
            </p>
            <div style={{ width: "20%" }}>
              <Divider className="custom-horizontal-divider" />
            </div>
            <p className="about-us__why__left__content">
              We combine classic & modern styles to give you the most
              satisfactory hairstyles. Tim is not only a hair salon but also a
              place to exchange and chat with everyone!
            </p>
          </Col>
          <Col span={7} className="about-us__why__right">
            <Image
              preview={false}
              className="about-us__why__right__img"
              src="https://timbarbershop.vn/wp-content/uploads/2019/04/284499850_581120373344750_2981993326988884564_n-404x606.jpg"
            />
          </Col>
          <Col span={4}></Col>
        </Row>
      </div>
      <div>
        <Row className="about-us__member">
          <Col span={2}></Col>
          <Col span={5} className="about-us__member__left">
            <p className="about-us__member__left__title">
              <span style={{ color: "#96885F" }}>Team </span> member
            </p>
            <div style={{ width: "20%" }}>
              <Divider className="custom-horizontal-divider" />
            </div>
          </Col>
          <Col span={15} className="about-us__member__right">
            <div className="slider-container">
              <Slider {...settings}>
                {data.map((src, index) => (
                  <div key={index}>
                    <Image
                      width={300}
                      height={300}
                      src={src}
                      className="slider-image"
                      preview={false}
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

export default AboutUs;
