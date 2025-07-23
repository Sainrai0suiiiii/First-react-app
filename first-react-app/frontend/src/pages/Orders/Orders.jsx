import axios from 'axios';
import { CheckCircle, Clock, Eye, Package, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import './Orders.css';

const Orders = () => {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => setOrders(res.data.orders || res.data))
    .catch(() => setOrders([]));
  }, []);

  // Mock order data
  // const orders = [
  //   {
  //     id: '#ORD-001',
  //     date: '2024-01-15',
  //     status: 'Delivered',
  //     total: 1250,
  //     items: 8,
  //     deliveryTime: '25 mins',
  //     products: ['Organic Apples', 'Fresh Milk', 'Basmati Rice']
  //   },
  //   {
  //     id: '#ORD-002',
  //     date: '2024-01-12',
  //     status: 'Processing',
  //     total: 850,
  //     items: 5,
  //     deliveryTime: '30 mins',
  //     products: ['Chicken Breast', 'Mixed Vegetables', 'Whole Wheat Bread']
  //   },
  //   {
  //     id: '#ORD-003',
  //     date: '2024-01-10',
  //     status: 'Delivered',
  //     total: 1650,
  //     items: 12,
  //     deliveryTime: '28 mins',
  //     products: ['Fresh Fruits Bundle', 'Dairy Products', 'Meat Package']
  //   },
  //   {
  //     id: '#ORD-004',
  //     date: '2024-01-08',
  //     status: 'Cancelled',
  //     total: 420,
  //     items: 3,
  //     deliveryTime: '-',
  //     products: ['Organic Vegetables', 'Fresh Herbs']
  //   }
  // ];

  const statusFilters = ['All', 'Processing', 'Delivered', 'Cancelled'];

  const filteredOrders = selectedStatus === 'All' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return <Clock size={20} className="status-icon processing" />;
      case 'Delivered':
        return <CheckCircle size={20} className="status-icon delivered" />;
      case 'Cancelled':
        return <XCircle size={20} className="status-icon cancelled" />;
      default:
        return <Package size={20} className="status-icon" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Processing':
        return 'status-processing';
      case 'Delivered':
        return 'status-delivered';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  return (
    <div className="orders-page">
      <div className="container">
        <div className="orders-header">
          <h1 className="page-title">My Orders</h1>
          <p className="page-description">Track and manage your order history</p>
        </div>

        <div className="orders-filters">
          {statusFilters.map(status => (
            <button
              key={status}
              className={`filter-btn ${selectedStatus === status ? 'active' : ''}`}
              onClick={() => setSelectedStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="orders-summary">
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-value">{orders.length}</span>
              <span className="stat-label">Total Orders</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">₹{orders.reduce((sum, order) => sum + order.total, 0)}</span>
              <span className="stat-label">Total Spent</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{orders.filter(o => o.status === 'Delivered').length}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <Package size={60} />
            <h3>No orders found</h3>
            <p>No orders match the selected filter</p>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-id">
                    <Package size={24} />
                    <span>{order.id}</span>
                  </div>
                  <div className={`order-status ${getStatusClass(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span>{order.status}</span>
                  </div>
                </div>

                <div className="order-details">
                  <div className="order-info">
                    <div className="info-item">
                      <span className="info-label">Order Date:</span>
                      <span className="info-value">{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Items:</span>
                      <span className="info-value">{order.items} items</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Delivery Time:</span>
                      <span className="info-value">{order.deliveryTime}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Total:</span>
                      <span className="info-value total-amount">₹{order.total}</span>
                    </div>
                  </div>

                  <div className="order-products">
                    <h4>Products:</h4>
                    <div className="products-list">
                      {order.products.map((product, index) => (
                        <span key={index} className="product-tag">
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="order-actions">
                  <button className="action-btn view-btn">
                    <Eye size={18} />
                    View Details
                  </button>
                  {order.status === 'Delivered' && (
                    <button className="action-btn reorder-btn">
                      Reorder
                    </button>
                  )}
                  {order.status === 'Processing' && (
                    <button className="action-btn cancel-btn">
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;