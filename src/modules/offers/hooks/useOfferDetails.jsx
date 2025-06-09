import { useState, useEffect } from "react";
import { getById } from "../api/offers";

const useOfferDetails = (id) => {
    const [offer, setOffer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOffer = async () => {
            if (!id) {
                setLoading(false);
                return;
            }

            try {
                const data = await getById(id);
                setOffer(data);
            } catch (err) {
                setError("Error al cargar los detalles de la oferta.");
            } finally {
                setLoading(false);
            }
        };

        fetchOffer();
    }, [id]);

    return { offer, loading, error };
};

export default useOfferDetails;