import { useState, useEffect, useCallback } from "react";
import { getAll, getAllByCompanyId } from "../api/offers";
import { useAtomValue } from "jotai";
import { authAtom } from "../../auth/atoms/authAtom";

const useOffers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const auth = useAtomValue(authAtom);

    const fetchOffers = useCallback(async () => {
        setLoading(true);
        try {
            let data;
            if (auth?.user?.companyId) {
                data = await getAllByCompanyId(auth.user.companyId);
            } else if (auth?.user?.studentId) {
                data = await getAll();
            } else {
                data = [];
            }

            if (!Array.isArray(data)) throw new Error("Respuesta no válida");
            setOffers(data);
        } catch (err) {
            console.error(err);
            setError("Error al cargar las ofertas");
        } finally {
            setLoading(false);
        }
    }, [auth?.user?.companyId, auth?.user?.studentId]);

    useEffect(() => {
        fetchOffers();
    }, [fetchOffers]);

    return { offers, loading, error, refetch: fetchOffers };
};

export default useOffers;
