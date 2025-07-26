import React, { useEffect, useState } from "react";
import { apiService } from '../../../utils/api';
import './AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await apiService.getOrders();

        const raw = response?.data;

        const safeOrders = Array.isArray(raw?.orders)
          ? raw.orders
          : Array.isArray(raw)
            ? raw
            : [];

        setOrders(safeOrders);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="admin-orders-container">
        <h1 className="orders-title">Orders</h1>
        <div className="loading-message">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-orders-container">
        <h1 className="orders-title">Orders</h1>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="admin-orders-container">
      <h1 className="orders-title">Orders</h1>
      <div className="orders-table-wrapper">
        {orders.length === 0 ? (
          <div className="no-data">No orders found.</div>
        ) : (
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
                  <td>{order.customerName || order.user?.name || 'N/A'}</td>
                  <td>${order.total || order.amount || '0.00'}</td>
                  <td>
                    <span className={`order-status order-status-${(order.status || 'pending').toLowerCase()}`}>
                      {order.status || 'Pending'}
                    </span>
                  </td>
                  <td>{new Date(order.createdAt || order.date).toLocaleDateString()}</td>
                  <td>
                    <button className="order-action-btn">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
