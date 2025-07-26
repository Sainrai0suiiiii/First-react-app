import { ArrowLeft, Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { getImageUrl } from '../../utils/helpers';
import './ProductsDetails.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addItem, isAuthenticated } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const product = getProductById(id);

  const showSuccessMessage = (message) => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="product-not-found">
            <h2>Product not found</h2>
            <button onClick={() => navigate('/products')} className="btn btn-primary">
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!isAuthenticated()) {
      const shouldLogin = window.confirm('Please login to add items to your cart. Would you like to go to the login page?');
      if (shouldLogin) {
        navigate('/login');
      }
      return;
    }

    try {
      setIsAdding(true);
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
      showSuccessMessage(`Added ${quantity} ${product.name}(s) to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(error.message || 'Failed to add items to cart');
    } finally {
      setIsAdding(false);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={20} fill="#fbbf24" color="#fbbf24" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" size={20} fill="none" color="#fbbf24" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={20} fill="none" color="#d1d5db" />);
    }

    return stars;
  };

  const productImageUrl = getImageUrl(product.image, '/default-product.png');
  
  const productImages = [
    productImageUrl,
    productImageUrl,
    productImageUrl
  ];

  return (
    <>
      <div className="product-detail-page">
        <div className="container">
          <button onClick={() => navigate(-1)} className="back-button">
            <ArrowLeft size={20} />
            Back
          </button>

          <div className="product-detail-content">
            <div className="product-images">
              <div className="main-image">
                <img src={productImages[activeImage]} alt={product.name} />
                {!product.inStock && <div className="out-of-stock-overlay">Out of Stock</div>}
              </div>
              <div className="image-thumbnails">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="product-info">
              <div className="product-breadcrumb">
                <span className="category-badge">{product.category}</span>
              </div>
              
              <h1 className="product-title">{product.name}</h1>
              
              <div className="product-rating">
                <div className="stars">
                  {renderStars(product.rating)}
                </div>
                <span className="rating-text">({product.rating}) • 127 reviews</span>
              </div>
              
              <div className="product-price">
                <span className="current-price">₹{product.price}</span>
                <span className="price-unit">per unit</span>
              </div>
              
              <p className="product-description">
                {product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
                minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              
              <div className="product-features">
                <h3>Key Features:</h3>
                <ul>
                  <li>✓ 100% Fresh and Organic</li>
                  <li>✓ Locally Sourced</li>
                  <li>✓ Quality Guaranteed</li>
                  <li>✓ Same Day Delivery</li>
                </ul>
              </div>
              
              <div className="product-actions">
                <div className="quantity-selector">
                  <label>Quantity:</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(-1)}
                      className="quantity-btn"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="quantity-display">{quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(1)}
                      className="quantity-btn"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="action-buttons">
                  <button 
                    className="add-to-cart-btn"
                    onClick={handleAddToCart}
                    disabled={!product.inStock || isAdding}
                  >
                    <ShoppingCart size={20} />
                    {isAdding ? 'Adding...' : `Add to Cart - ₹${(product.price * quantity).toFixed(2)}`}
                  </button>
                  
                  <button className="wishlist-btn">
                    <Heart size={20} />
                    Add to Wishlist
                  </button>
                </div>
              </div>
              
              <div className="delivery-info">
                <h3>🚛 Delivery Information</h3>
                <div className="delivery-details">
                  <div className="delivery-item">
                    <strong>Free Delivery:</strong> On orders above ₹1000
                  </div>
                  <div className="delivery-item">
                    <strong>Express Delivery:</strong> Within 30 minutes
                  </div>
                  <div className="delivery-item">
                    <strong>Service Area:</strong> Kathmandu Valley only
                  </div>
                  <div className="delivery-item">
                    <strong>Available:</strong> 24/7
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showNotification && (
        <div className="cart-notification">
          <div className="notification-content">
            <span className="notification-icon">✅</span>
            <span className="notification-text">Items added to cart!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;