import './OfferCard.css';

const OfferCard = ({ offer }) => {
    const { TITULO, RAZON_SOCIAL, DIRECCION1, FECHA_PUBLICACION, LOGO } = offer;
    
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
                {LOGO && (
                    <div className="company-logo">
                        <img 
                            src={LOGO} 
                            alt={`Logo de ${RAZON_SOCIAL}`}
                            className="logo-img"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                )}
                <div className="offer-header-content">
                    <h2 className="offer-title">{TITULO}</h2>
                </div>
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