import React, { useEffect, useState } from "react";
import {
  Space,
  Table,
  Tag,
  Button,
  message,
  ConfigProvider,
  Modal,
  Badge,
  Descriptions,
} from "antd";
import dayjs from "dayjs";
import "./BookingStaff.scss";
import api from "../../../../../config/axios";
import ButtonGroup from "antd/es/button/button-group";

const BookingStaff = () => {
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

  // useEffect(() => {
  //   const fetchBookings = async () => {
  //     try {
  //       const [uncheckedRes, checkedRes] = await Promise.all([
  //         api.get("/SalonManager/bookings/unchecked"),
  //         api.get("/SalonManager/bookings/checked"),
  //       ]);

  //       setUncheckedBookings(uncheckedRes.data);
  //       setCheckedBookings(checkedRes.data);
  //     } catch (error) {
  //       console.error("Failed to fetch bookings:", error);
  //       message.error("Failed to load bookings.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBookings();
  // }, []);

  // const handleCheckBooking = async (bookingId) => {
  //   console.log("bookign", bookingId);

  //   try {
  //     await api.post(
  //       `/Booking/CheckBooking/CheckBooking?bookingId=${bookingId}&Check=true`
  //     );
  //     message.success("Booking marked as checked.");

  //     setUncheckedBookings((prev) =>
  //       prev.filter((booking) => booking.bookingId !== bookingId)
  //     );
  //   } catch (error) {
  //     console.error("Failed to check booking:", error);
  //     message.error("Failed to mark booking as checked.");
  //   }
  // };

  const getBooking = async () => {
    try {
      const response = await api.get("/Booking/ViewAllBookingWithAllStatus");
      const data = response.data.data;
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
      console.log(response.data.data)
      setDetail(response.data.data);
    } catch (error) {
      console.error("Failed to fetch booking details:", error);
      message.error("Failed to load booking details.");
    }
  };

  const confirmBooking = async (bookingId) => {
    try {
      const response = await api.post(
        `/Booking/CheckBooking/CheckBookingAsConfirmed?bookingId=${bookingId}`
      );
      message.success("Confirm this booking successfully!");
      getBooking();
    } catch (e) {
      message.error("Confirm this booking unsuccessfully!");
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
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
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

    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.bookingStatus &&
        record.bookingStatus.toLowerCase() === "pending" ? (
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
              className="booking-table-staff__button"
              onClick={() => confirmBooking(record.bookingId)}
            >
              Confirm
            </Button>
          </ConfigProvider>
        ) : (
          <Button disabled>Confirm</Button>
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
              {dayjs(detail.bookingDate).format("YYYY-MM-DD")}
            </Descriptions.Item>
          
            <Descriptions.Item label="Payment Status">
              <Badge
                status={detail.checked ? "success" : "processing"}
                text={detail.checked ? "Checked" : "Waiting"}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Stylist">
            {detail.comboServiceName?.stylistName}
            </Descriptions.Item>
            <Descriptions.Item label="Salon Address">
              123 ABC, D1
            </Descriptions.Item>
            <Descriptions.Item label="Service">
              {detail.comboServiceName?.length > 0 ? (
                detail.comboServiceName.map((service) => (
                  <div key={service.id}>{service.comboServiceName}</div>
                ))
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
};

export default BookingStaff;
