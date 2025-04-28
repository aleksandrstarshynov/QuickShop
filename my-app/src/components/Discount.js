import PromoHeading from './PromoHeading.js';
import promoData from './PromoData.js';

function Discount() {
    return (
        <div>
            <PromoHeading
                heading={promoData.heading}
                callToAction={promoData.callToAction}
            /> 
        </div>
    )
}

export default Discount;