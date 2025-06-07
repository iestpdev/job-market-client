import { useState } from "react";
import useUploadDocument from "../../hooks/useUploadDocument";
import useCreateCandidacy from "../../hooks/useCreateCandidacy";
import "./UploadDocsModal.css";

const UploadDocsModal = ({ offerId, studentId, onClose, setCandidacyId, onApplied }) => {
    const [files, setFiles] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const uploadMutation = useUploadDocument();
    const createCandidacy = useCreateCandidacy();

    const handleFileChange = (e, field) => {
        setFiles((prev) => ({ ...prev, [field]: e.target.files[0] }));
    };

    const handleUpload = async () => {
        setIsLoading(true);
        try {
            const res = await createCandidacy.mutateAsync({
                alumnoId: studentId,
                ofertaId: offerId,
            });

            const candidacyId = res?.id;
            setCandidacyId(candidacyId);

            for (let i = 2; i <= 4; i++) {
                const key = `docAdjunto${i}`;
                if (files[key]) {
                    await uploadMutation.mutateAsync({
                        id: candidacyId,
                        field: key,
                        file: files[key],
                    });
                }
            }

            onApplied?.();
            onClose();
        } catch (error) {
            console.error("Error al postular o subir documentos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const hasFiles = Object.values(files).some((file) => file instanceof File);

    return (
        <>
            <div className="modal-overlay" onClick={onClose} />
            <div className="modal">
                <h3>¿Deseas agregar documentos adicionales?</h3>

                {[2, 3, 4].map((i) => (
                    <div key={i}>
                        <label>Documento {i}:</label>
                        <input type="file" accept=".pdf" onChange={(e) => handleFileChange(e, `docAdjunto${i}`)} />
                    </div>
                ))}

                <button onClick={handleUpload} disabled={isLoading}>
                    {isLoading
                        ? "Cargando..."
                        : hasFiles
                            ? "Subir Documentos"
                            : "Postular"}
                </button>

                <button onClick={onClose} disabled={isLoading}>Cerrar</button>
            </div>
        </>
    );

};

export default UploadDocsModal;
