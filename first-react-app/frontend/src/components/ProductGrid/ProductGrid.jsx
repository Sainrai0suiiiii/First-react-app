import React from 'react';
import { useProducts } from '../../context/ProductContext';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ searchQuery = '', selectedCategory = 'All' }) => {
  const { products, loading } = useProducts();
  let filteredProducts = products;
  if (selectedCategory && selectedCategory !== 'All') {
    filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
  }
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  if (loading) return <div className="product-grid-loading">Loading products...</div>;
  return (
    <div className="product-grid grid">
      {filteredProducts.length === 0 ? (
        <div className="no-products">No products found.</div>
      ) : (
        filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductGrid;