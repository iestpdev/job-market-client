import OfferCard from '../card/OfferCard';
import './OfferList.css';

const OfferList = ({ offers, onSelect }) => {
    return (
        <div className="offer-list">
            {offers.map((offer) => (
                <div key={offer.ID} onClick={() => onSelect(offer.ID)}>
                    <OfferCard offer={offer} />
                </div>
            ))}
        </div>
    );
};

export default OfferList;