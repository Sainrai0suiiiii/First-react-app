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
  { id: 3, category: "Eggs", name: "White Eggs (12 pcs)", price: 170 },
  { id: 4, category: "Eggs", name: "Duck Eggs (6 pcs)", price: 140 },
  { id: 5, category: "Eggs", name: "Omega-3 Eggs (6 pcs)", price: 200 },
  // Chicken
  { id: 6, category: "Chicken", name: "Boneless Chicken Breast (1kg)", price: 750 },
  { id: 7, category: "Chicken", name: "Chicken Thighs (1kg)", price: 700 },
  { id: 8, category: "Chicken", name: "Chicken Wings (1kg)", price: 600 },
  { id: 9, category: "Chicken", name: "Country Chicken (1kg)", price: 900 },
  { id: 10, category: "Chicken", name: "Chicken Drumsticks (1kg)", price: 650 },
  // Mutton
  { id: 11, category: "Mutton", name: "Mutton Curry Cut (1kg)", price: 1400 },
  { id: 12, category: "Mutton", name: "Mutton Chops (1kg)", price: 1500 },
  { id: 13, category: "Mutton", name: "Mutton Keema (500g)", price: 750 },
  { id: 14, category: "Mutton", name: "Mutton Liver (500g)", price: 500 },
  { id: 15, category: "Mutton", name: "Mutton Mince (500g)", price: 800 },
  // Fish & Seafood
  { id: 16, category: "Fish & Seafood", name: "Rohu Fish (1kg)", price: 550 },
  { id: 17, category: "Fish & Seafood", name: "Prawns (500g)", price: 600 },
  { id: 18, category: "Fish & Seafood", name: "Catla Fish (1kg)", price: 500 },
  { id: 19, category: "Fish & Seafood", name: "Pomfret (500g)", price: 700 },
  { id: 20, category: "Fish & Seafood", name: "Crab (500g)", price: 800 },
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
