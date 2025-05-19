import React from 'react';
import Header from '../components/Header';
import UserStatus from '../components/UserStatus';
import { Link, useNavigate } from 'react-router-dom';
import { deleteUser } from '../services/authService';
import { logoutUser } from '../services/authService'; 

function Profile() {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your profile?');
    if (!confirmed) return;

    try {
      const token = localStorage.getItem('token');
      await deleteUser(token);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete profile', error);
      alert('Error deleting profile');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed');
    }
  };


  return (
    <>
      <main>
        <h1>Profile</h1>
        <UserStatus />
        <div>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio voluptates, illo corporis saepe voluptatem, nesciunt molestiae error voluptate nemo cum ratione tenetur dolorum iure, pariatur fuga? Ipsum fuga alias quis?</p>
        </div>
        <div className="register-link">
          <h1>Профиль</h1>
          <Link to="/register">Registration form</Link>
          <Link to="/login">Login form</Link>
          <Link to="/edit-profile">Edit Profile</Link>
          <button onClick={handleDelete} className="red-button">Delete Profile</button>
          <button onClick={handleLogout} className="red-button">Logout</button>
        </div>
      </main>
    </>
  );
}

export default Profile;