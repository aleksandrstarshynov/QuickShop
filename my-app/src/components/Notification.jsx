import React from 'react';
import '../styles/Notification.css';

const Notification = ({ message, type = 'info', onClose }) => {
  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
      <button onClick={onClose} className="close-btn">×</button>
    </div>
  );
};

export default Notification;
