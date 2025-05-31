import './OfferCard.css';

const OfferCard = ({ offer }) => {
    const { TITULO, EMPRESA_ID, DESCRIPCION } = offer;

    return (
        <div className="offer-card">
            <h3>{TITULO}</h3>
            <p><strong>Empresa ID:</strong> {EMPRESA_ID}</p>
            <p><strong>Descripción:</strong> {DESCRIPCION.slice(0, 100)}...</p>
        </div>
    );
};

export default OfferCard;