import React from 'react';
import { Link } from 'react-router-dom';
import './shoppingListPage.css';

export default function ShoppingListPage() {
  // You can replace this with your cart items logic
  const cartItems = [];

  return (
    <div className="shoppinglist-page-bg">
      <div className="shoppinglist-container">
        <h1 className="shoppinglist-title">Your Shopping List</h1>
        {cartItems.length === 0 ? (
          <div className="empty-shopping-list">
            <span role="img" aria-label="empty cart" className="empty-cart-icon">🛒</span>
            <h2>Your shopping list is empty!</h2>
            <p>Browse our products and add your favorites to your shopping list.</p>
            <Link to="/grocery" className="start-shopping-btn">Start Shopping</Link>
          </div>
        ) : (
          <div className="cart-items-list">
            {/* Render cart items here */}
          </div>
        )}
      </div>
    </div>
  );
} 