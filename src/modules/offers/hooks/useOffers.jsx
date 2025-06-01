import { useState, useEffect } from "react";
import { getAll } from "../api/offers";

const useOffers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const data = await getAll();
                console.log(data);
                setOffers(data);
            } catch (err) {
                setError("Error al cargar las ofertas.");
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    return { offers, loading, error };
};

export default useOffers;
