import { useParams } from "react-router-dom";
import useCandidaciesByCompany from "../../candidacies/hooks/useCandidaciesByCompany";
import useStudentDetails from "../hooks/useStudentDetails";
import StudentDetails from "../components/StudentDetails";

export default function StudentDetailsPage() {
    const { id } = useParams();
    const { candidacies } = useCandidaciesByCompany();
    const candidacy = candidacies.find((c) => String(c.ID) === id);
    const studentId = candidacy?.ALUMNO_ID;

    const { student, loading, error } = useStudentDetails(studentId);

    if (!candidacy) return <p>Candidatura no encontrada.</p>;
    if (loading) return <p>Cargando información del estudiante...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Detalle de Postulante</h1>
            <StudentDetails student={student} />
        </div>
    );
}
