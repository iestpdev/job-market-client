import './OfferCard.css';

const OfferCard = ({ offer }) => {
    const { TITULO, RAZON_SOCIAL, DIRECCION1, SUELDO, FECHA_PUBLICACION } = offer;

    const formatDate = (dateString) => {
        if (!dateString) return "No especificada";
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="offer-card">
            <div className="offer-header">
                <h2 className="offer-title">{TITULO}</h2>
            </div>

            <div className="offer-company">
                <span className="company-name">{RAZON_SOCIAL}</span>
            </div>

            <div className="offer-location">
                <span className="location-text">{DIRECCION1}</span>
            </div>

            <div className="offer-footer">
                <span className="publish-date">Fecha de publicación: {formatDate(FECHA_PUBLICACION)}</span>
            </div>
        </div>
    );
};

export default OfferCard;