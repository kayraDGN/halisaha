import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RezervasyonListesi = () => {
  const [rezervasyonlar, setRezervasyonlar] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRezervasyonlar();
  }, []);

  const fetchRezervasyonlar = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rezervasyonlar');
      setRezervasyonlar(response.data);
      setLoading(false);
    } catch (err) {
      setError('Rezervasyonlar yüklenirken bir hata oluştu');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu rezervasyonu silmek istediğinizden emin misiniz?')) {
      try {
        await axios.delete(`http://localhost:5000/api/rezervasyonlar/${id}`);
        fetchRezervasyonlar();
      } catch (err) {
        setError('Rezervasyon silinirken bir hata oluştu');
      }
    }
  };

  const handleDurumDegistir = async (id, yeniDurum) => {
    try {
      await axios.patch(`http://localhost:5000/api/rezervasyonlar/${id}/durum`, {
        durum: yeniDurum
      });
      fetchRezervasyonlar();
    } catch (err) {
      setError('Durum güncellenirken bir hata oluştu');
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Yükleniyor...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Rezervasyonlar</h2>
        <Link
          to="/rezervasyon/yeni"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Yeni Rezervasyon
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tarih
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Saat
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                İsim
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Telefon
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                E-posta
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rezervasyonlar.map((rezervasyon) => (
              <tr key={rezervasyon._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(rezervasyon.tarih).toLocaleDateString('tr-TR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{rezervasyon.saat}</td>
                <td className="px-6 py-4 whitespace-nowrap">{rezervasyon.isim}</td>
                <td className="px-6 py-4 whitespace-nowrap">{rezervasyon.telefon}</td>
                <td className="px-6 py-4 whitespace-nowrap">{rezervasyon.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={rezervasyon.durum}
                    onChange={(e) => handleDurumDegistir(rezervasyon._id, e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="beklemede">Beklemede</option>
                    <option value="onaylandı">Onaylandı</option>
                    <option value="iptal">İptal</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    to={`/rezervasyon/duzenle/${rezervasyon._id}`}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Düzenle
                  </Link>
                  <button
                    onClick={() => handleDelete(rezervasyon._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RezervasyonListesi; 