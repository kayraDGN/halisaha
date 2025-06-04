const mongoose = require('mongoose');

const urunSchema = new mongoose.Schema({
  ad: {
    type: String,
    required: true,
    trim: true
  },
  aciklama: {
    type: String,
    required: true,
    trim: true
  },
  fiyat: {
    type: Number,
    required: true,
    min: 0
  },
  gorsel: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Urun', urunSchema); 