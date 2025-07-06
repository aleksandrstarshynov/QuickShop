import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth }           from '../context/authContext.js';
import { loginUser }         from '../services/authService.js';
import '../styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ username, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      login(data.token);
      navigate('/catalog');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login error');
    }
  };

  return (
    <div className="login-page">
      <h2>Вход</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Have no account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
