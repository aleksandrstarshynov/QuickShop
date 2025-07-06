import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authService';
import '../index.css';

const UserDropdown = ({ user }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); 

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="user-dropdown" ref={dropdownRef}>
      <div className="avatar-wrapper" onClick={() => setOpen(!open)}>
        <img
          src="/images/default_avatar.png"
          alt="User Avatar"
          className="avatar"
        />
        <span className="profile-name">{user?.name}</span>
      </div>

      {open && (
        <ul className="dropdown-menu">
          <li><Link to="/profile">Profile</Link></li>
          <li>
            <button onClick={handleLogout} className="dropdown-button">
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserDropdown;
