import axios from "axios";
import React, { useEffect, useState } from "react";
import './DashBoard.css';

const DashBoard = () => {
  const [summary, setSummary] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/summary", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => setSummary(res.data.summary || res.data))
    .catch(() => setSummary([]));

    axios.get("http://localhost:5000/api/orders", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => setRecentOrders(res.data.orders || res.data))
    .catch(() => setRecentOrders([]));
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="dashboard-cards">
        {summary.map((item) => (
          <div className="dashboard-card" key={item.label} style={{ borderTop: `4px solid ${item.color}` }}>
            <div className="card-icon" style={{ background: item.color + '22' }}>{item.icon}</div>
            <div className="card-info">
              <div className="card-value">{item.value}</div>
              <div className="card-label">{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-section">
        <h2>Recent Orders</h2>
        <div className="dashboard-table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.total}</td>
                  <td>
                    <span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span>
                  </td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
