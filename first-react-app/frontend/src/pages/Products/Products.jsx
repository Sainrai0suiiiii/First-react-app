import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { apiService } from "../../utils/api.js";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getProducts()
      .then(response => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="products-loading">Loading products...</div>;

  return (
    <div className="product-grid">
      {Array.isArray(products) && products.length > 0 ? (
        products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="products-empty">No products found or error fetching products.</div>
      )}
    </div>
  );
};

export default Products;