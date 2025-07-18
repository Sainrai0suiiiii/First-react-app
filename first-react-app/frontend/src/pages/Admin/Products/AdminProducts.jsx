import axios from "axios";
import React, { useEffect, useState } from 'react';
import './AdminProducts.css';

const categories = [
  'Fruits',
  'Dairy',
  'Beverages',
  'Vegetables',
  'Meat',
  'Grocery',
];

const initialProducts = [
  { id: 1, name: 'Apple', price: 1.2, stock: 100, description: 'Fresh apples', category: 'Fruits' },
  { id: 2, name: 'Banana', price: 0.8, stock: 80, description: 'Organic bananas', category: 'Fruits' },
  { id: 3, name: 'Milk', price: 2.5, stock: 50, description: 'Dairy milk', category: 'Dairy' },
];

const emptyForm = { name: '', price: '', stock: '', description: '', category: categories[0] };

const AdminProducts = () => {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    axios.get("http://localhost:5000/api/products", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => setProducts(res.data.products || res.data))
    .catch(err => setProducts([]));
  }, []);

  // Add product
  const handleAdd = (e) => {
    e.preventDefault();
    const newProduct = {
      ...form,
      id: Date.now(),
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10),
    };
    setProducts([...products, newProduct]);
    setForm(emptyForm);
  };

  // Delete product
  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Start editing
  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  // Save edit
  const handleEditSave = (e) => {
    e.preventDefault();
    setProducts(products.map(p => p.id === editingId ? { ...editForm, id: editingId } : p));
    setEditingId(null);
    setEditForm(emptyForm);
  };

  // Filtered products
  const filteredProducts = categoryFilter === 'All'
    ? products
    : products.filter(p => p.category === categoryFilter);

  return (
    <div className="admin-products-container">
      <h1 className="products-title">Products</h1>
      <form className="add-product-form" onSubmit={handleAdd}>
        <select
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          required
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={e => setForm({ ...form, stock: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          required
        />
        <button type="submit">Add Product</button>
      </form>
      <div className="category-filter-wrapper">
        <label>Filter by Category: </label>
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="products-table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                {editingId === product.id ? (
                  <>
                    <td>
                      <select
                        value={editForm.category}
                        onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                        required
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </td>
                    <td><input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} /></td>
                    <td><input type="number" value={editForm.price} onChange={e => setEditForm({ ...editForm, price: e.target.value })} /></td>
                    <td><input type="number" value={editForm.stock} onChange={e => setEditForm({ ...editForm, stock: e.target.value })} /></td>
                    <td><input value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} /></td>
                    <td>
                      <button className="save-btn" onClick={handleEditSave}>Save</button>
                      <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{product.category}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.description}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
