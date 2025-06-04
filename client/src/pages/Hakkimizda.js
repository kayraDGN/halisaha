import React from 'react';
import './Hakkimizda.css';

function Hakkimizda() {
  return (
    <div className="hakkimizda-container">
      <h1>Hakkımızda</h1>
      <div className="content">
        <section className="about-section">
          <h2>Biz Kimiz?</h2>
          <p>
            2024 yılında kurulan halısahamız, profesyonel futbol sahaları standartlarında 
            hizmet vermektedir. Modern tesisimiz ve uzman ekibimizle müşterilerimize 
            en iyi hizmeti sunmayı hedefliyoruz.
          </p>
        </section>

        <section className="features-section">
          <h2>Özelliklerimiz</h2>
          <ul>
            <li>FIFA standartlarında profesyonel halısaha</li>
            <li>7/24 açık rezervasyon sistemi</li>
            <li>Modern soyunma odaları ve duşlar</li>
            <li>Ücretsiz otopark</li>
            <li>Kafeterya ve dinlenme alanı</li>
          </ul>
        </section>

        <section className="mission-section">
          <h2>Misyonumuz</h2>
          <p>
            Spor severlere en kaliteli halısaha deneyimini sunmak ve 
            toplumda spor kültürünü yaygınlaştırmak için çalışıyoruz.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Hakkimizda; 