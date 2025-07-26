import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { getImageUrl } from '../../utils/helpers';
import './Cart.css';

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      alert('Please login to proceed with checkout');
      return;
    }
    alert('Checkout functionality will be implemented with payment gateway');
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingBag size={80} />
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <Link to="/products" className="back-link">
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
          <h1 className="page-title">Shopping Cart</h1>
          <button onClick={clearCart} className="clear-cart-btn">
            <Trash2 size={18} />
            Clear Cart
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={getImageUrl(item.image, '/default-product.png')} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-category">{item.category}</p>
                  <div className="item-price">₹{item.price} per unit</div>
                </div>
                
                <div className="item-quantity">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <div className="item-total">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
                
                <button 
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="summary-line">
                <span>Subtotal ({items.length} items)</span>
                <span>₹{getTotalPrice().toFixed(2)}</span>
              </div>
              
              <div className="summary-line">
                <span>Delivery Fee</span>
                <span>₹50.00</span>
              </div>
              
              <div className="summary-line">
                <span>Service Charge</span>
                <span>₹25.00</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-total">
                <span>Total</span>
                <span>₹{(getTotalPrice() + 75).toFixed(2)}</span>
              </div>
              
              <button 
                className="checkout-btn"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              
              <div className="delivery-info">
                <h4>🚛 Delivery Information</h4>
                <p>• Free delivery on orders above ₹1000</p>
                <p>• Delivery within 30 minutes</p>
                <p>• Available 24/7 in Kathmandu Valley</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;