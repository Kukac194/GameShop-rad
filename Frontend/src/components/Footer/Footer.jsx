import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">© {new Date().getFullYear()} Ivan Kukučka</p>
        <p className="footer-text">Završni rad iz WP5, Edunova</p>
      </div>
    </footer>
  );
}

export default Footer;
