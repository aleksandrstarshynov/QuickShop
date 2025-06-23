import React, { useState } from 'react';
import InputField from '../components/InputField';
import { registerUser } from '../services/authService';
import '../styles/Register.css';  

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    dateofbirth: '',
    email: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [serverMessage, setServerMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setServerMessage('');

    const errors = {};
    if (!formData.username) errors.username = 'Username is required';
    if (!formData.password) errors.password = 'Password is required';
    // можно добавить валидацию остальных полей...
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    try {
      const submitData = {
        ...formData,
        dateofbirth: new Date(formData.dateofbirth)
      };
      const response = await registerUser(submitData);
      setServerMessage(response.data.message || 'Registration successful');
    } catch (err) {
      if (err.response?.status === 409) {
        setServerMessage('User already exists');
      } else {
        setServerMessage('Registration failed');
      }
    }
  };

  return (
    <div className="register-page">
      <h2 className="register-page__title">Register</h2>
      <form className="register-page__form" onSubmit={handleSubmit}>
        <InputField
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={formErrors.username}
          placeholder="Username"
        />
        <InputField
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={formErrors.password}
          placeholder="Password"
        />
        <InputField
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          error={formErrors.firstname}
          placeholder="First name"
        />
        <InputField
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          error={formErrors.lastname}
          placeholder="Last name"
        />
        <InputField
          type="date"
          name="dateofbirth"
          value={formData.dateofbirth}
          onChange={handleChange}
          error={formErrors.dateofbirth}
          placeholder="Date of Birth"
        />
        <InputField
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={formErrors.email}
          placeholder="Email"
        />
        <InputField
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={formErrors.phone}
          placeholder="Phone"
        />
        <button type="submit" className="register-page__button">
          Register
        </button>
      </form>

      <p className="register-page__login-link">
        Already have an account? <a href="/login">Login</a>
      </p>
      {serverMessage && (
        <p className="register-page__message">{serverMessage}</p>
      )}
    </div>
  );
};

export default Register;
