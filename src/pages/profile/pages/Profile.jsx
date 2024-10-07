import React, { useState, useEffect } from 'react';
import './Profile.scss';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: '',
  });
  const navigate = useNavigate();
  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log(userData);

    if (userData) {
      const parsedUser = JSON.parse(userData);
      setProfile((prevProfile) => ({
        ...prevProfile,
        fullName: parsedUser.fullName,
        email: parsedUser.email,
      }));
    }
  }, []);
  const handleUpdateProfile = () => {
    navigate('/update-profile'); 
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log(userData);

    if (userData) {
      const parsedUser = JSON.parse(userData);
      setProfile((prevProfile) => ({
        ...prevProfile,
        fullName: parsedUser.fullName,
        email: parsedUser.email,
      }));
    }
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-form">
        <div className="form-row">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={profile.fullName}
          />
        </div>
        <div className="form-row">
          <label>Gender</label>
          <input
            type="text"
            name="fullName"
            value={profile.gender}
          />
        </div>
        <div className="form-row">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={profile.email}
          />
        </div>
        <div className="form-row">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={profile.phoneNumber}
          />
        </div>
      </div>
      <button className="save-btn" onClick={handleUpdateProfile}>
        Update Profile
      </button>
    </div>
  );
}

export default Profile;
