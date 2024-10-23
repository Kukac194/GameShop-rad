import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import constants from '../../assets/constants';

function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo" />
        </div>
        <div className="nav-right">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/igrice">Popis Igrica</Link>
            </li>
            <li className="nav-item">
              <Link to="/proizvodaci">Popis proizvođača</Link>
            </li>
            <li className="nav-item">
              <Link to="/drzave">Pretraga po državama</Link>
            </li>
          </ul>
        </div>
        <a href={constants.SWAGGER} target="_blank" rel="noopener noreferrer" className="swagger-link">
            <img
            className='swagger-logo'
            src="../src/assets/swagger.png" 
            alt="Swagger" 
            />
          </a>
      </nav>
    </header>
  );
}

export default Header;
