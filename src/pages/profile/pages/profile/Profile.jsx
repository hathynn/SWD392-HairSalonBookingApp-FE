import React, { useState, useEffect } from "react";
import "./Profile.scss";
import { useNavigate } from "react-router-dom";
import { Flex, message, Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import api from "../../../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/features/counterSlice";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const userId = localStorage.getItem("userId");
  const user = useSelector(selectUser);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const formData = new FormData();
      formData.append("id", user.Id);
      formData.append("FullName", profile.fullName);
      formData.append("PhoneNumber", profile.phoneNumber);
      formData.append("Email", profile.email);
      formData.append("Address", profile.address);

      const response = await api.post(
        "/User/UpdateProfile/udpate-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.error === 0) {
        messageApi.success("Profile updated successfully!");
        setIsModalOpen(false);
        setProfile(response.data.data);
        userProfileById(userId);
      } else {
        messageApi.error("Failed to update profile.");
      }
    } catch (error) {
      console.error(
        "Error updating user profile:",
        error.response?.data || error.message
      );
      messageApi.error("Failed to update profile.");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const userProfileById = async (userId) => {
    try {
      const response = await api.get(`/User/GetUserById?id=${user.Id}`);
      const { id, fullName, phone, email, address } = response.data.data;
      setProfile({ id, fullName, phone, email, address });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    userProfileById(userId);
  }, [userId]);

  return (
    <div>
      {contextHolder}
      <div className="profile-container">
        <div className="profile-form">
          {loading ? (
            <Flex
              align="center"
              gap="middle"
              justify="center"
              style={{ width: "100%" }}
            >
              <Spin
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
                indicator={<LoadingOutlined spin />}
                size="large"
              />
            </Flex>
          ) : (
            <>
              <div className="form-row">
                <label>Full Name</label>
                <p className="form-detail">{profile.fullName}</p>
              </div>
              <div className="form-row">
                <label>Phone Number</label>
                <p className="form-detail">{profile.phone}</p>
              </div>
              <div className="form-row">
                <label>Address</label>
                <p className="form-detail">{profile.address}</p>
              </div>
              <div className="form-row">
                <label>Email</label>
                <p className="form-detail">{profile.email}</p>
              </div>
            </>
          )}
        </div>
        <Flex justify="center">
          <button className="update-btn" onClick={showModal}>
            Update Profile
          </button>
        </Flex>
      </div>
      <div className="update-profile" style={{ width: "890px" }}>
        <Modal
          title="Update Profile"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          className="update-profile__modal"
        >
          <div className="profile-container">
            <div className="profile-form">
              <div className="form-row">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={(e) =>
                    setProfile({ ...profile, fullName: e.target.value })
                  }
                />
              </div>
              <div className="form-row">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={(e) =>
                    setProfile({ ...profile, phoneNumber: e.target.value })
                  }
                />
              </div>
              <div className="form-row">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={(e) =>
                    setProfile({ ...profile, address: e.target.value })
                  }
                />
              </div>
              <div className="form-row">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Profile;
