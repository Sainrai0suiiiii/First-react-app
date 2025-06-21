import React from "react";
import './eggsmeat.css';

const eggsMeatItems = [
  { id: 1, name: "Brown Eggs (12 pcs)", price: 180 },
  { id: 2, name: "Chicken Breast (1kg)", price: 450 },
  { id: 3, name: "Mutton (1kg)", price: 1200 },
  // Add more items as needed
];

export default function EggsMeat() {
  return (
    <div className="page-container">
      <h2 className="page-title">Eggs & Meat</h2>
      <ul className="item-list">
        {eggsMeatItems.map(item => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span>NRs.{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
