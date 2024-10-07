import { Input, message } from "antd";
import React, { useEffect, useState } from "react";
import "./Pincode.scss";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, ReloadOutlined } from "@ant-design/icons";

function Pincode() {
    const [pin, setPin] = useState("");
    const [count, setCount] = useState(60);
    const [message, setMessage] = useState("");
    const nav = useNavigate();
    const registrationData = JSON.parse(sessionStorage.getItem('registrationData'));

    useEffect(() => {
        if (!registrationData) {
            nav("/sign-up");
        }
    }, [registrationData, nav]);

    const onChange = (e) => {
        const value = e.target.value;
        setPin(value);

    };

    const verifyPin = async () => {
        try {
            const response = await fetch(`http://localhost:5145/api/User/Verify/verify?token=${pin}`, {
                method: "POST",
                header: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) throw new Error("Invalid or expired pin");
            nav('/login');
        } catch (error) {
            console.error(error);
            setMessage("Pin verification failed!");
        }
    };


    useEffect(() => {
        const interval = setInterval(() => {
            if (count > 0) setCount(count - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [count]);

    return (
        <div className="pin">
            <div className="pin__wrapper">
                <p className="pin__back" onClick={() => nav("/login")}>
                    <ArrowLeftOutlined /> Back
                </p>
                <h1 className="pin__title">Enter Pin Code</h1>
                <div className="pin__email">{registrationData?.email}</div>
                {count > 0 ? (
                    <Input.OTP
                        value={pin}
                        onChange={onChange}
                        maxLength={6}
                        placeholder="Enter 6-digit pin"
                        inputMode="numeric"
                    />
                ) : (
                    <Input disabled placeholder="PIN expired" />
                )}
                {message && <p className="pin__error">{message}</p>}
                {count > 0 ? (
                    <p>PIN expires in: {count}s</p>
                ) : (
                    <p>Your PIN has expired</p>
                )}
                <div className="pin__btn" onClick={verifyPin}>
                    Verify Pin
                </div>
                <div
                    className="pin__btn"
                    onClick={() => {
                        setCount(60);
                    }}
                >
                    <ReloadOutlined /> Resend
                </div>
            </div>
        </div>
    );
}

export default Pincode;
