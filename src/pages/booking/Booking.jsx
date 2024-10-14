import React, { useState } from "react";
import { Col, Row, Steps, Button, ConfigProvider } from "antd";
import "./Booking.scss";
import PersonalInfo from "./PersonalInfo";
import ServiceCategory from "./ServiceCategory";
import ConfirmPage from "./ConfirmPage";
import AppointmentSelector from "./AppointmentSelector";

function Booking() {
  const [currentStep, setCurrentStep] = useState(0);
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [service, setService] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState(null);
  const [stylist, setStylist] = useState("");
  const steps = [
    {
      title: "Confirm Info",
      description: "Xác nhận thông tin cá nhân",
      component: (
        <PersonalInfo
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
          onNext={() => setCurrentStep(1)}
        />
      ),
    },
    {
      title: "Choose Service",
      description: "Chọn dịch vụ làm tóc",
      component: (
        <ServiceCategory
          service={service}
          setService={setService}
          onNext={() => setCurrentStep(2)}
        />
      ),
    },
    {
      title: "Select Date, Time & Stylist",
      description: "Chọn ngày giờ và stylist",
      component: (
        <AppointmentSelector 
          setAppointmentDate={setAppointmentDate} 
          setAppointmentTime={setAppointmentTime} 
          setStylist={setStylist} 
        />
      ),
    },
    {
      title: "Confirm Appointment",
      description: "Xác nhận thông tin cuộc hẹn",
      component: (
        <ConfirmPage
          personalInfo={personalInfo} 
          service={service} 
          appointmentDate={appointmentDate} 
          appointmentTime={appointmentTime} 
          stylist={stylist} 
        />
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleSubmit = async () => {
    const bookingData = { ...personalInfo, service, appointmentDate, appointmentTime, stylist };
    try {
      // Gửi dữ liệu đặt lịch qua API
      alert("Đặt lịch thành công!");
    } catch (error) {
      alert("Đặt lịch thất bại!");
    }
  };

  return (
    <div className="booking">
      <img
        src="https://knockouts.com/bellevue-ne/wp-content/uploads/sites/68/2020/03/knockouts-franchise-locations-header-2020.jpg"
        alt="maverick barber"
        className="booking__img"
      />
      <div className="booking__text">Booking An Appointment.</div>
      <div>
        <Row className="booking__container">
          <Col span={6} className="booking_container__left">
            <Steps
              progressDot
              current={currentStep}
              direction="vertical"
              items={steps.map((step) => ({
                title: step.title,
                description: step.description,
              }))}
            />
          </Col>
          <Col span={18} className="booking_container__right">
            {steps[currentStep].component}
            <div
              className="booking__buttons"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "1em",
              }}
            >
              {currentStep > 0 && (
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
                  <Button onClick={handlePrevious} style={{ marginRight: 8 }}>
                    Previous
                  </Button>
                </ConfigProvider>
              )}
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
                <Button onClick={handleNext}>
                  {currentStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </ConfigProvider>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Booking;
