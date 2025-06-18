import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProfileBar from './components/ProfileBar';
import Discount from './components/Discount';
import Filters from './components/Filters';
import ProductSearch from './components/ProductSearch';
import Catalog from './pages/Catalog';
import Profile from './pages/Profile';
import About from './pages/About';
import Offices from './pages/Offices';
import PromoBlock from './components/PromoBlock';
import Register from './pages/Register';
import Login from './pages/Login';
import EditProfile from './pages/EditProfile';
import ProductPage from './pages/ProductPage';
import ProductCard from './components/ProductCard';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext'; 
import React, { useState } from 'react';


function App() {
  return (
    <CartProvider>
        <Router>
          {/* Общие компоненты, которые видны на всех страницах */}
          <Header />

          <Routes>
            {/* Главная страница с дополнительными компонентами */}
            <Route path="/" element={<Home />} />
            
            {/* Страницы, которые не требуют дополнительных компонентов */}
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/offices" element={<Offices />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
    </CartProvider>
  );
}

export default App;

function Home() {
  const [purchases, setPurchases] = useState([]);

  return (
    <>
      <Discount />
      <div className="main-container">
        {/* <ProfileBar /> */}
        <PromoBlock />
      </div>
      <div className="best-feed">
        <h2>Best sellers of the week</h2>
        <div className="best-card-grid">
          {purchases.length > 0 ? (
            purchases.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}

