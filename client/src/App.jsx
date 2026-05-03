import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CustomCakeOrderForm from './components/CustomCakeOrderForm';
import CakeUploadForm from './components/CakeUploadForm';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <nav className="navbar">
          <div className="container">
            <Link to="/" className="logo-text">Cake Boutique</Link>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/order">Custom Order</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/admin/upload">Admin</Link>
            </div>
          </div>
        </nav>
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<CustomCakeOrderForm />} />
            <Route path="/admin/upload" element={<CakeUploadForm />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div>
                <h4>About Us</h4>
                <p>Handcrafting the most delicious and beautiful cakes for your special moments since 2010.</p>
              </div>
              <div>
                <h4>Categories</h4>
                <ul>
                  <li>Wedding Cakes</li>
                  <li>Birthday Cakes</li>
                  <li>Anniversary Cakes</li>
                  <li>Custom Designs</li>
                </ul>
              </div>
              <div>
                <h4>Contact</h4>
                <p>123 Bakery Lane, Sweet City</p>
                <p>Phone: (555) 123-4567</p>
                <p>Email: hello@cakeboutique.com</p>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2026 Boutique Cake Shop. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;