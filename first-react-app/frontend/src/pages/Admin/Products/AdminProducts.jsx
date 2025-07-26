import React, { useEffect, useState } from 'react';
import { apiService } from '../../../utils/api';
import { getImageUrl } from '../../../utils/helpers';
import './AdminProducts.css';

const categories = [
  'Fruits',
  'Dairy',
  'Beverages',
  'Vegetables',
  'Meat',
  'Grocery',
];

const emptyForm = { 
  name: '', 
  price: '', 
  stock: '', 
  description: '', 
  category: categories[0],
  image: null 
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Get form data for file upload
  const getFormData = (formData) => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    data.append('category', formData.category);
    if (formData.image) {
      data.append('image', formData.image);
    }
    return data;
  };

  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiService.getProducts();
      setProducts(response.data.data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Add product
  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = getFormData(form);
              const response = await apiService.createProduct(formData);

      if (response.data.success) {
        setSuccess('Product added successfully!');
        setForm(emptyForm);
        fetchProducts(); // Refresh the list
      }
    } catch (err) {
      console.error('Error adding product:', err);
      setError(err.response?.data?.error || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setLoading(true);
              await apiService.deleteProduct(id);
      setSuccess('Product deleted successfully!');
      fetchProducts(); // Refresh the list
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err.response?.data?.error || 'Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  // Start editing
  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm({ 
      ...product, 
      image: null // Reset image for edit
    });
  };

  // Save edit
  const handleEditSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = getFormData(editForm);
      const response = await apiService.updateProduct(editingId, formData);

      if (response.data.success) {
        setSuccess('Product updated successfully!');
        setEditingId(null);
        setEditForm(emptyForm);
        fetchProducts(); // Refresh the list
      }
    } catch (err) {
      console.error('Error updating product:', err);
      setError(err.response?.data?.error || 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  // Handle file input change
  const handleFileChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      if (isEdit) {
        setEditForm({ ...editForm, image: file });
      } else {
        setForm({ ...form, image: file });
      }
    }
  };

  // Filtered products
  const filteredProducts = categoryFilter === 'All'
    ? products
    : products.filter(p => p.category === categoryFilter);

  return (
    <div className="admin-products-container">
      <h1 className="products-title">Products Management</h1>
      
      {/* Success/Error Messages */}
      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}

      {/* Add Product Form */}
      <form className="add-product-form" onSubmit={handleAdd}>
        <h3>Add New Product</h3>
        
        <div className="form-row">
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
            placeholder="Product Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="form-row">
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
            required
            min="0"
            step="0.01"
          />
          
          <input
            type="number"
            placeholder="Stock Quantity"
            value={form.stock}
            onChange={e => setForm({ ...form, stock: e.target.value })}
            required
            min="0"
          />
        </div>

        <textarea
          placeholder="Product Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          required
          rows="3"
        />

        <div className="file-input-wrapper">
          <label htmlFor="product-image">Product Image:</label>
          <input
            type="file"
            id="product-image"
            accept="image/*"
            onChange={(e) => handleFileChange(e, false)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>

      {/* Category Filter */}
      <div className="category-filter-wrapper">
        <label>Filter by Category: </label>
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="products-table-wrapper">
        {loading ? (
          <div className="loading-message">Loading products...</div>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Category</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-products">No products found</td>
                </tr>
              ) : (
                filteredProducts.map(product => (
                  <tr key={product.id}>
                    {editingId === product.id ? (
                      <>
                        <td>
                          <img 
                            src={product.image ? getImageUrl(product.image) : '/default-product.png'} 
                            alt={product.name}
                            className="product-thumbnail"
                          />
                        </td>
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
                        <td>
                          <input 
                            value={editForm.name} 
                            onChange={e => setEditForm({ ...editForm, name: e.target.value })} 
                            required
                          />
                        </td>
                        <td>
                          <input 
                            type="number" 
                            value={editForm.price} 
                            onChange={e => setEditForm({ ...editForm, price: e.target.value })}
                            min="0"
                            step="0.01"
                            required
                          />
                        </td>
                        <td>
                          <input 
                            type="number" 
                            value={editForm.stock} 
                            onChange={e => setEditForm({ ...editForm, stock: e.target.value })}
                            min="0"
                            required
                          />
                        </td>
                        <td>
                          <textarea 
                            value={editForm.description} 
                            onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                            rows="2"
                            required
                          />
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="save-btn" onClick={handleEditSave} disabled={loading}>
                              {loading ? 'Saving...' : 'Save'}
                            </button>
                            <button className="cancel-btn" onClick={() => setEditingId(null)}>
                              Cancel
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          <img 
                            src={product.image ? getImageUrl(product.image) : '/default-product.png'} 
                            alt={product.name}
                            className="product-thumbnail"
                          />
                        </td>
                        <td>{product.category}</td>
                        <td>{product.name}</td>
                        <td>₹{product.price}</td>
                        <td>{product.stock}</td>
                        <td>{product.description}</td>
                        <td>
                          <div className="action-buttons">
                            <button className="edit-btn" onClick={() => handleEdit(product)}>
                              Edit
                            </button>
                            <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
