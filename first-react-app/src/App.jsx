import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
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
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
