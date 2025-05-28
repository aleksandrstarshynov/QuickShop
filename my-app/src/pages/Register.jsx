import React, { useState } from 'react';
import InputField from '../components/InputField';
import { registerUser } from '../services/authService';

const Register = () => {
//temporary test
  // localStorage.setItem("test", "testValue2");
//

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

  const submitData = {
  ...formData,
  dateofbirth: new Date(formData.dateofbirth)
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
  const response = await registerUser(submitData);
  console.log('Ответ от сервера:', response);
  
  setServerMessage(response.data.message);
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
    name="dateofbirth"
    type="date"
    value={formData.dateofbirth}
    onChange={handleChange}
    error={formErrors.dateofbirth}
    placeholder="Date of Birth"
  />

  <InputField
    name="email"
    type="email"
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
        <button type="submit">Register</button>
      </form>
      <p className="login-link">
      Already have an account? <a href="/login">Login</a>
      </p>
      {serverMessage && <p>{serverMessage}</p>}
    </div>
  );
};

export default Register;
