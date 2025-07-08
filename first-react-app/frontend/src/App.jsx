import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import './index.css';
import About from './pages/About/About';
import Cart from './pages/Cart/Cart';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Orders from './pages/Orders/Orders';
import ProductDetail from './pages/ProductDetails/ProductsDetails';
import Products from './pages/Products/Products';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <Router>
            <div className="App">
              <Header />
              <main>
            <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        <Footer />
      </div>
          </Router>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;