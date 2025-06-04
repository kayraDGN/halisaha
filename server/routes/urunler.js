const express = require('express');
const router = express.Router();
const Urun = require('../models/Urun');

// Tüm ürünleri listele
router.get('/', async (req, res) => {
  try {
    const urunler = await Urun.find().sort({ createdAt: -1 });
    res.json(urunler);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Yeni ürün ekle
router.post('/', async (req, res) => {
  const { ad, aciklama, fiyat, gorsel } = req.body;
  const urun = new Urun({ ad, aciklama, fiyat, gorsel });
  try {
    const yeniUrun = await urun.save();
    res.status(201).json(yeniUrun);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ürün sil
router.delete('/:id', async (req, res) => {
  try {
    const urun = await Urun.findByIdAndDelete(req.params.id);
    if (!urun) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }
    res.json({ message: 'Ürün silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 