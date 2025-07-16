import React from 'react';
import './AdminOrders.css';

const orders = [
  { id: 1001, customer: 'Alice', total: '$120', status: 'Delivered', date: '2024-06-01' },
  { id: 1002, customer: 'Bob', total: '$80', status: 'Pending', date: '2024-06-02' },
  { id: 1003, customer: 'Charlie', total: '$45', status: 'Shipped', date: '2024-06-03' },
  { id: 1004, customer: 'Diana', total: '$210', status: 'Cancelled', date: '2024-06-04' },
];

const AdminOrders = () => {
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