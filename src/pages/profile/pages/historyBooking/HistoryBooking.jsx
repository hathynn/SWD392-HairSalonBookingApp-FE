import { useEffect, useState } from "react";
import "./HistoryBooking.scss";
import {
  Badge,
  Button,
  ConfigProvider,
  Flex,
  message,
  Modal,
  Table,
  Tag,
} from "antd";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/features/counterSlice";
import api from "../../../../config/axios";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";

function HistoryBooking() {
  const [history, setHistory] = useState([]);
  const user = useSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [bookingId, setBookingId] = useState(null); // State for bookingId

  const showModal = (id) => {
    setBookingId(id); // Set the bookingId when opening the modal
    setIsModalOpen(true);
    setSelectedFeedback(null); // Reset the selected feedback when opening the modal
    setFeedbackText(""); // Reset the feedback text when opening the modal
  };

  const handleOk = async () => {
    if (!selectedFeedback && !feedbackText) {
      message.error("Please select a feedback option and input a description.");
      return;
    }

    try {
      const response = await api.post(`/User/UserFeedback`, {
        bookingId: bookingId,
        title: selectedFeedback,
        desription: feedbackText,
      });
      message.success("Feedback submitted successfully!");
      setIsModalOpen(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data;
        message.error(errorMessage);
      } else {
        message.error("Error submitting feedback.");
      }
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFeedbackClick = (feedbackOption) => {
    setSelectedFeedback(feedbackOption);
  };

  const getHistory = async () => {
    try {
      const response = await api.get(
        `/User/HistoryBookingForUser?userId=${user.Id}`
      );
      const bookings = response.data.data.bookings;

      const formattedBookings = bookings.map((booking) => ({
        key: booking.id,
        bookingId: booking.id, // Add bookingId to the formatted data
        bookingDate: booking.bookingDate,
        price: booking.comboServiceName.price,
        service: booking.comboServiceName.comboServiceName,
        stylist: booking.stylistName,
        salon: booking.address,
        bookingStatus: booking.bookingStatus,
      }));

      setHistory(formattedBookings);
    } catch (e) {
      message.error("No booking found");
    }
  };

  const columns = [
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Stylist",
      dataIndex: "stylist",
      key: "stylist",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Salon",
      dataIndex: "salon",
      key: "salon",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Status",
      dataIndex: "bookingStatus",
      key: "bookingStatus",
      render: (bookingStatus) => (
        <Tag
          color={
            bookingStatus === "Completed"
              ? "green"
              : bookingStatus === "Cancel"
              ? "red"
              : "default"
          }
          style={{ fontFamily: "Gantari"}}
        >
          {bookingStatus}
        </Tag>
      ),
    },
    {
      title: "Feedback",
      key: "feedback",
      render: (_, record) => (
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
            onClick={() => showModal(record.bookingId)} // Pass the bookingId to the modal
          >
            Feedback
          </Button>
        </ConfigProvider>
      ),
    },
  ];

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="history">
      <Table
        className="history__table"
        columns={columns}
        dataSource={history}
      />
      <div className="feedback-modal">
        <Modal
          title="Feedback"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          className="history__modal"
        >
          <Flex justify="space-between" style={{ margin: "1em 0" }}>
            <Button
              type={selectedFeedback === "Very Good" ? "primary" : "default"}
              onClick={() => handleFeedbackClick("Very Good")}
            >
              Very Good
            </Button>
            <Button
              type={selectedFeedback === "Good" ? "primary" : "default"}
              onClick={() => handleFeedbackClick("Good")}
            >
              Good
            </Button>
            <Button
              type={selectedFeedback === "Average" ? "primary" : "default"}
              onClick={() => handleFeedbackClick("Average")}
            >
              Average
            </Button>
            <Button
              type={selectedFeedback === "Bad" ? "primary" : "default"}
              onClick={() => handleFeedbackClick("Bad")}
            >
              Bad
            </Button>
            <Button
              type={selectedFeedback === "Very Bad" ? "primary" : "default"}
              onClick={() => handleFeedbackClick("Very Bad")}
            >
              Very Bad
            </Button>
          </Flex>
          <TextArea
            rows={4}
            placeholder="You can only input in 200 characters"
            maxLength={200}
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
        </Modal>
      </div>
    </div>
  );
}

export default HistoryBooking;
