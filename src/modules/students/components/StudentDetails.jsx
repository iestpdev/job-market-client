export default function StudentDetails({ student }) {
    if (!student) return <p>No se encontró información del estudiante.</p>;

    const {
        APELLIDOS,
        NOMBRES,
        GENERO,
        FECH_NACIMIENTO,
        TIPO_DOI,
        NUM_DOI,
        CURRICULUM,
    } = student;

    return (
        <div style={{ maxWidth: "600px", margin: "auto", padding: "1rem" }}>
            <h2>{`${NOMBRES} ${APELLIDOS}`}</h2>
            <p><strong>Género:</strong> {GENERO === "M" ? "Masculino" : "Femenino"}</p>
            <p><strong>Fecha de Nacimiento:</strong> {new Date(FECH_NACIMIENTO).toLocaleDateString()}</p>
            <p><strong>Documento:</strong> {TIPO_DOI} {NUM_DOI}</p>
            <p><strong>Curriculum:</strong> {CURRICULUM}</p>
        </div>
    );
}
