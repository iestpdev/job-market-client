import useStudentAttachments from "../../hooks/useStudentAttachments";


export default function StudentAttachments({ studentId }) {
    const { attachments, loading, error } = useStudentAttachments(studentId);

    if (loading) return <p className="student-info-item">Cargando adjuntos...</p>;
    if (error) return <p className="student-info-item" style={{ color: "red" }}>{error}</p>;

    const keys = ["DOC_ADJUNTO1", "DOC_ADJUNTO2", "DOC_ADJUNTO3", "DOC_ADJUNTO4"];

    const visibleDocs = keys.filter((key) => attachments[key]);

    if (visibleDocs.length === 0) return null;

    return (
        <>
            {visibleDocs.map((key, idx) => (
                <div className="student-info-item" key={key}>
                    <strong>Documento {(idx+1) + 1}:</strong>{" "}
                    <a
                        href={attachments[key]}
                        className="curriculum-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ver adjunto
                    </a>
                </div>
            ))}
        </>
    );
}
