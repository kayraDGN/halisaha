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