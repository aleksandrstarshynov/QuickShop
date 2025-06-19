import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from '../services/authService'; 

function UserStatus() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetchUserProfile(token);
        console.log("📦 Ответ от API:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных пользователя:', error);
      }
    };

    loadUser();
  }, []);

  if (!user) return <p>Loading user data...</p>;

  return (
    <div className="user-status">
      <h2>User data</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Firstname:</strong> {user.firstname}</p>
      <p><strong>Lastname:</strong> {user.lastname}</p>
      <p><strong>Date of birth:</strong> {user.dateofbirth}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
    </div>
  );
}

export default UserStatus;
