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
  { id: 3, category: "Milk", name: "Toned Milk (1L)", price: 100 },
  { id: 4, category: "Milk", name: "Organic Milk (1L)", price: 130 },
  { id: 5, category: "Milk", name: "Buffalo Milk (1L)", price: 120 },
  // Cheese
  { id: 6, category: "Cheese", name: "Processed Cheese (200g)", price: 300 },
  { id: 7, category: "Cheese", name: "Paneer Cheese (200g)", price: 340 },
  { id: 8, category: "Cheese", name: "Gouda Cheese (200g)", price: 370 },
  // Butter & Ghee
  { id: 9, category: "Butter & Ghee", name: "White Butter (100g)", price: 140 },
  { id: 10, category: "Butter & Ghee", name: "Cow Ghee (250ml)", price: 380 },
  { id: 11, category: "Butter & Ghee", name: "Organic Ghee (250ml)", price: 420 },
  // Yogurt
  { id: 12, category: "Yogurt", name: "Greek Yogurt (200g)", price: 180 },
  { id: 13, category: "Yogurt", name: "Flavored Yogurt (200g)", price: 160 },
  { id: 14, category: "Yogurt", name: "Low Fat Yogurt (400g)", price: 140 },
  // Paneer
  { id: 15, category: "Paneer", name: "Fresh Paneer (200g)", price: 120 },
  { id: 16, category: "Paneer", name: "Malai Paneer (200g)", price: 140 },
  { id: 17, category: "Paneer", name: "Tofu Paneer (200g)", price: 130 },
  { id: 18, category: "Paneer", name: "Organic Paneer (200g)", price: 160 },
];

export default function Dairy() {
  const [selectedCategory, setSelectedCategory] = useState("Milk");
  const [milkType, setMilkType] = useState("");

  const milkTypes = [
    "Fresh Cow Milk (1L)",
    "Full Cream Milk (1L)",
    "Toned Milk (1L)",
    "Organic Milk (1L)",
    "Buffalo Milk (1L)"
  ];

  const filteredItems = allDairyItems.filter(item => {
    if (selectedCategory !== "Milk") return item.category === selectedCategory;
    if (milkType) return item.category === "Milk" && item.name === milkType;
    return item.category === "Milk";
  });

  return (
    <div className="dairy-page-container">
      <main className="dairy-content">
        <h1 className="page-title">Dairy & Bakery</h1>
        
        <nav className="category-nav">
          {categories.map((category) => (
            <button 
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => { setSelectedCategory(category); setMilkType(""); }}
            >
              {category}
            </button>
          ))}
        </nav>
        
        <h2 className="category-title">{selectedCategory}</h2>
        {selectedCategory === "Milk" && (
          <div className="milk-filter-dropdown-container">
            <label htmlFor="milk-type-dropdown" className="milk-filter-label">Filter by type:</label>
            <select
              id="milk-type-dropdown"
              className="milk-filter-dropdown"
              value={milkType}
              onChange={e => setMilkType(e.target.value)}
            >
              <option value="">All Types</option>
              {milkTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        )}
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
