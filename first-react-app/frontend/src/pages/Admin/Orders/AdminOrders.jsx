import axios from "axios";
import React, { useEffect, useState } from "react";
import './AdminOrders.css';

const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editStatus, setEditStatus] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get("http://localhost:5000/api/orders", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => setOrders(res.data.orders || res.data))
    .catch(() => setOrders([]));
  };

  const handleEdit = (order) => {
    setEditingId(order.id);
    setEditStatus(order.status);
  };

  const handleStatusChange = (e) => {
    setEditStatus(e.target.value);
  };

  const handleEditSave = (id) => {
    axios.put(`http://localhost:5000/api/orders/${id}`, { status: editStatus }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(() => {
      setEditingId(null);
      setEditStatus("");
      fetchOrders();
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      axios.delete(`http://localhost:5000/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(() => fetchOrders());
    }
  };

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
                  {editingId === order.id ? (
                    <select value={editStatus} onChange={handleStatusChange}>
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  ) : (
                    <span className={`order-status order-status-${order.status.toLowerCase()}`}>{order.status}</span>
                  )}
                </td>
                <td>{order.date}</td>
                <td>
                  {editingId === order.id ? (
                    <>
                      <button className="order-action-btn" onClick={() => handleEditSave(order.id)}>Save</button>
                      <button className="order-action-btn" onClick={() => setEditingId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="order-action-btn" onClick={() => handleEdit(order)}>Edit</button>
                      <button className="order-action-btn" onClick={() => handleDelete(order.id)}>Delete</button>
                    </>
                  )}
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