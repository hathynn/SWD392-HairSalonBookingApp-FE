import React, { useState } from "react";
import { Col, Row, Steps, Button, ConfigProvider, Modal, message } from "antd";
import "./Booking.scss";
import PersonalInfo from "./PersonalInfo";
import ServiceCategory from "./ServiceCategory";
import ConfirmPage from "./ConfirmPage";
import AppointmentSelector from "./AppointmentSelector";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import api from "../../config/axios";

function Booking() {
  const [currentStep, setCurrentStep] = useState(0);
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [selectedService, setSelectedService] = useState({
    id: null,
    comboServiceName: "",
  });
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState(null);
  const [stylist, setStylist] = useState("");
  const [selectedStylist, setSelectedStylist] = useState({
    id: null,
    fullName: "",
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector(selectUser);
  const userId = user.Id;
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    handleSubmit();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const steps = [
    {
      title: "Confirm Info",
      description: "Confirm personal information",
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
      description: "Choose hair service",
      component: (
        <ServiceCategory
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          onNext={() => setCurrentStep(2)}
        />
      ),
    },
    {
      title: "Select Date, Time & Stylist",
      description: "Choose date, time and stylist",
      component: (
        <AppointmentSelector
          setAppointmentDate={setAppointmentDate}
          setAppointmentTime={setAppointmentTime}
          setStylist={(stylist) => setSelectedStylist(stylist)}
        />
      ),
    },
    {
      title: "Confirm Appointment",
      description: "Confirm appointment information",
      component: (
        <ConfirmPage
          personalInfo={personalInfo}
          selectedService={selectedService}
          appointmentDate={appointmentDate}
          appointmentTime={appointmentTime}
          stylist={selectedStylist}
        />
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      showModal();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleSubmit = async () => {
    // const bookingData = {
    //   ...personalInfo,
    //   selectedServices,
    //   appointmentDate,
    //   appointmentTime,
    // };
    const [hour, minute] = appointmentTime.split(":");
    try {
      const response = await api.post(`/Booking/AddBooking/AddBooking?CustomerId=${userId}&salonId=${personalInfo.salonId}&SalonMemberId=${selectedStylist.id}&cuttingDate=${appointmentDate}&hour=${hour}&minute=${minute}&ComboServiceId=${selectedService.id}&CustomerName=${personalInfo.fullName}&CustomerPhoneNumber=${personalInfo.phone}`);
      messageApi.success("Booking successfully!");
    } catch (error) {
      console.log(error);
      messageApi.error("Booking failed.");
    }
  };

  return (
    <div className="booking">
      {contextHolder}
      <img
        src="https://knockouts.com/bellevue-ne/wp-content/uploads/sites/68/2020/03/knockouts-franchise-locations-header-2020.jpg"
        alt="maverick barber"
        className="booking__img"
      />
      <div className="booking__text">Booking An Appointment.</div>
      <div>
        <Row className="booking__container">
          <Col span={6} className="booking_container__left">
            <ConfigProvider
              theme={{
                components: {
                  Steps: {
                    processIconColor: "black",
                    processTitleColor: "black",
                  },
                },
              }}
            >
              <Steps
                progressDot
                current={currentStep}
                direction="vertical"
                items={steps.map((step) => ({
                  title: step.title,
                  description: step.description,
                }))}
                className="booking_container__left__steps"
              />
            </ConfigProvider>
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
                  <Button
                    onClick={handlePrevious}
                    style={{
                      marginRight: 8,
                      fontFamily: "Gantari",
                      fontWeight: "500",
                    }}
                  >
                    Previous
                  </Button>
                </ConfigProvider>
              )}
              {/* Cấu hình riêng cho nút Submit */}
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
                  onClick={handleNext}
                  style={{ fontFamily: "Gantari", fontWeight: "500" }}
                >
                  {currentStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </ConfigProvider>
            </div>
            <Modal
              title="Confirm Booking"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="Confirm"
              okButtonProps={{ className: "confirm-button" }}
              cancelButtonProps={{ className: "cancel-button" }}
              className="modal-confirm"
            >
              <p>
                Are you sure you want to book this appointment? Please check all
                details before confirming this appointment!
              </p>
            </Modal>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Booking;
