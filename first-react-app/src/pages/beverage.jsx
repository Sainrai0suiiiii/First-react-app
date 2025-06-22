import React, { useState } from "react";
import './beverage.css';

const categories = [
    "Soft Drinks",
    "Juices",
    "Tea & Coffee",
    "Energy Drinks",
    "Water"
];

const allBeverageItems = [
  // Soft Drinks
  { id: 1, category: "Soft Drinks", name: "Coca Cola (1L)", price: 120 },
  { id: 2, category: "Soft Drinks", name: "Sprite (1L)", price: 115 },
  { id: 3, category: "Soft Drinks", name: "Fanta (1L)", price: 115 },
  // Juices
  { id: 4, category: "Juices", name: "Fresh Orange Juice (1L)", price: 250 },
  { id: 5, category: "Juices", name: "Mixed Fruit Juice (1L)", price: 220 },
  // Tea & Coffee
  { id: 6, category: "Tea & Coffee", name: "Green Tea (25 bags)", price: 200 },
  { id: 7, category: "Tea & Coffee", name: "Instant Coffee (100g)", price: 450 },
];

export default function Beverage() {
  const [selectedCategory, setSelectedCategory] = useState("Soft Drinks");

  const filteredItems = allBeverageItems.filter(item => item.category === selectedCategory);

  return (
    <div className="beverage-page-container">
      <main className="beverage-content">
        <h1 className="page-title">Beverages</h1>
        
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
