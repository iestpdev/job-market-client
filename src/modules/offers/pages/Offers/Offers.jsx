import { useEffect, useState } from "react";
import useOffers from "../../hooks/useOffers";
import useOfferDetails from "../../hooks/useOfferDetails";
import OfferList from "../../components/list/OfferList";
import OfferDetails from "../../components/details/OfferDetails";
import './Offers.css';

const OffersPage = ({ filters }) => {
    const { offers, loading: offersLoading, error: offersError, refetch } = useOffers();
    const [filteredOffers, setFilteredOffers] = useState([]);
    const [selectedOfferId, setSelectedOfferId] = useState(null);
    const { offer, loading: detailsLoading, error: detailsError } = useOfferDetails(selectedOfferId);

    useEffect(() => {
        if (offers.length > 0 && !selectedOfferId) {
            setSelectedOfferId(offers[0].ID);
        }
        setFilteredOffers(offers);
    }, [offers]);

    useEffect(() => {
        if (!filters) return setFilteredOffers(offers);

        const { query = "" } = filters;

        const result = offers.filter((o) =>
            o.TITULO?.toLowerCase().includes(query.toLowerCase()) ||
            o.DESCRIPCION?.toLowerCase().includes(query.toLowerCase()) ||
            o.REQUISITOS?.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredOffers(result);
        if (result.length > 0) {
            setSelectedOfferId(result[0].ID);
        } else {
            setSelectedOfferId(null);
        }
    }, [filters, offers]);

    if (offersLoading) return <p>Cargando ofertas...</p>;
    if (offersError) return <p>{offersError}</p>;

    return (
        <div className="offers-page">
            <aside className="offer-list-container">
                <OfferList offers={filteredOffers} onSelect={(id) => setSelectedOfferId(id)} />
            </aside>
            <main className="offer-details-container">
                {detailsLoading && <p>Cargando detalles de la oferta...</p>}
                {detailsError && <p>{detailsError}</p>}
                {!detailsLoading && offer && <OfferDetails offer={offer} onDelete={refetch} />}
            </main>
        </div>
    );
};

export default OffersPage;
