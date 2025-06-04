import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('/api/notifications');
      setNotifications(response.data);
      setLoading(false);
    } catch (err) {
      setError('Bildirimler yüklenirken bir hata oluştu.');
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(`/api/notifications/${notificationId}/read`);
      setNotifications(notifications.map(notification => 
        notification._id === notificationId 
          ? { ...notification, read: true }
          : notification
      ));
    } catch (err) {
      setError('Bildirim güncellenirken bir hata oluştu.');
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await axios.delete(`/api/notifications/${notificationId}`);
      setNotifications(notifications.filter(
        notification => notification._id !== notificationId
      ));
    } catch (err) {
      setError('Bildirim silinirken bir hata oluştu.');
    }
  };

  if (loading) {
    return <div className="loading">Bildirimler yükleniyor...</div>;
  }

  return (
    <div className="notifications-container">
      <h2>Bildirimlerim</h2>
      {error && <div className="error-message">{error}</div>}
      
      {notifications.length === 0 ? (
        <div className="no-notifications">
          Henüz bildiriminiz bulunmuyor.
        </div>
      ) : (
        <div className="notifications-list">
          {notifications.map(notification => (
            <div 
              key={notification._id} 
              className={`notification-item ${notification.read ? 'read' : 'unread'}`}
            >
              <div className="notification-content">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                <small>{new Date(notification.createdAt).toLocaleString('tr-TR')}</small>
              </div>
              <div className="notification-actions">
                {!notification.read && (
                  <button 
                    onClick={() => markAsRead(notification._id)}
                    className="mark-read-btn"
                  >
                    Okundu İşaretle
                  </button>
                )}
                <button 
                  onClick={() => deleteNotification(notification._id)}
                  className="delete-btn"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications; 