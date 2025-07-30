import { useState, useEffect, useCallback } from "react";
import { getAll, getAllByCompanyId } from "../api/offers";
import { getAllOffersByMajorId } from "../../majors/api/majors";
import { useAtomValue } from "jotai";
import { authAtom } from "../../auth/atoms/authAtom";

const useOffers = (majorId = "") => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const auth = useAtomValue(authAtom);

    const fetchOffers = useCallback(async () => {
        setLoading(true);
        try {
            let data = [];

            if (auth?.user?.companyId) {
                data = await getAllByCompanyId(auth.user.companyId);
            } else if (auth?.user?.studentId) {
                data = await getAll();
            }

            // Aplicar filtro por major
            if (majorId) {
                const dataByMajor = await getAllOffersByMajorId(majorId);

                if (auth?.user?.companyId) {
                    data = dataByMajor.filter((o) => o.EMPRESA_ID === auth.user.companyId);
                } else {
                    data = dataByMajor;
                }
            }

            if (!Array.isArray(data)) throw new Error("Respuesta no válida");
            setOffers(data);
        } catch (err) {
            console.error(err);
            setError("Error al cargar las ofertas");
        } finally {
            setLoading(false);
        }
    }, [auth?.user?.companyId, auth?.user?.studentId, majorId]);

    useEffect(() => {
        fetchOffers();
    }, [fetchOffers]);

    return { offers, loading, error, refetch: fetchOffers };
};

export default useOffers;
