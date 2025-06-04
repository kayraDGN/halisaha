const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

beforeAll(async () => {
  // Test veritabanına bağlan
  await mongoose.connect('mongodb://localhost:27017/halisaha-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  // Test veritabanı bağlantısını kapat
  await mongoose.connection.close();
});

describe('API Testleri', () => {
  // Ana sayfa testi
  test('GET / - Ana sayfa mesajını kontrol et', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Merhaba Dünya!');
  });

  // Halısaha listesi testi
  test('GET /api/halisaha - Halısaha listesini kontrol et', async () => {
    const response = await request(app).get('/api/halisaha');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  // Kullanıcı kaydı testi
  test('POST /api/users/register - Kullanıcı kaydını kontrol et', async () => {
    const testUser = {
      isim: 'Test Kullanıcı',
      email: 'test@test.com',
      sifre: 'test123',
      telefon: '5551234567'
    };

    const response = await request(app)
      .post('/api/users/register')
      .send(testUser);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('isim', testUser.isim);
    expect(response.body).toHaveProperty('email', testUser.email);
  });

  // Rezervasyon oluşturma testi
  test('POST /api/reservations - Rezervasyon oluşturmayı kontrol et', async () => {
    const testReservation = {
      halisahaId: 'test-halisaha-id',
      kullaniciId: 'test-kullanici-id',
      tarih: new Date(),
      saat: '18:00'
    };

    const response = await request(app)
      .post('/api/reservations')
      .send(testReservation);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('tarih');
    expect(response.body).toHaveProperty('saat', testReservation.saat);
  });
});