
import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const NotificationToast = ({ notification, onClose }) => {
  useEffect(() => {
    if (!notification) return;

    // Automatically dismiss toast after 4.5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 4500);

    return () => clearTimeout(timer);
  }, [notification, onClose]);

  if (!notification) return null;

  const isSuccess = notification.type === 'success';

  return (
    <div className="toast-container">
      <div className={`toast ${isSuccess ? 'toast-success' : 'toast-error'}`}>
        <div className="toast-icon">
          {isSuccess ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
        </div>
        <div className="toast-content">
          <div className="toast-title">
            {notification.title || (isSuccess ? 'Success' : 'Error')}
          </div>
          <div className="toast-message">{notification.message}</div>
        </div>
        <button
          className="toast-close-btn"
          onClick={onClose}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;
