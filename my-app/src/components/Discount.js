import PromoHeading from './PromoHeading.js';
import promoData from './PromoData.js';
import { useNavigate } from "react-router-dom";

function Discount() {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate("/catalog");
    };
  
    return (
        <div className="discount" onClick={handleClick} style={{ cursor: "pointer" }}>
            <PromoHeading
                heading={promoData.heading}
                callToAction={promoData.callToAction}
            /> 
        </div>
    )
}

export default Discount;