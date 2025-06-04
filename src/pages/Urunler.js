import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Urunler = () => {
  const [urunler, setUrunler] = useState([]);

  useEffect(() => {
    axios.get('/api/urunler')
      .then(res => setUrunler(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Ürünlerimiz</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {urunler.map(urun => (
          <div key={urun._id} className="bg-white rounded shadow p-4">
            <img src={urun.gorsel} alt={urun.ad} className="w-full h-48 object-cover rounded mb-4" />
            <h2 className="text-xl font-semibold">{urun.ad}</h2>
            <p className="text-gray-600">{urun.aciklama}</p>
            <p className="text-green-600 font-bold mt-2">{urun.fiyat} TL</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Urunler;