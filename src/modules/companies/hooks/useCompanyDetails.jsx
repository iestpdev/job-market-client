import { useEffect, useState } from "react";
import { getById } from "../api/companies";

export default function useCompanyDetails(companyId) {
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!companyId) return;
        const fetchData = async () => {
            try {
                const data = await getById(companyId);
                setCompany(data);
            } catch (err) {
                console.error(err);
                setError("Error al obtener la empresa.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [companyId]);

    return { company, loading, error };
}
