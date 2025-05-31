import './OfferDetails.css';

const OfferDetails = ({ offer }) => {
    if (!offer) {
        return <p>No hay oferta seleccionada.</p>;
    }

    const {
        TITULO,
        EMPRESA_ID,
        DESCRIPCION,
        SUELDO,
        VIATICOS,
        BONOS,
        REQUISITOS,
        BENEFICIOS,
        FECHA_PUBLICACION,
        FECHA_CIERRE,
    } = offer;

    return (
        <div className="offer-details">
            <h2>{TITULO}</h2>
            <p><strong>Empresa ID:</strong> {EMPRESA_ID}</p>
            <p><strong>Descripción:</strong> {DESCRIPCION || "No especificada"}</p>
            <p><strong>Salario:</strong> {SUELDO ? `$${SUELDO}` : "No especificado"}</p>
            <p><strong>Viáticos:</strong> {VIATICOS ? `$${VIATICOS}` : "No especificado"}</p>
            <p><strong>Bonos:</strong> {BONOS ? `$${BONOS}` : "No especificado"}</p>
            <p><strong>Requisitos:</strong> {REQUISITOS || "No especificado"}</p>
            <p><strong>Beneficios:</strong> {BENEFICIOS || "No especificado"}</p>
            <p><strong>Publicación:</strong> {FECHA_PUBLICACION ? new Date(FECHA_PUBLICACION).toLocaleDateString() : "No especificada"}</p>
            <p><strong>Cierre:</strong> {FECHA_CIERRE ? new Date(FECHA_CIERRE).toLocaleDateString() : "No especificada"}</p>
        </div>
    );
};

export default OfferDetails;