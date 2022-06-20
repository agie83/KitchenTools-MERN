import React from 'react';
import './Footer.scss';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer bg-dark text-secondary text-end py-2 px-4">
      {year}
      {' | '}
      Green Fox Academy | Agócs Ágnes
    </footer>
  );
}

export default Footer;
