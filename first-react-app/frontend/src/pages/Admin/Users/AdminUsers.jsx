import axios from "axios";
import React, { useEffect, useState } from "react";
import './AdminUsers.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => setUsers(res.data.users || res.data))
    .catch(() => setUsers([]));
  }, []);

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
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`user-role user-role-${user.role}`}>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                </td>
                <td>
                  <span className={`user-status user-status-${user.status.toLowerCase()}`}>{user.status}</span>
                </td>
                <td>{user.joined}</td>
                <td>
                  <button className="user-action-btn">View</button>
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