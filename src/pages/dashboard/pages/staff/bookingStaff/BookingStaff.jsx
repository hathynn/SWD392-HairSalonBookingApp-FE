import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Button, message, ConfigProvider } from "antd";
import dayjs from "dayjs";
import "./BookingStaff.scss";
import api from "../../../../../config/axios";
import ButtonGroup from "antd/es/button/button-group";

const BookingStaff = () => {
  const [uncheckedBookings, setUncheckedBookings] = useState([]);
  const [checkedBookings, setCheckedBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const [uncheckedRes, checkedRes] = await Promise.all([
          api.get("/SalonManager/bookings/unchecked"),
          api.get("/SalonManager/bookings/checked"),
        ]);

        setUncheckedBookings(uncheckedRes.data);
        setCheckedBookings(checkedRes.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        message.error("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCheckBooking = async (bookingId) => {
    try {
      await api.post(
        `/Booking/CheckBooking/CheckBooking?bookingId=${bookingId}&Check=true`
      );
      message.success("Booking marked as checked.");

      setUncheckedBookings((prev) =>
        prev.filter((booking) => booking.bookingId !== bookingId)
      );
    } catch (error) {
      console.error("Failed to check booking:", error);
      message.error("Failed to mark booking as checked.");
    }
  };

  const columns = [
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total) => `$${total}`,
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag color={record.status === "unchecked" ? "volcano" : "green"}>
          {record.status ? record.status.toUpperCase() : "UNKNOWN"}
        </Tag>
      ),
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
      render: (feedback) => (feedback ? feedback : "NONE"),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) => (status ? status : "NONE"),
    },

    {
      title: "Detail",
      key: "action",
      render: (_, record) =>
       
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultColor: "grey",
                  defaultBg: "white",
                  defaultBorderColor: "lightgrey",
                  defaultHoverBorderColor: "grey",
                  defaultHoverColor: "black",
                  defaultHoverBg: "white",
                  defaultActiveBg: "black",
                  defaultActiveBorderColor: "black",
                  defaultActiveColor: "white",
                },
              },
            }}
          >
            <Button
              className="view-service__button"
              style={{ fontWeight: "600" }}
            >
              Detail
            </Button>
          </ConfigProvider>
       ,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.status.toLowerCase() === "unchecked" ? (
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultColor: "white",
                  defaultBg: "black",
                  defaultBorderColor: "black",
                  defaultHoverBorderColor: "#FAA300",
                  defaultHoverColor: "black",
                  defaultHoverBg: "#FAA300",
                  defaultActiveBg: "black",
                  defaultActiveBorderColor: "black",
                  defaultActiveColor: "white",
                },
              },
            }}
          >
            <Button
              className="view-service__button"
              onClick={() => handleCheckBooking(record.bookingId)}
              style={{ fontWeight: "600" }}
            >
              Confirm
            </Button>
          </ConfigProvider>
        ) : record.status.toLowerCase() === "checked" ? (
          <Button disabled>Confirm</Button>
        ) : null,
    },
  ];

  const tableData = [
    ...uncheckedBookings.map((booking) => ({
      ...booking,
      status: "unchecked",
    })),
    ...checkedBookings.map((booking) => ({
      ...booking,
      status: "checked",
    })),
  ];

  return (
    <div className="booking-table-staff">
      <Table
        columns={columns}
        dataSource={tableData}
        rowKey="bookingId"
        loading={loading}
        className="booking-table__detail"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default BookingStaff;
