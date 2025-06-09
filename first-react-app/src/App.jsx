import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Public/home';
import Login from './Public/login';
import Signup from './Public/signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
