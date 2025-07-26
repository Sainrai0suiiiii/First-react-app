import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ProtectedRoute, { ProtectedCartRoute } from './components/ProtectedRoute/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import './index.css';

// Public Pages
import About from './pages/About/About';
import Cart from './pages/Cart/Cart';
import Contact from './pages/Contact/Contact';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Orders from './pages/Orders/Orders';
import ProductDetail from './pages/ProductDetails/ProductsDetails';
import Products from './pages/Products/Products';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';

// Admin Pages
import DashBoard from './pages/Admin/Dashboard/DashBoard';
import AdminLayout from './pages/Admin/LayOut/AdminLayout';
import AdminOrders from './pages/Admin/Orders/AdminOrders';
import AdminProducts from './pages/Admin/Products/AdminProducts';
import AdminSettings from './pages/Admin/Settings/AdminSettings';
import AdminUsers from './pages/Admin/Users/AdminUsers';

function AppContent() {
  const location = useLocation();
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (!loading && user) {
      if (role === 'admin' && !location.pathname.startsWith('/admin')) {
        navigate('/admin/dashboard', { replace: true });
      } else if (role !== 'admin' && location.pathname.startsWith('/admin')) {
        navigate('/', { replace: true });
      }
    }
  }, [user, role, loading, navigate, location.pathname]);

  return (
    <div className="App">
      {!isAdminRoute && <Header />}
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={
            <ProtectedCartRoute>
              <Cart />
            </ProtectedCartRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* ✅ Added */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <Router>
            <AppContent />
          </Router>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
