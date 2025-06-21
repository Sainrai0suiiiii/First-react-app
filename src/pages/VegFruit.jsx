import React from "react";
import './vegfruit.css';

const vegFruitItems = [
  { id: 1, name: "Tomato (1kg)", price: 60 },
  { id: 2, name: "Potato (1kg)", price: 40 },
  { id: 3, name: "Apple (1kg)", price: 180 },
  { id: 4, name: "Banana (Dozen)", price: 100 },
  // Add more items as needed
];

export default function VegFruit() {
  return (
    <div className="page-container">
      <h2 className="page-title">Vegetables & Fruits</h2>
      <ul className="item-list">
        {vegFruitItems.map(item => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span>NRs.{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
