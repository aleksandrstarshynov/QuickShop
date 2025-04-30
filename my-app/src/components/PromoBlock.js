import promotionImage_1 from "../images/promo-banner-1.jpg";
import promotionImage_2 from "../images/promo-banner-2.jpg";
import promotionImage_3 from "../images/promo-banner-3.jpg";    
import { Link } from "react-router-dom";

function PromoBlock() {
    return (
        <div className="promo-block">
          <Link to="/Catalog">
          {/* TODO add correct filtering here; */}
            <img src={promotionImage_1} alt="promotion of the week" />
          </Link>
          <p>The discount on product groups is active this week too</p>
    
          <Link to="/Catalog">
          {/* TODO add correct filtering here; */}
            <img src={promotionImage_2} alt="special promotion" />
          </Link>
          <p>Great price and many other conditions for some positions are already waiting for you</p>
    
          <Link to="/Catalog">
          {/* TODO add correct filtering here; */}
            <img src={promotionImage_3} alt="promotion of the month" />
          </Link>
          <p>A unique product in a certain configuration has become a favorite on our platform for a whole month</p>
        </div>
      );
    }

export default PromoBlock;