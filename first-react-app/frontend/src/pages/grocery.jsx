import React, { useState } from "react";
import './grocery.css';

const categories = [
    "Rice & Rice Products",
    "Atta, Flour & Suji",
    "Cooking Oil & Ghee",
    "Dals & Pulses",
    "Dry Fruits",
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
  { id: 7, category: "Atta, Flour & Suji", name: "Sooji (500g)", price: 80 },
  { id: 8, category: "Atta, Flour & Suji", name: "Maida (1kg)", price: 90 },
  { id: 9, category: "Atta, Flour & Suji", name: "Ragi Flour (500g)", price: 120 },
  { id: 10, category: "Atta, Flour & Suji", name: "Multigrain Atta (1kg)", price: 160 },
  // Cooking Oil & Ghee
  { id: 11, category: "Cooking Oil & Ghee", name: "Sunflower Oil (1L)", price: 320 },
  { id: 12, category: "Cooking Oil & Ghee", name: "Mustard Oil (1L)", price: 350 },
  { id: 13, category: "Cooking Oil & Ghee", name: "Refined Soybean Oil (1L)", price: 300 },
  { id: 14, category: "Cooking Oil & Ghee", name: "Coconut Oil (500ml)", price: 220 },
  { id: 15, category: "Cooking Oil & Ghee", name: "Desi Ghee (250ml)", price: 400 },
  { id: 16, category: "Cooking Oil & Ghee", name: "Olive Oil (250ml)", price: 350 },
  // Dals & Pulses
  { id: 17, category: "Dals & Pulses", name: "Toor Dal (1kg)", price: 180 },
  { id: 18, category: "Dals & Pulses", name: "Moong Dal (1kg)", price: 170 },
  { id: 19, category: "Dals & Pulses", name: "Masoor Dal (1kg)", price: 160 },
  { id: 20, category: "Dals & Pulses", name: "Chana Dal (1kg)", price: 150 },
  { id: 21, category: "Dals & Pulses", name: "Urad Dal (1kg)", price: 175 },
  // Dry Fruits
  { id: 22, category: "Dry Fruits", name: "Almonds (250g)", price: 350 },
  { id: 23, category: "Dry Fruits", name: "Cashews (250g)", price: 400 },
  { id: 24, category: "Dry Fruits", name: "Raisins (250g)", price: 180 },
  { id: 25, category: "Dry Fruits", name: "Walnuts (100g)", price: 220 },
  { id: 26, category: "Dry Fruits", name: "Dates (250g)", price: 150 },
  // Salt & Sugar
  { id: 27, category: "Salt & Sugar", name: "Iodized Salt (1kg)", price: 30 },
  { id: 28, category: "Salt & Sugar", name: "Rock Salt (500g)", price: 50 },
  { id: 29, category: "Salt & Sugar", name: "Sugar (1kg)", price: 90 },
  { id: 30, category: "Salt & Sugar", name: "Brown Sugar (500g)", price: 70 },
  { id: 31, category: "Salt & Sugar", name: "Jaggery (500g)", price: 80 },
  // Spices & Masala
  { id: 32, category: "Spices & Masala", name: "Turmeric Powder (100g)", price: 40 },
  { id: 33, category: "Spices & Masala", name: "Red Chilli Powder (100g)", price: 50 },
  { id: 34, category: "Spices & Masala", name: "Coriander Powder (100g)", price: 45 },
  { id: 35, category: "Spices & Masala", name: "Garam Masala (50g)", price: 60 },
  { id: 36, category: "Spices & Masala", name: "Cumin Seeds (100g)", price: 55 },
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
