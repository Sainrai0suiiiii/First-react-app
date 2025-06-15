import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Home from './Public/home';
import Login from './Public/login';
import Signup from './Public/signup';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="main-content-wrapper">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/grocery" element={<Home />} />
          <Route path="/bakery-dairy" element={<Home />} />
          <Route path="/beverage" element={<Home />} />
          <Route path="/eggs-meat" element={<Home />} />
          <Route path="/household-items" element={<Home />} />
          <Route path="/kitchen-pet-food" element={<Home />} />
          <Route path="/packaged-food" element={<Home />} />
          <Route path="/the-baby-store" element={<Home />} />
          <Route path="/the-beauty-store" element={<Home />} />
          <Route path="/veg-fruits" element={<Home />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
