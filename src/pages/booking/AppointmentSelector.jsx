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
        <Option value="08:00">08:00</Option>
        <Option value="08:15">08:15</Option>
        <Option value="08:30">08:30</Option>
        <Option value="08:45">08:45</Option>
        <Option value="09:00">09:00</Option>
        <Option value="09:15">09:15</Option>
        <Option value="09:30">09:30</Option>
        <Option value="09:45">09:45</Option>
        <Option value="10:00">10:00</Option>
        <Option value="10:15">10:15</Option>
        <Option value="10:30">10:30</Option>
        <Option value="10:45">10:45</Option>
        <Option value="11:00">11:00</Option>
        <Option value="11:15">11:15</Option>
        <Option value="11:30">11:30</Option>
        <Option value="11:45">11:45</Option>
        <Option value="12:00">12:00</Option>
        <Option value="12:15">12:15</Option>
        <Option value="12:30">12:30</Option>
        <Option value="12:45">12:45</Option>
        <Option value="13:00">13:00</Option>
        <Option value="13:15">13:15</Option>
        <Option value="13:30">13:30</Option>
        <Option value="13:45">13:45</Option>
        <Option value="14:00">14:00</Option>
        <Option value="14:15">14:15</Option>
        <Option value="14:30">14:30</Option>
        <Option value="14:45">14:45</Option>
        <Option value="15:00">15:00</Option>
        <Option value="15:15">15:15</Option>
        <Option value="15:30">15:30</Option>
        <Option value="15:45">15:45</Option>
        <Option value="16:00">16:00</Option>
        <Option value="16:15">16:15</Option>
        <Option value="16:30">16:30</Option>
        <Option value="16:45">16:45</Option>
        <Option value="17:00">17:00</Option>
        <Option value="17:15">17:15</Option>
        <Option value="17:30">17:30</Option>
        <Option value="17:45">17:45</Option>
        <Option value="18:00">18:00</Option>
        <Option value="18:15">18:15</Option>
        <Option value="18:30">18:30</Option>
        <Option value="18:45">18:45</Option>
        <Option value="19:00">19:00</Option>
        <Option value="19:15">19:15</Option>
        <Option value="19:30">19:30</Option>
        <Option value="19:45">19:45</Option>
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
