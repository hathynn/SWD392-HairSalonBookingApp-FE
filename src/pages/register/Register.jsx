import './Register.scss'
import { useState } from 'react';
import RegisterPicture from '../../assets/register.jpg'

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            fullName,
            phoneNumber,
            email,
            password,
            confirmPassword,
        };

        try {
            const response = await fetch(
                "http://localhost:5145/api/User/Register/register",
                {
                    method: "POST",
                    headers: {
                        "accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                throw new Error("Register failed!");
            }

            const data = await response.json();
            console.log("Register successful:", data);
        } catch (error) {
            console.error("Error:", error.message);
            message.error("Register failed! Please check your information");
        }
    };
    return (
        <>
            <div className="register-container">
                <div className="register-form-container">
                    <h2>Welcome to Maverick</h2>
                    <form onSubmit={handleSubmit} className="register-form">
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Michael Jackson"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="1234 567 890"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@gmail.com"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="login-btn">
                            Register
                        </button>
                        {error && <p className="error-message">{error}</p>}
                    </form>
                    <div className="register-options" >
                        <p>
                            Have an account yet?{" "}
                            <a href="/login" className="signup-link">
                                Back to login
                            </a>
                        </p>
                    </div>
                </div>
                <div className="introduction-image">
                    <img src={RegisterPicture} alt="Register" />
                </div>
            </div>
        </>
    )
}

export default Register