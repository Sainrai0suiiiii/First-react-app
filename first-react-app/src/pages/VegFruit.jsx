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
  { id: 4, category: "Fresh Vegetables", name: "Carrot (1kg)", price: 70 },
  { id: 5, category: "Fresh Vegetables", name: "Cabbage (1kg)", price: 50 },
  // Fresh Fruits
  { id: 6, category: "Fresh Fruits", name: "Apple (1kg)", price: 180 },
  { id: 7, category: "Fresh Fruits", name: "Banana (Dozen)", price: 100 },
  { id: 8, category: "Fresh Fruits", name: "Orange (1kg)", price: 120 },
  { id: 9, category: "Fresh Fruits", name: "Grapes (500g)", price: 90 },
  { id: 10, category: "Fresh Fruits", name: "Papaya (1kg)", price: 60 },
  { id: 11, category: "Fresh Fruits", name: "Pomegranate (1kg)", price: 200 },
  // Herbs & Seasonings
  { id: 12, category: "Herbs & Seasonings", name: "Coriander (Bunch)", price: 20 },
  { id: 13, category: "Herbs & Seasonings", name: "Mint (Bunch)", price: 15 },
  { id: 14, category: "Herbs & Seasonings", name: "Basil (Bunch)", price: 25 },
  { id: 15, category: "Herbs & Seasonings", name: "Spring Onion (Bunch)", price: 30 },
  { id: 16, category: "Herbs & Seasonings", name: "Lemongrass (Bunch)", price: 35 },
  { id: 17, category: "Herbs & Seasonings", name: "Dill (Bunch)", price: 28 },
  // Exotic Vegetables & Fruits
  { id: 18, category: "Exotic Vegetables & Fruits", name: "Broccoli (500g)", price: 120 },
  { id: 19, category: "Exotic Vegetables & Fruits", name: "Avocado (1pc)", price: 150 },
  { id: 20, category: "Exotic Vegetables & Fruits", name: "Dragon Fruit (1pc)", price: 180 },
  { id: 21, category: "Exotic Vegetables & Fruits", name: "Zucchini (500g)", price: 90 },
  { id: 22, category: "Exotic Vegetables & Fruits", name: "Kiwi (1pc)", price: 60 },
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
