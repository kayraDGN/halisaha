const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Kullanıcı kaydı
router.post('/register', async (req, res) => {
    const user = new User({
        isim: req.body.isim,
        email: req.body.email,
        sifre: req.body.sifre,
        telefon: req.body.telefon
    });

    try {
        const yeniUser = await user.save();
        res.status(201).json(yeniUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Kullanıcı girişi
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: 'Kullanıcı bulunamadı' });
        }
        if (user.sifre !== req.body.sifre) {
            return res.status(400).json({ message: 'Şifre yanlış' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 