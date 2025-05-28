import promotionImage_1 from "../images/promo-banner-1.jpg";
import promotionImage_2 from "../images/promo-banner-2.jpg";
import promotionImage_3 from "../images/promo-banner-3.jpg";    
import { Link } from "react-router-dom";

function PromoBlock() {
    return (
        <div className="promo-block">
          <div className="promo-block-item">
          <Link to="/Catalog">
          {/* TODO add correct filtering here; */}
            <img src={promotionImage_1} alt="promotion of the week" />
          </Link>
          <p>"We are excited to announce that discounts on product groups are still active this week! This is a great opportunity to purchase quality items at reduced prices. Don’t miss your chance to save — update your shopping list today!"</p>
</div>
<div className="promo-block-item">
          <Link to="/Catalog">
          {/* TODO add correct filtering here; */}
            <img src={promotionImage_2} alt="special promotion" />
          </Link>
          <p>"Great prices and many other special offers on selected items are already waiting for you! This is a unique opportunity to purchase quality products with attractive deals. Don’t miss your chance to take advantage of these benefits and make the most of your shopping today!"</p>
</div>
<div className="promo-block-item">
          <Link to="/Catalog">
          {/* TODO add correct filtering here; */}
            <img src={promotionImage_3} alt="promotion of the month" />
          </Link>
          <p>"A unique product in a specific configuration has become a true favorite on our platform, maintaining this position for an entire month. Users highly appreciate its quality and functionality, which confirms its popularity and strong demand among customers."</p>
</div>
          </div>
      );
    }

export default PromoBlock;