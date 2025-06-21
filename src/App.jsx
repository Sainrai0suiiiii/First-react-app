import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Beverage from "./pages/beverage";
import Dairy from "./pages/dairy";
import EggsMeat from "./pages/EggsMeat";
import Grocery from "./pages/grocery";
import VegFruit from "./pages/VegFruit";
import Home from './Public/home';
import Login from './Public/login';
import Signup from './Public/signup';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <div className="content-area">
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/grocery" element={<Grocery />} />
              <Route path="/dairy" element={<Dairy />} />
              <Route path="/beverage" element={<Beverage />} />
              <Route path="/eggs-meat" element={<EggsMeat />} />
              <Route path="/household-items" element={<Home />} />
              <Route path="/kitchen-pet-food" element={<Home />} />
              <Route path="/packaged-food" element={<Home />} />
              <Route path="/the-baby-store" element={<Home />} />
              <Route path="/the-beauty-store" element={<Home />} />
              <Route path="/veg-fruits" element={<VegFruit />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
