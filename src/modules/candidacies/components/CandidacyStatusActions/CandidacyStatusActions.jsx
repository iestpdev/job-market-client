import "./CandidacyStatusActions.css";
import useCandidacyStatusUpdate from "../../hooks/useCandidacyStatusUpdate";

export default function CandidacyStatusActions({ candidacyId, onStatusChange }) {
    const { mutate, isLoading } = useCandidacyStatusUpdate(() => {
        onStatusChange?.();
    });

    const handleUpdate = (status) => {
        mutate({ id: candidacyId, status });
    };

    return (
        <div className="status-actions-container">
            <button
                onClick={() => handleUpdate("APPROVED")}
                disabled={isLoading}
                className="status-button approve"
            >
                Aprobar
            </button>
            <button
                onClick={() => handleUpdate("REJECTED")}
                disabled={isLoading}
                className="status-button reject"
            >
                Rechazar
            </button>
        </div>
    );
}
