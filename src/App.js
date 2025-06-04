import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Rezervasyon from './pages/Rezervasyon';
import RezervasyonListe from './pages/RezervasyonListe';
import RezervasyonDuzenle from './pages/RezervasyonDuzenle';
import Urunler from './pages/Urunler';
import Notifications from './pages/Notifications';
import UrunYonetim from './pages/UrunYonetim'; // <-- Bunu ekledik

const NAV_BG = 'linear-gradient(90deg, #800000 0%, #b22222 100%)';
const ACTIVE_BG = '#fff';
const ACTIVE_COLOR = '#800000';

function Navbar() {
  const location = useLocation();
  const links = [
    { to: '/', label: 'Ana Sayfa' },
    { to: '/login', label: 'Giriş' },
    { to: '/register', label: 'Kayıt Ol' },
    { to: '/profile', label: 'Profil' },
    { to: '/rezervasyon', label: 'Rezervasyon' },
    { to: '/rezervasyonlar', label: 'Rezervasyonlar' },
    { to: '/urunler', label: 'Ürünler' },
    { to: '/bildirimler', label: 'Bildirimler' },
    { to: '/urun-yonetim', label: 'Ürün Yönetimi' }, // <-- Bunu ekledik
  ];
  return (
    <header style={{
      background: NAV_BG,
      boxShadow: '0 2px 8px rgba(128,0,0,0.08)',
      marginBottom: '2rem',
      padding: 0
    }}>
      <nav style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem 0',
        maxWidth: 1000,
        margin: '0 auto'
      }}>
        <span style={{
          fontWeight: 'bold',
          fontSize: '1.7rem',
          color: '#fff',
          letterSpacing: '2px',
          marginBottom: '1rem'
        }}>
          <span style={{ color: '#fff', background: '#800000', padding: '0.2rem 0.7rem', borderRadius: '8px' }}>HalıSaha</span>
        </span>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap'
        }}>
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                color: location.pathname === link.to ? ACTIVE_COLOR : '#fff',
                background: location.pathname === link.to ? ACTIVE_BG : 'transparent',
                padding: '0.5rem 1.2rem',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                textDecoration: 'none',
                boxShadow: location.pathname === link.to ? '0 2px 8px rgba(128,0,0,0.08)' : 'none',
                transition: 'all 0.2s',
                border: location.pathname === link.to ? '2px solid #800000' : '2px solid transparent',
                marginBottom: '0.5rem'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

function App() {
  return (
    <Router>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%)'
      }}>
        <Navbar />
        <main style={{
          minHeight: '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '2rem 0'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(128,0,0,0.08)',
            padding: '2.5rem 2rem',
            minWidth: 320,
            maxWidth: 700,
            width: '100%'
          }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/rezervasyon" element={<Rezervasyon />} />
              <Route path="/rezervasyonlar" element={<RezervasyonListe />} />
              <Route path="/rezervasyon-duzenle/:id" element={<RezervasyonDuzenle />} />
              <Route path="/urunler" element={<Urunler />} />
              <Route path="/bildirimler" element={<Notifications />} />
              <Route path="/urun-yonetim" element={<UrunYonetim />} /> {/* <-- Bunu ekledik */}
            </Routes>
          </div>
        </main>
        <footer style={{
          background: '#800000',
          textAlign: 'center',
          padding: '1rem',
          color: '#fff',
          marginTop: '2rem',
          letterSpacing: '1px'
        }}>
          © {new Date().getFullYear()} Halısaha Rezervasyon Sistemi
        </footer>
      </div>
    </Router>
  );
}

export default App;