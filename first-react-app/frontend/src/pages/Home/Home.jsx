import React from 'react';
import Hero from '../../components/Hero/Hero';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <ProductGrid />
        </div>
      </section>
    </div>
  );
};

export default Home;