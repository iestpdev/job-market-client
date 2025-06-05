import { useEffect, useState } from "react";
import { getAttachmentsByStudentId } from "../api/candidacies";

export default function useStudentAttachments(studentId) {
    const [attachments, setAttachments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!studentId) return;

        const fetchData = async () => {
            try {
                const data = await getAttachmentsByStudentId(studentId);
                setAttachments(data[0] || {});
            } catch (err) {
                setError("Error al obtener archivos adjuntos del estudiante.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [studentId]);

    return { attachments, loading, error };
}
