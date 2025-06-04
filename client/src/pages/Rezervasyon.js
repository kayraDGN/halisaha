import React, { useState } from 'react';
import './Rezervasyon.css';

 

function Rezervasyon() {
  const [formData, setFormData] = useState({
    tarih: '',
    saat: '',
    isim: '',
    telefon: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.tarih) {
      newErrors.tarih = 'Tarih seçimi zorunludur';
    }
    
    if (!formData.saat) {
      newErrors.saat = 'Saat seçimi zorunludur';
    }
    
    if (!formData.isim) {
      newErrors.isim = 'İsim alanı zorunludur';
    }
    
    if (!formData.telefon) {
      newErrors.telefon = 'Telefon alanı zorunludur';
    } else if (!/^[0-9]{10}$/.test(formData.telefon)) {
      newErrors.telefon = 'Geçerli bir telefon numarası giriniz';
    }
    
    if (!formData.email) {
      newErrors.email = 'E-posta alanı zorunludur';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        const response = await fetch('/api/rezervasyon', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSuccess(true);
          setFormData({
            tarih: '',
            saat: '',
            isim: '',
            telefon: '',
            email: ''
          });
        } else {
          throw new Error('Rezervasyon oluşturulamadı');
        }
      } catch (error) {
        setErrors({ submit: error.message });
      }
    }
  };

  return (
    <div className="rezervasyon-container">
      <h1>Rezervasyon Yap</h1>
      
      {success && (
        <div className="success-message">
          Rezervasyonunuz başarıyla oluşturuldu!
        </div>
      )}
      
      {errors.submit && (
        <div className="error-message">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="rezervasyon-form">
        <div className="form-group">
          <label>Tarih:</label>
          <input 
            type="date" 
            value={formData.tarih}
            onChange={(e) => setFormData({...formData, tarih: e.target.value})}
            required
          />
          {errors.tarih && <span className="error">{errors.tarih}</span>}
        </div>

        <div className="form-group">
          <label>Saat:</label>
          <input 
            type="time" 
            value={formData.saat}
            onChange={(e) => setFormData({...formData, saat: e.target.value})}
            required
          />
          {errors.saat && <span className="error">{errors.saat}</span>}
        </div>

        <div className="form-group">
          <label>İsim:</label>
          <input 
            type="text" 
            value={formData.isim}
            onChange={(e) => setFormData({...formData, isim: e.target.value})}
            required
          />
          {errors.isim && <span className="error">{errors.isim}</span>}
        </div>

        <div className="form-group">
          <label>Telefon:</label>
          <input 
            type="tel" 
            value={formData.telefon}
            onChange={(e) => setFormData({...formData, telefon: e.target.value})}
            required
          />
          {errors.telefon && <span className="error">{errors.telefon}</span>}
        </div>

        <div className="form-group">
          <label>E-posta:</label>
          <input 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <button type="submit" className="submit-btn">Rezervasyon Yap</button>
      </form>
    </div>
  );
}

export default Rezervasyon; 