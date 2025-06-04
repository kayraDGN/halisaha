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

// Tek bir rezervasyon getir
router.get('/:id', async (req, res) => {
  try {
    const rezervasyon = await Rezervasyon.findById(req.params.id);
    if (!rezervasyon) {
      return res.status(404).json({ message: 'Rezervasyon bulunamadı' });
    }
    res.json(rezervasyon);
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

// Rezervasyon güncelle
router.put('/:id', async (req, res) => {
  try {
    const rezervasyon = await Rezervasyon.findById(req.params.id);
    if (!rezervasyon) {
      return res.status(404).json({ message: 'Rezervasyon bulunamadı' });
    }

    // Güncelleme alanlarını kontrol et
    if (req.body.tarih) rezervasyon.tarih = req.body.tarih;
    if (req.body.saat) rezervasyon.saat = req.body.saat;
    if (req.body.isim) rezervasyon.isim = req.body.isim;
    if (req.body.telefon) rezervasyon.telefon = req.body.telefon;
    if (req.body.email) rezervasyon.email = req.body.email;
    if (req.body.durum) rezervasyon.durum = req.body.durum;

    const guncelRezervasyon = await rezervasyon.save();
    res.json(guncelRezervasyon);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Bu tarih ve saat için zaten bir rezervasyon var' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

// Rezervasyon sil
router.delete('/:id', async (req, res) => {
  try {
    const rezervasyon = await Rezervasyon.findById(req.params.id);
    if (!rezervasyon) {
      return res.status(404).json({ message: 'Rezervasyon bulunamadı' });
    }

    await rezervasyon.deleteOne();
    res.json({ message: 'Rezervasyon silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Belirli bir tarihteki rezervasyonları getir
router.get('/tarih/:tarih', async (req, res) => {
  try {
    const tarih = new Date(req.params.tarih);
    const rezervasyonlar = await Rezervasyon.find({
      tarih: {
        $gte: tarih,
        $lt: new Date(tarih.getTime() + 24 * 60 * 60 * 1000)
      }
    }).sort({ saat: 1 });
    res.json(rezervasyonlar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rezervasyon durumunu güncelle
router.patch('/:id/durum', async (req, res) => {
  try {
    const rezervasyon = await Rezervasyon.findById(req.params.id);
    if (!rezervasyon) {
      return res.status(404).json({ message: 'Rezervasyon bulunamadı' });
    }

    if (req.body.durum) {
      rezervasyon.durum = req.body.durum;
      const guncelRezervasyon = await rezervasyon.save();
      res.json(guncelRezervasyon);
    } else {
      res.status(400).json({ message: 'Durum bilgisi gerekli' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;