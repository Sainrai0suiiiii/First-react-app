import React, { useState } from "react";
import './VegFruit.css';

const categories = [
    "Fresh Vegetables",
    "Fresh Fruits",
    "Herbs & Seasonings",
    "Exotic Vegetables & Fruits"
];

const allVegFruitItems = [
  // Fresh Vegetables
  { id: 1, category: "Fresh Vegetables", name: "Tomato (1kg)", price: 60 },
  { id: 2, category: "Fresh Vegetables", name: "Potato (1kg)", price: 40 },
  { id: 3, category: "Fresh Vegetables", name: "Onion (1kg)", price: 80 },
  // Fresh Fruits
  { id: 4, category: "Fresh Fruits", name: "Apple (1kg)", price: 180 },
  { id: 5, category: "Fresh Fruits", name: "Banana (Dozen)", price: 100 },
  // Herbs & Seasonings
  { id: 6, category: "Herbs & Seasonings", name: "Coriander (Bunch)", price: 20 },
  { id: 7, category: "Herbs & Seasonings", name: "Mint (Bunch)", price: 15 },
];

export default function VegFruit() {
  const [selectedCategory, setSelectedCategory] = useState("Fresh Vegetables");

  const filteredItems = allVegFruitItems.filter(item => item.category === selectedCategory);

  return (
    <div className="vegfruit-page-container">
      <main className="vegfruit-content">
        <h1 className="page-title">Vegetables & Fruits</h1>
        
        <nav className="category-nav">
          {categories.map((category) => (
            <button 
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </nav>
        
        <h2 className="category-title">{selectedCategory}</h2>
        <div className="item-list">
          {filteredItems.length > 0 ? filteredItems.map(item => (
            <div key={item.id} className="item-card">
              <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">NRs. {item.price}</p>
                  <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
          )) : <p>No items found in this category.</p>}
        </div>
      </main>
    </div>
  );
}
