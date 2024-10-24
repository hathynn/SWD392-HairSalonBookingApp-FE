import "./ResetPassword.scss";
import { useState } from "react";
import RegisterPicture from "../../assets/register.jpg";
import Logo from "../../assets/logo.png";
import { Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../config/axios";

function ResetPassword() {
  const [error, setError] = useState(null);
  const nav = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values) => {
    const payload = {
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    try {
      const response = await api.post("/User/Register/register", values);
      const data = response.data;
      if (data.error === 0) {
        message.success(data.message);
        sessionStorage.setItem("registrationData", JSON.stringify(payload));
        console.log("registrationData");
        nav("/pin-code");
      } else {
        message.error(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="register-container">
        <div className="register-form-container">
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <img
              onClick={() => nav("/")}
              src={Logo}
              alt="Logo"
              style={{
                width: "18vw",
                height: "9.5vh",
                marginBottom: "1em",
                cursor: "pointer",
              }}
            />
          </div>
          <Formik
            initialValues={{
             
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="register-form">
               
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field name="password" type="password" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field name="confirmPassword" type="password" />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error-message"
                  />
                </div>
               
                <button
                  type="submit"
                  className="register-btn"
                  disabled={!isChecked}
                >
                  Recovery Password
                </button>
                {error && <p className="error-message">{error}</p>}
              </Form>
            )}
          </Formik>
          <div className="register-options">
            <p>
              Have an account yet?{" "}
              <a href="/login" className="login-link">
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
  );
}

export default ResetPassword;
