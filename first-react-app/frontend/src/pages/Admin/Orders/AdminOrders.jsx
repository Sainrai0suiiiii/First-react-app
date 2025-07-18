import axios from "axios";
import React, { useEffect, useState } from "react";
import './AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => setOrders(res.data.orders || res.data))
    .catch(err => setOrders([]));
  }, []);

  return (
    <div className="admin-orders-container">
      <h1 className="orders-title">Orders</h1>
      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.total}</td>
                <td>
                  <span className={`order-status order-status-${order.status.toLowerCase()}`}>{order.status}</span>
                </td>
                <td>{order.date}</td>
                <td>
                  <button className="order-action-btn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders; 