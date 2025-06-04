import React, { useState } from 'react';

function Rezervasyon() {
  const [formData, setFormData] = useState({
    tarih: '',
    saat: '',
    isim: '',
    telefon: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const saatler = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
    '21:00', '22:00'
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.tarih) newErrors.tarih = 'Tarih seçimi zorunludur';
    if (!formData.saat) newErrors.saat = 'Saat seçimi zorunludur';
    if (!formData.isim) newErrors.isim = 'İsim alanı zorunludur';
    if (!formData.telefon) newErrors.telefon = 'Telefon alanı zorunludur';
    else if (!/^[0-9]{10,11}$/.test(formData.telefon)) newErrors.telefon = 'Geçerli bir telefon numarası giriniz';
    if (!formData.email) newErrors.email = 'E-posta alanı zorunludur';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/api/rezervasyon', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          setSuccess(true);
          setFormData({ tarih: '', saat: '', isim: '', telefon: '', email: '' });
        } else {
          setErrors({ submit: 'Rezervasyon oluşturulamadı' });
        }
      } catch (error) {
        setErrors({ submit: 'Sunucuya bağlanılamadı' });
      }
    }
  };

  return (
    <div style={{ maxWidth: '420px', margin: '2rem auto', padding: '2.5rem 2rem', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 24px rgba(128,0,0,0.08)' }}>
      <h2 style={{ textAlign: 'center', color: '#800000', marginBottom: '2rem' }}>Saha Rezervasyonu</h2>
      {success && <div style={{ background: '#d4edda', color: '#155724', padding: '1rem', borderRadius: '6px', marginBottom: '1rem', textAlign: 'center' }}>Rezervasyonunuz başarıyla oluşturuldu!</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.2rem' }}>
          <label style={{ color: '#800000', fontWeight: 'bold' }}>Tarih:</label>
          <input
            type="date"
            value={formData.tarih}
            onChange={e => setFormData({ ...formData, tarih: e.target.value })}
            required
            style={{ width: '100%', padding: '0.7rem', border: '1px solid #ccc', borderRadius: '4px', marginTop: '0.3rem' }}
          />
          {errors.tarih && <span style={{ color: '#b22222', fontSize: '0.9rem' }}>{errors.tarih}</span>}
        </div>
        <div style={{ marginBottom: '1.2rem' }}>
          <label style={{ color: '#800000', fontWeight: 'bold' }}>Saat:</label>
          <select
            value={formData.saat}
            onChange={e => setFormData({ ...formData, saat: e.target.value })}
            required
            style={{ width: '100%', padding: '0.7rem', border: '1px solid #ccc', borderRadius: '4px', marginTop: '0.3rem' }}
          >
            <option value="">Saat seçiniz</option>
            {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
          </select>
          {errors.saat && <span style={{ color: '#b22222', fontSize: '0.9rem' }}>{errors.saat}</span>}
        </div>
        <div style={{ marginBottom: '1.2rem' }}>
          <label style={{ color: '#800000', fontWeight: 'bold' }}>İsim:</label>
          <input
            type="text"
            value={formData.isim}
            onChange={e => setFormData({ ...formData, isim: e.target.value })}
            required
            style={{ width: '100%', padding: '0.7rem', border: '1px solid #ccc', borderRadius: '4px', marginTop: '0.3rem' }}
          />
          {errors.isim && <span style={{ color: '#b22222', fontSize: '0.9rem' }}>{errors.isim}</span>}
        </div>
        <div style={{ marginBottom: '1.2rem' }}>
          <label style={{ color: '#800000', fontWeight: 'bold' }}>Telefon:</label>
          <input
            type="tel"
            value={formData.telefon}
            onChange={e => setFormData({ ...formData, telefon: e.target.value })}
            required
            style={{ width: '100%', padding: '0.7rem', border: '1px solid #ccc', borderRadius: '4px', marginTop: '0.3rem' }}
          />
          {errors.telefon && <span style={{ color: '#b22222', fontSize: '0.9rem' }}>{errors.telefon}</span>}
        </div>
        <div style={{ marginBottom: '1.2rem' }}>
          <label style={{ color: '#800000', fontWeight: 'bold' }}>E-posta:</label>
          <input
            type="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
            style={{ width: '100%', padding: '0.7rem', border: '1px solid #ccc', borderRadius: '4px', marginTop: '0.3rem' }}
          />
          {errors.email && <span style={{ color: '#b22222', fontSize: '0.9rem' }}>{errors.email}</span>}
        </div>
        <button type="submit" style={{ width: '100%', padding: '1rem', background: '#800000', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '1px', marginTop: '0.5rem', transition: 'background 0.2s' }}>Rezervasyon Yap</button>
        {errors.submit && <div style={{ color: '#b22222', marginTop: '1rem', textAlign: 'center' }}>{errors.submit}</div>}
      </form>
    </div>
  );
}

export default Rezervasyon;