import StudentAttachments from "../../candidacies/components/StudentAttachments/StudentAttachments";
import "./StudentDetails.css";

export default function StudentDetails({ student }) {
    if (!student) return <p>No se encontró información del estudiante.</p>;

    const {
        ID,
        APELLIDOS,
        NOMBRES,
        GENERO,
        FECH_NACIMIENTO,
        TIPO_DOI,
        NUM_DOI,
        CURRICULUM,
    } = student;

    return (
        <div className="student-details-card">
            <h2 className="student-name">{`${NOMBRES} ${APELLIDOS}`}</h2>
            <div className="student-info-item">
                <strong>Género:</strong> {GENERO === "M" ? "Masculino" : "Femenino"}
            </div>
            <div className="student-info-item">
                <strong>Fecha de Nacimiento:</strong>{" "}
                {new Date(FECH_NACIMIENTO).toLocaleDateString("es-PE")}
            </div>
            <div className="student-info-item">
                <strong>Documento:</strong> {TIPO_DOI} {NUM_DOI}
            </div>
            <div className="student-info-item">
                <strong>Currículum:</strong>{" "}
                <a href={CURRICULUM} className="curriculum-link" target="_blank" rel="noopener noreferrer">
                    Ver archivo PDF
                </a>
            </div>

            <StudentAttachments studentId={ID} />
        </div>
    );
}
