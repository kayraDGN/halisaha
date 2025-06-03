import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Halısahamıza Hoş Geldiniz</h1>
        <p>En kaliteli halısaha deneyimi için hemen rezervasyon yapın!</p>
        <Link to="/rezervasyon" className="rezervasyon-btn">
          Rezervasyon Yap
        </Link>
      </section>
      
      <section className="features">
        <div className="feature">
          <h3>Profesyonel Saha</h3>
          <p>FIFA standartlarında profesyonel halısaha</p>
        </div>
        <div className="feature">
          <h3>7/24 Hizmet</h3>
          <p>Günün her saati rezervasyon yapabilirsiniz</p>
        </div>
        <div className="feature">
          <h3>Uygun Fiyat</h3>
          <p>Ekonomik ve uygun fiyatlı rezervasyon seçenekleri</p>
        </div>
      </section>
    </div>
  );
}

export default Home; 