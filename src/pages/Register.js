import React from 'react';

function Register() {
  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Kayıt Ol</h2>
      <form>
        <div style={{ marginBottom: '1rem' }}>
          <label>Kullanıcı Adı:</label>
          <input type="text" name="username" required style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>E-posta:</label>
          <input type="email" name="email" required style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Şifre:</label>
          <input type="password" name="password" required style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '0.75rem', background: '#4a90e2', color: '#fff', border: 'none', borderRadius: '4px' }}>Kayıt Ol</button>
      </form>
    </div>
  );
}

export default Register; 