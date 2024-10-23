import {
  GlobalOutlined,
  LeftOutlined,
  LoadingOutlined,
  PhoneOutlined,
  RightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, ConfigProvider, Flex, Input, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import "./Booking.scss";
import Slider from "react-slick/lib/slider";
import api from "../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";

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
  const [salons, setSalons] = useState([]);
  const [userData, setUserData] = useState([]);
  const userId = localStorage.getItem("userId");
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true); 
  const handleChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };
  const userProfileById = async () => {
    try {
      const response = await api.get(`/User/GetUserById?id=${user.Id}`);
      const data = response.data.data;
      setPersonalInfo(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("Failed to load user data");
    }
  };

  const getHairSalon = async () => {
    try {
      const response = await api.get("/Salon/PrintAllSalon");
      const data = response.data.data;
      console.log(data);
      setSalons(data);
    } catch (error) {
      message.error(response.data.message);
    }
  }
  useEffect(() => {
    userProfileById(userId);
    getHairSalon();
  }, [userId]);

  const settings = {
    infinite: salons.length > 1,
    slidesToShow: Math.min(2, salons.length),
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: salons.length > 1,
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
          name="customerName"
          value={personalInfo.fullName }
          onChange={handleChange}
        />
        <Input
          size="middle"
          placeholder="Customer phone number"
          value={personalInfo.phone}
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
          {salons.length > 0 ? (
            <Slider {...settings}>
              {salons.map((salon) => (
                <div key={salon.salonId}>
                  <Card
                    cover={
                      <img
                        alt={salon.salonName}
                        src={salon.image}
                      />
                    }
                    className="personalInfo__card"
                  >
                    <p className="personalInfo__card__title">{salon.salonName}</p>
                    <p className="personalInfo__card__subtitle">Location: {salon.address}</p>
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
                      <Button onClick={() => onNext(salon.salonId)}>
                        Choose this place
                      </Button>
                    </ConfigProvider>
                  </Card>
                </div>
              ))}
            </Slider>
          ) : (
            <Flex
            align="center"
            gap="middle"
            justify="center"
            style={{ width: "100%",
              margin:'5em 0' }}
          >
            <Spin
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                marginTop:'10em'
              }}
              indicator={<LoadingOutlined spin />}
              size="large"
            />
          </Flex>
          )}
        </div>
      </div>

    </div>
  );
}

export default PersonalInfo;
