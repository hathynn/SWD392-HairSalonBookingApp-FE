import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React from "react";

function StylistCategory({ personalInfo, setPersonalInfo, onNext }) {
  const handleChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Customer Information</h2>
      <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
      <br />
      <br />
      <Input placeholder="default size" prefix={<UserOutlined />} />
    </div>
  );
}

export default StylistCategory;
