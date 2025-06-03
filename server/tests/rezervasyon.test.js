const request = require('supertest');
const app = require('../app');
const Rezervasyon = require('../models/Rezervasyon');

describe('Rezervasyon API', () => {
  beforeEach(async () => {
    await Rezervasyon.deleteMany({});
  });

  it('yeni rezervasyon oluşturmalı', async () => {
    const rezervasyon = {
      tarih: '2024-03-20',
      saat: '19:00',
      isim: 'Test Kullanıcı',
      telefon: '5551234567',
      email: 'test@example.com'
    };

    const res = await request(app)
      .post('/api/rezervasyon')
      .send(rezervasyon);

    expect(res.status).toBe(201);
    expect(res.body.isim).toBe(rezervasyon.isim);
  });

  it('geçersiz veri ile hata dönmeli', async () => {
    const rezervasyon = {
      tarih: '2024-03-20',
      saat: '19:00',
      isim: 'Test Kullanıcı',
      telefon: '123', // Geçersiz telefon
      email: 'test@example.com'
    };

    const res = await request(app)
      .post('/api/rezervasyon')
      .send(rezervasyon);

    expect(res.status).toBe(400);
  });
}); 