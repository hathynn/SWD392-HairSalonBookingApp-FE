import React, { useState, useEffect } from "react";
import { Input, Checkbox, Button, message, ConfigProvider, Upload, Flex } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import api from "../../../../../../config/axios";
import "./AddCombo.scss";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

function AddCombo() {
  const [comboName, setComboName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [comboServices, setComboServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const getComboDetails = async () => {
    try {
      const response = await api.get("/Combo/getAll-comboDetails");
      setComboServices(response.data.data);
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

  const handleFileChange = ({ file }) => {
    setImageFile(file);
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      message.error("Vui lòng chọn ảnh");
      return;
    }

    try {
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", imageFile);
      cloudinaryFormData.append("upload_preset", uploadPreset);
      const cloudinaryResponse = await axios.post(cloudinaryUrl, cloudinaryFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (cloudinaryResponse && cloudinaryResponse.data) {
        console.log("Upload Successful:", cloudinaryResponse.data);
      } else {
        console.log("Unexpected response format:", cloudinaryResponse);
      }

      const imageUrl = cloudinaryResponse.data.secure_url;
      console.log("Url:" + imageUrl)
      const formData = new FormData();
      formData.append("ComboServiceName", comboName);
      formData.append("Price", price);
      formData.append("ImageUrl", imageUrl);
      formData.append("ComboDetailId", selectedServices.join(","));

      await api.post("/Combo/add-comboServices", formData);
      message.success("Create successful combo!");
    } catch (error) {
      console.error("Error uploading photo or sending combo:", error);
      message.error("Error creating new combo or uploading image.");
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
              key={service.id}
            >
              <Checkbox
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
      </div>
    </div>
  );
}

export default AddCombo;
