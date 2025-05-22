
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import UserStatus from '../components/UserStatus';
import { deleteUser, logoutUser } from '../services/authService';
import { useState, useEffect } from 'react';
import { fetchProductById } from '../controller/fetchProductDB';
import ProductCard from '../components/ProductCard';
import avatar404 from '../images/404.png';

function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your profile?')) return;

    try {
      const token = localStorage.getItem('token');
      await deleteUser(token);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete profile', error);
      alert('Error deleting profile');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed');
    }
  };

  const [purchases, setPurchases] = useState([]);

useEffect(() => {
  const loadProducts = async () => {
    const ids = [1, 2, 3]; 
    const products = await Promise.all(ids.map(id => fetchProductById(id)));
    setPurchases(products.filter(p => p !== null));
  };

  loadProducts();
}, []);

  return (
    <>
      {/* Простые стили для табов */}
      <style>
        {`
          .tabs {
            display: flex;
            margin-top: 20px;
            gap: 10px;
            justify-content: center;
          }
          .tab-button {
            padding: 10px 20px;
            border: 1px solid #ccc;
            background: #f1f1f1;
            cursor: pointer;
            border-radius: 6px 6px 0 0;
            font-size: 14px;
          }
          .tab-button.active {
            background-color:rgb(4, 175, 175);
            color: white;
            font-weight: bold;
          }
          .tab-content {
            border: 1px solid #ccc;
            padding: 20px;
            border-radius: 0 6px 6px 6px;
            background: #fff;
            margin-bottom: 30px;
          }
          .register-link a, .register-link button {
            display: inline-block;
            margin-right: 10px;
            margin-top: 10px;
          }
          .red-button {
            background: #c0392b;
            color: white;
            padding: 6px 12px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          .red-button:hover {
            background: #e74c3c;
          }
        `}
      </style>

      <div className="profile-container">
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            User Data
          </button>
          <button
            className={`tab-button ${activeTab === 'purchases' ? 'active' : ''}`}
            onClick={() => setActiveTab('purchases')}
          >
            Purchases
          </button>
          <button
            className={`tab-button ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            Favorites
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'profile' && (
            <div className="profile">
            <div className="profile-data">
              <div className="profile-data_left">
                {/* <img src="./images/404.png" alt="user avatar" /> */}
                <img alt="user avatar" src={avatar404} />
                </div>
              <div className="profile-data_right">              
              <UserStatus />
              </div>
            </div>
            <div className="profile-settings">
              <div className="register-link">
                <h2>User settings</h2>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <Link to="/edit-profile">Update profile</Link>
                <br />
                <button onClick={handleDelete} className="red-button">Detete user</button>
                <button onClick={handleLogout} className="red-button">Log out</button>
              </div>
            </div>
            </div>
          )}

          {activeTab === 'purchases' && (
            <div className = "purchase-feed">
  <h2>Purchase history</h2>
  <div className="product-card-grid">
    {purchases.length > 0 ? (
      purchases.map(product => (
        <ProductCard key={product.id} product={product} />
      ))
    ) : (
      <p>Loading...</p>
    )}
</div>
</div>
          )}

          {activeTab === 'favorites' && (
            <div  className = "favorites-feed">
              <h2>List of favorites</h2>
                <div className="favorites-card-grid">
    {purchases.length > 0 ? (
      purchases.map(product => (
        <ProductCard key={product.id} product={product} />
      ))
    ) : (
      <p>Loading...</p>
    )}
</div>
</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
