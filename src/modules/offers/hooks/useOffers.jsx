import { useState, useEffect } from "react";
import { getAll, getAllByCompanyId } from "../api/offers";
import { useAtomValue } from "jotai";
import { authAtom } from "../../auth/atoms/authAtom";

const useOffers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const auth = useAtomValue(authAtom);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                let data;
                if (auth?.user?.companyId) {
                    data = await getAllByCompanyId(auth.user.companyId);
                } else if (auth?.user?.studentId) {
                    data = await getAll();
                } else {
                    data = [];
                }


                if (!Array.isArray(data)) {
                    throw new Error("La respuesta del servidor no es un array.");
                }
                setOffers(data);
            } catch (err) {
                console.error(err)
                setError("Error al cargar las ofertas");
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, [auth?.user?.companyId, auth?.user?.studentId]);

    return { offers, loading, error };
};

export default useOffers;
