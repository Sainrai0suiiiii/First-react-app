import React from "react";
import './beverage.css';

const beverageItems = [
  { id: 1, name: "Coca Cola 1L", price: 120 },
  { id: 2, name: "Fresh Orange Juice", price: 150 },
  { id: 3, name: "Green Tea Pack", price: 200 },
  // Add more beverages as needed
];

export default function Beverage() {
  return (
    <div className="page-container">
      <h2 className="page-title">Beverage Items</h2>
      <ul className="item-list">
        {beverageItems.map(item => (
          <li key={item.id}>
            {item.name} - NRs.{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
