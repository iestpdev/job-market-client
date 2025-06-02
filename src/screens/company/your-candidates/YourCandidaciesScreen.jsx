import { useState } from "react";
import CandidaciesTable from "../../../modules/candidacies/components/CandidaciesTable";
import StudentDetails from "../../../modules/students/components/StudentDetails";
import useStudentDetails from "../../../modules/students/hooks/useStudentDetails";

export default function CandidaciesScreen() {
    const [selectedStudentId, setSelectedStudentId] = useState(null);

    const { student, loading, error } = useStudentDetails(selectedStudentId);

    return (
        <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
                <h1>Postulantes</h1>
                <CandidaciesTable onSelectStudent={setSelectedStudentId} />
            </div>
            <div style={{ flex: 1, borderLeft: "1px solid #ccc", paddingLeft: "1rem" }}>
                <h1>Detalle</h1>
                {loading && <p>Cargando...</p>}
                {error && <p>{error}</p>}
                {!loading && !student && <p>Seleccione un postulante.</p>}
                {!loading && student && <StudentDetails student={student} />}
            </div>
        </div>
    );
}
