import React, { useEffect, useState } from "react";
import { Button, DatePicker, Table, Tag, message, Modal, Descriptions, Badge, ConfigProvider } from "antd";
import "./BookingAssigned.scss";
import api from "../../../../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/features/counterSlice";
import dayjs from "dayjs";

function BookingAssigned() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);
  const stylistId = user?.Id;
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [detail, setDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchBookingsByStylistId = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/Stylist/ViewListBookingForStylist?stylistId=${stylistId}`);
      const data = response.data?.data || [];

      const formattedBookings = data.map((item) => ({
        id: item.bookingId,
        bookingDate: dayjs(item.bookingDate).format("YYYY-MM-DD"),
        bookingTime: dayjs(item.bookingDate).format("HH:mm"),
        clientName: item.customerName || "N/A",
        clientPhone: item.phoneNumber || "N/A",
        service: item.comboServiceName || "N/A",
        price: item.comboServiceName?.price || "N/A",
        status: item.bookingStatus,
      }));
      setBookings(formattedBookings);
    } catch (error) {
      message.error("Failed to fetch bookings.");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookingsByDateRange = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/Stylist/ViewAppointments/view-appointments?stylistId=${stylistId}&fromDate=${fromDate}&toDate=${toDate}`
      );
      const data = response.data?.data;

      const formattedBookings = data.map((item) => ({
        id: item.bookingId,
        bookingDate: dayjs(item.bookingDate).format("YYYY-MM-DD"),
        bookingTime: dayjs(item.bookingDate).format("HH:mm"),
        clientName: item.customerName || "N/A",
        clientPhone: item.phoneNumber || "N/A",
        service: item.comboServiceName || "N/A",
        price: item.comboServiceName?.price || "N/A",
        status: item.bookingStatus,
      }));
      setBookings(formattedBookings);
    } catch (error) {
      console.error("Fetch error:", error);
      message.error("Failed to fetch bookings for the selected date range.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fromDate && toDate) {
      fetchBookingsByDateRange();
    } else if (!fromDate && !toDate) {
      fetchBookingsByStylistId();
    }
  }, [fromDate, toDate, stylistId]);

  const getDetailBooking = async (bookingId) => {
    try {
      const response = await api.get(`/Booking/ViewBookingDetail?bookingId=${bookingId}`);
      setDetail(response.data.data);
    } catch (error) {
      message.error("Failed to load booking details.");
    }
  };

  const startProgress = async (bookingId) => {
    try {
      const response = await api.post('/Stylist/UpdateBookingStatus/update-booking-status', {
        bookingId, 
        status: "In Progress"
      });
      if (response.data.error === 0) {
        message.success("Booking status updated to In Progress.");
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === bookingId ? { ...booking, status: "InProgress" } : booking
          )
        );
      } else {
        message.error("Failed to update booking status. " + response.data.message);
      }
    } catch (error) {
      message.error("Failed to update booking status.");
    }
  };
  

  const confirmBooking = async (bookingId) => {
    try {
      const response = await api.post('/Stylist/UpdateBookingStatus/update-booking-status', {
        bookingId, 
        status: "Completed"
      });
  
      if (response.data.error === 0) {
        message.success("Booking status updated to Completed.");
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === bookingId ? { ...booking, status: "Completed" } : booking
          )
        );
      } else {
        message.error("Failed to confirm booking. " + response.data.message);
      }
    } catch (error) {
      message.error("Failed to confirm booking.");
    }
  };
  
  const columns = [
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Booking Time",
      dataIndex: "bookingTime",
      key: "bookingTime",
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
    },
    {
      title: "Client Phone",
      dataIndex: "clientPhone",
      key: "clientPhone",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      render: (comboService) => <div>{comboService.comboServiceName}</div>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => {
        const status = record.status?.toLowerCase();
        let color = "default";
        let text = "Unknown";
        if (status === "confirmed") {
          color = "geekblue";
          text = "Confirmed";
        } else if (status === "inprogress") {
          color = "yellow";
          text = "In Progress";
        } else if (status === "completed") {
          color = "green";
          text = "Completed";
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Detail",
      key: "action",
      render: (_, record) => (
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
            className="booking-table-staff__button"
            style={{ fontWeight: "600" }}
            onClick={() => {
              showModal();
              getDetailBooking(record.id);
            }}
          >
            Detail
          </Button>
        </ConfigProvider>
      ),
    },
    {
      title: "Progress",
      key: "progress",
      render: (_, record) => (
        <Button
          className="booking-table-stylist__button"
          disabled={record.status.toLowerCase() !== "confirmed"}
          onClick={() => startProgress(record.id)}
        >
          {record.status.toLowerCase() === "inprogress" ? "In Progress" : "Start Progress"}
        </Button>
      ),
    },
    {
      title: "Confirm",
      key: "confirm",
      render: (_, record) => (
        <Button
          className="booking-table-stylist__button"
          disabled={record.status.toLowerCase() !== "inprogress"}
          onClick={() => confirmBooking(record.id)}
        >
          {record.status.toLowerCase() === "completed" ? "Completed" : "Confirm"}
        </Button>
      ),
    },
  ];

  return (
    <div className="booking-table-stylist">
      <DatePicker.RangePicker
        className="date-picker-range"
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
        style={{ width: "90%", margin: "auto" }}
        rowKey="id"
      />
      <Modal
        title="Booking Detail"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ className: "confirm-button" }}
        cancelButtonProps={{ className: "cancel-button" }}
        width={900}
        className="booking-table__modal"
      >
        {detail ? (
          <Descriptions bordered>
            <Descriptions.Item label="Customer Name">{detail.customerName}</Descriptions.Item>
            <Descriptions.Item label="Phone Number">{detail.customerPhoneNumber}</Descriptions.Item>
            <Descriptions.Item label="Price">{detail.paymentAmount} VND</Descriptions.Item>
            <Descriptions.Item label="Date">{dayjs(detail.bookingDate).format("YYYY-MM-DD")}</Descriptions.Item>
            <Descriptions.Item label="Payment Status">
              <Badge status={detail.checked ? "success" : "processing"} text={detail.checked ? "Checked" : "Waiting"} />
            </Descriptions.Item>
            <Descriptions.Item label="Stylist">{detail.stylistName}</Descriptions.Item>
            <Descriptions.Item label="Salon Address">123 ABC, D1</Descriptions.Item>
            <Descriptions.Item label="Service">
              {detail.comboServiceName?.length > 0 ? (
                detail.comboServiceName.map((service) => <div key={service.id}>{service.comboServiceName}</div>)
              ) : (
                <p>No services available</p>
              )}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  );
}

export default BookingAssigned;
