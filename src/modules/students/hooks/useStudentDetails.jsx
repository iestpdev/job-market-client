import { useEffect, useState } from "react";
import { getById } from "../api/students";

export default function useStudentDetails(studentId) {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!studentId) return;
        const fetchStudent = async () => {
            try {
                const data = await getById(studentId);
                setStudent(data);
            } catch (err) {
                setError("Error al obtener los datos del estudiante.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStudent();
    }, [studentId]);

    return { student, loading, error };
}
