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
import api from "../../../../../../config/axios";
import "./AddCombo.scss";
import { uploadImage } from "../../../../../../config/cloudinaryUpload";

function AddCombo() {
  const [comboName, setComboName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [comboServices, setComboServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [fileList, setFileList] = useState([]); // Quản lý file được chọn
  const [imageFile, setImageFile] = useState(null); // Lưu file ảnh thực sự

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

  const handleFileChange = (info) => {
    console.log("Info:", info); // Log thông tin của info để kiểm tra

    const { fileList } = info;

    setFileList(fileList); // Cập nhật danh sách file hiển thị trong Upload

    // Nếu có file trong danh sách, lấy file gốc từ phần tử đầu tiên
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj; // Lấy file thực tế
      setImageFile(file); // Lưu file vào state
      console.log("File gốc:", file); // Log file để kiểm tra
    } else {
      setImageFile(null); // Nếu không có file, đặt lại imageFile
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      message.error("Vui lòng chọn ảnh");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("ComboServiceName", comboName);
      formData.append("Price", price);
      formData.append("ImageFile", imageFile); // Thêm file ảnh
      selectedServices.forEach((serviceId) => {
        formData.append("ComboDetailIds", serviceId);
      });
  
      await api.post("/Combo/add-comboServices", formData);
      message.success("Adding combo successfully!");
    } catch (error) {
      console.error("Lỗi khi tạo combo:", error);
      message.error("Lỗi khi tạo combo mới.");
    }
  };
  

  // const handleSubmit = async () => {
  //   if (!imageFile) {
  //     message.error("Vui lòng chọn ảnh");
  //     return;
  //   }

  //   try {
  //     const uploadedImageUrl = await uploadImage(imageFile);
  //     console.log("response ", uploadedImageUrl);
  //     setImageUrl(uploadedImageUrl);
  //     console.log("name", comboName);
  //     console.log("Price", price);
  //     console.log("ComboDetailId", selectedServices);

  //     const formData = new FormData();
  //     formData.append("ComboServiceName", comboName);
  //     formData.append("Price", price);
  //     formData.append("ImageUrl", uploadedImageUrl);
  //     selectedServices.forEach((serviceId) => {
  //       formData.append("ComboDetailIds", serviceId);
  //     });

  //     console.log(imageUrl);
  //     await api.post("/Combo/add-comboServices", formData);
  //     message.success("Adding combo successfully!");
  //   } catch (error) {
  //     console.error("Lỗi khi upload ảnh hoặc tạo combo:", error);
  //     message.error("Lỗi khi tạo combo mới hoặc upload ảnh.");
  //   }
  // };

  useEffect(() => {
    getComboDetails();
  }, []);

  return (
    <div className="create-combo">
      <label>Combo Information</label>
      <div className="create-combo__input">
        <Input
          className="create-combo__input__inside"
          placeholder="Combo name"
          value={comboName}
          onChange={(e) => setComboName(e.target.value)}
        />
        <Input
          className="create-combo__input__inside"
          placeholder="Combo price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          suffix="VND"
        />
      </div>
      <Flex gap="2em" className="create-combo__service">
        <label>Combo service(s):</label>
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
          <p>No service available</p>
        )}
      </Flex>
      <div className="create-combo__image">
        <label style={{ marginBottom: "0.7em" }}>Combo Image</label>
        <Upload.Dragger
          name="file"
          multiple={false}
          beforeUpload={() => false}
          onChange={handleFileChange}
          fileList={fileList}
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
