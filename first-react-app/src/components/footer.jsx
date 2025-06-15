import React from 'react';
import '../Css/Footer.css'; // You'll create this CSS file next

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Online Grocery. All rights reserved.</p>
      <div className="footer-links">
        <a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
