import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <h1>Logo</h1>
        </div>
        <div className="nav-container">
          <div className="nav-left">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/igrice">Popis Igrica</Link>
              </li>
              <li className="nav-item">
                <Link to="/nova-igrica">Dodaj novu igricu</Link>
              </li>
            </ul>
          </div>
          <div className="nav-right">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/proizvodaci">Popis proizvođača</Link>
              </li>
              <li className="nav-item">
                <Link to="/drzave">Pretraga po državama</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
