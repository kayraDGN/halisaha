const express = require('express');
const router = express.Router();
const Iletisim = require('../models/Iletisim');

router.post('/', async (req, res) => {
  const { ad, email, mesaj } = req.body;
  try {
    const yeniMesaj = new Iletisim({ ad, email, mesaj });
    await yeniMesaj.save();
    res.status(201).json({ message: 'Mesaj kaydedildi' });
  } catch (error) {
    res.status(400).json({ message: 'Mesaj kaydedilemedi' });
  }
});

module.exports = router;