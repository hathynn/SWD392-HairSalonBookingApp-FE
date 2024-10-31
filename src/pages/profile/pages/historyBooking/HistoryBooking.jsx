import { useState } from "react";
import "./HistoryBooking.scss";
import { Space, Table, Tag } from "antd";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/features/counterSlice";
import api from "../../../../config/axios";

function HistoryBooking() {
  const [history, setHistory] = useState([]);
  const user = useSelector(selectUser);
  const getHistory = async () => {
    try {
        console.log(user.Id)
        const response = api.get(`/User/HistoryBookingForUser?userId=${user.Id}`)
    } catch (e) {

    }
  };
  const columns = [
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
    },
    {
      title: "Price",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Stylist",
      key: "stylist",
      dataIndex: "stylist",
    },
    {
      title: "Salon",
      key: "salon",
      dataIndex: "salon",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>View</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} />;
    </>
  );
}

export default HistoryBooking;
