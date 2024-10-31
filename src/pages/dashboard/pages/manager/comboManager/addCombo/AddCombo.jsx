import React, { useState, useEffect } from "react";
import {
  Input,
  Checkbox,
  Button,
  message,
  ConfigProvider,
  Upload,
  Flex,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import api from "../../../../../../config/axios";
import "./AddCombo.scss";

function AddCombo() {
  const [comboName, setComboName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [comboServices, setComboServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const getComboDetails = async () => {
    try {
      const response = await api.get("/Combo/getAll-comboDetails");
      console.log("Data", response.data.data);
      setComboServices(response.data.data);
      console.log(comboServices);
    } catch (error) {
      message.error("Lỗi khi lấy danh sách combo service");
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((serviceId) => serviceId !== id)
        : [...prevSelected, id]
    );
  };

  // Xử lý upload file
  const handleFileChange = ({ file }) => {
    setImageFile(file.originFileObj);
  };

  // Gửi dữ liệu combo mới
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("ComboServiceName", comboName);
    formData.append("Price", price);
    formData.append("ImageUrl", imageFile);
    formData.append("ComboDetailId", selectedServices.join(","));

    try {
      const response = await api.post("/api/Combo/add-comboServices", formData);
      message.success("Tạo combo thành công!");
    } catch (error) {
      message.error("Lỗi khi tạo combo mới");
    }
  };
  useEffect(() => {
    getComboDetails();
  }, []);

  return (
    <div className="create-combo">
      <label>Combo Information</label>
      <div className="create-combo__input">
        <Input
          className="create-combo__input__inside"
          placeholder="Combo Name"
          value={comboName}
          onChange={(e) => setComboName(e.target.value)}
        />
        <Input
          className="create-combo__input__inside"
          placeholder="Combo Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          suffix="VND"
        />
      </div>
      <Flex gap="2em" className="create-combo__service">
        <label>Combo Service</label>
        {comboServices && comboServices.length > 0 ? (
          comboServices.map((service) => (
            <ConfigProvider
              theme={{
                components: {
                  Checkbox: {
                    colorPrimary: "#FAA300",
                  },
                },
              }}
            >
              <Checkbox
                key={service.id}
                onChange={() => handleCheckboxChange(service.id)}
                className="create-combo__service__checkbox"
              >
                {service.content}
              </Checkbox>
            </ConfigProvider>
          ))
        ) : (
          <p>No services available</p>
        )}
      </Flex>
      <div className="create-combo__image">
        <label style={{ marginBottom: "0.7em" }}>Combo Image</label>
        <Upload.Dragger
          name="file"
          multiple={false}
          beforeUpload={() => false}
          onChange={handleFileChange}
          className="create-combo__image__dragger"
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ color: "black" }} />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Upload.Dragger>
      </div>
      <div className="create-combo__button">
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultColor: "black",
                defaultBg: "#FAA300",
              },
            },
          }}
        >
          <Button
            className="create-combo__button__buttons"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </ConfigProvider>
      </div>{" "}
    </div>
  );
}

export default AddCombo;
