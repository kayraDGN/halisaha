import React from 'react';

function Profile() {
  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Profilim</h2>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Kullanıcı Adı:</strong> ornek_kullanici
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <strong>E-posta:</strong> ornek@mail.com
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <strong>Kayıt Tarihi:</strong> 01.01.2024
      </div>
    </div>
  );
}

export default Profile; 