import React from "react";
import './dairy.css';

const dairyItems = [
  { id: 1, name: "Fresh Milk 1L", price: 90 },
  { id: 2, name: "Cheddar Cheese 200g", price: 250 },
  { id: 3, name: "Butter 100g", price: 120 },
  // Add more dairy items as needed
];

export default function Dairy() {
  return (
    <div className="page-container">
      <h2 className="page-title">Dairy Items</h2>
      <ul className="item-list">
        {dairyItems.map(item => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span>NRs.{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
