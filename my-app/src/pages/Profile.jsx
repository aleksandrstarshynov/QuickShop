import { Link, useNavigate, useLocation } from 'react-router-dom';
import UserStatus from '../components/UserStatus';
import { deleteUser, logoutUser } from '../services/authService';
import { useState, useEffect } from 'react';
import avatar404 from '../images/404.png';
import AddProduct from './addProduct';
import { addProduct } from '../services/productService';
import ProductActions from '../components/ProductSettings';
import { useAuth } from '../context/authContext';
import { fetchUserProfile } from '../services/authService';

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get('tab') || 'profile'; // default tab
  const { user } = useAuth(); // get the current user

  const [formData, setFormData] = useState({
    productName: '',
    productBrand: '',
    newPrice: '',
    imageURL: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [serverMessage, setServerMessage] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setServerMessage('');

    const errors = {};
    if (!formData.productName) errors.productName = 'Product name is required';
    if (!formData.productBrand) errors.productBrand = 'Brand is required';
    if (!formData.newPrice) errors.newPrice = 'New price is required';
    if (!formData.imageURL) errors.imageURL = 'Main image URL is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const productWithAuthor = {
      ...formData,
      authorId: user.id, // add user ID
      };
      const response = await addProduct(productWithAuthor, token);
      console.log('Product added:', response);
      setServerMessage('Product added successfully');
    }  catch (err) {
      console.error(err);
      setServerMessage('Failed to add product');
    }
  };

    const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetchUserProfile()
        console.log("🎯 User profile from backend:", response.data)
        setUserData(response.data)
      } catch (err) {
        console.error('Failed to load profile:', err)
      }
    }

    loadProfile()
}, []);

  return (
    <>
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
            background-color: rgb(4, 175, 175);
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
            className={`tab-button ${tab === 'profile' ? 'active' : ''}`}
            onClick={() => navigate('/profile?tab=profile')}
          >
            User Data
          </button>
          <button
            className={`tab-button ${tab === 'manage' ? 'active' : ''}`}
            onClick={() => navigate('/profile?tab=manage')}
          >
            Manage Products
          </button>
        </div>

        <div className="tab-content">
          {tab === 'profile' && (
            <div className="profile">
              <div className="profile-data">
                <div className="profile-data_left">
                  <img
                      alt="user avatar"
                      src={userData?.avatarUrl || avatar404}
                  />
                </div>
                <div className="profile-data_right">
                  <UserStatus />
                </div>
              </div>
              <div className="register-link">
                <h2>User settings</h2>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <Link to="/edit-profile">Update profile</Link>
                <br />
                <button onClick={handleDelete} className="red-button">Delete user</button>
                <button onClick={handleLogout} className="red-button">Log out</button>
              </div>
            </div>
          )}

          {tab === 'manage' && (
            <div className="product-container">
              <div className="product-adding">
                <AddProduct
                  onSubmit={handleSubmit}
                  formData={formData}
                  setFormData={setFormData}
                  formErrors={formErrors}
                  serverMessage={serverMessage}
                />
              </div>
              <div>
                <ProductActions />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
