import React, { useState } from "react";
import './EggsMeat.css';

const categories = [
    "Eggs",
    "Chicken",
    "Mutton",
    "Fish & Seafood"
];

const allEggsMeatItems = [
  // Eggs
  { id: 1, category: "Eggs", name: "Farm-Fresh Brown Eggs (12 pcs)", price: 180 },
  { id: 2, category: "Eggs", name: "Quail Eggs (12 pcs)", price: 120 },
  // Chicken
  { id: 3, category: "Chicken", name: "Boneless Chicken Breast (1kg)", price: 750 },
  { id: 4, category: "Chicken", name: "Chicken Drumsticks (1kg)", price: 650 },
  // Mutton
  { id: 5, category: "Mutton", name: "Mutton Curry Cut (1kg)", price: 1400 },
  { id: 6, category: "Mutton", name: "Mutton Keema (500g)", price: 750 },
  // Fish & Seafood
  { id: 7, category: "Fish & Seafood", name: "Rohu Fish (1kg)", price: 550 },
];

export default function EggsMeat() {
  const [selectedCategory, setSelectedCategory] = useState("Eggs");

  const filteredItems = allEggsMeatItems.filter(item => item.category === selectedCategory);

  return (
    <div className="eggsmeat-page-container">
      <main className="eggsmeat-content">
        <h1 className="page-title">Eggs & Meat</h1>
        
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
