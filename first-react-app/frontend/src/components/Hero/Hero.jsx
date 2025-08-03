import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Truck, Shield } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <img 
          src="/background.jpg"
          alt="Fresh groceries"
          className="hero-image"
        />
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Fresh Groceries
              <span className="hero-highlight">Delivered 24/7</span>
              in Kathmandu Valley
            </h1>
            <p className="hero-description">
              Get the freshest produce, dairy, and everyday essentials delivered 
              right to your doorstep. Quality guaranteed, convenience delivered.
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary">
                Shop Now
              </Link>
              <Link to="/about" className="btn btn-outline">
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="hero-features">
            <div className="feature-card">
              <div className="feature-icon">
                <Clock size={40} />
              </div>
              <h3>24/7 Delivery</h3>
              <p>Round-the-clock delivery service for your convenience</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Truck size={40} />
              </div>
              <h3>Fast Shipping</h3>
              <p>Quick delivery within 30 minutes in Kathmandu Valley</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={40} />
              </div>
              <h3>Quality Assured</h3>
              <p>100% fresh products with money-back guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;