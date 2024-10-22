import { Badge, Descriptions, Steps } from "antd";
import React from "react";
import "./BookingCustomer.scss";

function BookingCustomer() {
  const items = [
    {
      key: "1",
      label: "Customer Name",
      children: "Janet",
    },
    {
      key: "2",
      label: "Phone Number",
      children: "098782374",
    },
    {
      key: "3",
      label: "Price",
      children: "$70",
    },
    {
      key: "4",
      label: "Date",
      children: "2018-04-24 18:00:00",
    },
    {
      key: "5",
      label: "Stylist Name",
      children: "K",
      span: 2,
    },
    {
      key: "6",
      label: "Status",
      children: <Badge status="processing" text="Waiting" color="yellow" />,
      span: 1,
    },
    {
      key: "6",
      label: "Salon Address",
      children: "123 ABC, D1",
      span: 2,
    },
    {
      key: "10",
      label: "Service",
      children: (
        <>
          Hair Cut - Duration: 15 minutes
          <br />
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="booking-steps">
        <Steps
          className="booking-steps__step"
          size="small"
          current={1}
          items={[
            {
              title: "Waiting Confirm",
            },
            {
              title: "Confirm Booking",
            },
            {
              title: "Finished",
            },
          ]}
        />
      </div>
      <div>
        <Descriptions
          title="Booking Detail"
          bordered
          items={items}
          className="booking-detail"
        />
        ;
      </div>
    </div>
  );
}

export default BookingCustomer;
