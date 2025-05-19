import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';

const UserDropdown = ({ user }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

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
          <li><Link to="/profile">Профиль</Link></li>
          <li><Link to="/logout">Выйти</Link></li>
        </ul>
      )}
    </div>
  );
};

export default UserDropdown;