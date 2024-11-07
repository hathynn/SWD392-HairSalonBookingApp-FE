import { useEffect, useState } from "react";
import "./HistoryBooking.scss";
import { Button, ConfigProvider, message, Modal, Space, Table } from "antd";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/features/counterSlice";
import api from "../../../../config/axios";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";

function HistoryBooking() {
  const [history, setHistory] = useState([]);
  const user = useSelector(selectUser);
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

  const getHistory = async () => {
    try {
      const response = await api.get(
        `/User/HistoryBookingForUser?userId=${user.Id}`
      );
      const bookings = response.data.data.bookings;

      const formattedBookings = bookings.map((booking) => ({
        key: booking.id,
        bookingDate: booking.bookingDate,
        price: booking.comboServiceName.price,
        service: booking.comboServiceName.comboServiceName,
        stylist: booking.stylistName,
        salon: booking.address,
      }));

      setHistory(formattedBookings);
    } catch (e) {
      message.error('No booking found');
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
            onClick={() => showModal(record.bookingId)}
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
          <TextArea
            rows={4}
            placeholder="You can only input in 100 words"
            maxLength={100}
          /> 
        </Modal>
      </div>
    </div>
  );
}

export default HistoryBooking;
