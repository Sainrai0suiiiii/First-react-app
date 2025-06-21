import React from "react";
import "./shoppingList.css";

export default function ShoppingList() {
  return (
    <aside className="shopping-list-sidebar">
      <h3 className="shopping-list-title">Shopping List</h3>
      <div className="shopping-list-empty">0 items</div>
      <button className="shopping-list-btn">Create Shopping List</button>
    </aside>
  );
}
