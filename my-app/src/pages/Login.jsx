import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.js';
import '../styles/Login.css'; // <-- важно!

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user || { id: null }));
        login(data.token);
        navigate('/catalog');
      } else {
        alert(data.message || data.error || 'Ошибка входа');
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
      alert('Сервер недоступен');
    }
  };

  return (
    <div className="login-page">
      <h2 className="login-page__title">Вход</h2>
      <form className="login-page__form" onSubmit={handleLogin}>
        <input
          className="login-page__input"
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          className="login-page__input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="login-page__button" type="submit">
          Войти
        </button>
      </form>

      {/* Вот эта строка */}
      <p className="login-page__register-link">
        Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
      </p>
    </div>
  );
}

export default Login;
