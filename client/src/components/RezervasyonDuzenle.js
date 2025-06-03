import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const RezervasyonDuzenle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tarih: '',
    saat: '',
    isim: '',
    telefon: '',
    email: '',
    durum: 'beklemede'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRezervasyon();
  }, [id]);

  const fetchRezervasyon = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/rezervasyonlar/${id}`);
      const rezervasyon = response.data;
      setFormData({
        ...rezervasyon,
        tarih: new Date(rezervasyon.tarih).toISOString().split('T')[0]
      });
      setLoading(false);
    } catch (err) {
      setError('Rezervasyon yüklenirken bir hata oluştu');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.put(`http://localhost:5000/api/rezervasyonlar/${id}`, formData);
      navigate('/rezervasyonlar');
    } catch (err) {
      setError(err.response?.data?.message || 'Bir hata oluştu');
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Yükleniyor...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Rezervasyon Düzenle</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tarih</label>
          <input
            type="date"
            name="tarih"
            value={formData.tarih}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Saat</label>
          <input
            type="time"
            name="saat"
            value={formData.saat}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">İsim</label>
          <input
            type="text"
            name="isim"
            value={formData.isim}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Telefon</label>
          <input
            type="tel"
            name="telefon"
            value={formData.telefon}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">E-posta</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Durum</label>
          <select
            name="durum"
            value={formData.durum}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="beklemede">Beklemede</option>
            <option value="onaylandı">Onaylandı</option>
            <option value="iptal">İptal</option>
          </select>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Kaydet
          </button>
          <button
            type="button"
            onClick={() => navigate('/rezervasyonlar')}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  );
};

export default RezervasyonDuzenle; 