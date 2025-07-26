import axios from 'axios';
import { CheckCircle, Clock, Eye, Package, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import './Orders.css';

const Orders = () => {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/v1/orders", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
      // Ensure orders is always an array
      const apiOrders = Array.isArray(res.data.orders) ? res.data.orders : [];
      setOrders(apiOrders);
    })
    .catch(() => setOrders([]));
  }, []);

  const statusFilters = ['All', 'Processing', 'Delivered', 'Cancelled'];

  const filteredOrders = selectedStatus === 'All'
    ? (Array.isArray(orders) ? orders : [])
    : (Array.isArray(orders) ? orders.filter(order => order.status === selectedStatus) : []);

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
              <span className="stat-value">{Array.isArray(orders) ? orders.length : 0}</span>
              <span className="stat-label">Total Orders</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                ₹{Array.isArray(orders) ? orders.reduce((sum, order) => sum + (order.total || 0), 0) : 0}
              </span>
              <span className="stat-label">Total Spent</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {Array.isArray(orders) ? orders.filter(o => o.status === 'Delivered').length : 0}
              </span>
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
                      <span className="info-value">
                        {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Items:</span>
                      <span className="info-value">{order.items || 0} items</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Delivery Time:</span>
                      <span className="info-value">{order.deliveryTime || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Total:</span>
                      <span className="info-value total-amount">₹{order.total || 0}</span>
                    </div>
                  </div>

                  <div className="order-products">
                    <h4>Products:</h4>
                    <div className="products-list">
                      {(order.products && Array.isArray(order.products)) ? order.products.map((product, index) => (
                        <span key={index} className="product-tag">
                          {product}
                        </span>
                      )) : <span className="product-tag">No products</span>}
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