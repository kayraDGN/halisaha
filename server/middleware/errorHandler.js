const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: Object.values(err.errors).map(e => e.message)
    });
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    return res.status(400).json({
      error: 'Duplicate Error',
      message: 'Bu zaman dilimi için zaten bir rezervasyon mevcut'
    });
  }

  res.status(500).json({
    error: 'Server Error',
    message: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin'
  });
};

module.exports = errorHandler; 