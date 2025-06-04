const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rezervasyonRoutes = require('./routes/rezervasyon');
const urunlerRoutes = require('./routes/urunler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/halisaha', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB bağlantısı başarılı'))
.catch(err => console.error('MongoDB bağlantı hatası:', err));

// Routes
app.use('/api/rezervasyonlar', rezervasyonRoutes);
app.use('/api/urunler', urunlerRoutes);

// Hata yakalama middleware'i
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Bir şeyler ters gitti!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Sayfa bulunamadı' });
});

module.exports = app; 