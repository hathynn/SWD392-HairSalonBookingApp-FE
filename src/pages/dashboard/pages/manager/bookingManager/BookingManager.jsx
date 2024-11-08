import React, { useEffect, useState } from "react";
import { Badge, Button, ConfigProvider, Descriptions, Modal, Table, Tag, message } from "antd";
import dayjs from "dayjs";
import "./BookingManager.scss";
import api from "../../../../../config/axios";

const BookingManager = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detail, setDetail] = useState([]);
  const [booking, setBooking] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getBooking = async () => {
    try {
      const response = await api.get("/Booking/ViewAllBookingWithAllStatus");
      const data = response.data.data.reverse();
      console.log(data);
      setBooking(data);
    } catch (e) {
      message.error("Can not get booking detail");
    }
  };

  const getDetailBooking = async (bookingId) => {
    try {
      const response = await api.get(
        `/Booking/ViewBookingDetail?bookingId=${bookingId}`
      );
      console.log(response.data.data);
      setDetail(response.data.data);
    } catch (error) {
      console.error("Failed to fetch booking details:", error);
      message.error("Failed to load booking details.");
    }
  };

  const columns = [
    {
      title: "Booking ID",
      dataIndex: "bookingId",
      key: "bookingId",
      width: 180,
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Total",
      dataIndex: "paymentAmount",
      key: "paymentAmount",
      render: (paymentAmount) => `${paymentAmount} VND`,
    },
    {
      title: "Stylist",
      dataIndex: "stylistName",
      key: "stylistName",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Status",
      key: "bookingStatus",
      render: (_, record) =>
        record.bookingStatus &&
        record.bookingStatus.toLowerCase() === "pending" ? (
          <Tag className="booking-table-staff__tag" color="volcano">
            Pending
          </Tag>
        ) : record.bookingStatus &&
          record.bookingStatus.toLowerCase() === "checked" ? (
          <Tag className="booking-table-staff__tag" color="geekblue">
            Confirmed
          </Tag>
        ) : record.bookingStatus &&
          record.bookingStatus.toLowerCase() === "inProgress" ? (
          <Tag className="booking-table-staff__tag" color="yellow">
            In Progress
          </Tag>
        ) : record.bookingStatus &&
          record.bookingStatus.toLowerCase() === "completed" ? (
          <Tag className="booking-table-staff__tag" color="green">
            Checked
          </Tag>
        ) : (
          <Tag className="booking-table-staff__tag" color="default">
            Unknown
          </Tag>
        ),
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Confirmed", value: "checked" },
        { text: "In Progress", value: "inProgress" },
        { text: "Checked", value: "completed" },
        { text: "Unknown", value: "unknown" },
      ],
      onFilter: (value, record) =>
        record.bookingStatus.toLowerCase().includes(value),
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
              getDetailBooking(record.bookingId);
            }}
          >
            Detail
          </Button>
        </ConfigProvider>
      ),
    },
  ];

  useEffect(() => {
    getBooking();
  }, []);

  return (
    <div className="booking-table-staff">
      <Table
        columns={columns}
        dataSource={booking}
        rowKey="bookingId"
        className="booking-table__detail"
        pagination={{ pageSize: 7 }}
      />

      <Modal
        title="Booking detail"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={900}
        className="booking-table__modal"
      >
        {detail ? (
          <Descriptions bordered>
            <Descriptions.Item label="Customer Name">
              {detail.customerName}
            </Descriptions.Item>
            <Descriptions.Item label="Phone Number">
              {detail.customerPhoneNumber}
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              {detail.paymentAmount} VND
            </Descriptions.Item>
            <Descriptions.Item label="Date">
              {dayjs(detail.bookingDate).format("YYYY-MM-DD HH:mm")}
            </Descriptions.Item>

            <Descriptions.Item label="Payment Status">
              <Badge
                status={
                  detail.paymentStatus?.toLowerCase() === "paid"
                    ? "success"
                    : detail.paymentStatus?.toLowerCase() === "pending"
                    ? "processing"
                    : detail.paymentStatus?.toLowerCase() === "refund"
                    ? "error"
                    : "default"
                }
                text={
                  detail.paymentStatus?.toLowerCase() === "paid"
                    ? "Paid"
                    : detail.paymentStatus?.toLowerCase() === "pending"
                    ? "Pending"
                    : detail.paymentStatus?.toLowerCase() === "cancel"
                    ? "Cancel"
                    : "Unknown"
                }
              />
            </Descriptions.Item>
            <Descriptions.Item label="Stylist">
              {detail.stylistName}
            </Descriptions.Item>

            <Descriptions.Item label="Salon">
              {detail.salonName}
            </Descriptions.Item>
            <Descriptions.Item label="Combo">
              {detail.comboServiceName?.comboServiceName}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  );
};

export default BookingManager;
