import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { getImageUrl } from '../../utils/helpers';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addItem, isAuthenticated } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const showSuccessMessage = (message) => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000); // Hide after 3 seconds
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated()) {
      // Show login prompt
      const shouldLogin = window.confirm('Please login to add items to your cart. Would you like to go to the login page?');
      if (shouldLogin) {
        navigate('/login');
      }
      return;
    }

    try {
      setIsAdding(true);
      addItem(product);
      // Show success message
      showSuccessMessage(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(error.message || 'Failed to add item to cart');
    } finally {
      setIsAdding(false);
    }
  };

  // Use the utility function to get the proper image URL
  const imageUrl = getImageUrl(product.image, '/default-product.png');
  

  return (
    <>
      <div className="product-card">
        <div className="product-image-container">
          <img
            className="product-image"
            src={imageUrl}
            alt={product.name}
          />
          {!product.inStock && <div className="out-of-stock">Out of Stock</div>}
        </div>
        <div className="product-info">
          <div className="product-category">{product.category}</div>
          <div className="product-name">{product.name}</div>
          <div className="product-description">{product.description}</div>
          <div className="product-footer">
            <div className="product-price">
              <span className="price">Rs. {product.price}</span>
            </div>
            <button
              className={`add-to-cart-btn ${!isAuthenticated() ? 'login-required' : ''}`}
              onClick={handleAddToCart}
              disabled={!product.inStock || isAdding}
            >
              {isAdding ? 'Adding...' : !isAuthenticated() ? 'Login to Add' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Custom Notification */}
      {showNotification && (
        <div className="cart-notification">
          <div className="notification-content">
            <span className="notification-icon">✅</span>
            <span className="notification-text">Item added to cart!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;