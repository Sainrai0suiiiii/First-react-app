import React, { useState } from "react";
import './dairy.css';

const categories = [
    "Milk",
    "Cheese",
    "Butter & Ghee",
    "Yogurt",
    "Paneer"
];

const allDairyItems = [
  // Milk
  { id: 1, category: "Milk", name: "Fresh Cow Milk (1L)", price: 95 },
  { id: 2, category: "Milk", name: "Full Cream Milk (1L)", price: 110 },
  // Cheese
  { id: 3, category: "Cheese", name: "Cheddar Cheese (200g)", price: 350 },
  { id: 4, category: "Cheese", name: "Mozzarella Cheese (200g)", price: 320 },
  // Butter & Ghee
  { id: 5, category: "Butter & Ghee", name: "Salted Butter (100g)", price: 130 },
  { id: 6, category: "Butter & Ghee", name: "Pure Ghee (500ml)", price: 750 },
  // Yogurt
  { id: 7, category: "Yogurt", name: "Natural Yogurt (400g)", price: 150 },
];

export default function Dairy() {
  const [selectedCategory, setSelectedCategory] = useState("Milk");

  const filteredItems = allDairyItems.filter(item => item.category === selectedCategory);

  return (
    <div className="dairy-page-container">
      <main className="dairy-content">
        <h1 className="page-title">Dairy & Bakery</h1>
        
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
