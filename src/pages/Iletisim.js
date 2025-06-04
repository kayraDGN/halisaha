import React, { useState } from 'react';
import axios from 'axios';

const Iletisim = () => {
  const [form, setForm] = useState({ ad: '', email: '', mesaj: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess('');
    setError('');
    if (!form.ad || !form.email || !form.mesaj) {
      setError('Tüm alanları doldurun.');
      return;
    }
    try {
      await axios.post('/api/iletisim', form);
      setSuccess('Mesajınız başarıyla gönderildi!');
      setForm({ ad: '', email: '', mesaj: '' });
    } catch {
      setError('Mesaj gönderilemedi.');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">İletişim</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow max-w-md">
        <input
          type="text"
          name="ad"
          placeholder="Adınız"
          value={form.ad}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />
        <input
          type="email"
          name="email"
          placeholder="E-posta"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />
        <textarea
          name="mesaj"
          placeholder="Mesajınız"
          value={form.mesaj}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Gönder</button>
        {success && <div className="text-green-600 mt-2">{success}</div>}
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default Iletisim;