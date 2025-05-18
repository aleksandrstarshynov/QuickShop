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

function App() {
  return (
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
      </Routes>
    </Router>
  );
}

export default App;

// Компонент главной страницы с дополнительными компонентами
function Home() {
  return (
    <>
    <Discount />
    <div className="main-container" >
      {/* <ProfileBar /> */}
    <PromoBlock />
      </div>
    
    </>
  );
}
