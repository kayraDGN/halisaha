const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// Tüm rezervasyonları getir
router.get('/', async (req, res) => {
    try {
        const rezervasyonlar = await Reservation.find({})
            .populate('halisaha')
            .populate('kullanici');
        res.json(rezervasyonlar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Yeni rezervasyon oluştur
router.post('/', async (req, res) => {
    const rezervasyon = new Reservation({
        halisaha: req.body.halisahaId,
        kullanici: req.body.kullaniciId,
        tarih: req.body.tarih,
        saat: req.body.saat
    });

    try {
        const yeniRezervasyon = await rezervasyon.save();
        res.status(201).json(yeniRezervasyon);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router; 