import React, { useState, useEffect } from 'react';
import './Profile.scss';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
  });
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [error, setError] = useState(null);
  //USER PROFILE BY ID
  const userProfileById = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5145/api/User/GetUserById?id=${userId}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProfile({
          fullName: data.data.fullName,
          email: data.data.email,
          phoneNumber: data.data.phone,
        });
      } else {
        throw new Error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Failed to load user data');
    }
  };

  const handleUpdateProfile = () => {
    navigate('/update-profile');
  };

  useEffect(() => {
    userProfileById(userId);
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
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={profile.phoneNumber}
          />
        </div>
        <div className="form-row">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={profile.address}
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
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={profile.password}
          />
        </div>
      </div>
      <button className="update-btn" onClick={handleUpdateProfile}>
        Update Profile
      </button>
    </div>
  );
}

export default Profile;
