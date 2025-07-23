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

const emptyForm = { name: '', price: '', stock: '', description: '', category: categories[0], image: null };

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get("http://localhost:5000/api/products", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => setProducts(res.data.products || res.data))
    .catch(() => setProducts([]));
  };

  // Handle image upload
  const uploadImage = async (file) => {
    const data = new FormData();
    data.append('file', file);
    const res = await axios.post('http://localhost:5000/api/file/upload', data, {
      headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return res.data.url || res.data.path || res.data.filename || res.data.file; // Adjust based on backend response
  };

  // Add product
  const handleAdd = async (e) => {
    e.preventDefault();
    let imageUrl = '';
    if (form.image) {
      imageUrl = await uploadImage(form.image);
    }
    const newProduct = {
      ...form,
      image: imageUrl,
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10),
    };
    axios.post('http://localhost:5000/api/products', newProduct, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(() => {
      setForm(emptyForm);
      fetchProducts();
    });
  };

  // Delete product
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      }).then(() => fetchProducts());
    }
  };

  // Start editing
  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm({ ...product, image: null });
  };

  // Save edit
  const handleEditSave = async (e) => {
    e.preventDefault();
    let imageUrl = editForm.image;
    if (editForm.image && typeof editForm.image !== 'string') {
      imageUrl = await uploadImage(editForm.image);
    } else if (!editForm.image) {
      imageUrl = products.find(p => p.id === editingId)?.image || '';
    }
    const updatedProduct = {
      ...editForm,
      image: imageUrl,
      price: parseFloat(editForm.price),
      stock: parseInt(editForm.stock, 10),
    };
    axios.put(`http://localhost:5000/api/products/${editingId}`, updatedProduct, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(() => {
      setEditingId(null);
      setEditForm(emptyForm);
      fetchProducts();
    });
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
        <input
          type="file"
          accept="image/*"
          onChange={e => setForm({ ...form, image: e.target.files[0] })}
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
              <th>Image</th>
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
                      <input type="file" accept="image/*" onChange={e => setEditForm({ ...editForm, image: e.target.files[0] })} />
                      {products.find(p => p.id === editingId)?.image && (
                        <img src={products.find(p => p.id === editingId)?.image} alt="product" style={{ width: 40, height: 40 }} />
                      )}
                    </td>
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
                    <td>{product.image && <img src={product.image} alt={product.name} style={{ width: 40, height: 40 }} />}</td>
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
