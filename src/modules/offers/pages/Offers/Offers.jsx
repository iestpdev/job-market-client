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

        const {
            query = "",
            salaryMin,
            salaryMax,
            vacanciesMin,
            vacanciesMax,
            dateFilter
        } = filters;

        const now = new Date();

        const result = offers.filter((o) => {
            const matchesQuery =
                o.TITULO?.toLowerCase().includes(query.toLowerCase()) ||
                o.DESCRIPCION?.toLowerCase().includes(query.toLowerCase()) ||
                o.REQUISITOS?.toLowerCase().includes(query.toLowerCase());

            const matchesSalary =
                (!salaryMin || o.SUELDO >= salaryMin) &&
                (!salaryMax || o.SUELDO <= salaryMax);

            const matchesVacancies =
                (!vacanciesMin || o.NUM_VACANTES >= vacanciesMin) &&
                (!vacanciesMax || o.NUM_VACANTES <= vacanciesMax);

            const fechaPub = new Date(o.FECHA_PUBLICACION);
            let matchesDate = true;

            if (dateFilter === "today") {
                matchesDate = fechaPub.toDateString() === now.toDateString();
            } else if (dateFilter === "week") {
                const weekAgo = new Date();
                weekAgo.setDate(now.getDate() - 7);
                matchesDate = fechaPub >= weekAgo;
            } else if (dateFilter === "month") {
                const monthAgo = new Date();
                monthAgo.setMonth(now.getMonth() - 1);
                matchesDate = fechaPub >= monthAgo;
            } else if (dateFilter === "year") {
                matchesDate = fechaPub.getFullYear() === now.getFullYear();
            }

            return matchesQuery && matchesSalary && matchesVacancies && matchesDate;
        });

        setFilteredOffers(result);
        if (result.length > 0) setSelectedOfferId(result[0].ID);
        else setSelectedOfferId(null);
    }, [filters, offers]);

    if (offersLoading) return <p>Cargando ofertas...</p>;
    if (offersError) return <p>{offersError}</p>;

    return (
        <div className="offers-page">
            <aside className="offer-list-container">
                <h2>Ofertas de Trabajo</h2>
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
