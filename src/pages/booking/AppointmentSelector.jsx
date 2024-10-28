import React, { useEffect, useState } from "react";
import { DatePicker, Select } from "antd";
import api from "../../config/axios";
import dayjs from "dayjs";

const { Option } = Select;

const AppointmentSelector = ({ appointmentDate, setAppointmentDate, appointmentTime, setAppointmentTime, setStylist }) => {
  const [stylists, setStylists] = useState();
  const getStylist = async () => {
    try {
      const response = await api.get("/Admin/PrintAllSalonMember");
      if (response.data.error === 0) {
        const data = response.data.data;
        setStylists(data);
        console.log(data);
      } else {
        message.error(response.data.message);

      }
    } catch (error) {
      message.error(response.data.message);
    }
  }

  const disabledDate = (current) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return current && current.valueOf() < today.getTime();
  };

  useEffect(() => {
    getStylist();
  }, [])
  return (
    <div className="dateSelector">
      <DatePicker
        onChange={(date) => {
          const selectedDate = date ? dayjs(date).format('YYYY-MM-DD') : null;
          console.log("Selected Date:", selectedDate); // Kiểm tra ngày đã chọn
          setAppointmentDate(selectedDate);
        }}
        className="dateSelector__date"
        disabledDate={disabledDate}
        style={{ marginBottom: "1em" }}
      />
      <Select
        placeholder="Select time"
        onChange={(value) => setAppointmentTime(value)}
        style={{ width: "100%", marginBottom: "1em" }}
        className="dateSelector__time"
      >
        <Option value="10:00">10:00 AM</Option>
        <Option value="11:00">11:00 AM</Option>
        <Option value="12:00">12:00 PM</Option>
        <Option value="1:00">1:00 PM</Option>
        <Option value="2:00">2:00 PM</Option>
      </Select>
      <Select
        placeholder="Choose stylist (Optional)"
        onChange={(value) => {
          const selectedStylist = stylists.find(stylist => stylist.fullName === value);
          if (selectedStylist) {
            setStylist({ id: selectedStylist.id, fullName: selectedStylist.fullName });
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