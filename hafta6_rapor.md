# Sprint 1 - 6. Hafta Raporu

## Emir Avcı - Kimlik Doğrulama Sistemi

**Açıklama:**
JWT tabanlı kimlik doğrulama için middleware ve giriş endpoint'i yazıldı. Middleware, gelen isteklerdeki JWT token'ı doğrular. Giriş endpoint'i ise kullanıcıya token üretir.

**Kod:**
```javascript
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Lütfen giriş yapın' });
  }
};

module.exports = auth;
```

```javascript
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Geçersiz email veya şifre' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

## Kayra Doğan - Admin Paneli

**Açıklama:**
Admin panelinin ana görünümü ve istatistik kartları React ile oluşturuldu. Panelde toplam rezervasyon, bekleyen onay ve günlük rezervasyon sayıları gösteriliyor.

**Kod:**
```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRezervasyonlar: 0,
    bekleyenOnaylar: 0,
    gunlukRezervasyonlar: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/admin/stats');
      setStats(response.data);
    } catch (error) {
      console.error('İstatistikler yüklenirken hata:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Paneli</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Toplam Rezervasyon</h3>
          <p className="text-2xl">{stats.totalRezervasyonlar}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Bekleyen Onaylar</h3>
          <p className="text-2xl">{stats.bekleyenOnaylar}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Günlük Rezervasyonlar</h3>
          <p className="text-2xl">{stats.gunlukRezervasyonlar}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
```

## Emir Demirtaş - Bildirim Sistemi

**Açıklama:**
Rezervasyon onay/red bildirimleri için e-posta gönderim servisi yazıldı. Nodemailer ile SMTP üzerinden e-posta gönderimi sağlanıyor.

**Kod:**
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendRezervasyonEmail = async (rezervasyon) => {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: rezervasyon.email,
    subject: 'Rezervasyon Onayı',
    html: `
      <h1>Rezervasyonunuz Onaylandı</h1>
      <p>Tarih: ${rezervasyon.tarih}</p>
      <p>Saat: ${rezervasyon.saat}</p>
      <p>Durum: ${rezervasyon.durum}</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendRezervasyonEmail };
```

## Çağrı Doğan - Kullanıcı Yönetimi

**Açıklama:**
Kullanıcı verilerini saklamak için MongoDB şeması ve roller bazında erişim kontrolü için middleware yazıldı.

**Kod:**
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

```javascript
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Yetkilendirme gerekli' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    next();
  };
};

module.exports = checkRole;
```

## Yapılan İşler

### Kullanıcı Yönetimi
1. **Kimlik Doğrulama Sistemi (Emir Avcı)**
   • Ne yapıldı:
   JWT tabanlı kimlik doğrulama sistemi kuruldu, kullanıcı girişi ve kaydı eklendi.
   • Kullanılan Kodlar:
   1- server/middleware/auth.js:
   ```javascript
   const jwt = require('jsonwebtoken');

   const auth = async (req, res, next) => {
     try {
       const token = req.header('Authorization').replace('Bearer ', '');
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.user = decoded;
       next();
     } catch (error) {
       res.status(401).json({ message: 'Lütfen giriş yapın' });
     }
   };

   module.exports = auth;
   ```

2. **Kullanıcı Rolleri**
   - Admin kullanıcı
   - Normal kullanıcı
   - Rol bazlı yetkilendirme

### Admin Paneli
1. **Dashboard**
   - Günlük rezervasyon özeti
   - Aktif rezervasyonlar
   - Bekleyen onaylar
   - İstatistikler

2. **Rezervasyon Yönetimi**
   - Tüm rezervasyonları görüntüleme
   - Toplu işlemler
   - Filtreleme ve arama
   - Detaylı rezervasyon bilgileri

3. **Kullanıcı Yönetimi**
   - Kullanıcı listesi
   - Kullanıcı düzenleme
   - Rol değiştirme
   - Hesap durumu yönetimi

### Bildirim Sistemi
1. **E-posta Bildirimleri**
   - Rezervasyon onay/red bildirimleri
   - Hatırlatma e-postaları
   - Otomatik bildirimler
   - E-posta şablonları

2. **Sistem Bildirimleri**
   - Anlık bildirimler
   - Bildirim merkezi
   - Okundu/okunmadı durumu
   - Bildirim tercihleri

## Karşılaşılan Sorunlar ve Çözümleri
1. **JWT Güvenlik Sorunu**
   - Sorun: Token güvenliği ve yenileme
   - Çözüm: Refresh token mekanizması eklendi

2. **E-posta Gönderim Hatası**
   - Sorun: E-posta servisi bağlantı sorunları
   - Çözüm: SMTP yapılandırması güncellendi

3. **Rol Yetkilendirme**
   - Sorun: Rol bazlı erişim kontrolü
   - Çözüm: Middleware ile yetkilendirme sistemi kuruldu

## Kullanılan Teknolojiler
- JWT Authentication
- Nodemailer (E-posta gönderimi)
- React Context API
- Material-UI
- Chart.js (İstatistikler için)

## Sonraki Hafta Planı
1. Takvim görünümü geliştirme
2. İstatistik ve raporlama sistemi
3. Ödeme sistemi entegrasyonu
4. Mobil uyumluluk iyileştirmeleri
5. Performans optimizasyonları

4. **Kullanıcı Yönetimi (Çağrı Doğan)**
   • Ne yapıldı:
   Kullanıcı rolleri ve yetkilendirme sistemi eklendi.
   • Kullanılan Kodlar:
   1- server/models/User.js:
   ```javascript
   const mongoose = require('mongoose');
   const bcrypt = require('bcryptjs');

   const userSchema = new mongoose.Schema({
     email: {
       type: String,
       required: true,
       unique: true
     },
     password: {
       type: String,
       required: true
     },
     role: {
       type: String,
       enum: ['user', 'admin'],
       default: 'user'
     }
   });

   userSchema.pre('save', async function(next) {
     if (this.isModified('password')) {
       this.password = await bcrypt.hash(this.password, 8);
     }
     next();
   });

   userSchema.methods.comparePassword = async function(password) {
     return bcrypt.compare(password, this.password);
   };

   module.exports = mongoose.model('User', userSchema);
   ``` 