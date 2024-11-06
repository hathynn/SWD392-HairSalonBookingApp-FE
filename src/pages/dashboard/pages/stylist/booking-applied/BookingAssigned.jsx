import React, { useEffect, useState } from "react";
import { DatePicker, Table, Tag, message } from "antd";
import "./BookingAssigned.scss";
import api from "../../../../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/features/counterSlice";
import dayjs from "dayjs";

function BookingAssigned() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);
  const userId = user.Id;
  const stylistId = userId;
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [detail, setDetail] = useState([]);
  
  useEffect(() => {
    const fetchBookings = async () => {
      // Only fetch if both fromDate and toDate are selected
      if (!fromDate || !toDate) return;

      setLoading(true);
      try {
        const response = await api.get(
          `/Stylist/ViewAppointments/view-appointments?stylistId=${stylistId}&fromDate=${fromDate}&toDate=${toDate}`
        );

        const data = await response.data; // Directly get JSON data from axios

        // Map the API data to the format expected by the table
        const formattedBookings = data.map((item) => ({
          id: item.appointmentId,
          bookingDate: item.appointmentDate,
          clientName: item.customerName,
          service: item.serviceName,
          status: item.status,
        }));

        setBookings(formattedBookings);
      } catch (error) {
        message.error("Failed to fetch bookings.");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [fromDate, toDate, stylistId]); // Add fromDate, toDate as dependencies

  const getDetailBooking = async (bookingId) => {
    try {
      const response = await api.get(
        `/Booking/ViewBookingDetail?bookingId=${bookingId}`
      );
      setDetail(response.data.data); // Set detail with API response
    } catch (error) {
      console.error("Failed to fetch booking details:", error);
      message.error("Failed to load booking details.");
    }
  };
  // Define table columns
  const columns = [
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) =>
        record.status.toLowerCase() === "confirmed" ? (
          <Tag color="geekblue">Confirmed</Tag>
        ) : record.status.toLowerCase() === "completed" ? (
          <Tag color="green">Completed</Tag>
        ) : (
          <Tag color="gold">Pending</Tag>
        ),
    },
  ];

  return (
    <div className="booking-applied">
      <h2>My Appointments</h2>
      <DatePicker.RangePicker
        format="YYYY-MM-DD"
        value={fromDate && toDate ? [dayjs(fromDate), dayjs(toDate)] : null}
        onChange={(dates) => {
          if (dates) {
            setFromDate(dates[0].format("YYYY-MM-DD"));
            setToDate(dates[1].format("YYYY-MM-DD"));
          } else {
            setFromDate(null);
            setToDate(null);
          }
        }}
        style={{ marginLeft: "80px" }}
      />
      <Table
        className="booking-table"
        columns={columns}
        dataSource={bookings}
        loading={loading}
        style={{ width: "90%", margin: "auto auto" }}
        rowKey="id"
      />
    </div>
  );
}

export default BookingAssigned;
