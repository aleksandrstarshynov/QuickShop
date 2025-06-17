import { Link } from 'react-router-dom';
import links from '../mocked_DB/navigationLinks.json';
import CompanyLogo from '../images/CompanyLogo.jpg'; 
import ProfileBar from './ProfileBar';
import { useAuth } from '../context/authContext.js'; 
import UserDropdown from './MenuDropdown.jsx'; 
import { useCart } from '../context/CartContext';
import CartIcon from '../images/cart_small.png';

function Header() {
  const { isLoggedIn, user, logout } = useAuth();
  const { cart } = useCart();
  
  return (
    <div className="header">
    <>
      <Link to="/">
        <img src={CompanyLogo} alt="QuickShop logo" />
      </Link>
      
      <ul>
        {links.slice(0, 4).map((link, index) => (
          <li key={index}>
            <Link to={link.path}>{link.linkName}</Link>
          </li>
        ))}
      </ul>
            <nav>
        {isLoggedIn ? (
        <>
          <Link to="/cart" className="cart-link">
            <img src={CartIcon} alt="Cart" className="cart-image" />
            {cart.length > 0 && (
              <span className="cart-count">{cart.length}</span>
            )}
          </Link>

          <UserDropdown user={user} />
          {/* <button onClick={logout}>Выйти</button> */}
        </>
        ) : (
          <Link to="/login">
            <button>Войти</button>
          </Link>
        )}
      </nav>
    </>
    </div>
  );
}

export default Header;