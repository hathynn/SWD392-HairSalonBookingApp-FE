import React, { useEffect, useState } from "react";
import { DatePicker, Select } from "antd";
import api from "../../config/axios";
import dayjs from "dayjs";

const { Option } = Select;

const AppointmentSelector = ({
  personalInfo,
  appointmentDate,
  setAppointmentDate,
  appointmentTime,
  setAppointmentTime,
  setStylist,
}) => {
  const [stylists, setStylists] = useState();
  const getStylist = async () => {
    try {
      const [hour, minute] = appointmentTime.split(":");
      const response = await api.get(`/Stylist/GetAvailableStylist/get-available-stylists?salonId=${personalInfo.salonId}&bookingDate=${appointmentDate}&bookingHour=${hour}&bookingMinute=${minute}`);
      console.log(response.data);
      if (response.status === 200) {
        setStylists(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const disabledDate = (current) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return current && current.valueOf() < today.getTime();
  };

  useEffect(() => {
    if (appointmentDate && appointmentTime) {
      console.log("Triggering getStylist with Date and Time set");
      getStylist();
    }
  }, [appointmentDate, appointmentTime]);

  return (
    <div className="dateSelector">
      <DatePicker
        onChange={(date) => {
          const selectedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;
          console.log("Selected Date:", selectedDate); // Kiểm tra ngày đã chọn
          setAppointmentDate(selectedDate);
        }}
        className="dateSelector__date"
        disabledDate={disabledDate}
        style={{ marginBottom: "1em", marginRight: "1em" }}
      />
      <Select
        placeholder="Select time"
        style={{ width: "100%", marginBottom: "1em" }}
        className="dateSelector__time"
        onChange={(value) => {
          console.log("Selected Time:", value);
          setAppointmentTime(value);
        }}
      >
        <Option value="08:00">08:00</Option>
        <Option value="08:15">08:15</Option>
        <Option value="08:30">08:30</Option>
        <Option value="08:45">08:45</Option>
        <Option value="09:00">09:00</Option>
        <Option value="09:15">09:15</Option>
        <Option value="09:30">09:30</Option>
        <Option value="09:45">09:45</Option>
        <Option value="10:00">10:00</Option>
        <Option value="10:15">10:15</Option>
        <Option value="10:30">10:30</Option>
        <Option value="10:45">10:45</Option>
        <Option value="11:00">11:00</Option>
        <Option value="11:15">11:15</Option>
        <Option value="11:30">11:30</Option>
        <Option value="11:45">11:45</Option>
        <Option value="12:00">12:00</Option>
        <Option value="12:15">12:15</Option>
        <Option value="12:30">12:30</Option>
        <Option value="12:45">12:45</Option>
        <Option value="13:00">13:00</Option>
        <Option value="13:15">13:15</Option>
        <Option value="13:30">13:30</Option>
        <Option value="13:45">13:45</Option>
        <Option value="14:00">14:00</Option>
        <Option value="14:15">14:15</Option>
        <Option value="14:30">14:30</Option>
        <Option value="14:45">14:45</Option>
        <Option value="15:00">15:00</Option>
        <Option value="15:15">15:15</Option>
        <Option value="15:30">15:30</Option>
        <Option value="15:45">15:45</Option>
        <Option value="16:00">16:00</Option>
        <Option value="16:15">16:15</Option>
        <Option value="16:30">16:30</Option>
        <Option value="16:45">16:45</Option>
        <Option value="17:00">17:00</Option>
        <Option value="17:15">17:15</Option>
        <Option value="17:30">17:30</Option>
        <Option value="17:45">17:45</Option>
        <Option value="18:00">18:00</Option>
        <Option value="18:15">18:15</Option>
        <Option value="18:30">18:30</Option>
        <Option value="18:45">18:45</Option>
        <Option value="19:00">19:00</Option>
        <Option value="19:15">19:15</Option>
        <Option value="19:30">19:30</Option>
        <Option value="19:45">19:45</Option>
        <Option value="20:00">20:00</Option>
      </Select>
      <Select
        placeholder="Choose stylist (Optional)"
        onChange={(value) => {
          const selectedStylist = stylists.find(
            (stylist) => stylist.fullName === value
          );
          if (selectedStylist) {
            setStylist({
              id: selectedStylist.id,
              fullName: selectedStylist.fullName,
            });
          }
        }}
        style={{ width: "100%" }}
        className="dateSelector__stylist"
      >
        {stylists && stylists.length > 0 ? (
          stylists.map((stylist) => (
            <Option key={stylist.email} value={stylist.fullName}>
              {stylist.fullName}
            </Option>
          ))
        ) : (
          <Option disabled>Loading stylists...</Option>
        )}
      </Select>
    </div>
  );
};

export default AppointmentSelector;

/*
  <div className="stylist-container">
        <p  className="stylist-container__title"> Stylist</p>

        <div className="stylist-container__scroll">
          <Row gutter={[16, 16]}>
            {salons.map((salon, index) => (
              <Col span={6} key={index}>
                <Card
                  cover={
                    <img
                      alt={salon.title}
                      src={salon.image}
                      style={{ borderRadius: "0px", height: "32vh", objectFit:'cover' }}
                    />
                  }
                  className="stylist-container__card"
                >
                  <div className="stylist-container__card__content">
                    <p className="stylist-container__card__content__title">
                      {salon.title}
                    </p>
                  
                  </div>
                  <div className="stylist-container__card__buttons">
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
                      <Button className="stylist-container__card__buttons__left">
                        5<span style={{ color: "#FAA300" }}>★</span>
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
                      <Button className="stylist-container__card__buttons__right">
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
*/
