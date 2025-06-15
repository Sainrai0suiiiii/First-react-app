import React from "react";
import '../Css/home.css';

const products = [
  {
    id: 1,
    name: "Morisons Baby Dreams Soft Diaper Pants - Small, 68 Count",
    price: 1110,
    oldPrice: 1118,
    count: 68,
    size: "S",
    age: "4-8 kg",
    img: "https://via.placeholder.com/150x100?text=Product+1",
  },
  {
    id: 2,
    name: "Morisons Baby Dreams Soft Diaper Pants - Medium, 54 Count",
    price: 1110,
    oldPrice: 1118,
    count: 54,
    size: "M",
    age: "7-12 kg",
    img: "https://via.placeholder.com/150x100?text=Product+2",
  },
  {
    id: 3,
    name: "Morisons Baby Dreams Soft Diaper Pants - Large, 48 Count",
    price: 1110,
    oldPrice: 1118,
    count: 48,
    size: "L",
    age: "9-14 kg",
    img: "https://via.placeholder.com/150x100?text=Product+3",
  },
  {
    id: 4,
    name: "Morisons Baby Dreams Soft Diaper Pants - Large, 30 Count",
    price: 630,
    oldPrice: 638,
    count: 30,
    size: "L",
    age: "9-14 kg",
    img: "https://via.placeholder.com/150x100?text=Product+4",
  },
  {
    id: 5,
    name: "Morisons Baby Dreams Soft Diaper Pants - Medium, 32 Count",
    price: 630,
    oldPrice: 638,
    count: 32,
    size: "M",
    age: "7-12 kg",
    img: "https://via.placeholder.com/150x100?text=Product+5",
  },
];

export default function Home() {
  return (
    <div className="home-page">
      {/* Main Content */}
      <div className="main-content">
        {/* Product Grid */}
        <div className="product-grid">
          <h2 className="product-grid-title">Latest Products</h2>
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <span className="product-sale">SALE</span>
                <img src={product.img} alt={product.name} className="product-img" />
                <div className="product-title">{product.name}</div>
                <div className="product-prices">
                  <span className="product-price">NRs.{product.price}</span>
                  <span className="product-oldprice">NRs.{product.oldPrice}</span>
                </div>
                <div className="product-info">
                  <span>{product.count} COUNT</span>
                  <span>{product.size}</span>
                  <span>{product.age}</span>
                </div>
                <div className="product-qty">
                  <span>Qty</span>
                  <button className="product-qty-btn">-</button>
                  <span>1</span>
                  <button className="product-qty-btn">+</button>
                </div>
                <button className="product-add-btn">Add to Shopping list</button>
              </div>
            ))}
          </div>
        </div>
        {/* Shopping List Sidebar */}
        <div className="shopping-list-sidebar">
          <h3 className="shopping-list-title">Shopping List</h3>
          <div className="shopping-list-empty">0 items</div>
          <button className="shopping-list-btn">Create Shopping List</button>
        </div>
      </div>
    </div>
  );
}
