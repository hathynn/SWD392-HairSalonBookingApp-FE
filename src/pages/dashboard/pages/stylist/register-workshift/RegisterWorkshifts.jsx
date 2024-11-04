import React, { useEffect, useState } from "react";
import { DatePicker, Checkbox, Button, message, ConfigProvider } from "antd";
import "./RegisterWorkshifts.scss";
import dayjs from "dayjs";
import api from "../../../../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/features/counterSlice";

function RegisterWorkshifts() {
  const [scheduleDate, setScheduleDate] = useState(null);
  const [workShifts, setWorkShifts] = useState([]);
  const shifts = ["Morning", "Afternoon", "Evening"];
  const user = useSelector(selectUser);
  const userId = user.Id;
  const stylistId = userId;

  // Handle shift checkbox change
  const handleShiftChange = (shift) => {
    setWorkShifts((prevShifts) =>
      prevShifts.includes(shift)
        ? prevShifts.filter((s) => s !== shift)
        : [...prevShifts, shift]
    );
  };
  const disabledDate = (current) => {
    return current && current < dayjs().endOf("day");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      stylistId,
      scheduleDate: scheduleDate
        ? dayjs(scheduleDate).format("YYYY-MM-DD")
        : null,
      workShifts,
    };

    try {
      const response = await api.post(
        "/Stylist/RegisterWorkSchedule/register-work-schedule",
        data
      );
      const responseData = response.data;
      if (responseData.error === 0) {
        message.success("Work schedule registered successfully");
      } else {
        message.error(responseData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred");
    }
  };

  return (
    <div className="register-workshifts">
      <p>Register Workshifts</p>
      <form onSubmit={handleSubmit}>
        <label>Date: </label>
        <DatePicker
          format="YYYY-MM-DD"
          disabledDate={disabledDate}
          value={scheduleDate ? dayjs(scheduleDate) : null}
          onChange={(date) => setScheduleDate(date)}
          style={{ width: "100%" }}
        />
        <fieldset>
          <label>Shifts: </label>
          {shifts.map((shift) => (
            <Checkbox
              key={shift}
              checked={workShifts.includes(shift)}
              onChange={() => handleShiftChange(shift)}
              style={{ marginRight: "10px" }}
            >
              {shift}
            </Checkbox>
          ))}
        </fieldset>
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
          <Button htmlType="submit" className="register-workshifts__button">
            Register
          </Button>
        </ConfigProvider>
      </form>
    </div>
  );
}

export default RegisterWorkshifts;
