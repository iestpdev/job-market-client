import { useState } from "react";
import "./SearchAndFilters.css";

const OfferSearchAndFilters = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        onSearch({
            query,
        });
    };

    return (
        <div className="offer-filters-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Título del empleo, descripción o requisitos..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="button" onClick={handleSearch}>
                    Buscar empleos
                </button>
            </div>
        </div>
    );
};

export default OfferSearchAndFilters;
