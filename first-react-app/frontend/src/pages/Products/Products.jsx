import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { apiService } from "../../utils/api.js";
import "./Products.css";

const categories = [
  'All',
  'Fruits',
  'Dairy',
  'Beverages',
  'Vegetables',
  'Meat',
  'Grocery',
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Set selectedCategory from query param or default to 'All'
  const categoryParam = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);

  useEffect(() => {
    setSelectedCategory(categoryParam);
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = {};
        if (categoryParam && categoryParam !== 'All') params.category = categoryParam;
        const search = searchParams.get('search');
        if (search) params.search = search;
        const response = await apiService.getProducts(params);
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchParams, categoryParam]);

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setSelectedCategory(cat);
    if (cat === 'All') {
      navigate('/products');
    } else {
      navigate(`/products?category=${encodeURIComponent(cat)}`);
    }
  };

  if (loading) return <div className="products-loading">Loading products...</div>;

  return (
    <div className="products-container">
      {/* Category Filter Dropdown */}
      <div className="products-filter-bar">
        <label htmlFor="category-select">Filter by Category: </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      {/* Category/Filter Header */}
      {searchParams.get('category') && (
        <div className="category-header">
          <h2>Category: {searchParams.get('category')}</h2>
          <p>{products.length} products found</p>
        </div>
      )}
      {/* Search Results Header */}
      {searchParams.get('search') && (
        <div className="search-header">
          <h2>Search Results for: "{searchParams.get('search')}"</h2>
          <p>{products.length} products found</p>
        </div>
      )}
      <div className="product-grid">
        {Array.isArray(products) && products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="products-empty">
            {searchParams.get('category') 
              ? `No products found in category "${searchParams.get('category')}".`
              : searchParams.get('search')
              ? `No products found matching "${searchParams.get('search')}".`
              : "No products found or error fetching products."
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;