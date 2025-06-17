// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.js';

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
      console.log(data);

      if (response.ok) {
        alert('Успешный вход!');
        // Перенаправление или сохранение токена
        
        // Сохраняем токен в localStorage (или sessionStorage)
        console.log('data:', data);
        console.log('data.user:', data.user);
        localStorage.setItem('token', data.token);
        // localStorage.setItem('user', JSON.stringify(data.user)); временно запоментирует, так как ниже затычка временная
        if (data && data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        } else {
        console.warn('⚠️ Нет user в ответе сервера!');
        localStorage.setItem('user', JSON.stringify({ id: null })); // временно, чтобы не падало
        }
        // конец временной затычки

        login(data.token); 

        // Можно перенаправить пользователя на страницу профиля или домой
        navigate('/catalog'); // если используешь react-router-dom v6
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
      <h2>Вход</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;
