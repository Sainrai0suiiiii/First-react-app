import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you want navigation links
import '../Css/Navbar.css'; // You'll create this CSS file next

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">24hrs Grocery</Link> {/* Link to your home page */}
      </div>
      <ul className="navbar-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/products">Products</Link></li> {/* Example link */}
        <li><Link to="/about">About</Link></li>     {/* Example link */}
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
