import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Giriş formu gönderilince çalışacak fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engeller
    setError('');
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Token'ı kaydet
        window.location.href = '/profile'; // Giriş başarılıysa profile yönlendir
      } else {
        setError('Giriş başarısız!');
      }
    } catch (err) {
      setError('Giriş başarısız!');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Giriş Yap</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>E-posta:</label>
          <input
            type="email"
            name="email"
            required
            style={{ width: '100%', padding: '0.5rem' }}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Şifre:</label>
          <input
            type="password"
            name="password"
            required
            style={{ width: '100%', padding: '0.5rem' }}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '0.75rem', background: '#4a90e2', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Giriş Yap
        </button>
      </form>
    </div>
  );
}

export default Login;