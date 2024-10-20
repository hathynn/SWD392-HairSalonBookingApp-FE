import React, { useState, useEffect } from "react";
import "./Profile.scss";
import { useNavigate } from "react-router-dom";
import api from "../../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/counterSlice";
import { Flex, Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function Profile() {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
  });
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [error, setError] = useState(null);
  const user = useSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
     
      // await api.post(`/User/UpdateUser`, profile);  
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
      setError("Failed to update user data");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const userProfileById = async () => {
    try {
      const response = await api.get(`/User/GetUserById?id=${user.Id}`);
      setProfile(response.data.data);  
      setLoading(false); 
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("Failed to load user data");
    }
  };

  useEffect(() => {
    userProfileById(userId); 
  }, [userId]);

  return (
    <div>
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
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
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
