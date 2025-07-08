import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-icon">🏔️</div>
              <span className="logo-text">Valley Fresh</span>
            </div>
            <p className="footer-description">
              Fresh groceries delivered 24/7 in Kathmandu Valley. 
              Quality guaranteed, convenience delivered.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Categories</h3>
            <ul className="footer-links">
              <li><Link to="/products?category=Fruits">Fruits</Link></li>
              <li><Link to="/products?category=Vegetables">Vegetables</Link></li>
              <li><Link to="/products?category=Dairy">Dairy</Link></li>
              <li><Link to="/products?category=Meat">Meat</Link></li>
              <li><Link to="/products?category=Bakery">Bakery</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contact Info</h3>
            <div className="contact-info">
              <div className="contact-item">
                <Phone size={18} />
                <span>+977-9841234567</span>
              </div>
              <div className="contact-item">
                <Mail size={18} />
                <span>info@valleyfresh.com</span>
              </div>
              <div className="contact-item">
                <MapPin size={18} />
                <span>Kathmandu, Nepal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 Valley Fresh. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/refund">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;