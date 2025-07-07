import React, { useState, useEffect } from 'react';
import { updateUserData, fetchUserProfile } from '../services/authService';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    dateofbirth: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // We pull up the current profile data to display it in the form
  useEffect(() => {
    (async () => {
      try {
        const resp = await fetchUserProfile();
        setFormData({
          username: resp.data.username || '',
          password: '',
          firstname: resp.data.firstname || '',
          lastname: resp.data.lastname || '',
          email: resp.data.email || '',
          phone: resp.data.phone || '',
          dateofbirth: resp.data.dateofbirth?.split('T')[0] || ''
        });
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token is missing. Please log in again.');
      return;
    }

    try {
      const response = await updateUserData(formData, token);
      if (response.status === 200) {
        setMessage('Profile updated successfully');
        setError('');
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
          placeholder="Username"
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
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dateofbirth"
          placeholder="Date of Birth"
          value={formData.dateofbirth}
          onChange={handleChange}
        />
        <button type="submit">Save Changes</button>
      </form>
      
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error   && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default EditProfile;
