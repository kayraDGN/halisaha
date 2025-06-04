const express = require('express');
const router = express.Router();
const Halisaha = require('../models/Halisaha');

// Tüm halısahaları getir
router.get('/', async (req, res) => {
    try {
        const halisahalar = await Halisaha.find({});
        res.json(halisahalar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Yeni halısaha ekle
router.post('/', async (req, res) => {
    const halisaha = new Halisaha({
        isim: req.body.isim,
        adres: req.body.adres,
        telefon: req.body.telefon,
        fiyat: req.body.fiyat,
        aciklama: req.body.aciklama,
        resim: req.body.resim
    });

    try {
        const yeniHalisaha = await halisaha.save();
        res.status(201).json(yeniHalisaha);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router; 