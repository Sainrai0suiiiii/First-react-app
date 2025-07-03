import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const categories = [
  
];

export default function Navbar() {
  return (
    <nav className="navbar"> 
      <div className="navbar-top">
        <div className="navbar-logo-container">
          {/* Replace with your logo image */}
          <Link to="/" className="navbar-logo">
            <img src="/logo.png" alt="24HR Online Grocery Logo" className="navbar-logo-img" />
          </Link>
        </div>
        <Link to="/login" className="navbar-login prominent">Login</Link>
        <div className="navbar-contact">
        </div>
        <div className="navbar-actions">
          <button
            className="navbar-logout prominent"
            onClick={() => {
              // Optionally clear auth state here
              window.location.href = '/login';
            }}
          >
            Logout
          </button>
          <Link to="/shoppinglist" className="navbar-cart" aria-label="Go to Shopping List">
            <span className="cart-icon">🛒</span>
            <span className="cart-count">0</span>
          </Link>
          <Link to="/profile" className="navbar-profile-btn" aria-label="Profile">
            <span className="profile-icon">👤</span>
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
