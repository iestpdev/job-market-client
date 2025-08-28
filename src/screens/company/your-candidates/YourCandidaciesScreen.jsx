import { useEffect, useState } from "react";
import useCandidaciesByCompany from "../../../modules/candidacies/hooks/useCandidaciesByCompany";
import CandidaciesTable from "../../../modules/candidacies/components/CandidaciesTable/CandidaciesTable";
import StudentDetails from "../../../modules/students/components/studentDetails/StudentDetails";
import useStudentDetails from "../../../modules/students/hooks/useStudentDetails";
import CandidacyStatusActions from "../../../modules/candidacies/components/CandidacyStatusActions/CandidacyStatusActions";

export default function YourCandidaciesScreen() {
    const { candidacies, loading: loadingCandidacies, error: errorCandidacies, refetch } = useCandidaciesByCompany();
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [selectedCandidacy, setSelectedCandidacy] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

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
        <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
                {loadingCandidacies && <p>Cargando...</p>}
                {errorCandidacies && <p>{errorCandidacies}</p>}
                {!loadingCandidacies && (
                    <CandidaciesTable
                        candidacies={candidacies}
                        onSelectStudent={(studentId, candidacyId) => {
                            const found = candidacies.find((c) => c.ID === candidacyId);
                            setSelectedStudentId(studentId);
                            setSelectedCandidacy(found || null);
                            setShowDetailsModal(true);
                        }}
                    />
                )}
            </div>
            <div className="hidden lg:block flex-1 pl-4">
                {loading && <p>Cargando...</p>}
                {error && <p>{error}</p>}
                {!loading && student && (
                    <>
                        {selectedCandidacy?.ESTADO_RESPUESTA === "PENDING" && (
                            <CandidacyStatusActions
                                candidacyId={selectedCandidacy.ID}
                                onStatusChange={handleStatusChange}
                            />
                        )}
                        <StudentDetails student={student} />
                    </>
                )}
            </div>

            {/* Modal de detalles - visible solo a media pantalla */}
            {showDetailsModal && (
                <div
                    className="lg:hidden fixed inset-0 z-50 bg-black/50 p-4 flex items-center justify-center"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="candidacy-details-title"
                >
                    <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 max-h-[85vh] overflow-y-auto">
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                            onClick={() => setShowDetailsModal(false)}
                            aria-label="Cerrar"
                        >
                            ✕
                        </button>

                        {loading && <p>Cargando...</p>}
                        {error && <p>{error}</p>}
                        {!loading && student && (
                            <>
                                {selectedCandidacy?.ESTADO_RESPUESTA === "PENDING" && (
                                    <div className="mt-6">
                                        <CandidacyStatusActions
                                            candidacyId={selectedCandidacy.ID}
                                            onStatusChange={async () => {
                                                await handleStatusChange();
                                                setShowDetailsModal(false);
                                            }}
                                        />
                                    </div>
                                )}
                                <StudentDetails student={student} />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
