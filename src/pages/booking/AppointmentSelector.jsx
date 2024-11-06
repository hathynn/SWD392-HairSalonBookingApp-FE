import React, { useEffect, useState } from "react";
import { Button, DatePicker, Select } from "antd";
import api from "../../config/axios";
import dayjs from "dayjs";

const { Option } = Select;

const AppointmentSelector = ({
  personalInfo,
  setAppointmentDate,
  setAppointmentTime,
  setStylist,
}) => {
  const [stylists, setStylists] = useState([]);
  const [selectedStylist, setSelectedStylist] = useState(null); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const getStylist = async (date, time) => {
    if (!date || !time) {
      console.log("Date or time not set");
      return;
    }

    try {
      const [hour, minute] = time.split(":");
      const response = await api.get(
        `/Stylist/GetAvailableStylist/get-available-stylists?salonId=${personalInfo.salonId}&bookingDate=${date}&bookingHour=${hour}&bookingMinute=${minute}`
      );

      if (response.status === 200) {
        const stylistsData = response.data;
        setStylists(stylistsData);

        if (stylistsData.length > 0) {
          const defaultStylist = stylistsData[0]; //Get first stylist in the list
          setSelectedStylist(defaultStylist.fullName);
          setStylist({
            id: defaultStylist.id,
            fullName: defaultStylist.fullName,
          });
        }
      }
    } catch (error) {
      console.log("Error fetching stylists:", error);
    }
  };

  const disabledDate = (current) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return current && current.valueOf() < today.getTime();
  };

  const handleFindStylistsClick = () => {
    if (selectedDate && selectedTime) {
      setAppointmentDate(selectedDate);
      setAppointmentTime(selectedTime);
      getStylist(selectedDate, selectedTime);
    } else {
      message.error("Please select both date and time");
    }
  };

  return (
    <div className="dateSelector">
      <DatePicker
        onChange={(date) => {
          const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;
          setSelectedDate(formattedDate);
        }}
        className="dateSelector__date"
        disabledDate={disabledDate}
        style={{ marginBottom: "1em", marginRight: "1em" }}
      />

      <Button
        type="primary"
        style={{
          backgroundColor: "#FAA300",
          color: "black",
          padding: "10px 20px",
          borderRadius: "8px",
        }}
        onClick={handleFindStylistsClick}
      >
        Find Stylists
      </Button>

      <Select
        placeholder="Select time"
        style={{ width: "100%", marginBottom: "1em" }}
        className="dateSelector__time"
        onChange={(value) => setSelectedTime(value)}
      >
        {[ "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45",
          "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45",
          "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45",
          "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45",
          "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45",
          "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45",
          "20:00"
        ].map(time => (
          <Option key={time} value={time}>{time}</Option>
        ))}
      </Select>

      <Select
        value={selectedStylist} // Set selected stylist as the default value
        placeholder="Choose stylist (Optional)"
        onChange={(value) => {
          setSelectedStylist(value); // Update selected stylist
          const selected = stylists.find(stylist => stylist.fullName === value);
          if (selected) {
            setStylist({ id: selected.id, fullName: selected.fullName });
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
