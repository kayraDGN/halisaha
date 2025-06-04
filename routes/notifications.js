const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

// Bildirimleri getir
router.get('/', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Bildirimi okundu olarak işaretle
router.put('/:id/read', auth, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { read: true },
      { new: true }
    );
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Bildirimi sil
router.delete('/:id', auth, async (req, res) => {
  try {
    await Notification.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    res.json({ message: 'Bildirim silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;