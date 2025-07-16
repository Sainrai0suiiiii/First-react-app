import React from 'react';
import './DashBoard.css';

const summary = [
  { label: 'Products', value: 128, icon: '📦', color: '#22c55e' },
  { label: 'Orders', value: 312, icon: '🛒', color: '#3b82f6' },
  { label: 'Users', value: 87, icon: '👤', color: '#f59e42' },
  { label: 'Revenue', value: '$12,340', icon: '💰', color: '#f43f5e' },
];

const recentOrders = [
  { id: 1, customer: 'Alice', total: '$120', status: 'Delivered', date: '2024-06-01' },
  { id: 2, customer: 'Bob', total: '$80', status: 'Pending', date: '2024-06-02' },
  { id: 3, customer: 'Charlie', total: '$45', status: 'Shipped', date: '2024-06-03' },
  { id: 4, customer: 'Diana', total: '$210', status: 'Delivered', date: '2024-06-04' },
];

const DashBoard = () => {
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
