import { useState } from "react";
import { useActivatedMajors } from "../../../majors/hooks/useMajors";
import "./SearchAndFilters.css";

const OfferSearchAndFilters = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [selectedMajor, setSelectedMajor] = useState("");

    const { data: majors = [], isLoading } = useActivatedMajors();

    const handleSearch = () => {
        onSearch({
            query,
            majorId: selectedMajor,
        });
    };

    return (
        <div className="offer-filters-container">
            <div className="search-bar flex flex-col md:flex-row gap-2">
                {/* Campo de búsqueda */}
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        placeholder="Título del empleo, descripción o requisitos..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                    />
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Buscar
                    </button>
                </div>
            </div>
            {/* Select - programas de estudio */}
            <div className="w-full md:w-1/3">
                <select
                    value={selectedMajor}
                    onChange={(e) => setSelectedMajor(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    <option value="">Programas de estudio</option>
                    {isLoading ? (
                        <option>Cargando...</option>
                    ) : (
                        majors.map((major) => (
                            <option key={major.ID} value={major.ID}>
                                {major.NOMBRE}
                            </option>
                        ))
                    )}
                </select>
            </div>
        </div>
    );
};

export default OfferSearchAndFilters;
