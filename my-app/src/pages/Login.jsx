import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService'; // Функция для отправки запроса на сервер

const Login = () => {
  const navigate = useNavigate();
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
      const response = await loginUser(formData); // Отправка запроса на сервер
      localStorage.setItem('token_after_login', response.data.token); 
      localStorage.setItem("username_after_login", response.data.username);
      localStorage.setItem("userId_after_login", response.data.id);

      navigate('/profile'); // Перенаправляем на страницу профиля после успешного логина
    } catch (err) {
      setServerMessage('Login failed');
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Login</h2>
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
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {serverMessage && <p>{serverMessage}</p>}
    </div>
  );
};

export default Login;
