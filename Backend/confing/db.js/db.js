const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/halisaha', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB bağlantısı başarılı ✅');
  } catch (error) {
    console.error('Bağlantı hatası ❌:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;