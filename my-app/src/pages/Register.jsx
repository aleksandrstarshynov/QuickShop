import React, { useState } from 'react';
import InputField from '../components/InputField';
import { registerUser } from '../services/authService';

const Register = () => {
//temporary test
  // localStorage.setItem("test", "testValue2");
//

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [serverMessage, setServerMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setServerMessage('');

    if (!formData.username || !formData.password) {
      setFormErrors({
        username: !formData.username ? 'Username is required' : '',
        password: !formData.password ? 'Password is required' : '',
      });
      return;
    }

    try {
      const response = await registerUser(formData);
      console.log(response);
  // Сохраняем в localStorage
  if (response && response.data) {
      // localStorage.setItem("username", response.data.username);
      // localStorage.setItem("password", response.data.password);
      // localStorage.setItem("userId", response.data.id);
      // localStorage.setItem("token", response.data.token);
    };
  //

      setServerMessage(`Registered as ${response.data.username}`);
    } catch (err) {
      if (err.response?.status === 409) {
        setServerMessage('User already exists');
      } else {
        setServerMessage('Registration failed');
      }
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          // label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={formErrors.username}
          placeholder="Username"
        />
        <InputField
          // label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={formErrors.password}
          placeholder="Password"
        />
        <button type="submit" className="custom-button">Register</button>
      </form>
      <p className="login-link">
      Already have an account? <a href="/login">Login</a>
      </p>
      {serverMessage && <p>{serverMessage}</p>}
    </div>
  );
};

export default Register;
