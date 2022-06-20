import React from 'react';
import './Footer.scss';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer bg-dark text-secondary text-end p-2">
      {year}
    </footer>
  );
}

export default Footer;
