const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const auth = require('../middleware/auth');

// Kullanıcı kaydı
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // E-posta kontrolü
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Bu e-posta adresi zaten kullanılıyor.' });
    }

    // Yeni kullanıcı oluştur
    user = new User({
      name,
      email,
      password,
      phone
    });

    // Şifreyi hashle
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Kullanıcıyı kaydet
    await user.save();

    // JWT token oluştur
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Kullanıcı girişi
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Geçersiz e-posta veya şifre.' });
    }

    // Şifreyi kontrol et
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Geçersiz e-posta veya şifre.' });
    }

    // JWT token oluştur
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone
          }
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Kullanıcı bilgilerini güncelleme
router.put('/update-profile', auth, async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const userId = req.user.id;

    // E-posta değişikliği varsa, yeni e-postanın başka bir kullanıcı tarafından kullanılmadığından emin ol
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        return res.status(400).json({ message: 'Bu e-posta adresi başka bir kullanıcı tarafından kullanılıyor.' });
      }
    }

    // Kullanıcı bilgilerini güncelle
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        name: name || undefined,
        email: email || undefined,
        phone: phone || undefined
      },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Profil bilgileri başarıyla güncellendi.',
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Şifremi unuttum
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı.' });
    }

    // Şifre sıfırlama token'ı oluştur
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 saat geçerli
    await user.save();

    // E-posta gönderme işlemi
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const resetUrl = `http://localhost:3000/sifre-sifirla/${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Şifre Sıfırlama',
      html: `
        <p>Şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>Bu bağlantı 1 saat süreyle geçerlidir.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Şifre sıfırlama
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Geçersiz veya süresi dolmuş token.' });
    }

    // Yeni şifreyi hashle ve kaydet
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Şifreniz başarıyla güncellendi.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Kullanıcı bilgilerini getir
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router; 