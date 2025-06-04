const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Token'ı header'dan al
  const token = req.header('x-auth-token');

  // Token yoksa
  if (!token) {
    return res.status(401).json({ message: 'Yetkilendirme token\'ı bulunamadı.' });
  }


  
  try {
    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token geçersiz.' });
  }
};
