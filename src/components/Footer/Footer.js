import React from 'react';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <p className="footer-text">&copy; All Rights Reserved {year}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
