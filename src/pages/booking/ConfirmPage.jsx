import React from "react";
import { Card, Descriptions } from "antd";

function ConfirmPage({
  personalInfo,
  selectedServices = [],  // Default to an empty array if no services are selected
  appointmentDate,
  appointmentTime,
  stylist,
}) {
  const totalPrice = selectedServices.reduce(
    (total, service) => total + service.price,
    0
  );

  return (
    <div className="booking-confirm">
      <Descriptions
        title="Customer Information"
        bordered
        style={{ marginBottom: "1em" }}
        column={2}
      >
        <Descriptions.Item label="Name">
          {personalInfo.fullName ? personalInfo.fullName : "Name not entered"}
        </Descriptions.Item>
        <Descriptions.Item label="Phone">
          {personalInfo.phone ? personalInfo.phone : "Phone number not entered"}
        </Descriptions.Item>
        <Descriptions.Item label="Total Price">${totalPrice}</Descriptions.Item>
        <Descriptions.Item label="Date">
          {appointmentDate ? appointmentDate : "No date selected"}
        </Descriptions.Item>
        <Descriptions.Item label="Time">
          {appointmentTime ? appointmentTime : "No time selected"}
        </Descriptions.Item>
        <Descriptions.Item label="Stylist Name">
          {stylist || "(Optional)"}
        </Descriptions.Item>
        <Descriptions.Item label="Salon Address">
          {personalInfo.salonAddress
            ? personalInfo.salonAddress
            : "Address not entered"}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions title="Services" bordered>
        {selectedServices.length > 0 ? (
          selectedServices.map((service, index) => (
            <React.Fragment key={service.id}>
              <Descriptions.Item
                label={`Service ${index + 1}`}
                span={2}
              >
                {service.comboServiceName
                  ? service.comboServiceName
                  : "No service selected"}
              </Descriptions.Item>
              <Descriptions.Item label="Price" span={2}>
                ${service.price}
              </Descriptions.Item>
              
            </React.Fragment>
          ))
        ) : (
          <Descriptions.Item label="Services Name" span={2}>No services selected</Descriptions.Item>
        )}
      </Descriptions>
    </div>
  );
}

export default ConfirmPage;
