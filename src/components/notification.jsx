// src/components/Notification.jsx
import React, { useEffect, useState } from 'react';
import '../styles/notification.css';

const Notification = ({ message, type, onClose, duration = 2000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const hideTimeout = setTimeout(() => setVisible(false), duration);
      const closeTimeout = setTimeout(onClose, duration + 500); // 500ms for slide-up animation

      return () => {
        clearTimeout(hideTimeout);
        clearTimeout(closeTimeout);
      };
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      className={`notification ${type} ${visible ? 'show' : 'hide'}`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={() => setVisible(false)} className="ml-4 text-lg font-bold">&times;</button>
      </div>
    </div>
  );
};

export default Notification;
