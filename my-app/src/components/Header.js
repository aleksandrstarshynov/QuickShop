import { Link } from 'react-router-dom';
import links from '../mocked_DB/navigationLinks.json';
import CompanyLogo from '../images/CompanyLogo.jpg'; 
import ProfileBar from './ProfileBar';

function Header() {
  return (
    <div className="header">
    <>
      <Link to="/">
        <img src="{CompanyLogo}" alt="QuickShop logo" />
      </Link>
      
      <ul>
        {links.slice(0, 4).map((link, index) => (
          <li key={index}>
            <Link to={link.path}>{link.linkName}</Link>
          </li>
        ))}
      </ul>
      <ProfileBar />
    </>
    </div>
  );
}

export default Header;