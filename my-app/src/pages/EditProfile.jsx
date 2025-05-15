import React, { useState } from 'react';
import { updateUserData } from '../services/authService';

const EditProfile = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверяем наличие токена
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token is missing. Please log in again.');
      return;
    }

console.log('Updating profile with data:', formData);
const response = await updateUserData(formData, token);
console.log('Response from server:', response);


    try {
      const response = await updateUserData(formData, token);
      if (response.status === 200) {
        setMessage('Profile updated successfully');
        setError('');  // Clear any previous error message
      } else {
        setError('Failed to update profile.');
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError('Error updating profile. Please try again later.');
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
      
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default EditProfile;
