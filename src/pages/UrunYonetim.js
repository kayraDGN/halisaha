import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initialForm = { ad: '', aciklama: '', fiyat: '', gorsel: '' };

const UrunYonetim = () => {
  const [urunler, setUrunler] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchUrunler = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/urunler');
      setUrunler(res.data);
    } catch (err) {
      setError('Ürünler yüklenemedi.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUrunler();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.ad || !form.aciklama || !form.fiyat) {
      setError('Tüm alanları doldurun.');
      return;
    }
    try {
      await axios.post('/api/urunler', { ...form, fiyat: Number(form.fiyat) });
      setSuccess('Ürün eklendi!');
      setForm(initialForm);
      fetchUrunler();
    } catch (err) {
      setError('Ürün eklenemedi.');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;
    try {
      await axios.delete(`/api/urunler/${id}`);
      setSuccess('Ürün silindi!');
      fetchUrunler();
    } catch (err) {
      setError('Ürün silinemedi.');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Ürün Yönetimi</h1>
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-4 rounded shadow max-w-md">
        <div className="mb-2">
          <input
            type="text"
            name="ad"
            placeholder="Ürün Adı"
            value={form.ad}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-2">
          <textarea
            name="aciklama"
            placeholder="Açıklama"
            value={form.aciklama}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-2">
          <input
            type="number"
            name="fiyat"
            placeholder="Fiyat"
            value={form.fiyat}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            name="gorsel"
            placeholder="Görsel URL (opsiyonel)"
            value={form.gorsel}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded mt-2">Ekle</button>
        {error && <div className="text-red-600 mt-2">{error}</div>}
        {success && <div className="text-green-600 mt-2">{success}</div>}
      </form>
      <h2 className="text-xl font-semibold mb-2">Mevcut Ürünler</h2>
      {loading ? (
        <div>Yükleniyor...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {urunler.map(urun => (
            <div key={urun._id} className="bg-white rounded shadow p-4 flex flex-col items-center">
              {urun.gorsel && (
                <img src={urun.gorsel} alt={urun.ad} className="w-full h-32 object-cover rounded mb-2" />
              )}
              <h3 className="text-lg font-bold">{urun.ad}</h3>
              <p className="text-gray-600">{urun.aciklama}</p>
              <p className="text-green-600 font-bold">{urun.fiyat} TL</p>
              <button
                onClick={() => handleDelete(urun._id)}
                className="bg-red-600 text-white px-3 py-1 rounded mt-2"
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UrunYonetim;