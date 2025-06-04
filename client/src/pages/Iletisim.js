import React, { useState } from 'react';
import './Iletisim.css';

function Iletisim() {
  const [formData, setFormData] = useState({
    isim: '',
    email: '',
    konu: '',
    mesaj: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form gönderme işlemi burada yapılacak
    console.log('Form verileri:', formData);
  };

  return (
    <div className="iletisim-container">
      <h1>İletişim</h1>
      
      <div className="iletisim-content">
        <div className="iletisim-bilgileri">
          <h2>İletişim Bilgileri</h2>
          <div className="bilgi-item">
            <h3>Adres</h3>
            <p>Örnek Mahallesi, Spor Caddesi No:123</p>
            <p>34000 İstanbul, Türkiye</p>
          </div>
          
          <div className="bilgi-item">
            <h3>Telefon</h3>
            <p>+90 (212) 123 45 67</p>
          </div>
          
          <div className="bilgi-item">
            <h3>E-posta</h3>
            <p>info@halisaha.com</p>
          </div>
          
          <div className="bilgi-item">
            <h3>Çalışma Saatleri</h3>
            <p>Hafta içi: 09:00 - 23:00</p>
            <p>Hafta sonu: 10:00 - 22:00</p>
          </div>
        </div>

        <div className="iletisim-formu">
          <h2>Bize Ulaşın</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>İsim:</label>
              <input
                type="text"
                value={formData.isim}
                onChange={(e) => setFormData({...formData, isim: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>E-posta:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Konu:</label>
              <input
                type="text"
                value={formData.konu}
                onChange={(e) => setFormData({...formData, konu: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Mesaj:</label>
              <textarea
                value={formData.mesaj}
                onChange={(e) => setFormData({...formData, mesaj: e.target.value})}
                required
              />
            </div>

            <button type="submit">Gönder</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Iletisim; 