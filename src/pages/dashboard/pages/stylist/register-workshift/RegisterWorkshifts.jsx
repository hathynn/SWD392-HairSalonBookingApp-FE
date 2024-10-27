import React, { useEffect, useState } from 'react';
import { DatePicker, Checkbox, Button, message } from 'antd';
import './RegisterWorkshifts.scss';
import dayjs from 'dayjs';
import api from '../../../../../config/axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../redux/features/counterSlice';

function RegisterWorkshifts() {
    const [scheduleDate, setScheduleDate] = useState(null);
    const [workShifts, setWorkShifts] = useState([]);
    const shifts = ['Morning', 'Afternoon', 'Evening'];
    const user = useSelector(selectUser);
    const userId = user.Id;

    // Handle shift checkbox change
    const handleShiftChange = (shift) => {
        setWorkShifts(prevShifts =>
            prevShifts.includes(shift)
                ? prevShifts.filter(s => s !== shift)
                : [...prevShifts, shift]
        );
    };
    const disabledDate = (current) => {
        return current && current < dayjs().endOf('day');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            userId,
            scheduleDate: scheduleDate ? dayjs(scheduleDate).format('YYYY-MM-DD') : null,
            workShifts,
        };

        try {
            const response = await api.post('/Stylist/RegisterWorkSchedule/register-work-schedule', data);
            const responseData = response.data.data;
            if (responseData.error === 0) {
                message.success('Work schedule registered successfully');
            } else {
                message.error('Failed to register work schedule');
            }
        } catch (error) {
            console.error('Error:', error);
            message.error('An error occurred');
        }
    };

    return (
        <div className="register-workshifts">
            <h2>Register Workshifts</h2>
            <form onSubmit={handleSubmit}>
                <label>Date: </label>
                <DatePicker
                    format="YYYY-MM-DD"
                    disabledDate={disabledDate}
                    value={scheduleDate ? dayjs(scheduleDate) : null}
                    onChange={(date) => setScheduleDate(date)}
                    style={{ width: '100%' }}
                />
                <fieldset>
                <label>Shifts: </label>
                    {shifts.map(shift => (
                        <Checkbox
                            key={shift}
                            checked={workShifts.includes(shift)}
                            onChange={() => handleShiftChange(shift)}
                            style={{ marginRight: '40px' }}
                        >
                            {shift}
                        </Checkbox>
                    ))}
                </fieldset>

                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </form>
        </div>
    );
}

export default RegisterWorkshifts;
