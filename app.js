const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/tetra', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB bağlantısı başarılı'))
.catch(err => console.error('MongoDB bağlantı hatası:', err));

// ROUTE TANIMLARI
const rezervasyonRoute = require('./routes/rezervasyon');
const urunlerRoutes = require('./routes/urunler');
const iletisimRoutes = require('./routes/iletisim');
const chatbotRoutes = require('./routes/chatbot');

app.use('/api/rezervasyon', rezervasyonRoute);
app.use('/api/urunler', urunlerRoutes);
app.use('/api/iletisim', iletisimRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Test endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Merhaba Dünya!' });
});

module.exports = app;