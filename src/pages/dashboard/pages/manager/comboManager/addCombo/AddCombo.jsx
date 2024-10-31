import React from "react";
import "./AddCombo.scss";
import Input from "antd/es/input/Input";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import { Button, ConfigProvider } from "antd";

function AddCombo() {
  const props = {
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div className="create-combo">
      <label>Combo Information</label>
      <div className="create-combo__input">
        <Input
          placeholder="Combo Name"
          className="create-combo__input__inside"
        />
        <Input
          placeholder="Combo Price"
          className="create-combo__input__inside"
          suffix="VND"
        />
      </div>
      <label>Combo Image</label>
      <div className="create-combo__image">
        <Dragger {...props} className="create-combo__image__dragger">
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
        </Dragger>
      </div>
      <div className="create-combo__service"></div>
      <div className="create-combo__button">
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultColor: "black",
                defaultBg: "#FAA300",
                defaultBorderColor: "#FAA300",
                defaultHoverBorderColor: "black",
                defaultHoverColor: "white",
                defaultHoverBg: "black",
                defaultActiveBg: "#FAA300",
                defaultActiveBorderColor: "#FAA300",
                defaultActiveColor: "black",
              },
            },
          }}
        >
          <Button  className="create-combo__button__buttons">Submit</Button>
        </ConfigProvider>
      </div>
    </div>
  );
}

export default AddCombo;
