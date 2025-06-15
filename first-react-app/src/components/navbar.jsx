import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/navbar.css';

const categories = [
  "Grocery",
  "Bakery & Dairy",
  "Beverage",
  "Eggs & Meat",
  "Veg & Fruits",
];

export default function Navbar() {
  return (
    <nav className="navbar"> 
      <div className="navbar-top">
        <div className="navbar-logo-container">
          {/* Replace with your logo image */}
          <span className="navbar-logo">Online Grocery</span>
        </div>
        <div className="navbar-search-container">
          <input type="text" placeholder="Search for products or categories" className="navbar-search-input" />
          <button className="navbar-search-btn">🔍</button>
        </div>
        <div className="navbar-contact">
          <span className="contact-order-at">ORDER AT</span>
          <span className="contact-phone-icon">📱</span>
          <span className="contact-phone-number">01-4511000</span>
        </div>
        <div className="navbar-actions">
          <Link to="/cart" className="navbar-cart">
            <span className="cart-icon">🛒</span>
            <span className="cart-count">10</span>
          </Link>
          <Link to="/login" className="navbar-login">Login</Link>
        </div>
      </div>
      <div className="navbar-bottom">
        <div className="navbar-categories">
          {categories.map((cat) => (
            <Link key={cat} to={`/${cat.toLowerCase().replace(/ & | /g, '-')}`} className="navbar-category">{cat}</Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
