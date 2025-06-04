const connectDB = require('./config/db');
const User = require('./models/User');
const Reservation = require('./models/Reservation');

const createTestData = async () => {
  try {
    // Veritabanına bağlan
    await connectDB();

    // Test kullanıcısı oluştur
    const user = await User.create({
      ad: 'Test',
      soyad: 'Kullanıcı',
      email: 'test@test.com',
      telefon: '5551234567'
    });

    // Test rezervasyonu oluştur
    const reservation = await Reservation.create({
      kullaniciId: user._id,
      tarih: new Date(),
      saat: '18:00',
      durum: 'aktif'
    });

    console.log('Test verileri oluşturuldu ✅');
    console.log('Kullanıcı:', user);
    console.log('Rezervasyon:', reservation);
  } catch (error) {
    console.error('Test veri hatası ❌:', error.message);
  }
  process.exit();
};

createTestData();