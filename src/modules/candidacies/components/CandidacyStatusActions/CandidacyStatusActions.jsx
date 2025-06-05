import useCandidacyStatusUpdate from "../../hooks/useCandidacyStatusUpdate";

export default function CandidacyStatusActions({ candidacyId, onStatusChange  }) {
    const { mutate, isLoading } = useCandidacyStatusUpdate(() =>{
        console.log("Estado actualizado correctamente");
        onStatusChange?.();
    });

    const handleUpdate = (status) => {
        mutate({ id: candidacyId, status });
    };

    return (
        <div style={{ marginTop: "1rem" }}>
            <button
                onClick={() => handleUpdate("APPROVED")}
                disabled={isLoading}
                style={{ marginRight: "1rem", backgroundColor: "green", color: "white", padding: "0.5rem" }}
            >
                Aprobar
            </button>
            <button
                onClick={() => handleUpdate("REJECTED")}
                disabled={isLoading}
                style={{ backgroundColor: "red", color: "white", padding: "0.5rem" }}
            >
                Rechazar
            </button>
        </div>
    );
}
