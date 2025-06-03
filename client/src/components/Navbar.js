import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Halısaha Rezervasyon</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Ana Sayfa</Link></li>
        <li><Link to="/rezervasyon">Rezervasyon</Link></li>
        <li><Link to="/hakkimizda">Hakkımızda</Link></li>
        <li><Link to="/iletisim">İletişim</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar; 