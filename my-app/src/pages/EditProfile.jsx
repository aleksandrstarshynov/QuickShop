import React, { useState } from 'react';
import { updateUserData } from '../services/authService';

const EditProfile = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // или где ты его хранишь
      const response = await updateUserData(formData, token);
      setMessage('Profile updated successfully');
    } catch (err) {
      setMessage('Error updating profile');
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="New Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Save Changes</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditProfile;
