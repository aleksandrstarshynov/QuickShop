import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProfileBar from './components/ProfileBar';
import Discount from './components/Discount';
import Filters from './components/Filters';
import ProductSearch from './components/ProductSearch';
import Catalog from './pages/Catalog';
import Profile from './pages/Profile';
import About from './pages/About';
import Offices from './pages/Offices';
import Register from './pages/Register';
import Login from './pages/Login';
import EditProfile from './pages/EditProfile';
import ProductPage from './pages/ProductPage';
import ProductCard from './components/ProductCard';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext'; 
import React, { useState } from 'react';
import ProductIdea from './components/ProductIdea';
import CategoryPreview from './components/CategoryPreview';
import MainSearch from './components/MainSearch';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './components/CheckoutForm';
import Success from './pages/Success'; 
import SimpleTextBlock from './components/SimpleTextBlock';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function App() {
  return (
    <CartProvider>
                  {/* Common components that are visible on all pages */}
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Pages that do not require additional components */}
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/offices" element={<Offices />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/checkout"
              element={
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              }
            />
            <Route path="/success" element={<Success />} />
            <ToastContainer position="top-right" autoClose={3000} />
          </Routes>
        
    </CartProvider>
  );
}

export default App;

function Home() {
  const [purchases, setPurchases] = useState([]);

  return (
    <>
      <SimpleTextBlock />
      {/* <MainSearch /> */}
      <div className="main-container">
        {/* <ProductIdea /> */}
        <CategoryPreview category="Abstract expressionism" />
        <CategoryPreview category="Watercolor" />
        <CategoryPreview category="urban sketching" />
      </div>
    </>
  );
}

