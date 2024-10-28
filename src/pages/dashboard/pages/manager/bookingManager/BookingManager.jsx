import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Button, message } from "antd";
import dayjs from "dayjs";
import "./BookingManager.scss";
import api from "../../../../../config/axios";

const BookingManager = () => {
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
      await api.post(`/Booking/CheckBooking/CheckBooking?bookingId=${bookingId}&Check=true`);
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
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.status === "unchecked" ? (
          <Button
            type="primary"
            onClick={() => handleCheckBooking(record.bookingId)}
          >
            Confirm
          </Button>
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
    <div className="booking-table">
      <h1>Bookings</h1>
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

export default BookingManager;
