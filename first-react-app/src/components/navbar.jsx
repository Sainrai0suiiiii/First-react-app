import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const categories = [
  
  
  "Home",
  
];

export default function Navbar() {
  return (
    <nav className="navbar"> 
      <div className="navbar-top">
        <div className="navbar-logo-container">
          {/* Replace with your logo image */}
          <Link to="/" className="navbar-logo" style={{ textDecoration: 'none', color: 'inherit' }}>
            24hrs Online Grocery
          </Link>
        </div>
        <div className="navbar-search-container">
          <input type="text" placeholder="Search for products or categories" className="navbar-search-input" />
          <button className="navbar-search-btn">🔍</button>
        </div>
        <Link to="/login" className="navbar-login prominent">Login</Link>
        <div className="navbar-contact">
          <span className="contact-order-at">ORDER AT</span>
          <span className="contact-phone-icon">📱</span>
          <span className="contact-phone-number">01-451-1000</span>
        </div>
        <div className="navbar-actions">
          <Link to="/shoppinglist" className="navbar-cart" aria-label="Go to Shopping List">
            <span className="cart-icon">🛒</span>
            <span className="cart-count">0</span>
          </Link>
        </div>
      </div>
      <div className="navbar-bottom">
        <div className="navbar-categories">
          {categories.map((cat) => {
            const categoryClass = cat.toLowerCase().replace(/ & | /g, '-');
            return (
              <Link 
                key={cat} 
                to={`/${categoryClass}`} 
                className={`navbar-category ${categoryClass}`}
              >
                {cat}
              </Link>
            );
          })}
          <Link to="/grocery" className="navbar-category">Grocery</Link>
          <Link to="/beverage" className="navbar-category">Beverage</Link>
          <Link to="/veg-fruits" className="navbar-category">Veg & Fruits</Link>
          <Link to="/eggs-meat" className="navbar-category">Eggs & Meat</Link>
          <Link to="/dairy" className="navbar-category">Breakery and Dairy</Link>
        </div>
      </div>
    </nav>
  );
}
