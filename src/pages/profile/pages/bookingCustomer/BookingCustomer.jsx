import {
  Badge,
  Descriptions,
  message,
  Steps,
  Empty,
  Button,
  ConfigProvider,
} from "antd";
import React, { useEffect, useState } from "react";
import "./BookingCustomer.scss";
import { selectUser } from "../../../../redux/features/counterSlice";
import { useSelector } from "react-redux";
import api from "../../../../config/axios";
import dayjs from "dayjs";

function BookingCustomer() {
  const [booking, setBooking] = useState([]);
  const user = useSelector(selectUser);

  const getBooking = async () => {
    try {
      const response = await api.get(
        `/User/ViewBookingByUserId?userId=${user.Id}`
      );
      const data = response.data.data;
      setBooking(data);
    } catch (e) {
      message.error(e.response?.data || "Failed to fetch booking details");
    }
  };

  const handleCancel = async (bookingId) => {
    console.log(bookingId)
    try {
      await api.delete(`/Booking/CancelBooking/CancelBooking?bookingId=${bookingId}`);
      message.success("Booking cancelled successfully!");
      getBooking();
    } catch (e) {
      message.error("Fail to cancel this booking");
    }
  };

  useEffect(() => {
    getBooking();
  }, []);

  const getCurrentStep = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return 0;
      case "checked":
        return 1;
      case "in progress":
        return 2;
      case "complete":
        return 3;
      default:
        return 0;
    }
  };

  return (
    <div className="booking-item">
      {booking.length > 0 ? (
        booking.map((item) => (
          <div key={item.bookingId}>
            <div className="booking-steps">
              <Steps
                className="booking-steps__step"
                size="small"
                current={getCurrentStep(item.bookingStatus)}
                items={[
                  { title: "Waiting Confirm" },
                  { title: "Confirm Booking" },
                  { title: "In Progress" },
                  { title: "Complete" },
                ]}
              />
            </div>
            <Descriptions
              title="Booking Detail"
              bordered
              className="booking-detail"
            >
              <Descriptions.Item label="Customer Name">
                {item.customerName}
              </Descriptions.Item>
              <Descriptions.Item label="Phone Number">
                {item.customerPhoneNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Price">
                {item.comboServiceName.price} VND
              </Descriptions.Item>
              <Descriptions.Item label="Date">
                {dayjs(item.bookingDate).format("YYYY-MM-DD HH:mm")}
              </Descriptions.Item>
              <Descriptions.Item label="Stylist Name" span={2}>
                {item.stylistName}
              </Descriptions.Item>
              <Descriptions.Item label="Status" span={1}>
                <Badge
                  status={
                    item.bookingStatus === "Pending"
                      ? "processing"
                      : item.bookingStatus === "Checked"
                      ? "default"
                      : item.bookingStatus === "In Progress"
                      ? "warning"
                      : item.bookingStatus === "Complete"
                      ? "success"
                      : "default"
                  }
                  text={item.bookingStatus}
                  color={
                    item.bookingStatus === "Pending"
                      ? "yellow"
                      : item.bookingStatus === "Checked"
                      ? "blue"
                      : item.bookingStatus === "In Progress"
                      ? "orange"
                      : item.bookingStatus === "Complete"
                      ? "green"
                      : "grey"
                  }
                />
              </Descriptions.Item>
              <Descriptions.Item label="Salon Address" span={2}>
                {item.address}
              </Descriptions.Item>
              <Descriptions.Item label="Service">
                {item.comboServiceName.comboServiceName}
              </Descriptions.Item>
              <Descriptions.Item label="Cancel">
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        defaultColor: "white",
                        defaultBg: "black",
                        defaultBorderColor: "black",
                        defaultHoverBorderColor: "grey",
                        defaultHoverColor: "black",
                        defaultHoverBg: "white",
                        defaultActiveBg: "black",
                        defaultActiveBorderColor: "black",
                        defaultActiveColor: "#FAA300",
                      },
                    },
                  }}
                >
                  <Button
                    style={{
                      fontFamily: "Gantari",
                      fontWeight: "600",
                      height: "5vh",
                    }}
                    disabled={
                      item.bookingStatus.toLowerCase() === "in progress"
                    }

                    onClick={() => handleCancel(item.bookingId)}
                  >
                    Cancel Booking
                  </Button>
                </ConfigProvider>
              </Descriptions.Item>
            </Descriptions>
          </div>
        ))
      ) : (
        <Empty description="No booking available" />
      )}
    </div>
  );
}

export default BookingCustomer;
