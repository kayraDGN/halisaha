import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RezervasyonDuzenle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tarih: '',
    saat: '',
    isim: '',
    telefon: '',
    email: '',
    durum: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const saatler = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
    '21:00', '22:00'
  ];
  const durumlar = ['beklemede', 'onaylandı', 'iptal'];

  useEffect(() => {
    fetch(`http://localhost:5000/api/rezervasyon/${id}`)
      .then(res => res.json())
      .then(data => {
        setFormData({
          tarih: data.tarih ? data.tarih.substring(0, 10) : '',
          saat: data.saat || '',
          isim: data.isim || '',
          telefon: data.telefon || '',
          email: data.email || '',
          durum: data.durum || 'beklemede'
        });
        setLoading(false);
      })
      .catch(() => {
        setError('Rezervasyon bilgisi alınamadı.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/api/rezervasyon/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tarih: new Date(formData.tarih)
        })
      });
      if (response.ok) {
        navigate('/rezervasyonlar');
      } else {
        setError('Güncelleme başarısız oldu.');
      }
    } catch {
      setError('Sunucuya ulaşılamadı.');
    }
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: 420, margin: '2rem auto', background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px #80000022' }}>
      <h2 style={{ color: '#800000', textAlign: 'center', marginBottom: 24 }}>Rezervasyon Düzenle</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Tarih:</label>
          <input
            type="date"
            name="tarih"
            value={formData.tarih}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Saat:</label>
          <select
            name="saat"
            value={formData.saat}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          >
            <option value="">Saat seçiniz</option>
            {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>İsim:</label>
          <input
            type="text"
            name="isim"
            value={formData.isim}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Telefon:</label>
          <input
            type="tel"
            name="telefon"
            value={formData.telefon}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>E-posta:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Durum:</label>
          <select
            name="durum"
            value={formData.durum}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          >
            {durumlar.map(durum => <option key={durum} value={durum}>{durum}</option>)}
          </select>
        </div>
        <button type="submit" style={{ width: '100%', padding: 12, background: '#800000', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 'bold', fontSize: '1.1rem' }}>Kaydet</button>
      </form>
    </div>
  );
}

export default RezervasyonDuzenle;