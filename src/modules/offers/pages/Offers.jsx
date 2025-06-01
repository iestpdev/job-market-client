import { useState } from "react";
import useOffers from "../hooks/useOffers";
import useOfferDetails from "../hooks/useOfferDetails";
import OfferList from "../components/list/OfferList";
import OfferDetails from "../components/details/OfferDetails";
import './Offers.css';

const OffersPage = () => {
    const [selectedOfferId, setSelectedOfferId] = useState(null);
    const { offers, loading: offersLoading, error: offersError } = useOffers();
    const { offer, loading: detailsLoading, error: detailsError } = useOfferDetails(selectedOfferId);

    if (offersLoading) return <p>Cargando ofertas...</p>;
    if (offersError) return <p>{offersError}</p>;

    return (
        <div className="offers-page">
            <aside className="offer-list-container">
                <h2>Ofertas de Trabajo</h2>
                <OfferList offers={offers} onSelect={(id) => setSelectedOfferId(id)} />
            </aside>
            <main className="offer-details-container">
                {detailsLoading && <p>Cargando detalles de la oferta...</p>}
                {detailsError && <p>{detailsError}</p>}
                <OfferDetails offer={offer} />
            </main>
        </div>
    );
};

export default OffersPage;