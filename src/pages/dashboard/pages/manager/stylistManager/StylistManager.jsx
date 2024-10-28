import React, { useEffect, useState } from "react";
import "./StylistManager.scss";
import { message, Space, Table, Tag } from "antd";
import api from "../../../../../config/axios";

function StylistManager() {
  const [stylist, setStylist] = useState([]);

  const columns = [
    {
      title: "Stylist Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <>
          {status ? (
            <Tag color="green">Active</Tag>
          ) : (
            <Tag color="red">Inactive</Tag>
          )}
        </>
      ),
    },
  ];

  const getStylist = async () => {
    try {
      const response = await api.get("/SalonManager/print-all-Stylists");
      const data = response.data;
      setStylist(data);
    } catch (e) {
      message.error("Can not loading stylist data");
    }
  };

  useEffect(() => {
    getStylist();
  }, []);

  return (
    <div className="stylist-manage">
      <h1>Stylists</h1>
      <Table columns={columns} dataSource={stylist} />
    </div>
  );
}

export default StylistManager;
