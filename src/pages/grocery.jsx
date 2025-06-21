import React from "react";
import './grocery.css';

const groceryItems = [
  { id: 1, name: "Basmati Rice 5kg", price: 1200 },
  { id: 2, name: "Brown Bread", price: 80 },
  { id: 3, name: "Fresh Milk 1L", price: 90 },
  // Add more grocery items here
];

export default function Grocery() {
  return (
    <div className="page-container">
      <h2 className="page-title">Grocery Items</h2>
      <ul className="item-list">
        {groceryItems.map(item => (
          <li key={item.id}>
            {item.name} - NRs.{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
