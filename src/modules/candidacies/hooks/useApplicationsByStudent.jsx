import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { authAtom } from "../../auth/atoms/authAtom";
import { getAllByStudentId } from "../api/candidacies";

export default function useApplicationsByStudent() {
    const auth = useAtomValue(authAtom);
    const studentId = auth?.user?.studentId;
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const data = await getAllByStudentId(studentId);
            setApplications(data);
        } catch (err) {
            console.error(err);
            setError("Error al obtener tus postulaciones");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (studentId) fetchData();
    }, [studentId]);

    return { applications, loading, error, refetch: fetchData };
}
