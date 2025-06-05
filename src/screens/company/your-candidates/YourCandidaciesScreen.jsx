import { useEffect, useState } from "react";
import useCandidaciesByCompany from "../../../modules/candidacies/hooks/useCandidaciesByCompany";
import CandidaciesTable from "../../../modules/candidacies/components/CandidaciesTable/CandidaciesTable";
import StudentDetails from "../../../modules/students/components/StudentDetails";
import useStudentDetails from "../../../modules/students/hooks/useStudentDetails";
import CandidacyStatusActions from "../../../modules/candidacies/components/CandidacyStatusActions/CandidacyStatusActions";

export default function YourCandidaciesScreen() {
    const { candidacies, loading: loadingCandidacies, error: errorCandidacies, refetch } = useCandidaciesByCompany();
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [selectedCandidacy, setSelectedCandidacy] = useState(null);

    const { student, loading, error } = useStudentDetails(selectedStudentId);

    useEffect(() => {
        if (candidacies.length > 0 && !selectedStudentId) {
            setSelectedStudentId(candidacies[0].ALUMNO_ID);
            setSelectedCandidacy(candidacies[0]);
        }
    }, [candidacies, selectedStudentId]);

    useEffect(() => {
        if (!selectedCandidacy) return;
        const updated = candidacies.find(c => c.ID === selectedCandidacy.ID);
        if (updated && updated !== selectedCandidacy) {
            setSelectedCandidacy(updated);
        }
    }, [candidacies, selectedCandidacy]);

    const handleStatusChange = async () => {
        await refetch();
    };
    return (
        <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
                <h1>Postulantes</h1>
                {loadingCandidacies && <p>Cargando...</p>}
                {errorCandidacies && <p>{errorCandidacies}</p>}
                {!loadingCandidacies && (
                    <CandidaciesTable
                        candidacies={candidacies}
                        onSelectStudent={(studentId, candidacyId) => {
                            const found = candidacies.find((c) => c.ID === candidacyId);
                            setSelectedStudentId(studentId);
                            setSelectedCandidacy(found || null);
                        }}
                    />
                )}
            </div>
            <div style={{ flex: 1, borderLeft: "1px solid #ccc", paddingLeft: "1rem" }}>
                <h1>Detalle</h1>
                {loading && <p>Cargando...</p>}
                {error && <p>{error}</p>}
                {!loading && student && (
                    <>
                        <StudentDetails student={student} />
                        {selectedCandidacy?.ESTADO_RESPUESTA === "PENDING" && (
                            <CandidacyStatusActions
                                candidacyId={selectedCandidacy.ID}
                                onStatusChange={handleStatusChange}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
