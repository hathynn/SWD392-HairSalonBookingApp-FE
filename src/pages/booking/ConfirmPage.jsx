import React from "react";
import { Card, Col, Descriptions, Row } from "antd";

function ConfirmPage({ personalInfo, service }) {
  return (
    <div>
      <Descriptions
        title="Customer Information"
        bordered
        column={2}
        style={{ marginBottom: "1em"}}
      >
        <Descriptions.Item label="Name">{personalInfo.fullName}</Descriptions.Item>
        <Descriptions.Item label="Phone">
          {personalInfo.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Address">
          {personalInfo.address}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions title="Services" bordered column={1}>
        <Descriptions.Item label="Name">{service}</Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default ConfirmPage;
