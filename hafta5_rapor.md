# Sprint 1 - 5. Hafta Raporu

## Emir Avcı - Backend API Geliştirme

**Açıklama:**
Rezervasyon API endpoint'leri oluşturuldu, CRUD işlemleri eklendi. Aşağıdaki kodda rezervasyonların listelenmesi ve yeni rezervasyon eklenmesi için Express route'ları yer alıyor.

**Kod:**
```javascript
const express = require('express');
const router = express.Router();
const Rezervasyon = require('../models/Rezervasyon');

// Tüm rezervasyonları getir
router.get('/', async (req, res) => {
  try {
    const rezervasyonlar = await Rezervasyon.find()
      .sort({ tarih: 1, saat: 1 });
    res.json(rezervasyonlar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Yeni rezervasyon oluştur
router.post('/', async (req, res) => {
  const rezervasyon = new Rezervasyon({
    tarih: req.body.tarih,
    saat: req.body.saat,
    isim: req.body.isim,
    telefon: req.body.telefon,
    email: req.body.email,
    durum: req.body.durum || 'beklemede'
  });

  try {
    const yeniRezervasyon = await rezervasyon.save();
    res.status(201).json(yeniRezervasyon);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Bu tarih ve saat için zaten bir rezervasyon var' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});
```

---

## Kayra Doğan - Frontend Form Geliştirme

**Açıklama:**
Rezervasyon formu React ile oluşturuldu, form validasyonu ve hata yönetimi eklendi. Kodda formun temel yapısı ve gönderim işlemi yer alıyor.

**Kod:**
```javascript
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RezervasyonForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tarih: '',
    saat: '',
    isim: '',
    telefon: '',
    email: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:5000/api/rezervasyonlar', formData);
      navigate('/rezervasyonlar');
    } catch (err) {
      setError(err.response?.data?.message || 'Bir hata oluştu');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Yeni Rezervasyon</h2>
      {/* Form içeriği */}
    </div>
  );
};
```

---

## Emir Demirtaş - Veritabanı Modeli

**Açıklama:**
MongoDB için rezervasyon şeması oluşturuldu, indeksler ve veri doğrulama eklendi. Kodda şema tanımı ve indeksler yer alıyor.

**Kod:**
```javascript
const mongoose = require('mongoose');

const rezervasyonSchema = new mongoose.Schema({
  tarih: {
    type: Date,
    required: true
  },
  saat: {
    type: String,
    required: true
  },
  isim: {
    type: String,
    required: true
  },
  telefon: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  durum: {
    type: String,
    enum: ['beklemede', 'onaylandı', 'iptal'],
    default: 'beklemede'
  }
}, {
  timestamps: true
});

// İndeksler
rezervasyonSchema.index({ tarih: 1, saat: 1 }, { unique: true });
rezervasyonSchema.index({ email: 1 });
rezervasyonSchema.index({ durum: 1 });
rezervasyonSchema.index({ createdAt: -1 }); // Tarihe göre sıralama için
rezervasyonSchema.index({ durum: 1, tarih: 1 }); // Durum ve tarihe göre sorgulama için

// Veri doğrulama
rezervasyonSchema.pre('save', function(next) {
  if (this.isNew) {
    this.createdAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Rezervasyon', rezervasyonSchema);
```

---

## Çağrı Doğan - Sunucu Yapılandırması

**Açıklama:**
Express sunucusu kuruldu, gerekli middleware'ler ve hata yakalama eklendi. Kodda sunucu yapılandırması ve route tanımlamaları yer alıyor.

**Kod:**
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rezervasyonRoutes = require('./routes/rezervasyon');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/halisaha', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
app.use('/api/rezervasyonlar', rezervasyonRoutes);

// Hata yakalama
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Bir şeyler ters gitti!' });
});
```

## Karşılaşılan Sorunlar ve Çözümleri
1. **MongoDB Bağlantı Sorunu**
   - Sorun: MongoDB bağlantısı kurulamıyordu
   - Çözüm: Bağlantı URL'si ve seçenekleri düzeltildi

2. **CORS Hatası**
   - Sorun: Frontend'den API'ye erişim engelleniyordu
   - Çözüm: CORS middleware'i eklendi ve yapılandırıldı

3. **Tarih Formatı Sorunu**
   - Sorun: Frontend ve backend arasında tarih formatı uyumsuzluğu
   - Çözüm: Tarih dönüşümleri için uygun formatlar belirlendi

## Kullanılan Teknolojiler
- Backend: Node.js, Express.js, MongoDB
- Frontend: React.js, Tailwind CSS
- API İletişimi: Axios
- Routing: React Router

## Sonraki Hafta Planı
1. Kullanıcı kimlik doğrulama sistemi
2. Admin paneli geliştirme
3. E-posta bildirim sistemi
4. Takvim görünümü
5. İstatistikler ve raporlama özellikleri 