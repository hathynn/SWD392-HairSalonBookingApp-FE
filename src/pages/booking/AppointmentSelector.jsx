import React, { useEffect, useState } from "react";
import { Button, DatePicker, message, Select } from "antd";
import api from "../../config/axios";
import dayjs from "dayjs";

const { Option } = Select;
const DEFAULT_STYLIST_GUID = "d548c133-892b-4fae-b811-3e034a8efa2b";

const AppointmentSelector = ({
  personalInfo,
  setAppointmentDate,
  setAppointmentTime,
  setStylist,
}) => {
  const [stylists, setStylists] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [showStylistSelect, setShowStylistSelect] = useState(false); // Kiểm soát hiển thị Select stylist

  const getStylist = async (date, time) => {
    if (!date || !time) {
      console.log("Date or time not set");
      return;
    }

    try {
      const [hour, minute] = time.split(":");
      const response = await api.get(
        `/Stylist/GetAvailableStylist/get-available-stylists?salonId=${personalInfo.salonId}&bookingDate=${date}&bookingHour=${hour}&bookingMinute=${minute}`
      );

      if (response.status === 200) {
        const stylistsData = response.data;
        setStylists(stylistsData);
        setShowStylistSelect(true); // Hiển thị Select stylist khi stylists đã tải thành công
      }
    } catch (error) {
      console.log("Error fetching stylists:", error);
    }
  };

  const disabledDate = (current) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return current && current.valueOf() < today.getTime();
  };

  const handleFindStylistsClick = () => {
    if (selectedDate && selectedTime) {
      setAppointmentDate(selectedDate);
      setAppointmentTime(selectedTime);
      getStylist(selectedDate, selectedTime);
    } else {
      message.error("Please select both date and time");
    }
  };

  useEffect(() => {
    if (selectedDate && selectedTime) {
      setAppointmentDate(selectedDate);
      setAppointmentTime(selectedTime);
    }
  }, [selectedDate, selectedTime]);

  useEffect(() => {
    if (!selectedStylist) {
      setStylist({ id: DEFAULT_STYLIST_GUID, fullName: "No Stylist Selected" });
    } else {
      setStylist(selectedStylist);
    }
  }, [selectedStylist]);

  return (
    <div className="dateSelector">
      <DatePicker
        onChange={(date) => {
          const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;
          setSelectedDate(formattedDate);
        }}
        className="dateSelector__date"
        disabledDate={disabledDate}
        style={{ marginBottom: "1em", marginRight: "1em" }}
      />

      <Select
        placeholder="Select time"
        style={{ width: "100%", marginBottom: "1em" }}
        className="dateSelector__time"
        onChange={(value) => setSelectedTime(value)}
      >
        {/* Add time options here */}
        <Option value="08:00">08:00</Option>
        <Option value="08:15">08:15</Option>
        {/* ... additional options */}
        <Option value="14:00">14:00</Option>
        <Option value="20:00">20:00</Option>
      </Select>

      <Button
        type="primary"
        style={{
          backgroundColor: "#FAA300",
          color: "black",
          padding: "10px 20px",
          borderRadius: "8px",
        }}
        onClick={handleFindStylistsClick}
      >
        Find Stylists
      </Button>

      {showStylistSelect && (
        <Select
          placeholder="Choose stylist (Optional)"
          onChange={(value) => {
            const selected = stylists.find(
              (stylist) => stylist.fullName === value
            );
            setSelectedStylist(
              selected
                ? {
                    id: selected.id,
                    fullName: selected.fullName,
                  }
                : {}
            );
          }}
          style={{ width: "100%", marginTop: "1em" }}
          className="dateSelector__stylist"
        >
          {stylists && stylists.length > 0 ? (
            stylists.map((stylist) => (
              <Option key={stylist.email} value={stylist.fullName}>
                {stylist.fullName}
              </Option>
            ))
          ) : (
            <Option disabled>No stylist available</Option>
          )}
        </Select>
      )}
    </div>
  );
};

export default AppointmentSelector;
