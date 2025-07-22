import axios from "axios";
import React, { useEffect, useState } from "react";
import './AdminUsers.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '', status: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:5000/api/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => setUsers(res.data.users || res.data))
    .catch(() => setUsers([]));
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditForm({ name: user.name, email: user.email, role: user.role, status: user.status });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = (id) => {
    axios.put(`http://localhost:5000/api/users/${id}`, editForm, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(() => {
      setEditingId(null);
      fetchUsers();
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(() => fetchUsers());
    }
  };

  return (
    <div className="admin-users-container">
      <h1 className="users-title">Users</h1>
      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{editingId === user.id ? (
                  <input name="name" value={editForm.name} onChange={handleEditChange} />
                ) : user.name}</td>
                <td>{editingId === user.id ? (
                  <input name="email" value={editForm.email} onChange={handleEditChange} />
                ) : user.email}</td>
                <td>{editingId === user.id ? (
                  <select name="role" value={editForm.role} onChange={handleEditChange}>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                ) : (
                  <span className={`user-role user-role-${user.role}`}>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                )}</td>
                <td>{editingId === user.id ? (
                  <select name="status" value={editForm.status} onChange={handleEditChange}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                ) : (
                  <span className={`user-status user-status-${user.status?.toLowerCase()}`}>{user.status}</span>
                )}</td>
                <td>{user.joined}</td>
                <td>
                  {editingId === user.id ? (
                    <>
                      <button className="user-action-btn" onClick={() => handleEditSave(user.id)}>Save</button>
                      <button className="user-action-btn" onClick={() => setEditingId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="user-action-btn" onClick={() => handleEdit(user)}>Edit</button>
                      <button className="user-action-btn" onClick={() => handleDelete(user.id)}>Delete</button>
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

export default AdminUsers; 