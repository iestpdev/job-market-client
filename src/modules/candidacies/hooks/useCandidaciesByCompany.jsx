import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { authAtom } from "../../auth/atoms/authAtom";
import { getAllByCompanyId } from "../api/candidacies";

export default function useCandidaciesByCompany() {
    const auth = useAtomValue(authAtom);
    const companyId = auth?.user?.companyId;
    const [candidacies, setCandidacies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!companyId) return;
        const fetchData = async () => {
            try {
                const data = await getAllByCompanyId(companyId);
                setCandidacies(data);
            } catch (err) {
                console.error(err);
                setError("Error al obtener postulantes");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [companyId]);

    return { candidacies, loading, error };
}
