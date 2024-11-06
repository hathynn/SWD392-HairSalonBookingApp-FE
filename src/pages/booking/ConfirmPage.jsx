import React, { useEffect } from "react";
import { Descriptions } from "antd";
import { useLocation } from "react-router-dom";

function ConfirmPage({
  personalInfo,
  selectedService,
  appointmentDate,
  appointmentTime,
  stylist,
})

{
  // const location = useLocation();
  // const { appointmentDate, appointmentTime } = location.state || {};
  useEffect(() => {
    console.log("selectedDate has changed:", appointmentDate);
    console.log("selectedTime has changed:", appointmentTime);
  }, [appointmentDate, appointmentTime]);
  return (
    <div className="booking-confirm">
      <Descriptions
        title="Customer Information"
        bordered
        style={{ marginBottom: "1em" }}
        column={2}
      >
        <Descriptions.Item label="Name">
          {personalInfo.fullName || "Name not entered"}
        </Descriptions.Item>
        <Descriptions.Item label="Phone">
          {personalInfo.phone || "Phone number not entered"}
        </Descriptions.Item>
        <Descriptions.Item label="Date">
          {appointmentDate || "No date selected"}
        </Descriptions.Item>
        <Descriptions.Item label="Time">
          {appointmentTime || "No time selected"}
        </Descriptions.Item>
        <Descriptions.Item label="Stylist Name">
          {stylist?.fullName || "(Optional)"}
        </Descriptions.Item>
        <Descriptions.Item label="Salon Address">
          {personalInfo.salonAddress || "Address not entered"}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions title="Service" bordered>
        {selectedService && selectedService.comboServiceName ? (
          <>
            <Descriptions.Item label="Service Name" span={2}>
              {selectedService.comboServiceName}
            </Descriptions.Item>
            <Descriptions.Item label="Price" span={2}>
              {selectedService.price} VND
            </Descriptions.Item>
          </>
        ) : (
          <Descriptions.Item label="Service Name" span={2}>
            No service selected
          </Descriptions.Item>
        )}
      </Descriptions>
    </div>
  );
}

export default ConfirmPage;
