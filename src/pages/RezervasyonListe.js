import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RezervasyonListe() {
  const [rezervasyonlar, setRezervasyonlar] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/rezervasyon')
      .then(res => res.json())
      .then(data => {
        setRezervasyonlar(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const rezervasyonSil = async (id) => {
    if (!window.confirm('Bu rezervasyonu silmek istediğinize emin misiniz?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/rezervasyon/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setRezervasyonlar(rezervasyonlar.filter(r => r._id !== id));
      } else {
        alert('Silme işlemi başarısız oldu.');
      }
    } catch {
      alert('Sunucuya ulaşılamadı.');
    }
  };

  const rezervasyonDuzenle = (id) => {
    navigate(`/rezervasyon-duzenle/${id}`);
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px #80000022' }}>
      <h2 style={{ color: '#800000', textAlign: 'center', marginBottom: 24 }}>Tüm Rezervasyonlar</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#800000', color: '#fff' }}>
            <th style={{ padding: 8 }}>Tarih</th>
            <th style={{ padding: 8 }}>Saat</th>
            <th style={{ padding: 8 }}>İsim</th>
            <th style={{ padding: 8 }}>Telefon</th>
            <th style={{ padding: 8 }}>E-posta</th>
            <th style={{ padding: 8 }}>Durum</th>
            <th style={{ padding: 8 }}>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {rezervasyonlar.map(r => (
            <tr key={r._id}>
              <td style={{ padding: 8 }}>{new Date(r.tarih).toLocaleDateString('tr-TR')}</td>
              <td style={{ padding: 8 }}>{r.saat}</td>
              <td style={{ padding: 8 }}>{r.isim}</td>
              <td style={{ padding: 8 }}>{r.telefon}</td>
              <td style={{ padding: 8 }}>{r.email}</td>
              <td style={{ padding: 8 }}>{r.durum}</td>
              <td style={{ padding: 8 }}>
                <button
                  onClick={() => rezervasyonDuzenle(r._id)}
                  style={{
                    background: '#006400',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    padding: '4px 10px',
                    cursor: 'pointer',
                    marginRight: 8
                  }}
                >
                  Düzenle
                </button>
                <button
                  onClick={() => rezervasyonSil(r._id)}
                  style={{
                    background: '#b22222',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    padding: '4px 10px',
                    cursor: 'pointer'
                  }}
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rezervasyonlar.length === 0 && <div style={{ textAlign: 'center', marginTop: 24 }}>Henüz rezervasyon yok.</div>}
    </div>
  );
}

export default RezervasyonListe;