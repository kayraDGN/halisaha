const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');

router.get('/', async (req, res) => {
  const messages = await ChatMessage.find().sort({ createdAt: 1 });
  res.json(messages);
});

router.post('/', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Mesaj boş olamaz' });

  const userMsg = new ChatMessage({ from: 'user', text });
  await userMsg.save();

  let botText = 'Sorunuzu aldık, en kısa sürede yanıtlayacağız.';
  if (text.toLowerCase().includes('merhaba')) botText = 'Merhaba! Size nasıl yardımcı olabilirim?';
  if (text.toLowerCase().includes('rezervasyon')) botText = 'Rezervasyon yapmak için Rezervasyon sayfasını kullanabilirsiniz.';

  const botMsg = new ChatMessage({ from: 'bot', text: botText });
  await botMsg.save();

  res.json([userMsg, botMsg]);
});

module.exports = router;