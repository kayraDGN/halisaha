const validateRezervasyon = (req, res, next) => {
  const { tarih, saat, isim, telefon, email } = req.body;

  if (!tarih || !saat || !isim || !telefon || !email) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Tüm alanlar zorunludur'
    });
  }

  if (!/^[0-9]{10}$/.test(telefon)) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Geçerli bir telefon numarası giriniz'
    });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Geçerli bir e-posta adresi giriniz'
    });
  }

  next();
};

module.exports = validateRezervasyon; 