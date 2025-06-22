import React, { useState } from "react";
import './grocery.css';

const categories = [
    "Rice & Rice Products",
    "Atta, Flour & Suji",
    "Cooking Oil & Ghee",
    "Dals & Pulses",
    "Dry Fruits",
    "Health Food",
    "Local Grocery from Nepal",
    "Salt & Sugar",
    "Spices & Masala"
];

const allGroceryItems = [
  // Rice & Rice Products
  { id: 1, category: "Rice & Rice Products", name: "Basmati Rice (1kg)", price: 250 },
  { id: 2, category: "Rice & Rice Products", name: "Brown Rice (1kg)", price: 280 },
  { id: 3, category: "Rice & Rice Products", name: "Poha (500g)", price: 90 },
  { id: 4, category: "Rice & Rice Products", name: "Jeera Masino Rice (5kg)", price: 1250 },
  { id: 5, category: "Rice & Rice Products", name: "Sona Masoori Rice (5kg)", price: 1100 },
  // Atta, Flour & Suji
  { id: 6, category: "Atta, Flour & Suji", name: "Aashirvaad Atta (5kg)", price: 550 },
  { id: 7, category: "Atta, Flour & Suji", name: "Gram Flour (Besan) (1kg)", price: 150 },
  // Cooking Oil & Ghee
  { id: 8, category: "Cooking Oil & Ghee", name: "Sunflower Oil (1L)", price: 320 },
  { id: 9, category: "Cooking Oil & Ghee", name: "Mustard Oil (1L)", price: 350 },
  // Add more sample items for other categories here...
];


export default function Grocery() {
  const [selectedCategory, setSelectedCategory] = useState("Rice & Rice Products");

  const filteredItems = allGroceryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="grocery-page-container">
      <main className="grocery-content">
        <h1 className="page-title">Grocery</h1>
        
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
