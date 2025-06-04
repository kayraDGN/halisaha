import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/auth/profile');
        setUserData(prev => ({
          ...prev,
          username: response.data.username,
          email: response.data.email
        }));
      } catch (err) {
        setError('Profil bilgileri yüklenirken bir hata oluştu.');
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (userData.newPassword !== userData.confirmPassword) {
      setError('Yeni şifreler eşleşmiyor!');
      return;
    }

    try {
      const response = await axios.put('/api/auth/profile', {
        username: userData.username,
        email: userData.email,
        currentPassword: userData.currentPassword,
        newPassword: userData.newPassword
      });

      setMessage('Profil başarıyla güncellendi!');
      setUserData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Profil güncellenirken bir hata oluştu.');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-form">
        <h2>Profil Bilgileri</h2>
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Kullanıcı Adı:</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>E-posta:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Mevcut Şifre:</label>
            <input
              type="password"
              name="currentPassword"
              value={userData.currentPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Yeni Şifre:</label>
            <input
              type="password"
              name="newPassword"
              value={userData.newPassword}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Yeni Şifre Tekrar:</label>
            <input
              type="password"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Güncelle</button>
        </form>
      </div>
    </div>
  );
};

export default Profile; 