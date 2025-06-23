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
  { id: 4, category: "Soft Drinks", name: "Pepsi (1L)", price: 110 },
  { id: 5, category: "Soft Drinks", name: "Mountain Dew (1L)", price: 115 },
  // Juices
  { id: 6, category: "Juices", name: "Fresh Orange Juice (1L)", price: 250 },
  { id: 7, category: "Juices", name: "Mixed Fruit Juice (1L)", price: 220 },
  { id: 8, category: "Juices", name: "Apple Juice (1L)", price: 200 },
  { id: 9, category: "Juices", name: "Pineapple Juice (1L)", price: 210 },
  { id: 10, category: "Juices", name: "Mango Juice (1L)", price: 190 },
  // Tea & Coffee
  { id: 11, category: "Tea & Coffee", name: "Green Tea (25 bags)", price: 200 },
  { id: 12, category: "Tea & Coffee", name: "Instant Coffee (100g)", price: 450 },
  { id: 13, category: "Tea & Coffee", name: "Black Tea (25 bags)", price: 180 },
  { id: 14, category: "Tea & Coffee", name: "Espresso Coffee (100g)", price: 500 },
  { id: 15, category: "Tea & Coffee", name: "Milk Tea (25 bags)", price: 220 },
  // Energy Drinks
  { id: 16, category: "Energy Drinks", name: "Red Bull (250ml)", price: 180 },
  { id: 17, category: "Energy Drinks", name: "Monster (250ml)", price: 200 },
  { id: 18, category: "Energy Drinks", name: "Gatorade (500ml)", price: 120 },
  { id: 19, category: "Energy Drinks", name: "Sting (250ml)", price: 90 },
  // Water
  { id: 20, category: "Water", name: "Mineral Water (1L)", price: 30 },
  { id: 21, category: "Water", name: "Spring Water (1L)", price: 40 },
  { id: 22, category: "Water", name: "Distilled Water (1L)", price: 35 },
  { id: 23, category: "Water", name: "Alkaline Water (1L)", price: 50 },
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
