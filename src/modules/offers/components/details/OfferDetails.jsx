import usePermissions from '../../../shared/hooks/usePermissions';
import './OfferDetails.css';

const OfferDetails = ({ offer }) => {
    if (!offer) {
        return (
            <div className="offer-details-empty">
                <p>No hay oferta seleccionada.</p>
            </div>
        );
    }

    const { isStudent, studentId } = usePermissions();
    const {
        TITULO,
        RAZON_SOCIAL,
        DIRECCION1,
        DESCRIPCION,
        SUELDO,
        VIATICOS,
        BONOS,
        REQUISITOS,
        BENEFICIOS,
        FECHA_PUBLICACION,
        FECHA_CIERRE,
    } = offer;

    const formatDate = (dateString) => {
        if (!dateString) return "No especificada";
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatSalary = (amount) => {
        if (!amount || Number(amount) <= 0) return null;
        return `S/ ${Number(amount).toLocaleString('es-PE')}`;
    };

    return (
        <div className="offer-details">
            {/* Header Section */}
            <div className="offer-details-header">
                <div className="offer-header-content">
                    <h1 className="offer-title">{TITULO}</h1>
                    <div className="offer-company-info">
                        <span className="company-name">{RAZON_SOCIAL}</span>
                    </div>
                    <div className="offer-location">
                        <span className="location-icon">📍</span>
                        <span className="location-text">{DIRECCION1}</span>
                    </div>
                </div>

                <div className="offer-actions">
                    {isStudent && studentId && (
                        <button className="btn-apply">
                            Postularse ahora
                        </button>
                    )}
                </div>
            </div>

            {/* Location Section */}
            <div className="offer-section">
                <h3 className="section-title">Ubicación</h3>
                <div className="location-detail">
                    <span className="location-icon">📍</span>
                    <span>{DIRECCION1}</span>
                </div>
            </div>

            {/* Salary Information */}
            {(SUELDO || VIATICOS || BONOS) && (
                <div className="offer-section">
                    <h3 className="section-title">Compensación</h3>
                    <div className="compensation-grid">
                        {formatSalary(SUELDO) && (
                            <div className="compensation-item">
                                <span className="compensation-label">Salario:</span>
                                <span className="compensation-value">{formatSalary(SUELDO)}</span>
                            </div>
                        )}
                        {formatSalary(VIATICOS) && (
                            <div className="compensation-item">
                                <span className="compensation-label">Viáticos:</span>
                                <span className="compensation-value">{formatSalary(VIATICOS)}</span>
                            </div>
                        )}
                        {formatSalary(BONOS) && (
                            <div className="compensation-item">
                                <span className="compensation-label">Bonos:</span>
                                <span className="compensation-value">{formatSalary(BONOS)}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Job Description */}
            <div className="offer-section">
                <h3 className="section-title">Descripción completa del empleo</h3>
                <div
                    className="job-description"
                    dangerouslySetInnerHTML={{ __html: DESCRIPCION || "No especificada" }}
                />
            </div>

            {/* Requirements */}
            {REQUISITOS && (
                <div className="offer-section">
                    <h3 className="section-title">Requisitos</h3>
                    <div
                        className="job-requirements"
                        dangerouslySetInnerHTML={{ __html: REQUISITOS }}
                    />
                </div>
            )}

            {/* Benefits */}
            {BENEFICIOS && (
                <div className="offer-section">
                    <h3 className="section-title">Beneficios</h3>
                    <div
                        className="job-benefits"
                        dangerouslySetInnerHTML={{ __html: BENEFICIOS }}
                    />
                </div>
            )}

            {/* Publication Info */}
            <div className="offer-section">
                <h3 className="section-title">Información de publicación</h3>
                <div className="publication-info">
                    <div className="info-item">
                        <span className="info-label">Fecha de publicación:</span>
                        <span className="info-value">{formatDate(FECHA_PUBLICACION)}</span>
                    </div>
                    {FECHA_CIERRE && (
                        <div className="info-item">
                            <span className="info-label">Fecha de cierre:</span>
                            <span className="info-value">{formatDate(FECHA_CIERRE)}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Apply Button */}
            {isStudent && studentId && (
                <div className="offer-bottom-actions">
                    <button className="btn-apply btn-apply-bottom">
                        Postularse ahora
                    </button>
                </div>
            )}
        </div>
    );
};

export default OfferDetails;