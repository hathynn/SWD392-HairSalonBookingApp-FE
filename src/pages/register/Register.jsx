import './Register.scss'
import { useState } from 'react';
import RegisterPicture from '../../assets/register.jpg';
import { Checkbox, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Register() {
    const [error, setError] = useState(null);
    const nav = useNavigate();
    const [isChecked, setIsChecked] = useState(false);


    //VALIDATION
    const validationSchema = Yup.object({
        fullName: Yup.string().required('Full Name is required'),
        phoneNumber: Yup.string()
            .matches(/^[0-9]{10,11}$/, 'Phone number must be 10-11 digits')
            .required('Phone number is required'),
        email: Yup.string()
            .email('Invalid email format')
            .matches(/@gmail\.com$/, 'Email must be a @gmail.com account')
            .required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const handleSubmit = async (values) => {
        const payload = {
            fullName: values.fullName,
            phoneNumber: values.phoneNumber,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
        };

        try {
            const response = await fetch("http://localhost:5145/api/User/Register/register", {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(message.error("Register failed! This email is already registered"));
            }
            const data = await response.json();

            if (data.error === 0) {
                console.log("Register successful:", data);
                sessionStorage.setItem('registrationData', JSON.stringify(payload));
                nav('/pin-code');
            } else {
                throw new Error(message.error(data.message));
            }

        } catch (error) {
            console.error("Error:", error.message);
            setError(error.message);
        }
    };

    return (
        <>
            <div className="register-container">
                <div className="register-form-container">
                    <h2>Welcome to Maverick</h2>
                    <Formik
                        initialValues={{
                            fullName: '',
                            phoneNumber: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form className="register-form">
                                <div className="form-group">
                                    <label htmlFor="fullName">Full Name</label>
                                    <Field name="fullName" type="text" />
                                    <ErrorMessage name="fullName" component="div" className="error-message" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <Field name="phoneNumber" type="text" />
                                    <ErrorMessage name="phoneNumber" component="div" className="error-message" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field name="email" type="email" />
                                    <ErrorMessage name="email" component="div" className="error-message" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field name="password" type="password" />
                                    <ErrorMessage name="password" component="div" className="error-message" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <Field name="confirmPassword" type="password" />
                                    <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                                </div>
                                <Checkbox
                                    className="privacy-checked"
                                    checked={isChecked}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                >
                                    I agree with the <span style={{ fontWeight: "bold" }}>Term of Service</span> and <span style={{ fontWeight: "bold" }}>Privacy Policy</span>. </Checkbox>
                                <button type="submit" className="register-btn" disabled={!isChecked}>
                                    Register
                                </button>
                                {error && <p className="error-message">{error}</p>}
                            </Form>
                        )}
                    </Formik>
                    <div className="register-options">
                        <p>Have an account yet?{" "}
                            <a href="/login" className="login-link">Back to login</a>
                        </p>
                    </div>
                </div>
                <div className="introduction-image">
                    <img src={RegisterPicture} alt="Register" />
                </div>
            </div>
        </>
    );
}

export default Register;
