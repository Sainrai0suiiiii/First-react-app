import axios from 'axios';

// API Base Configuration
const API_BASE_URL = 'http://localhost:5001/api/v1';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ME: '/auth/me',
  UPDATE_PROFILE: '/auth/profile',
  
  // Users
  USER_PROFILE: '/users/profile',
  USERS: '/users',
  
  // Products
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  PRODUCT_BY_SLUG: (slug) => `/products/slug/${slug}`,
  PRODUCTS_BY_CATEGORY: (category) => `/products/category/${category}`,
  FEATURED_PRODUCTS: '/products/featured',
  PRODUCT_CATEGORIES: '/products/categories',
  
  // Cart
  CART: '/cart',
  CART_ITEM: (id) => `/cart/${id}`,
  
  // Orders
  ORDERS: '/orders',
  ORDER_BY_ID: (id) => `/orders/${id}`,
  ORDER_STATUS: (id) => `/orders/${id}/status`,
  
  // File Upload
  FILE_UPLOAD: '/file/upload',
};

// API Helper Functions
export const apiService = {
  // Auth
  login: (credentials) => api.post(API_ENDPOINTS.LOGIN, credentials),
  register: (userData) => api.post(API_ENDPOINTS.REGISTER, userData),
  getCurrentUser: () => api.get(API_ENDPOINTS.ME),
  updateProfile: (profileData) => api.put(API_ENDPOINTS.UPDATE_PROFILE, profileData),
  
  // Users
  getUsers: () => api.get(API_ENDPOINTS.USERS),
  
  // Products
  getProducts: (params) => api.get(API_ENDPOINTS.PRODUCTS, { params }),
  getProduct: (id) => api.get(API_ENDPOINTS.PRODUCT_BY_ID(id)),
  getProductBySlug: (slug) => api.get(API_ENDPOINTS.PRODUCT_BY_SLUG(slug)),
  getProductsByCategory: (category, params) => 
    api.get(API_ENDPOINTS.PRODUCTS_BY_CATEGORY(category), { params }),
  getFeaturedProducts: (params) => api.get(API_ENDPOINTS.FEATURED_PRODUCTS, { params }),
  getProductCategories: () => api.get(API_ENDPOINTS.PRODUCT_CATEGORIES),
  createProduct: (productData) => {
    // If productData is FormData, don't set Content-Type header
    if (productData instanceof FormData) {
      return api.post(API_ENDPOINTS.PRODUCTS, productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
    return api.post(API_ENDPOINTS.PRODUCTS, productData);
  },
  updateProduct: (id, productData) => {
    // If productData is FormData, don't set Content-Type header
    if (productData instanceof FormData) {
      return api.put(API_ENDPOINTS.PRODUCT_BY_ID(id), productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
    return api.put(API_ENDPOINTS.PRODUCT_BY_ID(id), productData);
  },
  deleteProduct: (id) => api.delete(API_ENDPOINTS.PRODUCT_BY_ID(id)),
  
  // Cart
  getCart: () => api.get(API_ENDPOINTS.CART),
  addToCart: (cartItem) => api.post(API_ENDPOINTS.CART, cartItem),
  updateCartItem: (id, quantity) => api.put(API_ENDPOINTS.CART_ITEM(id), { quantity }),
  removeFromCart: (id) => api.delete(API_ENDPOINTS.CART_ITEM(id)),
  clearCart: () => api.delete(API_ENDPOINTS.CART),
  
  // Orders
  getOrders: () => api.get(API_ENDPOINTS.ORDERS),
  createOrder: (orderData) => api.post(API_ENDPOINTS.ORDERS, orderData),
  getOrder: (id) => api.get(API_ENDPOINTS.ORDER_BY_ID(id)),
  updateOrderStatus: (id, status) => api.put(API_ENDPOINTS.ORDER_STATUS(id), { status }),
  
  // File Upload
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(API_ENDPOINTS.FILE_UPLOAD, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default api; 