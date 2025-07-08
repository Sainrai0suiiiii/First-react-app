import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import { useProducts } from '../../context/ProductContext';
import './Products.css';

const Products = () => {
  const [searchParams] = useSearchParams();
  const { categories } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const category = searchParams.get('category') || 'All';
    const search = searchParams.get('search') || '';
    setSelectedCategory(category);
    setSearchQuery(search);
  }, [searchParams]);

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
          <h1 className="page-title">Our Products</h1>
          <p className="page-description">
            Discover fresh, quality products delivered right to your doorstep
          </p>
        </div>

        <div className="category-tabs">
          {categories.map(category => (
            <button
              key={category}
              className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <ProductGrid 
          searchQuery={searchQuery} 
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
};

export default Products;