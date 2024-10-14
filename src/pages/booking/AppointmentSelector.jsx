import React from "react";
import { DatePicker, Select } from "antd";

const { Option } = Select;

const AppointmentSelector = ({ setAppointmentDate, setAppointmentTime, setStylist }) => {
  return (
    <div>
      <DatePicker
        onChange={(date) => setAppointmentDate(date)}
        style={{ marginBottom: "1em" }}
      />
      <Select
        placeholder="Select time"
        onChange={(value) => setAppointmentTime(value)}
        style={{ width: "100%", marginBottom: "1em" }}
      >
        <Option value="10:00">10:00 AM</Option>
        <Option value="11:00">11:00 AM</Option>
        <Option value="12:00">12:00 PM</Option>
        <Option value="1:00">1:00 PM</Option>
        <Option value="2:00">2:00 PM</Option>
      </Select>
      <Select
        placeholder="Choose stylist (Optional)"
        onChange={(value) => setStylist(value)}
        style={{ width: "100%" }}
      >
        <Option value="stylist1">Stylist 1</Option>
        <Option value="stylist2">Stylist 2</Option>
        <Option value="stylist3">Stylist 3</Option>
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